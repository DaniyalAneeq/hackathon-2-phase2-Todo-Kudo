# Implementation Plan: Modern Dashboard Redesign

**Branch**: `007-modern-dashboard` | **Date**: 2026-01-09 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/007-modern-dashboard/spec.md`

## Summary

Replace the current `/dashboard` table view with a modern "Personal OS" bento grid layout. This is a **frontend-only** feature that introduces a dark-themed dashboard with specialized cards (Energy, Do Now, Notes, Tasks Summary) and a floating navigation dock. The Do Now card integrates with the existing Task API to display high-priority tasks.

## Technical Context

**Language/Version**: TypeScript (ES2022+), React 19, Next.js 16+
**Primary Dependencies**: Next.js App Router, Shadcn UI, Tailwind CSS, React Query, Lucide React
**Storage**: N/A (frontend-only, consumes existing API)
**Testing**: Manual testing, component verification via dev server
**Target Platform**: Web (Chrome, Firefox, Safari, Edge), responsive design
**Project Type**: Web application (frontend changes only)
**Performance Goals**: Dashboard loads within 2 seconds, task toggle within 500ms
**Constraints**: Must not modify backend API, must maintain mobile responsiveness
**Scale/Scope**: Single dashboard page, 7 new components

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Spec-First Development | ✅ PASS | Spec exists at `specs/007-modern-dashboard/spec.md` |
| II. Monorepo Discipline | ✅ PASS | All changes in `/frontend` directory |
| III. Technology Stack | ✅ PASS | Next.js 16+, TypeScript, Tailwind CSS, Shadcn UI |
| IV. Agentic Workflow | ✅ PASS | Following spec → plan → tasks → implement → verify |
| V. Authentication Protocol | ✅ PASS | Uses existing auth context, API calls include JWT |
| VI. Documentation Standards | ✅ PASS | Contracts defined in `contracts/dashboard-components.md` |
| VII. Error Handling | ✅ PASS | Loading states, error boundaries, toast notifications |

**Constitution Check Result**: All gates pass. No violations to justify.

## Project Structure

### Documentation (this feature)

```text
specs/007-modern-dashboard/
├── spec.md              # Feature requirements
├── plan.md              # This file
├── research.md          # Technical decisions
├── data-model.md        # Data contracts
├── quickstart.md        # Implementation guide
├── contracts/           # Component specifications
│   └── dashboard-components.md
├── checklists/
│   └── requirements.md  # Quality validation
└── tasks.md             # (Created by /sp.tasks)
```

### Source Code (Frontend Only)

```text
frontend/
├── app/
│   └── dashboard/
│       └── page.tsx           # Updated to use new dashboard
├── components/
│   ├── dashboard/             # NEW: Dashboard-specific components
│   │   ├── ModernDashboardClient.tsx
│   │   ├── DashboardHeader.tsx
│   │   ├── EnergyCard.tsx
│   │   ├── DoNowCard.tsx
│   │   ├── NotesCard.tsx
│   │   ├── TasksSummaryCard.tsx
│   │   ├── FloatingDock.tsx
│   │   └── index.ts
│   └── ui/
│       ├── progress.tsx       # NEW: Shadcn Progress component
│       └── avatar.tsx         # NEW: Shadcn Avatar component
└── hooks/
    └── useTasks.ts            # Existing (no changes)
```

**Structure Decision**: Frontend-only changes within existing monorepo structure. New `components/dashboard/` directory groups all dashboard-specific components. Backend remains unchanged.

## Implementation Phases

### Phase 1: Setup & Dependencies

1. Install Shadcn components:
   ```bash
   cd frontend
   npx shadcn@latest add progress
   npx shadcn@latest add avatar
   ```

2. Create dashboard component directory:
   ```bash
   mkdir -p frontend/components/dashboard
   ```

### Phase 2: Component Implementation (Dependency Order)

| Order | Component | Dependencies | Data Source |
|-------|-----------|--------------|-------------|
| 1 | FloatingDock | Lucide icons | None (static) |
| 2 | EnergyCard | Progress (Shadcn) | Mock data |
| 3 | NotesCard | None | Mock data |
| 4 | TasksSummaryCard | useTasks hook | API (total count) |
| 5 | DoNowCard | Checkbox (Shadcn), useTasks | API (priority=high) |
| 6 | DashboardHeader | Avatar (Shadcn) | Auth context |
| 7 | ModernDashboardClient | All above | Composition |

### Phase 3: Page Integration

1. Update `app/dashboard/page.tsx` to render `ModernDashboardClient`
2. Preserve authentication check (server component pattern)
3. Pass session data to client component

### Phase 4: Styling & Polish

1. Apply dark theme classes (zinc palette)
2. Implement responsive grid behavior
3. Add loading skeletons
4. Add transition animations

## Component Architecture

```
┌─────────────────────────────────────────────────────────────┐
│ DashboardHeader                                             │
│ [Avatar] [User Name]                    [Bell] [⚙] [Logout] │
└─────────────────────────────────────────────────────────────┘

