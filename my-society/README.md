# My Society — Smart Society Management (Next.js)

Role-based society management app: billing, complaints, visitors, governance.

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (warm clay palette, class-based dark mode)
- framer-motion (staggered nav, KPI rise + hover)
- lucide-react icons, next-themes, recharts

## Setup
```bash
npm install
npm run dev
```
Open http://localhost:3000 → pick a role → Enter workspace.

## Structure
```
src/
  app/
    layout.tsx          # root layout + ThemeProvider + fonts
    page.tsx            # redirects to /login
    globals.css         # CSS variables (light + .dark)
    login/page.tsx      # role picker + theme toggle
    dashboard/page.tsx  # app shell: sidebar + topbar + KPIs
  components/
    Providers.tsx       # next-themes wrapper
    ThemeToggle.tsx     # moon/sun toggle
    Sidebar.tsx         # RBAC nav, framer-motion stagger
    Kpi.tsx             # animated metric card
  lib/
    data.ts             # ROLES, MODULES, ACCESS (RBAC), demo data
```

## Extending
Each of the 11 modules (residents, billing, finance, visitors, complaints,
comms, reports, config, roles, migration) becomes a component rendered by
`dashboard/page.tsx` based on the `active` module. RBAC is already enforced in
`lib/data.ts` via `ACCESS`. Add charts with recharts, wire a DB (Prisma +
Postgres) behind API routes in `src/app/api/`.

## Deploy
```bash
npm run build && npm start
```
Or push to GitHub and import into Vercel (zero-config).
