export const BOT_PERMISSION_BITS = {
  ViewChannel: 1n << 10n,
  SendMessages: 1n << 11n,
  EmbedLinks: 1n << 14n,
} as const;

export type BotPermissionName = keyof typeof BOT_PERMISSION_BITS;

export const BOT_PERMISSION_LABELS: Record<BotPermissionName, string> = {
  ViewChannel: 'View Channels',
  SendMessages: 'Send Messages',
  EmbedLinks: 'Embed Links',
};

export interface FeatureBotPermissionAction {
  key: string;
  plugin: string;
  label: string;
  requiredBotPermissions: readonly BotPermissionName[];
  i18n: {
    missingTitleKey: string;
    missingDescriptionKey: string;
    unknownTitleKey: string;
    unknownDescriptionKey: string;
  };
}

export const FEATURE_BOT_PERMISSION_ACTIONS = {
  'tickets.post_panel': {
    key: 'tickets.post_panel',
    plugin: 'tickets',
    label: 'post the ticket panel',
    requiredBotPermissions: ['ViewChannel', 'SendMessages', 'EmbedLinks'],
    i18n: {
      missingTitleKey: 'tickets.postPanelMissingPermissionsTitle',
      missingDescriptionKey: 'tickets.postPanelMissingPermissionsDescription',
      unknownTitleKey: 'tickets.postPanelPermissionCheckFailedTitle',
      unknownDescriptionKey: 'tickets.postPanelPermissionCheckFailedDescription',
    },
  },
} as const satisfies Record<string, FeatureBotPermissionAction>;

export type FeatureBotPermissionActionKey = keyof typeof FEATURE_BOT_PERMISSION_ACTIONS;

export function getFeatureBotPermissionAction(
  key: FeatureBotPermissionActionKey,
): (typeof FEATURE_BOT_PERMISSION_ACTIONS)[FeatureBotPermissionActionKey] {
  return FEATURE_BOT_PERMISSION_ACTIONS[key];
}

export function formatBotPermissionLabel(permission: BotPermissionName): string {
  return BOT_PERMISSION_LABELS[permission];
}

export function formatBotPermissionList(permissions: readonly BotPermissionName[]): string {
  return permissions.map(formatBotPermissionLabel).join(', ');
}

export function parsePermissionBits(value: bigint | string | null | undefined): bigint | null {
  if (typeof value === 'bigint') {
    return value;
  }

  if (typeof value !== 'string') {
    return null;
  }

  const normalized = value.trim();
  if (!normalized) {
    return null;
  }

  try {
    return BigInt(normalized);
  } catch {
    return null;
  }
}

export function resolveMissingBotPermissions(
  currentPermissionBits: bigint | string | null | undefined,
  requiredPermissions: readonly BotPermissionName[],
): BotPermissionName[] | null {
  const bits = parsePermissionBits(currentPermissionBits);
  if (bits === null) {
    return null;
  }

  return requiredPermissions.filter(
    (permission) => (bits & BOT_PERMISSION_BITS[permission]) !== BOT_PERMISSION_BITS[permission],
  );
}
