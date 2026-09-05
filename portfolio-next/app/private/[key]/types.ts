/** Shape of the bundle written by `python -m fantasy.export`.
 *
 * Keys are single characters because this payload is fetched at the one
 * moment in the season when latency is least affordable; see the docstring
 * in `fantasy/export/bundle.py` for the full rationale.
 */

export type VariantKey = string;

export interface Player {
  i: string; // player_id
  n: string; // name
  p: string; // position
  t: string; // team
  b: number | null; // bye week
  g: number | null; // expected games played
  v: Record<VariantKey, number | null>; // availability-priced VORP
  e: Record<VariantKey, number | null>; // expert consensus rank
  s: Record<VariantKey, number | null>; // sd of consensus rank
  k: Record<VariantKey, number | null>; // tier
  c?: string; // qualitative context note
  w?: string; // news headline
  x?: string; // news status
  d?: number; // news-implied change in games available
}

export interface Meta {
  generated_at: string;
  league: string;
  verified: boolean;
  teams: number;
  rounds: number;
  slot: number;
  pick_seconds: number | null;
  draft_datetime: string | null;
  my_picks: number[];
  variants: VariantKey[];
  default_variant: VariantKey;
  fingerprints: Record<VariantKey, string>;
  caps: Record<string, number>;
  streamable: string[];
  roster: Record<string, number>;
  flex: string[];
  n_players: number;
}

export interface Bundle {
  meta: Meta;
  players: Player[];
}
