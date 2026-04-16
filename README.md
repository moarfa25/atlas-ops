# atlas-ops

Internal management console for the Atlas team. Not client-facing.

Companion to:
- `atlas-graphtree` — RM-facing client app
- `atlas-backend` — Python monolith

## What it's for

| Area | Purpose |
|---|---|
| **Tenants** | Create, configure, suspend tenant firms. Manage RMs within them. |
| **Costs** | LLM spend dashboard. Per-tenant, per-RM, per-module, per-day. Alerts. |
| **Scrapers** | CRUD scraper templates + instances. Enable / disable. View runs. |
| **Prompts** | Version, edit, activate, deprecate prompt templates. A/B. |
| **Graph** | Coverage map. Discovery job queue. Edge QA — approve / override / reject. |
| **Overlays** | Review generated risk overlays. Manual promote / suppress. |
| **Pipeline** | Queue depths. Outbox lag. Stuck state machine runs. Error explorer. |
| **News** | Moderation — blacklist sources, flag bad articles. |
| **Audit** | Query the audit log. Compliance exports. |

All views gated to `role=atlas_admin` via OIDC middleware.

## Stack

- Next.js 16 (App Router), React 19, TypeScript 5
- Tailwind + shadcn/ui (dense admin UI)
- TanStack Query + TanStack Table
- Zod (form validation)
- Recharts (cost dashboards)
- Design tokens ported from `atlas-graphtree`

## Local dev

```bash
npm install
npx shadcn@latest init         # one-time shadcn setup
cp .env.example .env.local
npm run dev                    # http://localhost:3100
```

Requires `atlas-backend` running on :8000 and the user having an `atlas_admin` role.

## Deploy

Built as a separate container. Separate hostname (`ops.atlas.internal`). Never exposed publicly.
