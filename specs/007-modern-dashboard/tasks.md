# Tasks: Modern Dashboard Redesign

**Input**: Design documents from `/specs/007-modern-dashboard/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: No automated tests requested. Manual visual verification only.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `frontend/` for all changes (this is a frontend-only feature)
- Backend remains unchanged

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install dependencies and create directory structure

- [ ] T001 Install Shadcn Progress component: `cd frontend && npx shadcn@latest add progress`
- [ ] T002 [P] Install Shadcn Avatar component: `cd frontend && npx shadcn@latest add avatar`
- [ ] T003 Create dashboard components directory: `mkdir -p frontend/components/dashboard`
- [ ] T004 [P] Create barrel export file in `frontend/components/dashboard/index.ts`

**Verification**:
- `frontend/components/ui/progress.tsx` exists
- `frontend/components/ui/avatar.tsx` exists
- `frontend/components/dashboard/` directory exists

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: No foundational phase needed - all components are independent and use existing infrastructure (useTasks hook, auth context)

**⚠️ NOTE**: This feature uses existing API and auth infrastructure. No blocking prerequisites beyond Phase 1 setup.

**Checkpoint**: Setup complete - user story implementation can now begin

---

## Phase 3: User Story 1 - View Personal OS Dashboard (Priority: P1) 🎯 MVP

**Goal**: Display the core dashboard layout with dark theme, bento grid, header, and placeholder cards

**Independent Test**: Login as authenticated user, navigate to `/dashboard`, verify dark theme (zinc-950) and bento grid layout renders correctly

### Implementation for User Story 1

- [ ] T005 [P] [US1] Create DashboardHeader component in `frontend/components/dashboard/DashboardHeader.tsx`
  - Left: Avatar + User Name from session prop
  - Right: Bell and Settings icons (Lucide)
  - Style: Minimalist, transparent background

- [ ] T006 [P] [US1] Create placeholder EnergyCard component in `frontend/components/dashboard/EnergyCard.tsx`
  - Background: `bg-zinc-900/80 border-zinc-800 rounded-2xl`
  - Content: Title "Energy" (placeholder for US3)

- [ ] T007 [P] [US1] Create placeholder DoNowCard component in `frontend/components/dashboard/DoNowCard.tsx`
  - Background: `bg-zinc-900/80 border-zinc-800 rounded-2xl`
  - Content: Title "Do now" (placeholder for US2)

- [ ] T008 [P] [US1] Create placeholder NotesCard component in `frontend/components/dashboard/NotesCard.tsx`
  - Background: `bg-zinc-900/80 border-zinc-800 rounded-2xl`
  - Content: Title "Notes" (placeholder for US4)

- [ ] T009 [P] [US1] Create placeholder TasksSummaryCard component in `frontend/components/dashboard/TasksSummaryCard.tsx`
  - Background: `bg-zinc-900/80 border-zinc-800 rounded-2xl`
  - Content: Title "Tasks" (placeholder for US4)

- [ ] T010 [US1] Create ModernDashboardClient component in `frontend/components/dashboard/ModernDashboardClient.tsx`
  - Import all card components
  - Implement bento grid layout:
    ```tsx
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-4"><EnergyCard /></div>
      <div className="md:col-span-8"><DoNowCard /></div>
      <div className="md:col-span-4 grid grid-cols-2 gap-4">
        <NotesCard />
        <TasksSummaryCard />
      </div>
    </div>
    ```
  - Props: session object from page

- [ ] T011 [US1] Update barrel export in `frontend/components/dashboard/index.ts` with all components

- [ ] T012 [US1] Update dashboard page in `frontend/app/dashboard/page.tsx`
  - Theme: `min-h-screen bg-zinc-950 text-zinc-100 p-6`
  - Replace current DashboardClient with ModernDashboardClient
  - Preserve existing auth check and session handling

**Checkpoint**: Dashboard shows dark theme with bento grid layout and placeholder cards. User Story 1 is complete and independently testable.

---

## Phase 4: User Story 2 - View and Interact with Focus Card (Priority: P1)

**Goal**: Display top 3 high-priority tasks with working checkboxes

**Independent Test**: Create 3+ high-priority tasks, verify they appear in Do Now card, toggle checkbox and verify task completion updates

### Implementation for User Story 2

- [ ] T013 [US2] Implement full DoNowCard in `frontend/components/dashboard/DoNowCard.tsx`
  - Header: "Do now" (white) + "Latest priority tasks" (zinc-400)
  - Add "+" button (top right) for task creation
  - Logic:
    ```tsx
    const { data, isLoading } = useTasks({ priority: 'high' });
    const priorityTasks = data?.tasks.slice(0, 3) || [];
    ```
  - Map tasks to rows with Checkbox component
  - Empty state: "No high-priority tasks. Set priorities to see them here."

- [ ] T014 [US2] Add task completion toggle in `frontend/components/dashboard/DoNowCard.tsx`
  - On checkbox click: call `updateTask(id, { is_completed: !task.is_completed })`
  - Use existing mutation pattern from TaskCard component
  - Invalidate tasks query on success

- [ ] T015 [US2] Add "+" button navigation in `frontend/components/dashboard/DoNowCard.tsx`
  - Option A: Navigate to task creation modal (if exists)
  - Option B: Scroll to CreateTaskForm on dashboard
  - Option C: Simple alert placeholder for now

- [ ] T016 [US2] Add loading skeleton for DoNowCard
  - Show 3 skeleton rows while `isLoading` is true
  - Use Skeleton component from Shadcn

**Checkpoint**: Do Now card shows real high-priority tasks with working checkboxes. User Story 2 is complete and independently testable.

---

## Phase 5: User Story 3 - View Energy Card (Priority: P2)

**Goal**: Display Energy card with mock progress data

**Independent Test**: Verify Energy card shows green progress bar at 100%, circular indicator at 0/0, and "Start your day" link

### Implementation for User Story 3

- [ ] T017 [US3] Implement full EnergyCard in `frontend/components/dashboard/EnergyCard.tsx`
  - Title with zap/lightning icon: "Energy"
  - Large horizontal progress bar: `<Progress value={100} className="h-3 bg-zinc-800" />`
    - Progress fill: `bg-emerald-500`
    - Label: "100% Energy Remaining"
  - Style: `bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6`

- [ ] T018 [US3] Add circular progress indicator in `frontend/components/dashboard/EnergyCard.tsx`
  - SVG circle or CSS ring showing "0 of 0"
  - Use zinc-800 for track, emerald-500 for fill
  - Center text: "0 of 0"

- [ ] T019 [US3] Add "Start your day" action link in `frontend/components/dashboard/EnergyCard.tsx`
  - Style: Blue/accent color with hover effect
  - Action: Placeholder href="#" for now

**Checkpoint**: Energy card displays mock data with green progress bar. User Story 3 is complete and independently testable.

---

## Phase 6: User Story 4 - View Mini Cards (Priority: P3)

**Goal**: Display Notes placeholder grid and Tasks count from API

**Independent Test**: Verify Notes card shows 3 empty slots, Tasks card shows correct count from API

### Implementation for User Story 4

- [ ] T020 [P] [US4] Implement full NotesCard in `frontend/components/dashboard/NotesCard.tsx`
  - Title: "Notes"
  - Grid of 3 vertical rectangles as placeholders
    - Style: `bg-zinc-800/50 rounded-lg aspect-[3/4]`
  - Use CSS grid: `grid grid-cols-3 gap-2`

- [ ] T021 [US4] Implement full TasksSummaryCard in `frontend/components/dashboard/TasksSummaryCard.tsx`
  - Title: "Tasks"
  - Logic: Use `useTasks()` hook to get total count
  - Display: Large number `data?.total || 0` with "tasks" label
  - Loading state: Skeleton for number

**Checkpoint**: Mini cards display correctly. User Story 4 is complete and independently testable.

---

## Phase 7: User Story 5 - Use Floating Dock Navigation (Priority: P3)

**Goal**: Display fixed dock with Brain, Mic, and Search icons

**Independent Test**: Verify dock is fixed at bottom center, icons are visible, Search triggers search feature

### Implementation for User Story 5

- [ ] T022 [US5] Create FloatingDock component in `frontend/components/dashboard/FloatingDock.tsx`
  - Position: `fixed bottom-6 left-1/2 -translate-x-1/2`
  - Style: `bg-zinc-900/90 backdrop-blur-md border border-zinc-800 rounded-full px-6 py-3`
  - Icons from Lucide: Brain, Mic, Search
  - Mic icon: Larger size (center emphasis)

- [ ] T023 [US5] Add icon interactions in `frontend/components/dashboard/FloatingDock.tsx`
  - Brain: Placeholder action (alert or tooltip)
  - Mic: Placeholder action (alert or tooltip)
  - Search: Trigger search feature (integrate with Spec 005 or show placeholder)
  - Icon hover: `hover:bg-zinc-800 rounded-full transition-colors`

- [ ] T024 [US5] Add FloatingDock to ModernDashboardClient in `frontend/components/dashboard/ModernDashboardClient.tsx`
  - Place at root level of component (outside grid)
  - Ensure it appears above all content

- [ ] T025 [US5] Add bottom padding to dashboard content to prevent dock overlap
  - Add `pb-24` to main content container

**Checkpoint**: Floating dock is fixed at bottom, icons work. User Story 5 is complete and independently testable.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final styling, responsiveness, and verification

- [ ] T026 [P] Verify responsive behavior at mobile breakpoints (<768px)
  - Grid should stack vertically
  - Dock should remain at bottom center
  - Cards should be full width

- [ ] T027 [P] Add smooth transitions for card hover effects
  - Cards: `transition-all duration-200 hover:border-zinc-700`

- [ ] T028 Verify sign-out functionality still works from header

- [ ] T029 Run visual check against acceptance criteria:
  - [ ] Background is matte black (zinc-950)
  - [ ] Cards are rounded (rounded-2xl)
  - [ ] Green energy bar pops against dark theme
  - [ ] Dock sticks to bottom on scroll

- [ ] T030 Run `npm run build` to verify no TypeScript errors

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **User Stories (Phase 3-7)**: All depend on Setup completion
  - US1 creates placeholder structure (required foundation for others)
  - US2-US5 can proceed after US1 (enhance existing placeholders)
- **Polish (Phase 8)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Foundation - creates all placeholder components and layout
- **User Story 2 (P1)**: Can start after US1 - enhances DoNowCard
- **User Story 3 (P2)**: Can start after US1 - enhances EnergyCard
- **User Story 4 (P3)**: Can start after US1 - enhances NotesCard and TasksSummaryCard
- **User Story 5 (P3)**: Can start after US1 - adds FloatingDock

### Within Each User Story

- Components can be created in parallel [P] if they are separate files
- Composition tasks (ModernDashboardClient) depend on component completion
- Page update depends on client component completion

### Parallel Opportunities

- T001/T002 (Shadcn installs) can run in parallel
- T005-T009 (all placeholder cards) can run in parallel
- T017-T019 (Energy card parts) run sequentially (same file)
- T020/T021 (Mini cards) can run in parallel
- T026/T027 (Polish tasks) can run in parallel

---

## Parallel Example: User Story 1

```bash
# Launch all placeholder components together:
Task T005: "Create DashboardHeader in frontend/components/dashboard/DashboardHeader.tsx"
Task T006: "Create EnergyCard in frontend/components/dashboard/EnergyCard.tsx"
Task T007: "Create DoNowCard in frontend/components/dashboard/DoNowCard.tsx"
Task T008: "Create NotesCard in frontend/components/dashboard/NotesCard.tsx"
Task T009: "Create TasksSummaryCard in frontend/components/dashboard/TasksSummaryCard.tsx"

