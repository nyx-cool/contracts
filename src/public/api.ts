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
  /**
   * Whether nyx+ is active on this server. The list endpoint includes owned
   * servers without nyx+ with this flag false, rather than hiding them, so a
   * missing subscription is visible instead of looking like a missing server.
   */
  premiumActive: boolean;
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
  /** Live keys one owner may hold at once. */
  keysPerOwner: 5,
} as const;

/* ── Ticket queue ─────────────────────────────────────────────────── */

export interface PublicTicketQueueItem {
  channelId: string;
  channelName: string;
  categoryId: string;
  categoryName: string;
  /** Member who opened the ticket. In the caller's own server by definition. */
  openerId: string;
  claimerId: string | null;
  status: string;
  createdAt: number;
  lastActivityAt: number;
  ageSeconds: number;
}

export interface GetPublicTicketQueueResponse {
  guildId: string;
  summary: {
    totalOpen: number;
    unclaimed: number;
    responseOverdue: number;
    inactivityWarningDue: number;
    autoCloseDue: number;
  };
  queue: PublicTicketQueueItem[];
}

/* ── Honeypot ─────────────────────────────────────────────────────── */

export interface GetPublicHoneypotStatsResponse {
  guildId: string;
  /** Total members moderated across the guild since setup. */
  totalModerated: number;
  /** Moderated count keyed by trap channel id. */
  perChannel: Record<string, number>;
}

/* ── Diagnostics ──────────────────────────────────────────────────── */

export interface PublicPluginDiagnostic {
  plugin: string;
  status: 'healthy' | 'warning' | 'error';
  issues: Array<{
    code: string;
    severity: 'warning' | 'error';
    message: string;
  }>;
}

export interface GetPublicDiagnosticsResponse {
  guildId: string;
  summary: {
    totalIssues: number;
    warningCount: number;
    errorCount: number;
    affectedPluginCount: number;
  };
  plugins: PublicPluginDiagnostic[];
}

/* ── Key management ───────────────────────────────────────────────── */

/**
 * A key as the dashboard shows it. The secret itself appears exactly once,
 * in the create response, and is never retrievable afterwards - only the
 * prefix is stored in a readable form.
 */
export interface ApiKeySummary {
  id: string;
  name: string;
  /** Leading characters of the key, for telling keys apart in a list. */
  keyPrefix: string;
  createdAt: number;
  lastUsedAt: number | null;
}

export interface CreateApiKeyResult {
  summary: ApiKeySummary;
  /** Shown once, then unrecoverable. */
  key: string;
}

export const API_KEY_NAME_MAX_LENGTH = 40;
