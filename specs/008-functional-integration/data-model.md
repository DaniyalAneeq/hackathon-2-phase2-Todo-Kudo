# Data Model: Functional Dashboard Restoration

**Feature Branch**: `008-functional-integration`
**Date**: 2026-01-11

## Existing Entities (No Changes Required)

### Task Entity

Already defined in backend and used by frontend hooks. No schema changes.

```typescript
interface Task {
  id: string;
  title: string;
  description: string | null;
  priority: 'low' | 'medium' | 'high';
  category: string | null; // 'Work' | 'School' | 'Personal'
  due_date: string | null; // ISO date string
  is_completed: boolean;
  created_at: string;
  user_id: string;
}
```

## New Client-Side Entities

### QuickNotes

Client-side only data stored in localStorage. Not synced to backend.

```typescript
interface QuickNotes {
  notes: [string, string, string]; // Fixed array of 3 notes
}

// localStorage key
const STORAGE_KEY = 'kudu_quick_notes';

// Default value
const DEFAULT_NOTES: QuickNotes = {
  notes: ['', '', '']
};
```

**Persistence**:
- Stored as JSON string in localStorage
- Loaded on component mount
- Saved on every change (debounced optional)
- Graceful fallback if localStorage unavailable

## State Management

### ModernDashboardClient State

```typescript
// Dialog states (lifted to parent for prop drilling)
interface DashboardDialogState {
  isCreateDialogOpen: boolean;
  isSearchDialogOpen: boolean;
}

// Actions passed to child components
interface DashboardDialogActions {
  onOpenCreateDialog: () => void;
  onCloseCreateDialog: () => void;
  onOpenSearchDialog: () => void;
  onCloseSearchDialog: () => void;
}
```

### SearchCommand State

```typescript
interface SearchCommandState {
  query: string;           // Raw input value
  debouncedQuery: string;  // Debounced for API calls
  isLoading: boolean;      // From useTasks query
  results: Task[];         // Filtered tasks
}
```

### NotesCard State

```typescript
interface NotesCardState {
  notes: [string, string, string];  // Current note values
  isLoaded: boolean;                // Hydration complete
}
```

## API Contracts (Existing - No Changes)

This feature uses existing API endpoints:

### GET /api/tasks

```typescript
// Request
interface TasksRequest {
  search?: string;
  priority?: 'low' | 'medium' | 'high' | '';
  category?: string;
  sortBy?: 'created_at' | 'due_date' | 'priority';
  order?: 'asc' | 'desc';
}

// Response
interface TasksResponse {
  tasks: Task[];
  total: number;
}
```

### POST /api/tasks

```typescript
// Request
interface CreateTaskRequest {
  title: string;
  description?: string | null;
  priority: 'low' | 'medium' | 'high';
  category?: string | null;
  due_date?: string | null;
}

// Response
interface CreateTaskResponse {
  id: string;
  title: string;
  // ... full Task object
}
```

## Validation Rules

### Task Creation (via CreateTaskForm)

Already implemented in `frontend/schemas/task.ts`:
- title: Required, max 255 characters
- description: Optional, max 2000 characters
- priority: Required, one of 'low' | 'medium' | 'high'
- category: Optional, one of 'Work' | 'School' | 'Personal'
- due_date: Optional, valid date

### Quick Notes

- Each note: max 500 characters (soft limit, truncate on save)
- Array length: Always exactly 3 elements
