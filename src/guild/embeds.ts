import type { BotIdentity, GuildChannelSummary } from '../common/base';

export const FREE_GUILD_EMBED_TEMPLATE_LIMIT = 5;
export const FREE_GUILD_EMBED_SCHEDULE_TIMES_PER_DAY_LIMIT = 1;

export type GuildEmbedScheduleDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface GuildEmbedScheduleConfig {
  enabled: boolean;
  timezone: string;
  channelId: string | null;
  daysOfWeek: GuildEmbedScheduleDay[];
  times: string[];
}

export interface GuildEmbedFieldConfig {
  id: string;
  name: string;
  value: string;
  inline: boolean;
}

export type GuildEmbedButtonStyle = 'primary' | 'secondary' | 'success' | 'danger' | 'link';

export interface GuildEmbedButtonConfig {
  id: string;
  label: string;
  style: GuildEmbedButtonStyle;
  emoji: string | null;
  url: string | null;
  customId: string | null;
  disabled: boolean;
}

export type GuildEmbedUsageContext = 'general' | 'tickets' | 'anti_ping';

export interface GuildEmbedTemplate {
  id: string;
  name: string;
  usageContexts: GuildEmbedUsageContext[];
  schedule: GuildEmbedScheduleConfig;
  messageContent: string;
  authorName: string | null;
  title: string;
  description: string;
  color: number | null;
  footerText: string | null;
  imageUrl: string | null;
  thumbnailUrl: string | null;
  includeTimestamp: boolean;
  fields: GuildEmbedFieldConfig[];
  buttons: GuildEmbedButtonConfig[];
}

export interface GetGuildEmbedsResponse {
  guildId: string;
  bot: BotIdentity;
  templates: GuildEmbedTemplate[];
  channels: GuildChannelSummary[];
  premiumActive: boolean;
}

export interface UpdateGuildEmbedsRequest {
  templates?: GuildEmbedTemplate[];
}

export interface UpdateGuildEmbedsResponse {
  guildId: string;
  templates: GuildEmbedTemplate[];
}

export interface SendGuildEmbedMessageRequest {
  channelId: string;
  template: GuildEmbedTemplate;
}

export interface SendGuildEmbedMessageResponse {
  guildId: string;
  channelId: string;
  messageId: string;
}
