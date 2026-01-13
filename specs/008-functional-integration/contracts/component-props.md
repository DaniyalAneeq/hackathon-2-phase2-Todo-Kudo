# Component Props Contracts: Functional Dashboard Restoration

**Feature Branch**: `008-functional-integration`
**Date**: 2026-01-11

## New Components

### CreateTaskDialog

**Location**: `frontend/components/dashboard/CreateTaskDialog.tsx`

```typescript
interface CreateTaskDialogProps {
  /**
   * Controls whether the dialog is open
   */
  open: boolean;

  /**
   * Callback when dialog should close
   * Called on: Escape key, click outside, successful submit, cancel button
   */
  onOpenChange: (open: boolean) => void;
}
```

**Implementation Notes**:
- Uses Shadcn `Dialog` component
- Renders `CreateTaskForm` inside `DialogContent`
- Form resets on close via useForm reset
- On successful task creation: calls `onOpenChange(false)`

### SearchCommand

**Location**: `frontend/components/dashboard/SearchCommand.tsx`

```typescript
interface SearchCommandProps {
  /**
   * Controls whether the command palette is open
   */
  open: boolean;

  /**
   * Callback when dialog should close
   * Called on: Escape key, click outside, result selection
   */
  onOpenChange: (open: boolean) => void;
}
```

**Implementation Notes**:
- Uses Shadcn `CommandDialog` component
- Internal state for search query
- Uses `useDebounced` hook for query
- Uses `useTasks({ search: debouncedQuery })` for results
- On result click: navigates to `/dashboard/list` and closes

## Updated Components

### ModernDashboardClient

**Location**: `frontend/components/dashboard/ModernDashboardClient.tsx`

```typescript
interface ModernDashboardClientProps {
  user: {
    name: string;
    email: string;
    image?: string;
  };
  onSignOut: () => void;
}

// Internal state additions:
// - isCreateDialogOpen: boolean
// - isSearchDialogOpen: boolean
```

**Changes Required**:
- Add useState for `isCreateDialogOpen` and `isSearchDialogOpen`
- Pass `onAddTask={() => setIsCreateDialogOpen(true)}` to DoNowCard
- Pass `onSearch={() => setIsSearchDialogOpen(true)}` to FloatingDock
- Render `CreateTaskDialog` and `SearchCommand` with open/onOpenChange props

### DoNowCard

**Location**: `frontend/components/dashboard/DoNowCard.tsx`

```typescript
interface DoNowCardProps {
  /**
   * Callback when the "+" button is clicked
   * Opens the task creation dialog
   */
  onAddTask?: () => void;
}
```

**Changes Required**: None (already accepts `onAddTask` prop)

### FloatingDock

**Location**: `frontend/components/dashboard/FloatingDock.tsx`

```typescript
interface FloatingDockProps {
  /**
   * Callback when the search icon is clicked
   * Opens the search command palette
   */
  onSearch?: () => void;
}
```

**Changes Required**: None (already accepts `onSearch` prop)

### NotesCard

**Location**: `frontend/components/dashboard/NotesCard.tsx`

```typescript
interface NotesCardProps {
  // No props - self-contained with localStorage
}

// Internal state:
// - notes: [string, string, string]
// - isLoaded: boolean (for hydration)
```

**Changes Required**:
- Add `useState` for notes array
- Add `useEffect` to load from localStorage on mount
- Add `useEffect` to save to localStorage on notes change
- Replace placeholder divs with `<textarea>` elements
- Handle hydration mismatch with isLoaded flag

### EnergyCard

**Location**: `frontend/components/dashboard/EnergyCard.tsx`

```typescript
interface EnergyCardProps {
  energyPercentage?: number;
  completedTasks?: number;
  totalTasks?: number;
}
```

**Changes Required**:
- Update "Start your day" link from `href="#"` to `href="/dashboard/list"`

### TasksSummaryCard

**Location**: `frontend/components/dashboard/TasksSummaryCard.tsx`

```typescript
interface TasksSummaryCardProps {
  // No props - self-contained with useTasks
}
```

**Changes Required**:
- Wrap component in `<Link href="/dashboard/list">` for clickable navigation
- Add cursor-pointer styling
