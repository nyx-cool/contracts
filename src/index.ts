/**
 * `@nyx/contracts` - the typed HTTP contract for the nyx bot's control-plane API.
 *
 * These are the request/response shapes, the route registry, and the shared
 * primitives that the bot (the API server) and any dashboard or client (the
 * consumer) agree on. It contains types and a handful of constants only - no
 * runtime logic, no secrets.
 *
 * Layout:
 * - `common/`    - shared primitives: base types, permission helpers, diagnostics
 * - `guild/`     - per-guild plugin configuration + read/update payloads
 * - `dashboard/` - dashboard- and developer-level endpoints
 * - `routes.ts`  - the control-plane route registry
 */

// ── Shared primitives ──
export * from './common/base';
export * from './common/permissions';
export * from './common/diagnostics';

// ── Route registry ──
export * from './routes';

// ── Per-guild plugin configuration ──
export * from './guild/antiPing';
export * from './guild/automod';
export * from './guild/embeds';
export * from './guild/honeypot';
export * from './guild/logging';
export * from './guild/progression';
export * from './guild/starboard';
export * from './guild/statistics';
export * from './guild/tickets';
export * from './guild/welcome';

// ── Dashboard & developer endpoints ──
export * from './dashboard/dashboard';
export * from './dashboard/publicStats';
export * from './dashboard/updateAnnouncements';
