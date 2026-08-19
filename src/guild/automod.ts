import type { GuildChannelSummary, GuildRoleSummary, PluginEmbedStyleConfig, UnixTimestamp } from '../common/base';

export type AutomodTrigger = 'message_create' | 'member_join';

export type AutomodConditionGroupType = 'all' | 'any';

export interface AutomodConditionGroup {
  type: AutomodConditionGroupType;
  conditions: AutomodConditionNode[];
}

export interface AutomodScope {
  includeChannelIds: string[];
  excludeChannelIds: string[];
  includeCategoryIds: string[];
  excludeCategoryIds: string[];
  includeRoleIds: string[];
  excludeRoleIds: string[];
}

export interface AutomodExemptions {
  owner: boolean;
  administrators: boolean;
  botMasters: boolean;
  roleIds: string[];
  userIds: string[];
}

export interface AutomodMessageKeywordCondition {
  type: 'message_keyword_match';
  keywords: string[];
  caseSensitive: boolean;
}

export interface AutomodMessageRegexCondition {
  type: 'message_regex_match';
  pattern: string;
  flags: string;
}

export interface AutomodMessageInviteCondition {
  type: 'message_contains_invite';
}

export interface AutomodMessageUrlCondition {
  type: 'message_contains_url';
}

export interface AutomodMessageDomainCondition {
  type: 'message_domain_match';
  domains: string[];
}

export interface AutomodMessageAttachmentPresentCondition {
  type: 'message_has_attachment';
}

export interface AutomodMessageAttachmentExtensionCondition {
  type: 'message_attachment_extension_match';
  extensions: string[];
}

export interface AutomodMessageMentionCountCondition {
  type: 'message_mention_count_gte';
  count: number;
}

export interface AutomodMessageCapsRatioCondition {
  type: 'message_caps_ratio_gte';
  ratio: number;
  minimumLength: number;
}

export interface AutomodMessageDuplicateCondition {
  type: 'message_duplicate_count_gte';
  count: number;
  windowSeconds: number;
}

export interface AutomodMessageBurstCondition {
  type: 'message_count_gte';
  count: number;
  windowSeconds: number;
}

export interface AutomodMemberAccountAgeCondition {
  type: 'member_account_age_lt_minutes';
  minutes: number;
}

export interface AutomodMemberDefaultAvatarCondition {
  type: 'member_has_default_avatar';
}

export interface AutomodMemberUsernameRegexCondition {
  type: 'member_username_regex_match';
  pattern: string;
  flags: string;
}

export interface AutomodMemberJoinBurstCondition {
  type: 'member_join_burst_active';
  count: number;
  windowSeconds: number;
}

export type AutomodLeafCondition =
  | AutomodMessageKeywordCondition
  | AutomodMessageRegexCondition
  | AutomodMessageInviteCondition
  | AutomodMessageUrlCondition
  | AutomodMessageDomainCondition
  | AutomodMessageAttachmentPresentCondition
  | AutomodMessageAttachmentExtensionCondition
  | AutomodMessageMentionCountCondition
  | AutomodMessageCapsRatioCondition
  | AutomodMessageDuplicateCondition
  | AutomodMessageBurstCondition
  | AutomodMemberAccountAgeCondition
  | AutomodMemberDefaultAvatarCondition
  | AutomodMemberUsernameRegexCondition
  | AutomodMemberJoinBurstCondition;

export type AutomodConditionNode = AutomodConditionGroup | AutomodLeafCondition;

export interface AutomodDeleteMessageAction {
  type: 'delete_message';
}

export interface AutomodWarnAction {
  type: 'warn';
  reason: string;
}

export interface AutomodTimeoutAction {
  type: 'timeout';
  durationSeconds: number;
  reason: string;
}

export interface AutomodKickAction {
  type: 'kick';
  reason: string;
}

export interface AutomodBanAction {
  type: 'ban';
  reason: string;
  deleteMessageSeconds: number | null;
}

export interface AutomodDmUserAction {
  type: 'dm_user';
  message: string;
}

export interface AutomodLogAction {
  type: 'log';
  includeContext: boolean;
}

export interface AutomodIncrementCounterAction {
  type: 'increment_counter';
  key: string;
}

export interface AutomodEnableRaidModeAction {
  type: 'enable_raid_mode';
  reason: string;
}

export type AutomodAction =
  | AutomodDeleteMessageAction
  | AutomodWarnAction
  | AutomodTimeoutAction
  | AutomodKickAction
  | AutomodBanAction
  | AutomodDmUserAction
  | AutomodLogAction
  | AutomodIncrementCounterAction
  | AutomodEnableRaidModeAction;

export interface AutomodEscalation {
  key: string;
  threshold: number;
  windowSeconds: number;
  resetAfterSeconds: number | null;
  actions: AutomodAction[];
}

export interface AutomodRule {
  id: string;
  name: string;
  enabled: boolean;
  priority: number;
  trigger: AutomodTrigger;
  conditions: AutomodConditionGroup;
  actions: AutomodAction[];
  scope: AutomodScope;
  exemptions: AutomodExemptions;
  escalation: AutomodEscalation | null;
  terminal: boolean;
  createdAt: UnixTimestamp;
  updatedAt: UnixTimestamp;
}

export interface AutomodPreset {
  id: string;
  name: string;
  description: string;
  trigger: AutomodTrigger;
  rule: AutomodRule;
}

export interface AutomodRaidModeSettings {
  enabled: boolean;
  alertChannelId: string | null;
  slowmodeChannelIds: string[];
  slowmodeSeconds: number;
  autoExpireSeconds: number | null;
}

export interface AutomodRaidModeChannelSnapshot {
  channelId: string;
  previousSlowmodeSeconds: number;
}

export type AutomodRaidModeSource = 'manual' | 'automod';

export interface AutomodRaidModeState {
  active: boolean;
  activatedAt: UnixTimestamp | null;
  expiresAt: UnixTimestamp | null;
  source: AutomodRaidModeSource | null;
  reason: string | null;
  slowmodeSnapshots: AutomodRaidModeChannelSnapshot[];
}

export interface AutomodGuildConfig {
  enabled: boolean;
  logChannelId: string | null;
  raidMode: AutomodRaidModeSettings;
  rules: AutomodRule[];
  /** Appearance of the notice shown when a rule fires. */
  embed: PluginEmbedStyleConfig;
}

export interface GetGuildAutomodResponse {
  guildId: string;
  guildConfig: AutomodGuildConfig;
  raidModeState: AutomodRaidModeState;
  presets: AutomodPreset[];
  channels: GuildChannelSummary[];
  roles: GuildRoleSummary[];
  /** Gates the embed footer field, which is a nyx+ feature. */
  premiumActive: boolean;
}

export interface UpdateGuildAutomodRequest {
  guildConfig?: AutomodGuildConfig;
}

export interface UpdateGuildAutomodResponse {
  guildId: string;
  guildConfig: AutomodGuildConfig;
  raidModeState: AutomodRaidModeState;
}

export interface UpdateGuildAutomodRaidModeRequest {
  active: boolean;
  reason?: string | null;
}

export interface UpdateGuildAutomodRaidModeResponse {
  guildId: string;
  raidModeState: AutomodRaidModeState;
}
