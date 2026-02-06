---
id: 0004
title: Implement Dashboard MVP Layout
stage: green
date: 2026-01-09
surface: agent
model: claude-opus-4-5-20251101
feature: 007-modern-dashboard
branch: 007-modern-dashboard
user: user
command: /sp.implement
labels: ["dashboard", "implementation", "frontend", "bento-grid", "mvp"]
links:
  spec: specs/007-modern-dashboard/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - frontend/components/dashboard/DashboardHeader.tsx
  - frontend/components/dashboard/EnergyCard.tsx
  - frontend/components/dashboard/DoNowCard.tsx
  - frontend/components/dashboard/NotesCard.tsx
  - frontend/components/dashboard/TasksSummaryCard.tsx
  - frontend/components/dashboard/ModernDashboardClient.tsx
  - frontend/components/dashboard/index.ts
  - frontend/app/dashboard/ModernDashboardWrapper.tsx
  - frontend/app/dashboard/page.tsx
tests:
  - Manual visual verification (dashboard compiles and renders)
---

## Prompt

Execute Phase 1 (Setup) and Phase 3 (User Story 1 - MVP Layout) ONLY.

Goal: Build the static "Matte Black" Dashboard with the correct Grid Layout and Placeholder Cards. Do not implement data fetching yet.

After completing these tasks, the `/dashboard` route should show the new layout (Avatar, Grid of 4 Cards) but with static/placeholder content.

## Response snapshot

Successfully implemented Phase 1 (Setup) and Phase 3 (MVP Layout):

**Phase 1 - Setup (T001-T004)**:
- T001: Installed Shadcn Progress component
- T002: Installed Shadcn Avatar component
- T003: Created `frontend/components/dashboard/` directory
- T004: Created barrel export `frontend/components/dashboard/index.ts`

**Phase 3 - MVP Layout (T005-T012)**:
- T005: Created `DashboardHeader.tsx` with Avatar, user info, Bell/Settings/LogOut icons
- T006: Created `EnergyCard.tsx` with progress bar and circular SVG indicator
- T007: Created `DoNowCard.tsx` with "Do now" header and placeholder task items
- T008: Created `NotesCard.tsx` with 3 placeholder note slots (aspect-[3/4])
- T009: Created `TasksSummaryCard.tsx` with count display and loading state
- T010: Created `ModernDashboardClient.tsx` with bento grid layout (12-column grid)
- T011: Updated barrel export with all components
- T012: Updated dashboard page to use ModernDashboardWrapper

**Layout Structure**:
```
<div className="grid grid-cols-1 md:grid-cols-12 gap-6">
  <div className="md:col-span-4"><EnergyCard /></div>
  <div className="md:col-span-8"><DoNowCard /></div>
  <div className="md:col-span-4 grid grid-cols-2 gap-4">
    <NotesCard />
    <TasksSummaryCard />
  </div>
</div>
```

**Styling Applied**:
- Page background: `bg-zinc-950`
- Cards: `bg-zinc-900/80 border border-zinc-800 rounded-2xl`
- Text: `text-zinc-100` (primary), `text-zinc-400/500` (secondary)
- Accent: `text-emerald-500` (energy), `text-blue-400` (links)

**Verification**:
- Dev server started successfully (Next.js 16.1.1 Turbopack)
- Dashboard page compiles without errors
- `GET /dashboard 200` confirms successful render
- Auth redirect working (307 for unauthenticated requests)

## Outcome

- Impact: MVP dashboard layout visible at /dashboard with placeholder content
- Tests: Manual verification - page compiles and renders (200 OK)
- Files: 9 files created/modified (see files list above)
- Next prompts: Implement Phase 4 (US2 - Focus Card with real data) or Phase 7 (US5 - Floating Dock)
- Reflection: Clean separation of wrapper (auth logic) and client (UI) components

## Evaluation notes (flywheel)

- Failure modes observed: Browser automation unavailable (Chrome not installed), used curl + Next.js MCP for verification
- Graders run and results (PASS/FAIL): Compilation PASS, HTTP status PASS (200)
- Prompt variant (if applicable): Standard implementation with static placeholders as requested
- Next experiment (smallest change to try): Add real task data to DoNowCard in Phase 4
