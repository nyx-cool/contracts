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
  /** Viewing is gated to premium guilds; false → `metrics` is empty. */
  premiumActive: boolean;
  /** Enabled plugins, so the dashboard can show only relevant sections. */
  enabledPlugins: string[];
  /** Current member count (point-in-time). */
  memberCount: number;
  windowDays: number;
  metrics: GuildStatisticSeries[];
}
