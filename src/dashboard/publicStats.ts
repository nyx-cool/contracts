/**
 * Public-facing stats payload exposed by the web app at
 * `GET /api/public-stats`. Intended for unauthenticated, cross-origin
 * consumers (e.g. the portfolio site). Derived from the bot's internal
 * `GetDeveloperAnalyticsResponse` - intentionally minimal so internal
 * shape changes don't leak into public consumers.
 */
export interface GetPublicStatsResponse {
  /** Whether the bot's control plane responded successfully. */
  online: boolean;
  /** Bot process uptime in milliseconds. `0` when offline. */
  uptimeMs: number;
  /** Total guilds the bot is currently in. `0` when offline. */
  servers: number;
  /** Total members across all guilds. `0` when offline. */
  users: number;
  /**
   * ISO-8601 timestamp of the snapshot's `generatedAt`. `null` when the
   * bot is offline and no snapshot is available from the current request.
   */
  lastSeen: string | null;
}
