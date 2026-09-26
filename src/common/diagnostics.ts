export type PluginDiagnosticSeverity = 'warning' | 'error';
export type PluginDiagnosticStatus = 'healthy' | 'warning' | 'error';

export interface PluginDiagnosticIssue {
  code: string;
  severity: PluginDiagnosticSeverity;
  message: string;
  route: string | null;
  actionLabel: string | null;
}

export interface PluginDiagnosticState {
  pluginName: string;
  status: PluginDiagnosticStatus;
  issues: PluginDiagnosticIssue[];
}

export interface GuildPluginDiagnosticsSummary {
  totalIssues: number;
  warningCount: number;
  errorCount: number;
  affectedPluginCount: number;
}

export interface GetGuildPluginDiagnosticsResponse {
  guildId: string;
  summary: GuildPluginDiagnosticsSummary;
  plugins: PluginDiagnosticState[];
}

export function getPluginDiagnosticStatus(
  issues: readonly PluginDiagnosticIssue[],
): PluginDiagnosticStatus {
  if (issues.some((issue) => issue.severity === 'error')) {
    return 'error';
  }

  if (issues.length > 0) {
    return 'warning';
  }

  return 'healthy';
}

/** Guild settings key for alerts about plugins that stop working. */
export const HEALTH_ALERTS_SETTINGS_KEY = 'healthAlerts';

export interface GuildHealthAlertsConfig {
  /** Tell someone when a plugin's health check starts failing. */
  enabled: boolean;
  /** Where to post the alert. `null` sends it to the server owner's DMs. */
  channelId: string | null;
}

export const DEFAULT_GUILD_HEALTH_ALERTS: GuildHealthAlertsConfig = {
  enabled: true,
  channelId: null,
};

/** Reads the stored value, falling back to the defaults for anything invalid. */
export function readGuildHealthAlertsConfig(value: unknown): GuildHealthAlertsConfig {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return { ...DEFAULT_GUILD_HEALTH_ALERTS };
  }
  const source = value as Record<string, unknown>;
  return {
    enabled:
      typeof source.enabled === 'boolean' ? source.enabled : DEFAULT_GUILD_HEALTH_ALERTS.enabled,
    channelId:
      typeof source.channelId === 'string' && /^\d{5,}$/.test(source.channelId)
        ? source.channelId
        : null,
  };
}

