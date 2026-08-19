/**
 * Public API route registry.
 *
 * Versioned in the path. A breaking change means a new prefix, never an edit
 * to an existing one.
 */
export const PUBLIC_API_ROUTES = {
  guilds: '/v1/guilds',
  guild: (guildId: string) => `/v1/guilds/${encodeURIComponent(guildId)}`,
  guildStats: (guildId: string) => `/v1/guilds/${encodeURIComponent(guildId)}/stats`,
  progressionLeaderboard: (guildId: string) =>
    `/v1/guilds/${encodeURIComponent(guildId)}/progression/leaderboard`,
  progressionMember: (guildId: string, userId: string) =>
    `/v1/guilds/${encodeURIComponent(guildId)}/progression/members/${encodeURIComponent(userId)}`,
  ticketAnalytics: (guildId: string) =>
    `/v1/guilds/${encodeURIComponent(guildId)}/tickets/analytics`,
} as const;
