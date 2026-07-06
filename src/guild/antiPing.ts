import type { BotIdentity, GuildRoleSummary, UnixTimestamp } from '../common/base';

export type AntiPingAction = 'delete' | 'delete_reply' | 'keep_reply';

export interface AntiPingRolePolicy {
  roleId: string;
  action: AntiPingAction;
  replyMessage: string;
}

export interface AntiPingNoticeEmbedConfig {
  title: string;
  color: number | null;
  footerText: string | null;
}

export interface AntiPingGuildConfig {
  accessRoleIds: string[];
  defaultAction: AntiPingAction;
  defaultReplyMessage: string;
  rolePolicies: AntiPingRolePolicy[];
  noticeEmbed: AntiPingNoticeEmbedConfig;
}

export interface AntiPingUserPreference {
  enabled: boolean;
  action: AntiPingAction | null;
  replyMessage: string;
  updatedAt: UnixTimestamp | null;
}

export interface GetGuildAntiPingResponse {
  guildId: string;
  bot: BotIdentity;
  guildConfig: AntiPingGuildConfig;
  userPreference: AntiPingUserPreference;
  roles: GuildRoleSummary[];
  premiumActive: boolean;
}

export interface UpdateGuildAntiPingRequest {
  guildConfig?: AntiPingGuildConfig;
  userPreference?: {
    enabled?: boolean;
    action?: AntiPingAction | null;
    replyMessage?: string;
  };
}

export interface UpdateGuildAntiPingResponse {
  guildId: string;
  guildConfig: AntiPingGuildConfig;
  userPreference: AntiPingUserPreference;
}