# Then compose:
Task T010: "Create ModernDashboardClient (depends on T005-T009)"
Task T011: "Update barrel export"
Task T012: "Update dashboard page"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 3: User Story 1 (placeholder layout)
3. **STOP and VALIDATE**: Dark theme + bento grid visible
4. Deploy/demo if visual foundation is ready

### Incremental Delivery

1. Add User Story 1 → Visual foundation (MVP!)
2. Add User Story 2 → Functional tasks in Do Now card
3. Add User Story 3 → Energy card polish
4. Add User Story 4 → Mini cards complete
5. Add User Story 5 → Floating dock navigation
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Complete Setup together
2. Developer A: User Stories 1 + 2 (core functionality)
3. Developer B: User Stories 3 + 4 (visual polish)
4. Developer C: User Story 5 (floating dock)
5. All integrate into same dashboard layout

---

## Summary

| Phase | Task Count | Purpose |
|-------|------------|---------|
| Phase 1: Setup | 4 | Install dependencies, create directory |
| Phase 2: Foundational | 0 | Not needed (uses existing infrastructure) |
| Phase 3: US1 - Dashboard Layout | 8 | MVP bento grid with placeholders |
| Phase 4: US2 - Focus Card | 4 | Real task data with checkboxes |
| Phase 5: US3 - Energy Card | 3 | Mock progress visualization |
| Phase 6: US4 - Mini Cards | 2 | Notes placeholders + task count |
| Phase 7: US5 - Floating Dock | 4 | Navigation dock with icons |
| Phase 8: Polish | 5 | Responsive, transitions, verification |
| **Total** | **30** | |

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- No automated tests - manual visual verification per quickstart.md
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
