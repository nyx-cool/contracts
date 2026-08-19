export type UnixTimestamp = number;

export interface GuildSummary {
  id: string;
  name: string;
  iconUrl?: string | null;
}

export interface GuildConfigSnapshot {
  guildId: string;
  language: string;
  settings: Record<string, unknown>;
  enabledPlugins: string[];
}

export interface BotIdentity {
  name: string;
  avatarUrl: string | null;
}

export interface PluginStatus {
  name: string;
  description: string;
  required: boolean;
  enabled: boolean;
  commands: PluginCommandStatus[];
}

export const PLUGIN_DISABLED_COMMANDS_SETTINGS_KEY = 'disabledPluginCommands';
export const EMBED_BRANDING_SETTINGS_KEY = 'embedBranding';

export type PluginCommandKind = 'slash' | 'user_context' | 'message_context';

export interface PluginCommandStatus {
  key: string;
  name: string;
  description: string;
  kind: PluginCommandKind;
  disabled: boolean;
  toggleable: boolean;
}

export interface GuildEmbedBrandingConfig {
  brandName: string;
  footerIconUrl: string | null;
}

/**
 * Per-plugin embed appearance.
 *
 * `footerText` is a nyx+ feature on every plugin that has one: the dashboard
 * gates the field and the bot falls back to the plugin default when the guild
 * is not premium, so a lapsed subscription reverts appearance rather than
 * silently keeping it. `color` carries no such gate.
 */
export interface PluginEmbedStyleConfig {
  color: number | null;
  footerText: string | null;
}

/** For plugins whose colours carry meaning and must not be overridden. */
export interface PluginEmbedFooterConfig {
  footerText: string | null;
}

export interface GuildRoleSummary {
  id: string;
  name: string;
  color: number;
  position: number;
  managed: boolean;
  mentionable: boolean;
}

export interface GuildChannelSummary {
  id: string;
  name: string;
  type: number;
  parentId: string | null;
  botPermissions: string | null;
}

export interface ApiErrorBody {
  code: string;
  message: string;
}
