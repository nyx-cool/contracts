import type { GuildChannelSummary, PluginEmbedFooterConfig } from '../common/base';

export interface LoggingMessagesEventsConfig {
  edits: boolean;
  deletes: boolean;
  bulkDeletes: boolean;
  linkTracking: boolean;
  attachmentTracking: boolean;
  pins: boolean;
}

export interface LoggingMembersEventsConfig {
  joins: boolean;
  leaves: boolean;
  kicks: boolean;
  bans: boolean;
  unbans: boolean;
  timeout: boolean;
  nicknameChanges: boolean;
  usernameChanges: boolean;
  avatarChanges: boolean;
}

export interface LoggingRolesEventsConfig {
  memberRoleChanges: boolean;
  created: boolean;
  updated: boolean;
  deleted: boolean;
}

export interface LoggingChannelsEventsConfig {
  created: boolean;
  deleted: boolean;
  updated: boolean;
  permissionChanges: boolean;
  webhookChanges: boolean;
}

export interface LoggingThreadsEventsConfig {
  created: boolean;
  deleted: boolean;
  updated: boolean;
  archived: boolean;
}

export interface LoggingVoiceEventsConfig {
  joins: boolean;
  leaves: boolean;
  moves: boolean;
  muteDeafen: boolean;
}

export interface LoggingServerEventsConfig {
  settingsChanges: boolean;
  emojiStickerChanges: boolean;
  boostEvents: boolean;
}

export interface LoggingModuleConfig<TEvents> {
  enabled: boolean;
  channelId: string | null;
  events: TEvents;
}

export interface LoggingGuildConfig {
  /**
   * Footer only. Log embed colours encode severity (red for deletions,
   * green for joins) and stay fixed so a channel can be scanned by colour.
   */
  embedFooter: PluginEmbedFooterConfig;
  enabled: boolean;
  defaultChannelId: string | null;
  modules: {
    messages: LoggingModuleConfig<LoggingMessagesEventsConfig>;
    members: LoggingModuleConfig<LoggingMembersEventsConfig>;
    roles: LoggingModuleConfig<LoggingRolesEventsConfig>;
    channels: LoggingModuleConfig<LoggingChannelsEventsConfig>;
    threads: LoggingModuleConfig<LoggingThreadsEventsConfig>;
    voice: LoggingModuleConfig<LoggingVoiceEventsConfig>;
    server: LoggingModuleConfig<LoggingServerEventsConfig>;
  };
}

export interface GetGuildLoggingResponse {
  guildId: string;
  guildConfig: LoggingGuildConfig;
  channels: GuildChannelSummary[];
  /** Gates the embed footer field, which is a nyx+ feature. */
  premiumActive: boolean;
}

export interface UpdateGuildLoggingRequest {
  guildConfig?: LoggingGuildConfig;
}

export interface UpdateGuildLoggingResponse {
  guildId: string;
  guildConfig: LoggingGuildConfig;
}
