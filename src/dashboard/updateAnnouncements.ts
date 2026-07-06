import type { UnixTimestamp } from '../common/base';

export interface UpdateAnnouncementPreference {
  enabled: boolean;
  updatedAt: UnixTimestamp | null;
}

export interface GetUpdateAnnouncementPreferenceResponse {
  preference: UpdateAnnouncementPreference;
}

export interface UpdateAnnouncementPreferenceRequest {
  enabled: boolean;
}

export interface UpdateAnnouncementPreferenceResponse {
  preference: UpdateAnnouncementPreference;
}

export interface AnnounceUpdateRequest {
  updateId: string;
  title: string;
  slug: string;
  summary: string;
  publishedAt: UnixTimestamp;
}

export interface UpdateAnnouncementDeliverySummary {
  updateId: string;
  totalOwners: number;
  sent: number;
  skippedDisabled: number;
  skippedAlreadyDelivered: number;
  failed: number;
}

export interface AnnounceUpdateResponse {
  announcement: UpdateAnnouncementDeliverySummary;
}
