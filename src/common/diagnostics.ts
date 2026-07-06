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
