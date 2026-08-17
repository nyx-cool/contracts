export interface GetDashboardActorCapabilitiesResponse {
  isOperator: boolean;
  /**
   * The actor's current Discord avatar URL, resolved by the bot.
   *
   * Discord avatar URLs embed a content hash, so a copy captured at sign-in
   * breaks the moment the user changes their avatar. The bot resolves this
   * live from the gateway, which keeps it correct without forcing a re-login.
   *
   * Optional so a dashboard build can run against a bot that predates this
   * field; consumers should fall back to whatever the session stored.
   */
  avatarUrl?: string | null;
  /** The actor's current Discord display name, resolved alongside the avatar. */
  displayName?: string | null;
}
