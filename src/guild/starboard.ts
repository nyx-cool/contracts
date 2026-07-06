import type { BotIdentity, GuildChannelSummary } from '../common/base';

export interface StarboardGuildConfig {
  channelId: string | null;
  threshold: number;
  embedColor: number | null;
  countSelfStars: boolean;
}

export interface GetGuildStarboardResponse {
  guildId: string;
  bot: BotIdentity;
  guildConfig: StarboardGuildConfig;
  channels: GuildChannelSummary[];
}

export interface UpdateGuildStarboardRequest {
  guildConfig?: StarboardGuildConfig;
}

export interface UpdateGuildStarboardResponse {
  guildId: string;
  guildConfig: StarboardGuildConfig;
}
