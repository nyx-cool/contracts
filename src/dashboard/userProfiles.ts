/**
 * Live Discord profile lookup for arbitrary user ids.
 *
 * A profile captured at sign-in goes stale the moment someone changes their
 * avatar, because Discord avatar URLs embed a content hash. Anywhere the site
 * renders a user who is not the signed-in actor - update-post authors, for
 * instance - it needs the bot to resolve the current values from the gateway.
 */

export interface DiscordUserProfile {
  discordId: string;
  /** Current global display name, or null when the user cannot be resolved. */
  displayName: string | null;
  /** Current avatar URL, already normalised to a format the CDN always serves. */
  avatarUrl: string | null;
}

export interface GetUserProfilesResponse {
  profiles: DiscordUserProfile[];
}

/**
 * Upper bound on ids per request. Each unresolved id can cost a Discord REST
 * lookup, so the batch is capped rather than left to the caller.
 */
export const USER_PROFILES_MAX_IDS = 50;
