import type { BotIdentity, GuildChannelSummary, GuildRoleSummary, UnixTimestamp } from '../common/base';

export interface TicketTranscriptRef {
  id: string;
  guildId: string;
  channelId: string;
  messageId: string;
  storageKey: string;
  createdAt: UnixTimestamp;
}

export interface TicketTranscriptRoleSnapshot {
  id: string;
  name: string;
  color: number | null;
}

export interface TicketTranscriptUserSnapshot {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
  bot: boolean;
  system: boolean;
  accentColor: number | null;
  roles: TicketTranscriptRoleSnapshot[];
}

export interface TicketTranscriptMentionUserSnapshot {
  id: string;
  displayName: string;
}

export interface TicketTranscriptMentionRoleSnapshot {
  id: string;
  name: string;
  color: number | null;
}

export interface TicketTranscriptMentionChannelSnapshot {
  id: string;
  name: string;
}

export interface TicketTranscriptMentionsSnapshot {
  everyone: boolean;
  users: TicketTranscriptMentionUserSnapshot[];
  roles: TicketTranscriptMentionRoleSnapshot[];
  channels: TicketTranscriptMentionChannelSnapshot[];
}

export interface TicketTranscriptReactionEmojiSnapshot {
  id: string | null;
  name: string | null;
  animated: boolean;
}

export interface TicketTranscriptReactionSnapshot {
  emoji: TicketTranscriptReactionEmojiSnapshot;
  count: number;
}

export interface TicketTranscriptAttachmentSnapshot {
  id: string;
  filename: string;
  url: string;
  proxyUrl: string;
  contentType: string | null;
  size: number;
  spoiler: boolean;
  width: number | null;
  height: number | null;
}

export interface TicketTranscriptStickerSnapshot {
  id: string;
  name: string;
  format: string | null;
  url: string | null;
}

export interface TicketTranscriptEmbedFieldSnapshot {
  name: string;
  value: string;
  inline: boolean;
}

export interface TicketTranscriptEmbedAuthorSnapshot {
  name: string | null;
  url: string | null;
  iconUrl: string | null;
}

export interface TicketTranscriptEmbedFooterSnapshot {
  text: string | null;
  iconUrl: string | null;
}

export interface TicketTranscriptEmbedMediaSnapshot {
  url: string | null;
  proxyUrl: string | null;
  width: number | null;
  height: number | null;
}

export interface TicketTranscriptEmbedProviderSnapshot {
  name: string | null;
  url: string | null;
}

export interface TicketTranscriptEmbedSnapshot {
  type: string | null;
  title: string | null;
  description: string | null;
  url: string | null;
  color: number | null;
  timestamp: string | null;
  author: TicketTranscriptEmbedAuthorSnapshot | null;
  footer: TicketTranscriptEmbedFooterSnapshot | null;
  image: TicketTranscriptEmbedMediaSnapshot | null;
  thumbnail: TicketTranscriptEmbedMediaSnapshot | null;
  video: TicketTranscriptEmbedMediaSnapshot | null;
  provider: TicketTranscriptEmbedProviderSnapshot | null;
  fields: TicketTranscriptEmbedFieldSnapshot[];
}

export interface TicketTranscriptReplySnapshot {
  messageId: string;
  authorId: string | null;
  authorDisplayName: string | null;
  content: string | null;
  cleanContent: string | null;
  attachmentCount: number;
  deleted: boolean;
}

export interface TicketTranscriptMessageSnapshot {
  id: string;
  type: string;
  system: boolean;
  createdAt: UnixTimestamp;
  editedAt: UnixTimestamp | null;
  content: string;
  cleanContent: string;
  authorId: string | null;
  replyTo: TicketTranscriptReplySnapshot | null;
  mentions: TicketTranscriptMentionsSnapshot;
  attachments: TicketTranscriptAttachmentSnapshot[];
  stickers: TicketTranscriptStickerSnapshot[];
  embeds: TicketTranscriptEmbedSnapshot[];
  reactions: TicketTranscriptReactionSnapshot[];
  pinned: boolean;
  tts: boolean;
}

export interface TicketTranscriptViewerIdentity {
  id: string;
  name: string;
  avatarUrl: string | null;
}

export interface TicketTranscriptViewerMetadata {
  guildId: string;
  guildName: string;
  guildIconUrl: string | null;
  channelId: string;
  channelName: string;
  categoryId: string;
  categoryName: string;
  openedAt: UnixTimestamp | null;
  closedAt: UnixTimestamp;
  opener: TicketTranscriptViewerIdentity;
  closer: TicketTranscriptViewerIdentity;
  claimer: TicketTranscriptViewerIdentity | null;
  closeReason: string | null;
  status: TicketStatus;
  tags: string[];
  messageCount: number;
  participantCount: number;
}

