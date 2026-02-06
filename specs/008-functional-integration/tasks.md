# Tasks: Functional Dashboard Restoration

**Input**: Design documents from `/specs/008-functional-integration/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Manual verification only (no automated tests requested in spec)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `/frontend` directory (all changes)
- No backend changes required per spec

---

## Phase 1: Setup (Dependencies)

**Purpose**: Install required Shadcn UI components

**Agent**: `fullstack_feature_integrator`

- [x] T001 Install Shadcn Dialog component in `frontend/components/ui/dialog.tsx`
  - **Verification**: `cd frontend && npx shadcn@latest add dialog && ls components/ui/dialog.tsx`

- [x] T002 Install Shadcn Command component in `frontend/components/ui/command.tsx`
  - **Verification**: `cd frontend && npx shadcn@latest add command && ls components/ui/command.tsx`

- [x] T003 Verify dependencies installed in `frontend/package.json`
  - **Verification**: `cd frontend && cat package.json | grep -E "(cmdk|@radix-ui/react-dialog)"`

**Checkpoint**: Shadcn Dialog and Command components available for import

---

## Phase 2: Foundational (State Management Setup)

**Purpose**: Prepare ModernDashboardClient to manage dialog states

**⚠️ CRITICAL**: Dialog state management must be in place before US1/US2 components can be wired

**Agent**: `fullstack_feature_integrator`

- [x] T004 Add dialog state hooks to `frontend/components/dashboard/ModernDashboardClient.tsx`
  - Add `const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);`
  - Add `const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);`
  - Add useState import if not present
  - **Verification**: `grep -n "isCreateDialogOpen\|isSearchDialogOpen" frontend/components/dashboard/ModernDashboardClient.tsx`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Create Task from Dashboard (Priority: P1) 🎯 MVP

**Goal**: Users can click "+" button on Do Now card to open a modal and create tasks with full form functionality

**Independent Test**: Click "+" button, fill form (title, category, priority, due date), submit, verify task appears in Do Now list

**Agent**: `frontend-dev-agent`

### Implementation for User Story 1

- [x] T005 [US1] Create `CreateTaskDialog.tsx` component in `frontend/components/dashboard/CreateTaskDialog.tsx`
  - Import `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle` from `@/components/ui/dialog`
  - Import `CreateTaskForm` from `@/components/CreateTaskForm`
  - Define interface: `{ open: boolean; onOpenChange: (open: boolean) => void }`
  - Render Dialog with CreateTaskForm inside DialogContent
  - **Verification**: `ls frontend/components/dashboard/CreateTaskDialog.tsx && grep -n "DialogContent" frontend/components/dashboard/CreateTaskDialog.tsx`

- [x] T006 [US1] Wire CreateTaskDialog to ModernDashboardClient in `frontend/components/dashboard/ModernDashboardClient.tsx`
  - Import CreateTaskDialog component
  - Pass `onAddTask={() => setIsCreateDialogOpen(true)}` to DoNowCard
  - Render `<CreateTaskDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} />`
  - **Verification**: `grep -n "CreateTaskDialog\|onAddTask" frontend/components/dashboard/ModernDashboardClient.tsx`

- [x] T007 [US1] Verify DoNowCard already accepts `onAddTask` prop in `frontend/components/dashboard/DoNowCard.tsx`
  - Confirm `onAddTask?: () => void` exists in props interface
  - Confirm button onClick calls `onAddTask` when provided
  - **Verification**: `grep -n "onAddTask" frontend/components/dashboard/DoNowCard.tsx`

**Checkpoint**: User Story 1 complete - Task creation modal fully functional

**Manual Test**:
1. Navigate to http://localhost:3000/dashboard
2. Click "+" button on Do Now card
3. Fill form: Title="Test Task", Category="Work", Priority="High", Due Date=tomorrow
4. Click Create Task
5. Verify dialog closes and task appears in Do Now list

---

## Phase 4: User Story 2 - Search Tasks from Dashboard (Priority: P1)

**Goal**: Users can click Search icon in floating dock to open command palette and search for tasks in real-time

**Independent Test**: Click Search icon, type task name, verify matching results appear, click result to navigate

**Agent**: `frontend-dev-agent`

### Implementation for User Story 2

- [x] T008 [US2] Create `SearchCommand.tsx` component in `frontend/components/dashboard/SearchCommand.tsx`
  - Import `CommandDialog`, `CommandInput`, `CommandList`, `CommandEmpty`, `CommandGroup`, `CommandItem` from `@/components/ui/command`
  - Import `useTasks` from `@/hooks/useTasks`
  - Import `useDebounced` from `@/hooks/useDebounced`
  - Import `useRouter` from `next/navigation`
  - Define interface: `{ open: boolean; onOpenChange: (open: boolean) => void }`
  - Add local state for search query
  - Use `useDebounced(query, 300)` for debounced search
  - Use `useTasks({ search: debouncedQuery, sortBy: 'created_at', order: 'desc', priority: '', category: '' })` for results
  - Display loading state, results (limit 10), empty state
  - On result click: navigate to `/dashboard/list` and close
  - **Verification**: `ls frontend/components/dashboard/SearchCommand.tsx && grep -n "CommandDialog\|useDebounced\|useTasks" frontend/components/dashboard/SearchCommand.tsx`

- [x] T009 [US2] Wire SearchCommand to ModernDashboardClient in `frontend/components/dashboard/ModernDashboardClient.tsx`
  - Import SearchCommand component
  - Pass `onSearch={() => setIsSearchDialogOpen(true)}` to FloatingDock
  - Render `<SearchCommand open={isSearchDialogOpen} onOpenChange={setIsSearchDialogOpen} />`
  - **Verification**: `grep -n "SearchCommand\|onSearch" frontend/components/dashboard/ModernDashboardClient.tsx`

- [x] T010 [US2] Verify FloatingDock already accepts `onSearch` prop in `frontend/components/dashboard/FloatingDock.tsx`
  - Confirm `onSearch?: () => void` exists in props interface
  - Confirm search button onClick calls `onSearch` when provided
  - **Verification**: `grep -n "onSearch" frontend/components/dashboard/FloatingDock.tsx`

**Checkpoint**: User Story 2 complete - Search command palette fully functional

**Manual Test**:
1. Navigate to http://localhost:3000/dashboard
2. Click Search icon in floating dock
3. Type a partial task name (e.g., "test")
4. Verify matching tasks appear in real-time
5. Click a result and verify navigation to /dashboard/list

---

## Phase 5: User Story 3 - Access Full Task List View (Priority: P2)

**Goal**: Users can access the full task list with filters/sorting at `/dashboard/list`

**Independent Test**: Click "Start your day" or Tasks card, verify navigation to /dashboard/list with TaskToolbar visible

**Agent**: `fullstack_feature_integrator`

### Implementation for User Story 3

- [x] T011 [US3] Create task list route at `frontend/app/dashboard/list/page.tsx`
  - Copy authentication logic from `frontend/app/dashboard/page.tsx`
  - Import `DashboardClient` from `../DashboardClient`
  - Add "Back to Dashboard" link with `Link` from `next/link`
  - Render DashboardClient with session user data
  - **Verification**: `ls frontend/app/dashboard/list/page.tsx && grep -n "DashboardClient\|Back to Dashboard" frontend/app/dashboard/list/page.tsx`

- [x] T012 [US3] Update EnergyCard link in `frontend/components/dashboard/EnergyCard.tsx`
  - Import `Link` from `next/link`
  - Change `<a href="#">` to `<Link href="/dashboard/list">`
  - Update "Start your day" link to navigate properly
  - **Verification**: `grep -n "dashboard/list" frontend/components/dashboard/EnergyCard.tsx`

- [x] T013 [US3] Update TasksSummaryCard to be clickable in `frontend/components/dashboard/TasksSummaryCard.tsx`
  - Import `Link` from `next/link`
  - Wrap entire card content in `<Link href="/dashboard/list">`
  - Add `cursor-pointer` class for visual affordance
  - **Verification**: `grep -n "dashboard/list\|cursor-pointer" frontend/components/dashboard/TasksSummaryCard.tsx`

**Checkpoint**: User Story 3 complete - Full task list route accessible

**Manual Test**:
1. Navigate to http://localhost:3000/dashboard
2. Click "Start your day" link in Energy card
3. Verify navigation to /dashboard/list
4. Verify TaskToolbar (filters, sorting) is visible
5. Navigate back to dashboard, click Tasks card
6. Verify same navigation works

---

## Phase 6: User Story 4 - Persistent Quick Notes (Priority: P3)

**Goal**: Users can type notes in the Notes card that persist across page reloads via localStorage

**Independent Test**: Type text in note area, refresh page, verify text is still present

**Agent**: `frontend-dev-agent`

### Implementation for User Story 4

- [x] T014 [US4] Update NotesCard with localStorage persistence in `frontend/components/dashboard/NotesCard.tsx`
  - Add `useState` for notes array: `useState<[string, string, string]>(['', '', ''])`
  - Add `useState` for hydration flag: `useState(false)`
  - Add `useEffect` to load from localStorage on mount (key: `kudu_quick_notes`)
  - Add `useEffect` to save to localStorage on notes change
  - Add `updateNote(index, value)` helper function
  - Replace placeholder divs with `<textarea>` elements
  - Style textareas to match existing design (bg-zinc-800/50, rounded-lg, etc.)
  - **Verification**: `grep -n "localStorage\|kudu_quick_notes\|textarea" frontend/components/dashboard/NotesCard.tsx`

**Checkpoint**: User Story 4 complete - Notes persistence fully functional

**Manual Test**:
1. Navigate to http://localhost:3000/dashboard
2. Click on first note area (should become editable)
3. Type "Test note content"
4. Click away (should auto-save)
5. Refresh the page
6. Verify "Test note content" is still visible

---

## Phase 7: Polish & QA

**Purpose**: Final verification and build check

**Agent**: `qa-spec-validator-agent`

- [x] T015 Build verification: Run production build
  - **Verification**: `cd frontend && npm run build`

- [ ] T016 Visual verification: Test all acceptance scenarios
  - **Verification**: Manual testing per spec acceptance scenarios

- [x] T017 [P] Verify no TypeScript errors
  - **Verification**: `cd frontend && npx tsc --noEmit`

- [x] T018 [P] Verify no ESLint errors
  - **Verification**: `cd frontend && npm run lint`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-6)**: All depend on Foundational phase completion
  - US1 and US2 can proceed in parallel after Foundational
  - US3 can proceed independently after Foundational
  - US4 can proceed independently after Foundational
- **Polish (Phase 7)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: T005 → T006 → T007 (verify existing)
- **User Story 2 (P1)**: T008 → T009 → T010 (verify existing)
- **User Story 3 (P2)**: T011, T012, T013 can run in parallel
- **User Story 4 (P3)**: T014 standalone (no dependencies on other stories)

### Parallel Opportunities

Within User Stories:
- US3: T012 [P] and T013 [P] can run in parallel (different files)
- US1 and US2 can be developed in parallel by different developers
- US3 and US4 can be developed in parallel

---

## Parallel Example: User Stories 1 & 2 Simultaneously

```bash
# Developer A: User Story 1
Task: T005 "Create CreateTaskDialog.tsx component"
Task: T006 "Wire CreateTaskDialog to ModernDashboardClient"

