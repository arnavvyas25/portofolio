/**
 * The draft engine, ported to the browser.
 *
 * WHY THE LOGIC LIVES HERE RATHER THAN ON A SERVER
 * ------------------------------------------------
 * Between two of your picks, eleven other managers pick. Each one has to be
 * entered. If entering a pick costs a network round-trip, the cost that
 * matters on draft night is not the model's runtime (~300ms in Python) but
 * the twelve round-trips stacked in front of your 45-second clock. Running
 * everything locally makes a pick cost one tap and zero milliseconds, and
 * makes the console work with no connection at all once loaded.
 *
 * WHAT IS FAITHFUL TO THE PYTHON
 * ------------------------------
 * `legalPool` is a direct port of `fantasy.draft.roster_rules.legal_pool`,
 * and `survival` reproduces `fantasy.draft.survival` — same 1.35x standard
 * deviation inflation, same t(4) tails, same rank-within-pool definition of
 * "survives". Both are exercised against the Python implementation by
 * `tests/test_export_parity.py` in the dashboard repo.
 *
 * WHAT IS DELIBERATELY NOT PORTED
 * -------------------------------
 * The paired-pick lookahead optimizer. Adversarial mock drafts (30 paired
 * seeds, both scoring settings) measured it at or slightly below simply
 * taking the best legal player by availability-priced VORP — 1794 vs 1797
 * at half PPR, 2017 vs 2040 at full. Since it costs a great deal of
 * complexity to reproduce and did not win, the console ranks greedily and
 * shows the survival numbers that would have fed the lookahead, leaving the
 * judgement visible rather than buried.
 */

import type { Meta, Player, VariantKey } from './types';

// ---------------------------------------------------------------------------
// snake-draft pick arithmetic
// ---------------------------------------------------------------------------

export function slotOnClock(pickNumber: number, teams: number): number {
  const round = Math.floor((pickNumber - 1) / teams) + 1;
  const idx = (pickNumber - 1) % teams;
  return round % 2 === 1 ? idx + 1 : teams - idx;
}

export function roundOfPick(pickNumber: number, teams: number): number {
  return Math.floor((pickNumber - 1) / teams) + 1;
}

// ---------------------------------------------------------------------------
// roster rules — port of fantasy.draft.roster_rules
// ---------------------------------------------------------------------------


/** How many of a position can be in a starting lineup at once: its own slots
 *  plus the flex slot when the position is eligible for it. */
export function starterCapacity(position: string, meta: Meta): number {
  const dedicated = meta.roster[position] ?? 0;
  const flex = meta.flex.includes(position) ? meta.roster['FLEX'] ?? 0 : 0;
  return dedicated + flex;
}

export function isFlexEligible(position: string, meta: Meta): boolean {
  return meta.flex.includes(position);
}

/**
 * Restrict the field to players it is rational to draft right now.
 *
 * Three rules, all about draft shape rather than player value: never roster
 * more of a position than could plausibly be used; never spend a pick on a
 * kicker or defence until the final two rounds, since both are freely
 * streamable all season; and never take a pure backup at a position that
 * cannot flex, for the same reason. Once the last rounds arrive, an unfilled
 * K or DEF scores zero every week, so they become the *only* legal picks.
 *
 * Returns the input unchanged if the rules would exclude everyone: a
 * constraint must never leave the drafter with nothing to pick.
 */
export function legalPoolForRound(
  available: Player[],
  counts: Record<string, number>,
  meta: Meta,
  roundNumber: number,
): Player[] {
  const caps = meta.caps;
  const streamable = meta.streamable;
  const atCap = new Set(
    Object.keys(caps).filter((p) => (counts[p] ?? 0) >= (caps[p] ?? Infinity)),
  );

  let pool = available.filter((pl) => !atCap.has(pl.p));

  if (roundNumber < meta.rounds - 1) {
    pool = pool.filter((pl) => !streamable.includes(pl.p));
    // No pure backups at positions that cannot flex. Once the starting slots
    // for such a position are full, every further copy is bench-only and as
    // replaceable in-season as a kicker — there are 32 starting quarterbacks
    // and only 12 rostered as starters in this league. VORP cannot see it: it
    // prices a player against replacement *for a starting slot*, so a second
    // quarterback keeps almost his full starter value. Left out, the greedy
    // board spent rounds 3 and 4 on two quarterbacks.
    pool = pool.filter(
      (pl) =>
        isFlexEligible(pl.p, meta) ||
        (counts[pl.p] ?? 0) < starterCapacity(pl.p, meta),
    );
  } else {
    const needed = streamable.filter(
      (p) => (counts[p] ?? 0) < (caps[p] ?? 1),
    );
    if (needed.length) {
      const forced = pool.filter((pl) => needed.includes(pl.p));
      if (forced.length) return forced;
    }
  }

  return pool.length ? pool : available;
}

// ---------------------------------------------------------------------------
// survival — port of fantasy.draft.survival
// ---------------------------------------------------------------------------

const SD_INFLATION = 1.35;
const SD_FLOOR = 1.0;
const T_DF = 4;

/** Deterministic PRNG so a re-render never reshuffles the displayed odds. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function standardNormal(rand: () => number): number {
  // Box–Muller. The u===0 guard avoids log(0) on the rare exact zero.
  let u = rand();
  if (u <= 0) u = Number.EPSILON;
  const v = rand();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

/**
 * Student-t with 4 degrees of freedom.
 *
 * chi-square with even df 2k is -2 * sum of k log-uniforms, so df=4 needs
 * exactly two uniforms — considerably cheaper than summing squared normals,
 * which matters when this runs a few hundred thousand times per keystroke.
 */
