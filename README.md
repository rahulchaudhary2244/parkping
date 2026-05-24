# ParkPing

Privacy-first QR alerts for vehicles. Scan a sticker, reach the owner, keep phone numbers private.

## Workspace

- `apps/ssg-pages`: owner-facing static QR creation and preview app
- `apps/ssr-pages`: scanner-facing server-rendered QR landing app
- `packages/ui-components`: shared shadcn-style UI and ParkPing components
- `packages/domain`: shared QR, vehicle, alert, and mock-data logic

## Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm typecheck
```

Run apps separately:

```bash
pnpm dev:ssg
pnpm dev:ssr
```