# Developer B: User Story 2 (parallel)
Task: T008 "Create SearchCommand.tsx component"
Task: T009 "Wire SearchCommand to ModernDashboardClient"

# Note: T006 and T009 modify same file but different sections (can merge)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T003)
2. Complete Phase 2: Foundational (T004)
3. Complete Phase 3: User Story 1 (T005-T007)
4. **STOP and VALIDATE**: Test task creation independently
5. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy (MVP!)
3. Add User Story 2 → Test search independently → Deploy
4. Add User Story 3 → Test navigation independently → Deploy
5. Add User Story 4 → Test notes independently → Deploy
6. Polish phase → Final QA → Release

### Single Developer Strategy

Execute in order:
1. T001-T003 (Setup)
2. T004 (Foundational)
3. T005-T007 (US1 - Task Creation)
4. T008-T010 (US2 - Search)
5. T011-T013 (US3 - List Route)
6. T014 (US4 - Notes)
7. T015-T018 (Polish)

---

## Task Summary

| Phase | Tasks | Story | Parallel Opportunities |
|-------|-------|-------|------------------------|
| Setup | T001-T003 | - | T001, T002 can run in parallel |
| Foundational | T004 | - | None (single task) |
| US1 Task Creation | T005-T007 | P1 | None (sequential dependency) |
| US2 Search | T008-T010 | P1 | None (sequential dependency) |
| US3 List Route | T011-T013 | P2 | T012, T013 in parallel |
| US4 Notes | T014 | P3 | Standalone |
| Polish | T015-T018 | - | T017, T018 in parallel |

**Total Tasks**: 18
**MVP (US1 only)**: 7 tasks (T001-T007)
**Full Feature**: 18 tasks

---

## Notes

- All tasks modify `/frontend` directory only (Constitution II compliance)
- No backend changes required per spec
- Existing components (CreateTaskForm, useTasks, DashboardClient) are reused
- Manual testing is the primary verification method per spec
- Stop at any checkpoint to validate story independently
