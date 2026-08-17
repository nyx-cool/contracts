import type { GuildConfigSnapshot, GuildSummary, PluginStatus, UnixTimestamp } from '../common/base';
import type { GuildAccessLevel } from './enforcement';

export interface ListGuildsResponse {
  guilds: GuildSummary[];
}

export interface DashboardGuildSummary extends GuildSummary {
  accessLevel: GuildAccessLevel;
  ownerDiscordId?: string;
  ownerDisplayName?: string;
  premiumActive: boolean;
  premiumOverrideActive: boolean;
  userPermissions: string;
  userOwnsGuild: boolean;
  userIsBotMaster: boolean;
  description?: string | null;
  bannerUrl?: string | null;
  splashUrl?: string | null;
  preferredLocale?: string | null;
  verificationLevel: number;
  premiumTier: number;
  premiumSubscriptionCount: number;
  memberCount: number;
  /** Members the bot can see that are bots. Humans ≈ memberCount − botCount. */
  botCount: number;
  roleCount: number;
  channelCount: number;
  features: string[];
  joinedTimestamp?: UnixTimestamp | null;
}

export interface ListDashboardGuildsResponse {
  guilds: DashboardGuildSummary[];
}

export interface DeveloperPluginUsageStat {
  pluginName: string;
  enabledGuildCount: number;
}

export interface DeveloperTopGuildStat {
  id: string;
  name: string;
  memberCount: number;
  channelCount: number;
  roleCount: number;
  premiumActive: boolean;
}

export interface DeveloperGuildInventoryStat {
  id: string;
  name: string;
  memberCount: number;
  channelCount: number;
  roleCount: number;
  premiumActive: boolean;
  premiumOverrideActive: boolean;
  enabledPluginCount: number;
  enabledPlugins: string[];
}

export interface DeveloperAnalyticsSummary {
  totalGuilds: number;
  totalMembers: number;
  totalChannels: number;
  totalRoles: number;
  uniqueGuildOwners: number;
  totalPayingSubscribers: number;
  totalPremiumActiveGuilds: number;
  totalPremiumOverrideGuilds: number;
}

export interface DeveloperCommandStat {
  commandName: string;
  plugin: string | null;
  count: number;
  successCount: number;
  errorCount: number;
}

export interface DeveloperCommandDailyPoint {
  /** UTC calendar day, YYYY-MM-DD. */
  day: string;
  count: number;
}

export interface DeveloperCommandAnalytics {
  /** Size of the aggregation window in days. */
  windowDays: number;
  totalCommands: number;
  /** Success rate as a 0–100 percentage. */
  successRate: number;
  errorCount: number;
  averageExecutionMs: number;
  topCommands: DeveloperCommandStat[];
  /** One point per day across the window (zero-filled). */
  daily: DeveloperCommandDailyPoint[];
}

export interface GetDeveloperAnalyticsResponse {
  generatedAt: UnixTimestamp;
  uptimeSeconds: number;
  wsPingMs: number;
  summary: DeveloperAnalyticsSummary;
  pluginUsage: DeveloperPluginUsageStat[];
  topGuildsByMembers: DeveloperTopGuildStat[];
  commandAnalytics: DeveloperCommandAnalytics;
}

export interface ListDeveloperGuildInventoryResponse {
  generatedAt: UnixTimestamp;
  page: number;
  pageSize: number;
  total: number;
  guilds: DeveloperGuildInventoryStat[];
}

export interface ControlPlaneHealthResponse {
  ok: true;
  startedAt: UnixTimestamp;
}

export interface DashboardMaintenanceState {
  enabled: boolean;
  updatedAt: UnixTimestamp | null;
  updatedByDiscordId: string | null;
}

export interface GetDashboardMaintenanceResponse {
  maintenance: DashboardMaintenanceState;
}

export interface UpdateDashboardMaintenanceRequest {
  enabled: boolean;
}

export interface UpdateDashboardMaintenanceResponse {
  maintenance: DashboardMaintenanceState;
}

export interface GetGuildConfigResponse {
  config: GuildConfigSnapshot;
}

export interface GuildControlStateResponse {
  guildId: string;
  config: GuildConfigSnapshot;
  plugins: PluginStatus[];
}

export interface UpdateGuildConfigRequest {
  language?: string;
  settings?: Record<string, unknown>;
  enabledPlugins?: string[];
}

export interface UpdateGuildConfigResponse {
  config: GuildConfigSnapshot;
}

export interface ListGuildPluginsResponse {
  plugins: PluginStatus[];
}
