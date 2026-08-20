import type { UnixTimestamp } from '../common/base';

/**
 * Universal per-guild metrics captured by the statistics collector, independent
 * of which plugins are enabled. Single source of truth shared by bot + web.
 */
export const GUILD_STATISTIC_METRIC_KEYS = [
  'member_join',
  'member_leave',
  'member_kick',
  'member_ban',
  'member_unban',
  'member_timeout',
  'message_sent',
  'message_deleted',
  'message_edited',
  'voice_join',
  'boost',
] as const;

export type GuildStatisticMetricKey = (typeof GUILD_STATISTIC_METRIC_KEYS)[number];

/**
 * How much history a guild can view. Collection is never gated: the collector
 * records for every guild, so a guild that upgrades sees the history it already
 * accrued rather than starting from zero. Only the visible window differs.
 */
export const FREE_GUILD_STATISTICS_WINDOW_DAYS = 7;
export const PREMIUM_GUILD_STATISTICS_WINDOW_DAYS = 30;

export interface StatisticDailyPoint {
  /** UTC calendar day, YYYY-MM-DD. */
  day: string;
  count: number;
}

export interface GuildStatisticSeries {
  key: GuildStatisticMetricKey;
  total: number;
  /** One point per day across the window (zero-filled). */
  daily: StatisticDailyPoint[];
}

export interface GetGuildStatisticsResponse {
  guildId: string;
  generatedAt: UnixTimestamp;
  /** False narrows `windowDays` to the free window; `metrics` is still populated. */
  premiumActive: boolean;
  /** Enabled plugins, so the dashboard can show only relevant sections. */
  enabledPlugins: string[];
  /** Current member count (point-in-time). */
  memberCount: number;
  /** Days of history in `metrics`, already narrowed for non-premium guilds. */
  windowDays: number;
  /** Days a nyx+ guild sees, so the dashboard can name what upgrading buys. */
  fullWindowDays: number;
  metrics: GuildStatisticSeries[];
}
