# Implementation Plan: Functional Dashboard Restoration

**Branch**: `008-functional-integration` | **Date**: 2026-01-11 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/008-functional-integration/spec.md`

## Summary

Wire the new Bento Grid dashboard UI (Spec 007) to existing task management logic (Spec 004/005/006) to restore full functionality. This involves creating dialog components for task creation and search, adding a dedicated task list route, and implementing persistent notes with localStorage.

## Technical Context

**Language/Version**: TypeScript (ES2022+), React 19, Next.js 16+
**Primary Dependencies**: Shadcn UI (Dialog, Command), React Query, Radix UI primitives
**Storage**: Client-side localStorage for notes; existing Neon PostgreSQL for tasks (no changes)
**Testing**: Manual verification via dev server; existing hooks/components are pre-tested
**Target Platform**: Web (modern browsers with localStorage support)
**Project Type**: Web application (monorepo: /frontend, /backend)
**Performance Goals**: Search results within 500ms of typing stop (SC-002)
**Constraints**: Frontend-only changes; no backend/database modifications
**Scale/Scope**: 4 user stories, ~8 files to create/modify

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Spec-First Development | PASS | Spec 008 exists and is referenced |
| II. Monorepo Discipline | PASS | All changes in /frontend only |
| III. Technology Stack Constraints | PASS | Next.js 16+, TypeScript, Tailwind CSS |
| IV. Agentic Dev Stack Workflow | PASS | Following spec → plan → tasks flow |
| V. Authentication Protocol | PASS | Uses existing JWT-authenticated API calls |
| VI. Documentation & File Standards | PASS | Spec in specs/008-functional-integration/ |
| VII. Error Handling Strategy | PASS | Toast notifications for errors; error boundaries exist |

## Project Structure

### Documentation (this feature)

```text
specs/008-functional-integration/
├── spec.md              # Feature requirements
├── plan.md              # This file
├── research.md          # Technical decisions
├── data-model.md        # Client-side data structures
├── quickstart.md        # Setup guide
├── contracts/
│   └── component-props.md  # Component interface definitions
├── checklists/
│   └── requirements.md  # Spec quality checklist
└── tasks.md             # Implementation tasks (via /sp.tasks)
```

### Source Code (repository root)

```text
frontend/
├── app/
│   └── dashboard/
│       ├── page.tsx                    # Modern Bento Grid (existing)
│       ├── DashboardClient.tsx         # Old task list (existing)
│       ├── ModernDashboardWrapper.tsx  # Wrapper (existing)
│       └── list/
│           └── page.tsx                # NEW: Full task list route
├── components/
│   ├── dashboard/
│   │   ├── CreateTaskDialog.tsx        # NEW: Task creation modal
│   │   ├── SearchCommand.tsx           # NEW: Search command palette
│   │   ├── ModernDashboardClient.tsx   # MODIFIED: Dialog state
│   │   ├── NotesCard.tsx               # MODIFIED: localStorage
│   │   ├── EnergyCard.tsx              # MODIFIED: Link update
│   │   └── TasksSummaryCard.tsx        # MODIFIED: Clickable
│   └── ui/
│       ├── dialog.tsx                  # NEW via shadcn add
│       └── command.tsx                 # NEW via shadcn add
└── hooks/
    └── useDebounced.ts                 # Existing (reused)
```

**Structure Decision**: Web application with existing monorepo structure. All changes confined to `/frontend` directory per Constitution II.

## Complexity Tracking

> No constitution violations requiring justification.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | N/A | N/A |

---

## Architecture Overview

### Component Hierarchy

```
ModernDashboardClient (state owner)
├── DashboardHeader
├── EnergyCard (link to /dashboard/list)
├── DoNowCard (triggers CreateTaskDialog)
├── NotesCard (localStorage persistence)
├── TasksSummaryCard (link to /dashboard/list)
├── FloatingDock (triggers SearchCommand)
├── CreateTaskDialog (modal)
│   └── CreateTaskForm (existing)
└── SearchCommand (modal)
    └── useTasks hook (existing)
