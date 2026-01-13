# Research: Functional Dashboard Restoration

**Feature Branch**: `008-functional-integration`
**Date**: 2026-01-11
**Spec**: [spec.md](./spec.md)

## Research Questions

### 1. Shadcn Dialog and Command Components

**Decision**: Use Shadcn Dialog and Command components via `npx shadcn@latest add dialog command`

**Rationale**:
- Shadcn components are already the established pattern in this project (Button, Card, Select, etc. use Radix UI)
- Dialog provides modal overlay with accessibility (focus trap, escape key, click outside)
- Command provides cmdk-based search palette with keyboard navigation
- Both integrate seamlessly with existing Tailwind styling approach

**Alternatives Considered**:
- Raw Radix Dialog: Rejected because Shadcn provides pre-styled wrapper that matches existing UI
- Custom modal: Rejected due to accessibility concerns and maintenance overhead
- Headless UI: Rejected because project already uses Radix primitives

### 2. State Management for Dialog Open/Close

**Decision**: Use React useState in ModernDashboardClient for dialog open states

**Rationale**:
- Simple, co-located state is sufficient for 2-3 dialog toggles
- No need for global state management (Context, Zustand) for UI-only state
- Follows existing patterns in the codebase (no external state library for UI)

**Alternatives Considered**:
- React Context: Rejected as overkill for 2 boolean states
- URL state: Rejected as dialogs shouldn't be bookmarkable/shareable
- Zustand/Redux: Rejected due to unnecessary complexity

### 3. Search Debouncing Strategy

**Decision**: Use existing `useDebounced` hook (300ms default) for search input

**Rationale**:
- Hook already exists at `frontend/hooks/useDebounced.ts`
- 300ms delay balances responsiveness with API call reduction
- Matches SC-002 requirement (results within 500ms of stopping typing)

**Alternatives Considered**:
- Immediate API calls: Rejected due to excessive network requests
- Longer debounce (500ms+): Rejected as would feel sluggish
- Custom implementation: Rejected since existing hook is well-tested

### 4. Notes localStorage Persistence

**Decision**: Use simple useEffect with JSON.stringify/parse for localStorage

**Rationale**:
- Notes are a simple array of 3 strings - no complex serialization needed
- useEffect handles component lifecycle (load on mount, save on change)
- No external library dependency for basic localStorage operations

**Alternatives Considered**:
- useLocalStorage hook library: Rejected to avoid new dependency for simple use case
- IndexedDB: Rejected as overkill for small text data
- Server-side storage: Out of scope per spec; client-only data

### 5. Task List Route Architecture

**Decision**: Create `/dashboard/list/page.tsx` by extracting DashboardClient logic

**Rationale**:
- Next.js App Router supports nested routes naturally
- Existing DashboardClient already has TaskToolbar + TaskList + filters
- New route can import shared components while main dashboard uses Bento Grid

**Alternatives Considered**:
- Query parameter toggle: Rejected as less clean URL structure
- Separate layout: Rejected as both routes share authentication/session
- Modal for list view: Rejected as doesn't match user expectations for "full" view

## Dependencies to Install

```bash
npx shadcn@latest add dialog command
```

These install:
- `@radix-ui/react-dialog` (Dialog primitive)
- `cmdk` (Command primitive)
- Pre-styled Shadcn wrapper components

## Technical Constraints Verified

- **Existing useTasks hook**: Supports `search` filter parameter ✅
- **Existing useCreateTask hook**: Handles cache invalidation ✅
- **Existing CreateTaskForm**: Full-featured form with all fields ✅
- **Existing useDebounced hook**: Available for search debouncing ✅
- **Navigation**: Next.js Link/useRouter available ✅