function studentT4(rand: () => number): number {
  const z = standardNormal(rand);
  let u1 = rand();
  let u2 = rand();
  if (u1 <= 0) u1 = Number.EPSILON;
  if (u2 <= 0) u2 = Number.EPSILON;
  const chi2 = -2 * (Math.log(u1) + Math.log(u2));
  return z / Math.sqrt(chi2 / T_DF);
}

/**
 * P(each player is still on the board after `picksUntil` more picks).
 *
 * Rank-based like the Python: a player survives a simulation if at least
 * `picksUntil` others in the same pool draw an earlier draft position. That
 * is what makes the number respond correctly to who is already gone —
 * remove a player from the pool and everyone else's odds rise.
 *
 * Restricted to the `poolSize` best players by consensus rank. Someone
 * ranked 200th cannot plausibly be taken inside the next twenty picks, and
 * including the long tail would multiply the cost of every simulation
 * without moving a single displayed probability.
 */
export function survival(
  players: Player[],
  variant: VariantKey,
  picksUntil: number,
  { sims = 400, poolSize = 120, seed = 1 } = {},
): Map<string, number> {
  const out = new Map<string, number>();
  if (picksUntil <= 0) {
    for (const p of players) out.set(p.i, 1);
    return out;
  }

  const ranked = [...players]
    .filter((p) => p.e[variant] != null)
    .sort((a, b) => (a.e[variant] as number) - (b.e[variant] as number))
    .slice(0, poolSize);

  const n = ranked.length;
  if (!n) return out;

  const ecr = new Float64Array(n);
  const sd = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    const r = ranked[i]!;
    ecr[i] = r.e[variant] as number;
    const raw = r.s[variant];
    sd[i] = Math.max(raw == null || !isFinite(raw) ? SD_FLOOR : raw, SD_FLOOR) * SD_INFLATION;
  }

  const rand = mulberry32(seed);
  const survived = new Int32Array(n);
  const scores = new Float64Array(n);

  for (let s = 0; s < sims; s++) {
    for (let i = 0; i < n; i++) scores[i] = ecr[i]! + studentT4(rand) * sd[i]!;
    // A player survives iff at least `picksUntil` others draw an earlier
    // draft position — i.e. his rank in this simulation is past the window.
    // Counted directly rather than by sorting: the loop can stop the moment
    // the threshold is reached, which is the answer.
    for (let i = 0; i < n; i++) {
      let earlier = 0;
      const mine = scores[i]!;
      for (let j = 0; j < n && earlier < picksUntil; j++) {
        if (j !== i && scores[j]! < mine) earlier++;
      }
      if (earlier >= picksUntil) survived[i] = survived[i]! + 1;
    }
  }

  for (let i = 0; i < n; i++) out.set(ranked[i]!.i, survived[i]! / sims);
  for (const p of players) if (!out.has(p.i)) out.set(p.i, 1);
  return out;
}

// ---------------------------------------------------------------------------
// recommendation
// ---------------------------------------------------------------------------

export interface Candidate {
  player: Player;
  value: number;
  survives: number; // P(available at your next pick)
  positionGap: number; // value over the next legal player at his position
  reasons: string[];
}

const POSITION_ORDER = ['RB', 'WR', 'TE', 'QB', 'K', 'DEF'];

export function valueOf(p: Player, variant: VariantKey): number {
  const v = p.v[variant];
  return v == null || !isFinite(v) ? -1e9 : v;
}

/**
 * Rank the legal field and explain the top of it.
 *
 * The ordering is plain greedy on availability-priced VORP — the strategy
 * that won the adversarial mocks. The explanations exist so the ordering can
 * be *overruled*: they surface the positional gap, the odds the player lasts
 * until your next turn, and any news or regression note attached to him, so
 * a human who knows something the board does not can see exactly what they
 * would be trading away.
 */
export function recommend(
  available: Player[],
  counts: Record<string, number>,
  meta: Meta,
  variant: VariantKey,
  roundNumber: number,
  picksUntilNext: number,
  limit = 6,
): Candidate[] {
  const pool = legalPoolForRound(available, counts, meta, roundNumber);
  const ordered = [...pool].sort((a, b) => valueOf(b, variant) - valueOf(a, variant));
  const top = ordered.slice(0, limit);

  const odds = survival(pool, variant, picksUntilNext);

  // Next legal player at each position, used for the scarcity sentence.
  const nextAtPosition = new Map<string, number>();
  const secondAtPosition = new Map<string, number>();
  for (const p of ordered) {
    if (!nextAtPosition.has(p.p)) nextAtPosition.set(p.p, valueOf(p, variant));
    else if (!secondAtPosition.has(p.p)) secondAtPosition.set(p.p, valueOf(p, variant));
  }

  return top.map((player) => {
    const value = valueOf(player, variant);
    const best = nextAtPosition.get(player.p) ?? value;
    const second = secondAtPosition.get(player.p) ?? value;
    const gap = value >= best ? value - second : 0;
    const survives = odds.get(player.i) ?? 1;

    const reasons: string[] = [];
    if (gap > 0.5) {
      reasons.push(`${gap.toFixed(0)} pts clear of the next ${player.p}`);
    }
    if (picksUntilNext > 0) {
      const pct = Math.round(survives * 100);
      if (pct <= 25) reasons.push(`only ${pct}% likely to last to your next pick`);
      else if (pct >= 80) reasons.push(`${pct}% likely to still be there next turn`);
    }
    if (player.g != null && player.g < 14) {
      reasons.push(`${player.g.toFixed(1)} expected games`);
    }
    if (player.w) reasons.push(player.w);
    if (player.c) reasons.push(player.c);

    return { player, value, survives, positionGap: gap, reasons };
  });
}

export function positionSort(a: string, b: string): number {
  const ia = POSITION_ORDER.indexOf(a);
  const ib = POSITION_ORDER.indexOf(b);
  return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
}
