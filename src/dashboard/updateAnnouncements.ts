import type { UnixTimestamp } from '../common/base';

/**
 * Update posts come in two kinds, and people opt into them separately: a
 * server owner may want release notes but not announcements, or the reverse.
 */
export const UPDATE_CATEGORIES = ['changelog', 'product'] as const;

export type UpdateCategory = (typeof UPDATE_CATEGORIES)[number];

export function isUpdateCategory(value: unknown): value is UpdateCategory {
  return (UPDATE_CATEGORIES as readonly string[]).includes(value as string);
}

export const UPDATE_CATEGORY_LABELS: Record<UpdateCategory, string> = {
  changelog: 'Changelog',
  product: 'Product update',
};

/**
 * Per-category delivery preference.
 *
 * Replaces a single `enabled` flag. Stored preferences written before the
 * split carry only that flag, so readers must treat it as the value for both
 * categories rather than dropping someone's opt-out.
 */
export interface UpdateAnnouncementPreference {
  changelog: boolean;
  product: boolean;
  updatedAt: UnixTimestamp | null;
}

export interface GetUpdateAnnouncementPreferenceResponse {
  preference: UpdateAnnouncementPreference;
}

export interface UpdateAnnouncementPreferenceRequest {
  /** Categories omitted from the request keep their current value. */
  changelog?: boolean;
  product?: boolean;
}

export interface UpdateAnnouncementPreferenceResponse {
  preference: UpdateAnnouncementPreference;
}

export interface AnnounceUpdateRequest {
  updateId: string;
  category: UpdateCategory;
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
