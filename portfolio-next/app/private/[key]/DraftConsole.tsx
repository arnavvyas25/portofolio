'use client';

/**
 * The live draft console.
 *
 * DESIGN CONSTRAINT: one tap per pick.
 * -----------------------------------
 * Eleven other managers pick between your turns, and every one of them has
 * to be recorded or the board goes stale. So recording a pick is a single
 * tap on the player's row — nothing else. The console already knows whose
 * turn it is, so it decides for itself whether that tap was an opponent's
 * pick or yours; there is no "who picked?" step, no confirm dialog, and no
 * mode to switch between. The only other controls that exist are undo, a
 * search box, and the scoring toggle.
 *
 * The board is ordered so the tap is usually near the top: the player taken
 * next is, far more often than not, one of the handful the market ranks
 * highest, so the default sort is by expert consensus while you are
 * watching, and by our own valuation when you are on the clock. That is the
 * one piece of state that changes without being asked for, and it changes
 * because the question changes — "who just went?" and "who should I take?"
 * have different answers.
 *
 * Everything renders as a fixed overlay so the surrounding site's header and
 * footer stay untouched and unseen.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { CONSOLE_CSS } from './styles';
import {
  recommend,
  roundOfPick,
  slotOnClock,
  legalPoolForRound,
  valueOf,
} from './draft';
import type { Bundle, Player, VariantKey } from './types';

interface Pick {
  pick: number;
  slot: number;
  id: string;
  pos: string;
}

const STORAGE_KEY = 'fantasy-draft-state-v1';

export default function DraftConsole({ bundle }: { bundle: Bundle }) {
  const { meta, players } = bundle;

  const [picks, setPicks] = useState<Pick[]>([]);
  const [variant, setVariant] = useState<VariantKey>(meta.default_variant);
  const [query, setQuery] = useState('');
  const [posFilter, setPosFilter] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [showRoster, setShowRoster] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  // ---- persistence ------------------------------------------------------
  // A draft is 180 picks over two hours on a phone that will lock, ring, and
  // possibly run out of battery. Losing the pick history would be the one
  // unrecoverable failure, so it is written on every change and restored on
  // load.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (Array.isArray(saved.picks)) setPicks(saved.picks);
        if (typeof saved.variant === 'string' && meta.variants.includes(saved.variant)) {
          setVariant(saved.variant);
        }
      }
    } catch {
      // Corrupt or unavailable storage must not stop the draft; an empty
      // board is recoverable by re-entering picks, a crashed page is not.
    }
    setHydrated(true);
  }, [meta.variants]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ picks, variant }));
    } catch {
      /* storage full or blocked — the in-memory draft continues regardless */
    }
  }, [picks, variant, hydrated]);

  // ---- derived draft state ---------------------------------------------
  const byId = useMemo(() => {
    const m = new Map<string, Player>();
    for (const p of players) m.set(p.i, p);
    return m;
  }, [players]);

  const takenIds = useMemo(() => new Set(picks.map((p) => p.id)), [picks]);
  const pickNumber = picks.length + 1;
  const totalPicks = meta.teams * meta.rounds;
  const complete = pickNumber > totalPicks;
  const onClockSlot = complete ? 0 : slotOnClock(pickNumber, meta.teams);
  const myTurn = onClockSlot === meta.slot;
  const round = complete ? meta.rounds : roundOfPick(pickNumber, meta.teams);

  const nextOwnPick = useMemo(
    () => meta.my_picks.find((p) => p >= pickNumber) ?? null,
    [meta.my_picks, pickNumber],
  );
  const followingOwnPick = useMemo(
    () => meta.my_picks.find((p) => p > pickNumber) ?? null,
    [meta.my_picks, pickNumber],
  );
  const picksUntilMine = nextOwnPick == null ? null : nextOwnPick - pickNumber;
  // While you are on the clock the relevant horizon is the gap to the pick
  // *after* this one — that is the window a player has to survive if you
  // pass on him now.
  const horizon = myTurn
    ? followingOwnPick == null
      ? 0
      : followingOwnPick - pickNumber
    : picksUntilMine ?? 0;

  const myPicks = useMemo(() => picks.filter((p) => p.slot === meta.slot), [picks, meta.slot]);
  const myCounts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const p of myPicks) c[p.pos] = (c[p.pos] ?? 0) + 1;
    return c;
  }, [myPicks]);

  const available = useMemo(
    () => players.filter((p) => !takenIds.has(p.i)),
    [players, takenIds],
  );

  // ---- recommendation ---------------------------------------------------
  const candidates = useMemo(() => {
    if (!myTurn || complete) return [];
    return recommend(available, myCounts, meta, variant, round, horizon);
  }, [myTurn, complete, available, myCounts, meta, variant, round, horizon]);

  const legalIds = useMemo(() => {
    const pool = legalPoolForRound(available, myCounts, meta, round);
    return new Set(pool.map((p) => p.i));
  }, [available, myCounts, meta, round]);

  // ---- the visible list -------------------------------------------------
  const listed = useMemo(() => {
    const q = query.trim().toLowerCase();
    let rows = available;
    if (q) {
      rows = rows.filter(
        (p) => p.n.toLowerCase().includes(q) || p.t.toLowerCase() === q,
      );
    }
    if (posFilter) rows = rows.filter((p) => p.p === posFilter);

    // Sorted by market rank while watching (who is likeliest to go next) and
    // by our valuation on the clock (who we would most like to have).
    const sorted = [...rows].sort((a, b) => {
      if (myTurn) return valueOf(b, variant) - valueOf(a, variant);
      const ea = a.e[variant] ?? 9999;
      const eb = b.e[variant] ?? 9999;
      return ea - eb;
    });
    return sorted.slice(0, 120);
  }, [available, query, posFilter, myTurn, variant]);

  // ---- mutations --------------------------------------------------------
  const draftPlayer = useCallback(
    (player: Player) => {
      if (complete) return;
      setPicks((prev) => [
        ...prev,
        {
          pick: prev.length + 1,
          slot: slotOnClock(prev.length + 1, meta.teams),
          id: player.i,
          pos: player.p,
        },
      ]);
      setQuery('');
      // Keep focus on the search box so a keyboard user can type the next
      // name immediately without reaching for the mouse.
      searchRef.current?.focus();
    },
    [complete, meta.teams],
  );

  const undo = useCallback(() => setPicks((prev) => prev.slice(0, -1)), []);

  const reset = useCallback(() => {
    if (window.confirm('Clear the entire draft and start over?')) setPicks([]);
  }, []);

  // Enter takes the top row of the current filter — the fast path when a
  // name has been typed and there is exactly one plausible match.
  const onSearchKey = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && listed[0]) {
        e.preventDefault();
        draftPlayer(listed[0]);
      } else if (e.key === 'Escape') {
        setQuery('');
      }
    },
    [listed, draftPlayer],
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing = target && /^(INPUT|TEXTAREA)$/.test(target.tagName);
      if (e.key === '/' && !typing) {
        e.preventDefault();
        searchRef.current?.focus();
      } else if ((e.key === 'z' || e.key === 'Z') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        undo();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [undo]);

  const positions = ['RB', 'WR', 'TE', 'QB', 'K', 'DEF'];
  const lastPick = picks[picks.length - 1];
  const lastPlayer = lastPick ? byId.get(lastPick.id) : undefined;

  return (
    <div className="fdc">
      <style dangerouslySetInnerHTML={{ __html: CONSOLE_CSS }} />

      <header className="fdc-head">
        <div className="fdc-headrow">
          <span className="fdc-pick">
            {complete ? 'Draft complete' : `Pick ${pickNumber}`}
          </span>
          {!complete && <span className="fdc-dim">R{round}</span>}
          {complete ? null : myTurn ? (
            <span className="fdc-badge fdc-up">YOU&rsquo;RE UP</span>
          ) : (
            <span className="fdc-badge fdc-wait">
              {picksUntilMine == null
                ? 'no picks left'
                : `${picksUntilMine} until you`}
            </span>
          )}
          <div className="fdc-spacer" />
          <div className="fdc-toggle" role="group" aria-label="Scoring">
            {meta.variants.map((v) => (
              <button
                key={v}
                className={v === variant ? 'on' : ''}
                onClick={() => setVariant(v)}
                title={`${v} points per reception`}
              >
                {v} PPR
              </button>
            ))}
          </div>
          <button className="fdc-ghost" onClick={undo} disabled={!picks.length}>
            Undo
          </button>
        </div>

        <div className="fdc-search">
          <input
            ref={searchRef}
            type="search"
            value={query}
            placeholder="Tap a player to record the pick — or type a name"
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onSearchKey}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />
        </div>

        <div className="fdc-chips">
          <button
            className={posFilter === null ? 'on' : ''}
            onClick={() => setPosFilter(null)}
          >
            All
          </button>
          {positions.map((p) => (
            <button
              key={p}
              className={posFilter === p ? 'on' : ''}
              onClick={() => setPosFilter(posFilter === p ? null : p)}
            >
              {p}
            </button>
          ))}
          <div className="fdc-spacer" />
          <button className={showRoster ? 'on' : ''} onClick={() => setShowRoster((s) => !s)}>
            My team ({myPicks.length})
          </button>
        </div>
      </header>

      <main className="fdc-body">
        {lastPick && lastPlayer && (
          <div className="fdc-last">
            Last in: <b>{lastPlayer.n}</b>{' '}
            <span className="fdc-dim">
              &middot; {lastPick.pos} &middot; pick {lastPick.pick} &middot;{' '}
              {lastPick.slot === meta.slot ? 'you' : `slot ${lastPick.slot}`}
            </span>
          </div>
        )}

        {showRoster && (
          <section className="fdc-panel">
            <h2>Your roster</h2>
            {myPicks.length === 0 && <div className="fdc-dim">No picks yet.</div>}
            {myPicks.map((p) => {
              const pl = byId.get(p.id);
              return (
                <div key={p.pick} className="fdc-rosterrow">
                  <span className={`fdc-pos p-${p.pos}`}>{p.pos}</span>
                  <span>{pl?.n ?? p.id}</span>
                  <span className="fdc-dim">
                    {pl?.t}
                    {pl?.b ? ` · bye ${pl.b}` : ''}
                  </span>
                  <span className="fdc-num fdc-dim">#{p.pick}</span>
                </div>
              );
            })}
            <div className="fdc-picksmap">
              {meta.my_picks.map((p) => (
                <span key={p} className={p >= pickNumber ? 'fdc-mine' : ''}>
                  {p}
                </span>
              ))}
            </div>
          </section>
        )}

        {myTurn && !complete && candidates.length > 0 && (
          <section className="fdc-panel fdc-rec">
            <h2>Take one of these &mdash; pick {pickNumber}</h2>
            {candidates.slice(0, 3).map((c, i) => (
              <button
                key={c.player.i}
                className={`fdc-reccard${i === 0 ? ' top' : ''}`}
                onClick={() => draftPlayer(c.player)}
              >
                <span className={`fdc-pos p-${c.player.p}`}>{c.player.p}</span>
                <span className="fdc-recmain">
                  <span className="fdc-recname">
                    {c.player.n}
                    {c.player.k[variant] ? (
                      <span className="fdc-dim"> · tier {c.player.k[variant]}</span>
                    ) : null}
                    <span className="fdc-dim">
                      {' '}
                      · {c.player.t}
                      {c.player.b ? ` · bye ${c.player.b}` : ''}
                    </span>
                  </span>
                  {c.reasons.length > 0 && (
                    <span className="fdc-why">{c.reasons.join(' · ')}</span>
                  )}
                </span>
                <span className="fdc-num">
                  <b>{c.value.toFixed(0)}</b>
                  <span className="fdc-dim"> VORP</span>
                </span>
              </button>
            ))}
          </section>
        )}

        <section className="fdc-panel">
          <h2>
            {myTurn ? 'Full board — best available' : 'Who just went?'}
            <span className="fdc-dim">
              {' '}
              · {available.length} left
              {query || posFilter ? ` · ${listed.length} shown` : ''}
            </span>
          </h2>
          <div className="fdc-list">
            {listed.map((p) => {
              const v = p.v[variant];
              const illegal = myTurn && !legalIds.has(p.i);
              return (
                <button
                  key={p.i}
                  className={`fdc-row${illegal ? ' dim' : ''}`}
                  onClick={() => draftPlayer(p)}
                >
                  <span className={`fdc-pos p-${p.p}`}>{p.p}</span>
                  <span className="fdc-name">
                    {p.n}
                    {p.w ? <span className="fdc-flag" title={p.w}>news</span> : null}
                    <span className="fdc-sub">
                      {p.t}
                      {p.b ? ` · bye ${p.b}` : ''}
                      {p.e[variant] != null ? ` · ECR ${p.e[variant]!.toFixed(0)}` : ''}
                    </span>
                  </span>
                  <span className="fdc-num">
                    {v == null ? '—' : v.toFixed(0)}
                  </span>
                </button>
              );
            })}
            {listed.length === 0 && (
              <div className="fdc-dim fdc-empty">No player matches that search.</div>
            )}
          </div>
        </section>

        <footer className="fdc-foot">
          <span>
            {meta.league} · slot {meta.slot}/{meta.teams} · {meta.rounds} rounds
          </span>
          <span>
            board {meta.fingerprints[variant]} · built{' '}
            {new Date(meta.generated_at).toLocaleString()}
          </span>
          <button className="fdc-ghost" onClick={reset}>
            Reset draft
          </button>
        </footer>
      </main>
    </div>
  );
}
