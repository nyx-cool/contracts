import type { GuildChannelSummary } from '../common/base';

export interface WelcomeEmbedConfig {
  title: string;
  description: string;
  color: number | null;
  footerText: string | null;
  thumbnailUrl: string | null;
  imageUrl: string | null;
}

export interface WelcomeGuildConfig {
  welcomeEnabled: boolean;
  welcomeChannelId: string | null;
  welcomeMessage: string;
  welcomeEmbed: WelcomeEmbedConfig | null;
  farewellEnabled: boolean;
  farewellChannelId: string | null;
  farewellMessage: string;
  farewellEmbed: WelcomeEmbedConfig | null;
}

export interface WelcomeLocalizedDefaults {
  welcomeMessage: string;
  farewellMessage: string;
  welcomeEmbedTitle: string;
  welcomeEmbedDescription: string;
  farewellEmbedTitle: string;
  farewellEmbedDescription: string;
}

export interface GetGuildWelcomeResponse {
  guildId: string;
  guildConfig: WelcomeGuildConfig;
  localizedDefaults: WelcomeLocalizedDefaults;
  channels: GuildChannelSummary[];
}

export interface UpdateGuildWelcomeRequest {
  guildConfig?: WelcomeGuildConfig;
}

export interface UpdateGuildWelcomeResponse {
  guildId: string;
  guildConfig: WelcomeGuildConfig;
}

/**
 * Posts one welcome or farewell message built from `guildConfig` (the
 * dashboard's unsaved draft) as if the requesting actor had just joined or
 * left. Nothing is saved.
 */
export interface SendGuildWelcomeTestRequest {
  kind: 'welcome' | 'farewell';
  guildConfig: WelcomeGuildConfig;
}

export interface SendGuildWelcomeTestResponse {
  channelId: string;
  messageId: string;
}
