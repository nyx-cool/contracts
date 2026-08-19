import type { BotIdentity, GuildChannelSummary, PluginEmbedStyleConfig } from '../common/base';

/**
 * What the bot does to a member that posts in a honeypot (trap) channel.
 * - `ban`: permanent ban, deleting their recent messages.
 * - `softban`: ban + immediate unban (removes the member and purges their recent messages).
 * - `kick`: kick the member (no message purge).
 * - `timeout`: time the member out for `timeoutMinutes`.
 */
export type HoneypotAction = 'ban' | 'softban' | 'kick' | 'timeout';

export interface HoneypotWarningConfig {
  /** Whether the bot maintains a notice message inside each trap channel. */
  enabled: boolean;
  /** Custom warning text; empty string uses the built-in default. */
  message: string;
}

export interface HoneypotGuildConfig {
  /** Appearance of the offender DM and trap warning embeds. */
  embed: PluginEmbedStyleConfig;
  /** Feature master switch (independent of whether the plugin itself is enabled). */
  enabled: boolean;
  /** Trap channels - any human message here triggers moderation. */
  channelIds: string[];
  /** Action applied to offenders. */
  action: HoneypotAction;
  /** Channel that receives moderation log messages, if any. */
  logChannelId: string | null;
  /** Never punish the guild owner or members with admin/manage-guild. */
  skipAdmins: boolean;
  /** DM the offender before removing them. */
  dmOffender: boolean;
  /** Only purge the last 15 minutes of messages instead of the last hour (ban/softban). */
  onlyRecentDelete: boolean;
  /** Timeout duration in minutes, used when `action` is `timeout`. */
  timeoutMinutes: number;
  /** Trap-channel notice message configuration. */
  warning: HoneypotWarningConfig;
  /** Custom DM text sent to offenders; empty string uses the default. */
  dmMessage: string;
  /** Custom log message text; empty string uses the default. */
  logMessage: string;
}

export interface HoneypotStats {
  /** Total members moderated across the guild. */
  totalModerated: number;
  /** Moderated count keyed by trap channel id. */
  perChannel: Record<string, number>;
}

export interface GetGuildHoneypotResponse {
  guildId: string;
  bot: BotIdentity;
  guildConfig: HoneypotGuildConfig;
  channels: GuildChannelSummary[];
  stats: HoneypotStats;
  premiumActive: boolean;
}

export interface UpdateGuildHoneypotRequest {
  guildConfig?: HoneypotGuildConfig;
}

export interface UpdateGuildHoneypotResponse {
  guildId: string;
  guildConfig: HoneypotGuildConfig;
  stats: HoneypotStats;
}
