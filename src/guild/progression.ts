import type { BotIdentity, GuildChannelSummary, GuildRoleSummary, PluginEmbedStyleConfig, UnixTimestamp } from '../common/base';
import type { PluginDiagnosticState } from '../common/diagnostics';

export const PROGRESSION_SETTINGS_KEY = 'progression';

export type ProgressionEligibleChannelMode = 'all' | 'include' | 'exclude';
export type ProgressionRewardRoleMode = 'stack' | 'highest_only';

export interface ProgressionRewardRoleConfig {
  level: number;
  roleId: string;
}

export interface ProgressionAnnouncementConfig {
  enabled: boolean;
  channelId: string | null;
  template: string;
  deleteAfterSeconds: number | null;
}

export interface ProgressionGuildConfig {
  /** Appearance of level-up and rank embeds. */
  embed: PluginEmbedStyleConfig;
  xpEnabled: boolean;
  xpMinGain: number;
  xpMaxGain: number;
  xpCooldownSeconds: number;
  eligibleChannelMode: ProgressionEligibleChannelMode;
  eligibleChannelIds: string[];
  rewardRoleMode: ProgressionRewardRoleMode;
  rewardRoles: ProgressionRewardRoleConfig[];
  announcement: ProgressionAnnouncementConfig;
  publicLeaderboard: boolean;
}

export interface ProgressionLocalizedDefaults {
  announcementTemplate: string;
}

export interface ProgressionMemberState {
  guildId: string;
  userId: string;
  totalXp: number;
  level: number;
  currentLevelXp: number;
  nextLevelXp: number;
  qualifyingMessageCount: number;
  lastXpAwardedAt: UnixTimestamp | null;
  lastAnnouncedLevel: number;
  updatedAt: UnixTimestamp | null;
}

export interface ProgressionLeaderboardEntry {
  userId: string;
  displayName: string;
  avatarUrl: string | null;
  level: number;
  totalXp: number;
  rank: number;
}

export interface ProgressionPublicLeaderboardEntry {
  rank: number;
  displayName: string;
  avatarUrl: string | null;
  roleName: string | null;
  roleColor: string | null;
  level: number;
  totalXp: number;
  /** Progress toward the next level, 0-100. */
  levelProgressPercent: number;
}

export interface ProgressionPublicLeaderboardStats {
  rankedMembers: number;
  totalXp: number;
  highestLevel: number;
}

export interface GetGuildProgressionLeaderboardResponse {
  guildId: string;
  guildName: string;
  guildIconUrl: string | null;
  stats: ProgressionPublicLeaderboardStats;
  entries: ProgressionPublicLeaderboardEntry[];
}

export interface ProgressionAnnouncementPreviewData {
  userMention: string;
  username: string;
  level: number;
  xp: number;
  serverName: string;
  botAvatarUrl: string | null;
}

export interface ProgressionRankCardPreviewData {
  displayName: string;
  avatarUrl: string | null;
  level: number;
  totalXp: number;
  currentLevelXp: number;
  nextLevelXp: number;
  rank: number | null;
}

export interface GetGuildProgressionResponse {
  guildId: string;
  bot: BotIdentity;
  guildConfig: ProgressionGuildConfig;
  localizedDefaults: ProgressionLocalizedDefaults;
  channels: GuildChannelSummary[];
  roles: GuildRoleSummary[];
  diagnostics: PluginDiagnosticState | null;
  announcementPreview: ProgressionAnnouncementPreviewData;
  rankCardPreview: ProgressionRankCardPreviewData;
  /** Gates the embed footer field, which is a nyx+ feature. */
  premiumActive: boolean;
}

export interface UpdateGuildProgressionRequest {
  guildConfig?: ProgressionGuildConfig;
}

export interface UpdateGuildProgressionResponse {
  guildId: string;
  guildConfig: ProgressionGuildConfig;
}

/**
 * One member's progression, for an actor authorized on the guild.
 *
 * Distinct from `ProgressionPublicLeaderboardEntry`, which omits Discord user
 * ids because it is served to anyone. This shape is only ever returned to
 * someone who manages the guild, so it identifies members.
 */
export interface ProgressionMemberEntry {
  userId: string;
  rank: number;
  level: number;
  currentLevelXp: number;
  nextLevelXp: number;
  totalXp: number;
}

export interface ListGuildProgressionMembersResponse {
  guildId: string;
  /** Total ranked members, so callers can page without probing. */
  total: number;
  limit: number;
  offset: number;
  members: ProgressionMemberEntry[];
}
