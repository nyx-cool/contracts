# @nyx/contracts

The typed HTTP contract for the **nyx** bot's control-plane API.

The bot exposes a small, token-gated HTTP API (its "control plane") that fronts
the live discord.js client and the bot's database. The web dashboard - and any
other client - talks to the bot exclusively through this API. This package is the
single source of truth for the shapes on both ends: the request/response payloads,
the route registry, and the primitives they share.

It ships **types and constants only** - no runtime logic, no network code, no
secrets. The bot imports it to type its handlers; the dashboard imports it to type
its fetches. Because both sides depend on the same declarations, a breaking change
to a payload is a compile error, not a runtime surprise.

## Install

Inside the monorepo it's wired up as a workspace dependency:

```jsonc
// package.json
"dependencies": {
  "@nyx/contracts": "workspace:*"
}
```

## Usage

```ts
import {
  CONTROL_PLANE_ROUTES,
  type GuildSummary,
  type HoneypotGuildConfig,
} from '@nyx/contracts';

// Route registry - parameterised routes are functions.
const url = CONTROL_PLANE_ROUTES.guildHoneypot(guildId);
//    => "/api/control/guilds/<guildId>/honeypot"

// Payloads are shared, so client and server can't drift.
async function loadHoneypot(guildId: string): Promise<HoneypotGuildConfig> {
  const res = await fetch(base + CONTROL_PLANE_ROUTES.guildHoneypot(guildId), {
    headers: { authorization: `Bearer ${token}` },
  });
  return res.json();
}
```

## Layout

```
src/
├─ common/        Shared primitives
│  ├─ base.ts         Bot identity, guild/channel/role summaries, timestamps
│  ├─ permissions.ts  Permission flags & helpers
│  └─ diagnostics.ts  Per-plugin diagnostic state
├─ guild/         Per-guild plugin configuration (read + update payloads)
│  ├─ antiPing.ts     starboard.ts    tickets.ts
│  ├─ automod.ts      logging.ts      welcome.ts
│  ├─ embeds.ts       progression.ts
│  ├─ honeypot.ts     statistics.ts
├─ dashboard/     Dashboard- & developer-level endpoints
│  ├─ dashboard.ts            maintenance, guild lists, plugin status
│  ├─ publicStats.ts          public landing-page stats
│  └─ updateAnnouncements.ts  update-announcement payloads
├─ routes.ts      The control-plane route registry (CONTROL_PLANE_ROUTES)
└─ index.ts       Barrel - re-exports everything above
```

## Route registry

`CONTROL_PLANE_ROUTES` is the canonical list of control-plane paths. Static routes
are plain strings; routes with parameters are functions.

| Area | Key | Path |
| --- | --- | --- |
| Health | `health` | `/api/control/health` |
| Public | `publicStats` | `/api/control/public-stats` |
| Dashboard | `dashboardActorCapabilities` | `/api/control/dashboard/actor-capabilities` |
| Dashboard | `dashboardMaintenance` | `/api/control/dashboard/maintenance` |
| Dashboard | `dashboardGuilds` | `/api/control/dashboard/guilds` |
| Dashboard | `dashboardUpdateAnnouncements` | `/api/control/dashboard/update-announcements` |
| Developer | `dashboardDeveloperAnalytics` | `/api/control/dashboard/developer-analytics` |
| Developer | `dashboardDeveloperGuildInventory` | `/api/control/dashboard/developer-guild-inventory` |
| Updates | `updateAnnouncements` | `/api/control/updates/announce` |
| Guilds | `guilds` | `/api/control/guilds` |
| Guild | `guildConfig(id)` | `/api/control/guilds/:id/config` |
| Guild | `guildPlugins(id)` | `/api/control/guilds/:id/plugins` |
| Guild | `guildPluginDiagnostics(id)` | `/api/control/guilds/:id/diagnostics` |
| Plugin | `guildAntiPing(id)` | `/api/control/guilds/:id/antiping` |
| Plugin | `guildStarboard(id)` | `/api/control/guilds/:id/starboard` |
| Plugin | `guildLogging(id)` | `/api/control/guilds/:id/logging` |
| Plugin | `guildAutomod(id)` | `/api/control/guilds/:id/automod` |
| Plugin | `guildAutomodRaidMode(id)` | `/api/control/guilds/:id/automod/raid-mode` |
| Plugin | `guildHoneypot(id)` | `/api/control/guilds/:id/honeypot` |
| Plugin | `guildProgression(id)` | `/api/control/guilds/:id/progression` |
| Plugin | `guildStatistics(id)` | `/api/control/guilds/:id/statistics` |
| Plugin | `guildTickets(id)` | `/api/control/guilds/:id/tickets` |
| Plugin | `guildTicketQueue(id)` | `/api/control/guilds/:id/tickets/queue` |
| Plugin | `guildTicketAnalytics(id)` | `/api/control/guilds/:id/tickets/analytics` |
| Plugin | `guildTicketsPanelMessage(id)` | `/api/control/guilds/:id/tickets/panel-message` |
| Plugin | `guildEmbeds(id)` | `/api/control/guilds/:id/embeds` |
| Plugin | `guildEmbedsSend(id)` | `/api/control/guilds/:id/embeds/send` |
| Plugin | `guildWelcome(id)` | `/api/control/guilds/:id/welcome` |
| Transcripts | `transcripts(id)` | `/api/control/guilds/:id/transcripts` |
| Transcripts | `transcript(id)` | `/api/control/transcripts/:id` |
| Transcripts | `transcriptMessages(id)` | `/api/control/transcripts/:id/messages` |

## Scripts

```bash
bun run typecheck   # tsc --noEmit
```

## License

MIT — see [LICENSE](LICENSE). The bot and dashboard that consume this package
are not public; only the contract is.