export interface TicketTranscriptViewerDocument {
  version: 1;
  transcript: TicketTranscriptRef;
  metadata: TicketTranscriptViewerMetadata;
  participants: TicketTranscriptUserSnapshot[];
  messages: TicketTranscriptMessageSnapshot[];
}

export interface TicketTranscriptViewerShell {
  version: 1;
  transcript: TicketTranscriptRef;
  metadata: TicketTranscriptViewerMetadata;
  participants: TicketTranscriptUserSnapshot[];
}

export interface TicketTranscriptSummary {
  id: string;
  guildId: string;
  guildName: string;
  channelId: string;
  channelName: string | null;
  categoryId: string;
  categoryName: string;
  openerId: string;
  openerName: string;
  closedById: string;
  closedByName: string;
  closedAt: UnixTimestamp;
  closeReason: string | null;
  messageCount: number;
  wordCount: number;
}

export interface TicketAnalyticsCategoryStat {
  categoryId: string;
  categoryName: string;
  ticketCount: number;
  share: number;
}

export interface TicketAnalyticsSupportMemberStat {
  userId: string;
  userName: string;
  messageCount: number;
  wordCount: number;
  ticketCount: number;
  lastActiveAt: UnixTimestamp | null;
}

export interface TicketAnalyticsVolumePoint {
  date: string;
  openedCount: number;
  closedCount: number;
}

/**
 * How much ticket history a guild can view. Separate from the statistics
 * window so the two can diverge; collection is never gated either way.
 */
export const FREE_GUILD_TICKET_ANALYTICS_WINDOW_DAYS = 7;
export const PREMIUM_GUILD_TICKET_ANALYTICS_WINDOW_DAYS = 30;

export interface TicketAnalyticsSummary {
  /** Every ticket ever closed, not just those inside the window. */
  totalClosedTickets: number;
  /** Tickets inside the window that recorded a first response. */
  ticketsWithFirstResponse: number;
  /** Averages describe the window, not all time. */
  averageFirstResponseSeconds: number | null;
  averageMessagesPerTicket: number | null;
  averageWordsPerTicket: number | null;
  windowOpenedTickets: number;
  windowClosedTickets: number;
  /** Openers who submitted a close-time rating. Null when none exist yet. */
  ratingCount: number;
  averageRating: number | null;
}

/** How many openers chose each star, keyed '1' through '5'. */
export type TicketRatingDistribution = Record<'1' | '2' | '3' | '4' | '5', number>;

export interface GetGuildTicketAnalyticsResponse {
  guildId: string;
  /** False narrows `windowDays`; the payload is still populated. */
  premiumActive: boolean;
  /** Days of history behind `summary`, `volume`, and the top lists. */
  windowDays: number;
  /** Days a nyx+ guild sees, so the dashboard can name what upgrading buys. */
  fullWindowDays: number;
  summary: TicketAnalyticsSummary;
  ratingDistribution: TicketRatingDistribution;
  topCategories: TicketAnalyticsCategoryStat[];
  topSupportMembers: TicketAnalyticsSupportMemberStat[];
  volume: TicketAnalyticsVolumePoint[];
}

export interface TicketTranscriptListCategoryOption {
  id: string;
  name: string;
  count: number;
}

export interface TicketTranscriptListChannelOption {
  id: string;
  name: string;
  count: number;
}

export interface TicketTranscriptListPagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface TicketTranscriptListAppliedFilters {
  query: string;
  categoryId: string | null;
  channelId: string | null;
}

/**
 * Whose turn it is, derived from who spoke last. There is no `resolved`: on
 * Discord, closing a ticket archives the channel, so resolution and closure are
 * the same event and a resolved-but-open ticket cannot exist.
 */
export type TicketStatus = 'open' | 'in_progress' | 'waiting_user' | 'closed';

export interface TicketIntakeEmbedFieldConfig {
  name: string;
  value: string;
  inline: boolean;
}

export interface TicketIntakeEmbedConfig {
  id: string;
  title: string;
  description: string;
  color: number | null;
  footer: string | null;
  mentionRoleIds: string[];
  fields: TicketIntakeEmbedFieldConfig[];
}

export type TicketIntakeFormFieldStyle = 'short' | 'paragraph';

export interface TicketIntakeFormFieldConfig {
  id: string;
  label: string;
  placeholder: string;
  required: boolean;
  style: TicketIntakeFormFieldStyle;
  maxLength: number;
  sensitive: boolean;
}

export interface TicketCategoryConfig {
  id: string;
  name: string;
  description: string;
  supportRoleIds: string[];
  requireOpenerAcknowledgement: boolean;
  onOpenMessages: TicketIntakeEmbedConfig[];
  formFields: TicketIntakeFormFieldConfig[];
  /**
   * Questions shown in a modal after the opener rates a closed ticket.
   * Mirrors the intake `formFields` shape so the same editor serves both.
   * Empty means the star rating is recorded without a follow-up modal.
   */
  closeFeedbackFields: TicketIntakeFormFieldConfig[];
  defaultTags: string[];
}

