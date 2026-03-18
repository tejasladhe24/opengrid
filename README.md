# OpenGrid

OpenGrid is a fair commerce platform that helps businesses sell directly to customers with transparent pricing and minimal platform fees.

This repo is a pnpm + Turbo monorepo with:

- `apps/business-app`: Multi-tenant business dashboard (onboarding, catalog, orders, analytics)
- `apps/customer-app`: Customer-facing app (browse, auth, ordering)
- `packages/database`: PostgreSQL schema + migrations (Drizzle)
- `packages/ui`: Shared UI components
- `packages/typescript-config`: Shared TS config

## Prerequisites

- Node.js `>= 20` (see `package.json`)
- pnpm (repo pins `pnpm@9.15.9`)
- Docker (for local Postgres/Redis/Electric via `docker-compose.yaml`)

## Setup

Install dependencies:

```bash
pnpm install
```

### Environment variables

Each app has its own `.env.example`:

- `apps/business-app/.env.example` → copy to `apps/business-app/.env`
- `apps/customer-app/.env.example` → copy to `apps/customer-app/.env`

Infrastructure env vars (used by `docker-compose.yaml`) are expected in your shell environment (or a root `.env` file that Docker Compose reads). At minimum you’ll need:

- `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`
- `REDIS_PASSWORD`
- `ELECTRIC_SECRET`, `AUTH_MODE`

Also ensure the apps’ `DATABASE_URL` points to your local Postgres, e.g.:

```text
postgresql://POSTGRES_USER:POSTGRES_PASSWORD@localhost:5432/POSTGRES_DB
```

## Running locally

Start infra (Postgres + Redis + Electric) and run migrations:

```bash
docker compose up -d postgres redis
docker compose up migrate
docker compose up -d electric
```

Run apps:

```bash
pnpm dev
```

### Port note (important)

Default dev ports:

- `apps/customer-app`: `3000`
- `apps/business-app`: `3001`

## Useful commands

```bash
pnpm lint
pnpm typecheck
pnpm format
pnpm build
pnpm clean
```
