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