export interface TicketPanelConfig {
  channelId: string | null;
  parentCategoryId: string | null;
  title: string;
  description: string;
  buttonLabel: string;
  buttonEmoji: string | null;
  color: number | null;
  footerText: string | null;
}

export interface TicketHeaderEmbedConfig {
  color: number | null;
  footerText: string | null;
}

export interface TicketLoggingConfig {
  channelId: string | null;
  hostTranscriptsOnWeb: boolean;
  requireDashboardAuthForHostedTranscripts: boolean;
  requireCloseReason: boolean;
  minWordCountEnabled: boolean;
  minWordCount: number | null;
  redactSensitiveFields: boolean;
}

export interface TicketLimitsConfig {
  perUserOpenTicketLimitEnabled: boolean;
  perUserOpenTicketLimit: number | null;
}

export interface TicketSlaConfig {
  firstResponseReminderEnabled: boolean;
  firstResponseMinutes: number | null;
  inactivityWarningEnabled: boolean;
  inactivityWarningMinutes: number | null;
  autoCloseEnabled: boolean;
  autoCloseMinutes: number | null;
}

export interface TicketRatingsConfig {
  /** DM the opener a star-rating prompt when their ticket closes. */
  enabled: boolean;
}

export interface TicketGuildConfig {
  panel: TicketPanelConfig;
  header: TicketHeaderEmbedConfig;
  logging: TicketLoggingConfig;
  limits: TicketLimitsConfig;
  sla: TicketSlaConfig;
  ratings: TicketRatingsConfig;
  categories: TicketCategoryConfig[];
}

export interface TicketLocalizedDefaults {
  panel: {
    title: string;
    description: string;
    buttonLabel: string;
    footerText: string;
  };
  header: {
    title: string;
    footerText: string;
  };
  category: {
    name: string;
    description: string;
  };
}

export interface GetGuildTicketsResponse {
  guildId: string;
  bot: BotIdentity;
  guildConfig: TicketGuildConfig;
  localizedDefaults: TicketLocalizedDefaults;
  roles: GuildRoleSummary[];
  channels: GuildChannelSummary[];
  premiumActive: boolean;
}

export interface TicketQueueItemSummary {
  channelId: string;
  channelName: string;
  categoryId: string;
  categoryName: string;
  openerId: string;
  openerName: string;
  claimerId: string | null;
  claimerName: string | null;
  supportRoleIds: string[];
  tags: string[];
  status: TicketStatus;
  createdAt: UnixTimestamp;
  lastActivityAt: UnixTimestamp;
  acknowledgedAt: UnixTimestamp | null;
  firstStaffResponseAt: UnixTimestamp | null;
  ageSeconds: number;
  idleSeconds: number;
  responseOverdue: boolean;
  inactivityWarningDue: boolean;
  autoCloseDue: boolean;
  formAnswerCount: number;
}

export interface TicketQueueSummary {
  totalOpen: number;
  unclaimed: number;
  responseOverdue: number;
  inactivityWarningDue: number;
  autoCloseDue: number;
}

export interface GetGuildTicketQueueResponse {
  guildId: string;
  queue: TicketQueueItemSummary[];
  summary: TicketQueueSummary;
}

export interface UpdateGuildTicketsRequest {
  guildConfig?: TicketGuildConfig;
}

export interface UpdateGuildTicketsResponse {
  guildId: string;
  guildConfig: TicketGuildConfig;
}

export interface SendTicketPanelMessageRequest {
  channelId?: string;
}

export interface SendTicketPanelMessageResponse {
  guildId: string;
  channelId: string;
  messageId: string;
}

export interface ListTicketTranscriptsResponse {
  transcripts: TicketTranscriptSummary[];
  pagination: TicketTranscriptListPagination;
  filters: TicketTranscriptListAppliedFilters;
  categories: TicketTranscriptListCategoryOption[];
  channels: TicketTranscriptListChannelOption[];
}

export interface GetTicketTranscriptResponse {
  transcript: TicketTranscriptRef;
  document: TicketTranscriptViewerShell | null;
  html: string;
}

export interface GetTicketTranscriptMessagesResponse {
  transcriptId: string;
  page: number;
  pageSize: number;
  total: number;
  totalMessages: number;
  hasNextPage: boolean;
  query: string;
  authorId: string | null;
  type: TicketTranscriptMessageFilterType;
  messages: TicketTranscriptMessageSnapshot[];
}

export type TicketTranscriptMessageFilterType =
  | 'all'
  | 'message'
  | 'reply'
  | 'attachment'
  | 'embed'
  | 'system';
