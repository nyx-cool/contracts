import type { BotIdentity, GuildChannelSummary, PluginEmbedFooterConfig } from '../common/base';

export interface StarboardGuildConfig {
  channelId: string | null;
  threshold: number;
  embedColor: number | null;
  countSelfStars: boolean;
  /** Footer on the starred-message embed. Colour stays `embedColor`. */
  embedFooter: PluginEmbedFooterConfig;
}

export interface GetGuildStarboardResponse {
  guildId: string;
  bot: BotIdentity;
  guildConfig: StarboardGuildConfig;
  channels: GuildChannelSummary[];
  /** Gates the embed footer field, which is a nyx+ feature. */
  premiumActive: boolean;
}

export interface UpdateGuildStarboardRequest {
  guildConfig?: StarboardGuildConfig;
}

export interface UpdateGuildStarboardResponse {
  guildId: string;
  guildConfig: StarboardGuildConfig;
}
