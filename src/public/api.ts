/**
 * Public API (api.nyx.cool) payloads.
 *
 * Deliberately separate from the control-plane types. Those describe an
 * internal contract between the bot and the dashboard and change whenever
 * either side needs them to. These are published to third parties, so their
 * shape is a commitment: a field cannot be renamed or dropped without a new
 * API version.
 *
 * See nyx-bot/docs/superpowers/specs/2026-08-18-public-api-design.md.
 */

/** Prefix on every issued key, so leaked credentials are greppable. */
export const PUBLIC_API_KEY_PREFIX = 'nyx_live_';

/** Characters shown in the dashboard to identify a key without revealing it. */
export const PUBLIC_API_KEY_DISPLAY_LENGTH = 12;

/** Machine-readable failure reasons. Stable across a major API version. */
export type PublicApiErrorCode =
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'SUBSCRIPTION_INACTIVE'
  | 'NOT_FOUND'
  | 'PLUGIN_DISABLED'
  | 'RATE_LIMITED'
  | 'UPSTREAM_UNAVAILABLE';

export interface PublicApiError {
  code: PublicApiErrorCode;
  message: string;
}

export interface PublicGuildSummary {
  id: string;
  name: string;
  iconUrl: string | null;
  memberCount: number;
  /** Plugins currently enabled, which determines what else is readable. */
  enabledPlugins: string[];
}

export interface ListPublicGuildsResponse {
  guilds: PublicGuildSummary[];
}

export interface GetPublicGuildResponse {
  guild: PublicGuildSummary;
}

/** One day of one metric. `day` is an ISO date, `YYYY-MM-DD`. */
export interface PublicStatPoint {
  day: string;
  count: number;
}

export interface PublicStatSeries {
  metric: string;
  total: number;
  daily: PublicStatPoint[];
}

export interface GetPublicGuildStatsResponse {
  guildId: string;
  /** Echoed back so a caller can confirm what the server actually applied. */
  from: string;
  to: string;
  series: PublicStatSeries[];
}

export interface PublicProgressionMember {
  userId: string;
  rank: number;
  level: number;
  xp: number;
  totalXp: number;
}

export interface ListPublicProgressionResponse {
  guildId: string;
  total: number;
  limit: number;
  offset: number;
  members: PublicProgressionMember[];
}

export interface GetPublicProgressionMemberResponse {
  guildId: string;
  member: PublicProgressionMember;
}

/** Hard caps, published so callers can page correctly without guessing. */
export const PUBLIC_API_LIMITS = {
  /** Maximum members returned by one leaderboard page. */
  progressionPageSize: 100,
  /** Maximum days spanned by one statistics query. */
  statsRangeDays: 365,
  /** Requests per minute per key. */
  requestsPerMinute: 60,
  /** Requests per day per key. */
  requestsPerDay: 10_000,
} as const;