```

### State Management

```typescript
// ModernDashboardClient.tsx
function ModernDashboardClient({ user, onSignOut }) {
  // Dialog open/close states
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);

  return (
    <>
      {/* Pass callbacks to children */}
      <DoNowCard onAddTask={() => setIsCreateDialogOpen(true)} />
      <FloatingDock onSearch={() => setIsSearchDialogOpen(true)} />

      {/* Render dialogs */}
      <CreateTaskDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
      <SearchCommand
        open={isSearchDialogOpen}
        onOpenChange={setIsSearchDialogOpen}
      />
    </>
  );
}
```

---

## Component Designs

### 1. CreateTaskDialog

**Purpose**: Modal wrapper for task creation form (FR-001, FR-002)

**File**: `frontend/components/dashboard/CreateTaskDialog.tsx`

```typescript
interface CreateTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
```

**Implementation**:
- Import Shadcn `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`
- Render existing `CreateTaskForm` inside `DialogContent`
- Pass callback to close dialog on successful task creation
- Form should reset when dialog closes

**Key Points**:
- `CreateTaskForm` already handles form submission and cache invalidation
- Dialog provides overlay, focus trap, and escape/click-outside closing
- No additional form logic needed

### 2. SearchCommand

**Purpose**: Command palette for searching tasks (FR-005, FR-006, FR-007)

**File**: `frontend/components/dashboard/SearchCommand.tsx`

```typescript
interface SearchCommandProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
```

**Implementation**:
- Import Shadcn `CommandDialog`, `CommandInput`, `CommandList`, `CommandEmpty`, `CommandGroup`, `CommandItem`
- Local state for search query string
- Use `useDebounced(query, 300)` for debounced search
- Use `useTasks({ search: debouncedQuery })` for results
- Display loading state while fetching
- Limit displayed results to 10 (per edge case)
- On result click: navigate to `/dashboard/list` and close dialog

**Key Points**:
- `cmdk` provides keyboard navigation out of the box
- Empty state shows "No tasks found" message
- Search is case-insensitive (handled by backend)

### 3. NotesCard (Updated)

**Purpose**: Editable notes with localStorage persistence (FR-011, FR-012, FR-013)

**File**: `frontend/components/dashboard/NotesCard.tsx`

**Current State**: Renders 3 empty placeholder divs

**Updated Implementation**:
```typescript
function NotesCard() {
  const [notes, setNotes] = useState<[string, string, string]>(['', '', '']);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('kudu_quick_notes');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setNotes(parsed.notes || ['', '', '']);
      } catch {
        // Invalid JSON, use defaults
      }
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('kudu_quick_notes', JSON.stringify({ notes }));
    }
  }, [notes, isHydrated]);

  const updateNote = (index: number, value: string) => {
    const newNotes = [...notes] as [string, string, string];
    newNotes[index] = value;
    setNotes(newNotes);
  };

  return (
    // Replace placeholder divs with textareas
  );
}
```

**Key Points**:
- `isHydrated` flag prevents server/client mismatch
- JSON structure: `{ notes: [string, string, string] }`
- Storage key: `kudu_quick_notes`

### 4. Task List Route

**Purpose**: Full task management view with filters/sort (FR-009)

**File**: `frontend/app/dashboard/list/page.tsx`

**Implementation**:
- Copy authentication logic from existing `/dashboard/page.tsx`
- Render existing `DashboardClient` component (has TaskToolbar + TaskList)
- Add "Back to Dashboard" link for navigation

**Key Points**:
- Reuses all existing task list functionality
- No new components needed - just routing
- Same session/auth requirements as main dashboard

### 5. Component Updates

#### EnergyCard
- Change: `href="#"` → `href="/dashboard/list"`
- Use Next.js `Link` component for client-side navigation

#### TasksSummaryCard
- Wrap entire component in `<Link href="/dashboard/list">`
- Add `cursor-pointer` class for visual affordance

#### ModernDashboardClient
- Add `useState` for dialog open states
- Pass callbacks to DoNowCard and FloatingDock
- Render CreateTaskDialog and SearchCommand

---

## Implementation Sequence

### Phase 1: Dependencies (P0)
1. Install Shadcn Dialog and Command components

### Phase 2: Core Components (P1)
2. Create CreateTaskDialog component
3. Create SearchCommand component
4. Update ModernDashboardClient with dialog state

### Phase 3: Routing (P2)
5. Create /dashboard/list route
6. Update EnergyCard link
7. Update TasksSummaryCard to be clickable

### Phase 4: Persistence (P3)
8. Update NotesCard with localStorage

### Phase 5: Verification
9. Test all acceptance scenarios from spec

---

## Dependencies

### New Package Dependencies
```json
{
  "@radix-ui/react-dialog": "^1.x",
  "cmdk": "^1.x"
}
```

Installed via: `npx shadcn@latest add dialog command`

### Existing Dependencies Used
- `@tanstack/react-query` - useTasks, useCreateTask
- `react-hook-form` - CreateTaskForm
- `sonner` - Toast notifications
- `lucide-react` - Icons

---

## Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| CreateTaskForm doesn't close dialog on success | Medium | Medium | Pass onSuccess callback prop or listen to mutation state |
| Search debounce too slow/fast | Low | Low | 300ms is proven; adjust if needed based on testing |
| localStorage unavailable | Low | Low | Graceful degradation - notes work for session only |
| Hydration mismatch on NotesCard | Medium | Medium | isHydrated flag prevents SSR/CSR mismatch |

---

## Testing Strategy

### Manual Testing Checklist

- [ ] Task Creation: Click "+", fill form, submit, verify task in Do Now list
- [ ] Dialog Dismiss: Press Escape, click outside, verify dialog closes
- [ ] Search: Click Search icon, type query, verify results appear
- [ ] Search Navigation: Click search result, verify navigation
- [ ] List Route: Click "Start your day", verify /dashboard/list loads
- [ ] List Route: Click Tasks card, verify navigation
- [ ] Notes Persistence: Type in note, refresh, verify text persists
- [ ] Notes Clear: Clear note text, verify empty state

### Automated Testing (Future)

- Component tests for CreateTaskDialog, SearchCommand
- Integration tests for localStorage persistence
- E2E tests for full user flows

---

## Next Steps

Run `/sp.tasks` to generate the detailed task breakdown with atomic implementation steps.