┌───────────────────┐ ┌───────────────────────────────────────┐
│ EnergyCard        │ │ DoNowCard                             │
│                   │ │ Do now                          [+]   │
│ [████████] 100%   │ │ Latest priority tasks                 │
│ Energy Remaining  │ │                                       │
│                   │ │ ☐ High priority task 1                │
│    ┌───┐          │ │ ☐ High priority task 2                │
│    │0/0│          │ │ ☐ High priority task 3                │
│    └───┘          │ │                                       │
│ → Start your day  │ │                                       │
└───────────────────┘ └───────────────────────────────────────┘

┌───────────────────┐ ┌───────────────────┐
│ Notes             │ │ Tasks             │
│ ┌───┐ ┌───┐ ┌───┐ │ │                   │
│ │   │ │   │ │   │ │ │ 12 tasks          │
│ └───┘ └───┘ └───┘ │ │                   │
└───────────────────┘ └───────────────────┘

                    ┌──────────────────────┐
                    │  🧠    🎤    🔍     │ ← Fixed Dock
                    └──────────────────────┘
```

## Tailwind Theme Configuration

```typescript
// Dashboard-specific classes
const theme = {
  // Backgrounds
  pageBg: 'bg-zinc-950',
  cardBg: 'bg-zinc-900/80',
  cardBorder: 'border border-zinc-800',
  cardRadius: 'rounded-2xl',

  // Grid Layout
  grid: 'grid grid-cols-1 md:grid-cols-3 gap-4',
  spanOne: 'md:col-span-1',
  spanTwo: 'md:col-span-2',

  // Text
  textPrimary: 'text-zinc-100',
  textSecondary: 'text-zinc-400',

  // Accents
  progressGreen: 'bg-emerald-500',

  // Dock
  dockBg: 'bg-zinc-900/80 backdrop-blur-lg',
  dockPosition: 'fixed bottom-6 left-1/2 -translate-x-1/2',
};
```

## API Integration

### Existing Endpoints Used

| Endpoint | Method | Usage | Parameters |
|----------|--------|-------|------------|
| `/api/tasks` | GET | Do Now card, Tasks Summary | `?priority=high` |

### React Query Hooks

```typescript
// Existing hook - no changes needed
const { data, isLoading } = useTasks({ priority: 'high' });

// For Do Now card - slice to 3 tasks
const priorityTasks = data?.tasks.slice(0, 3) || [];

// For Tasks Summary - use total count
const totalTasks = data?.total || 0;
```

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Shadcn components not installed | Install commands in quickstart.md |
| API doesn't support `limit` param | Client-side slice (`.slice(0, 3)`) |
| Search feature (Spec 005) not ready | Search icon shows placeholder alert |
| Mobile layout breaks | Test with responsive dev tools |

## Complexity Tracking

> No constitution violations. Table intentionally empty.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| - | - | - |

## Verification Criteria

- [ ] `npx shadcn@latest add progress` succeeds
- [ ] `npx shadcn@latest add avatar` succeeds
- [ ] All 7 components render without errors
- [ ] Dark theme applied (zinc-950 background visible)
- [ ] Bento grid layout correct on desktop (≥768px)
- [ ] Grid stacks vertically on mobile (<768px)
- [ ] High-priority tasks load in Do Now card
- [ ] Task checkbox toggles work with API
- [ ] Floating dock fixed at bottom center
- [ ] Sign out functionality preserved

## Next Steps

1. Run `/sp.tasks` to generate detailed implementation tasks
2. Implement components in dependency order (per Phase 2 table)
3. Test each component individually before integration
4. Run manual QA against acceptance scenarios in spec.md
