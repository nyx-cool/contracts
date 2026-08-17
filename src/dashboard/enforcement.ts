import type { UnixTimestamp } from '../common/base';

export type GuildAccessLevel = 'observe' | 'manage';
export type GuildEnforcementStatus = 'suspending' | 'suspended';
export type GuildEnforcementAction =
  | 'suspended'
  | 'restored'
  | 'notice_delivered'
  | 'notice_failed';
export type EnforcementNoticeDestination =
  | 'restricted_channel'
  | 'system_channel'
  | 'rules_channel'
  | 'public_updates_channel'
  | 'fallback_channel'
  | 'owner_dm';

export interface GuildEnforcementState {
  guildId: string;
  status: GuildEnforcementStatus;
  publicReason: string;
  internalReference: string | null;
  enforcedByDiscordId: string;
  enforcedAt: UnixTimestamp;
  updatedAt: UnixTimestamp;
}

export interface GuildEnforcementEvent {
  id: string;
  guildId: string;
  action: GuildEnforcementAction;
  actorDiscordId: string | null;
  publicReason: string | null;
  privateReason: string | null;
  internalReference: string | null;
  destination: EnforcementNoticeDestination | null;
  destinationId: string | null;
  failureSummary: string | null;
  createdAt: UnixTimestamp;
}

export interface GetEnforcementCapabilityResponse {
  canEnforce: boolean;
}

export interface GetGuildEnforcementResponse {
  guildId: string;
  state: GuildEnforcementState | null;
  events: GuildEnforcementEvent[];
}

export interface SuspendGuildRequest {
  publicReason: string;
  privateReason: string;
  internalReference?: string;
}

export interface RestoreGuildRequest {
  reason: string;
}

export interface UpdateGuildEnforcementResponse {
  guildId: string;
  state: GuildEnforcementState | null;
  event: GuildEnforcementEvent;
}
