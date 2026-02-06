# Data Model: Modern Dashboard Redesign

**Feature**: 007-modern-dashboard
**Date**: 2026-01-09

## Overview

This feature is **frontend-only** and does not introduce new database entities or backend changes. It consumes existing Task data through the established API.

---

## Existing Entities (Read-Only)

### Task (from Spec 002/004)

The dashboard consumes Task data but does not modify the schema.

**Attributes Used by Dashboard**:

| Attribute | Type | Usage in Dashboard |
|-----------|------|-------------------|
| `id` | integer | Unique identifier for task operations |
| `title` | string | Displayed in Do Now card task list |
| `is_completed` | boolean | Checkbox state, toggleable |
| `priority` | enum (low/medium/high) | Filter criteria for Do Now card |
| `user_id` | string (FK) | Implicit - API filters by authenticated user |

**Query Filter**:
```
GET /api/tasks?priority=high&limit=3
```

---

## Frontend State Models

### DashboardState (Client-Side)

Represents the transient state of the dashboard UI.

```typescript
interface DashboardState {
  // User Session (from auth context)
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };

  // High Priority Tasks (from API)
  priorityTasks: Task[];
  isLoadingTasks: boolean;
  tasksError: Error | null;

  // Task Summary (from API)
  totalTaskCount: number;

  // Mock Data (static for now)
  energyLevel: number; // 0-100
  completedToday: number;
  totalPlannedToday: number;
}
```

### EnergyCardData (Mock)

Static mock data for the Energy Card.

```typescript
interface EnergyCardData {
  energyPercentage: number; // Always 100 for now
  completedTasks: number;   // Always 0 for now
  totalTasks: number;       // Always 0 for now
  actionLabel: string;      // "Start your day"
  actionHref: string;       // "#" or dashboard action
}

// Default mock values
const defaultEnergyData: EnergyCardData = {
  energyPercentage: 100,
  completedTasks: 0,
  totalTasks: 0,
  actionLabel: "Start your day",
  actionHref: "#"
};
```

### NotesCardData (Mock)

Static mock data for the Notes Card.

```typescript
interface NoteSlot {
  id: number;
  isEmpty: boolean;
  content?: string;
}

interface NotesCardData {
  slots: NoteSlot[];
}

// Default mock values (3 empty slots)
const defaultNotesData: NotesCardData = {
  slots: [
    { id: 1, isEmpty: true },
    { id: 2, isEmpty: true },
    { id: 3, isEmpty: true }
  ]
};
```

### FloatingDockConfig

Configuration for the floating dock icons.

```typescript
interface DockItem {
  id: string;
  icon: LucideIcon;
  label: string;
  size: 'normal' | 'large';
  action: () => void;
}

const dockItems: DockItem[] = [
  { id: 'brain', icon: Brain, label: 'Context', size: 'normal', action: () => {} },
  { id: 'mic', icon: Mic, label: 'Voice', size: 'large', action: () => {} },
  { id: 'search', icon: Search, label: 'Search', size: 'normal', action: triggerSearch }
];
```

---

## API Contract (Existing - No Changes)

### GET /api/tasks

**Request**:
```
GET /api/tasks?priority=high&limit=3
Authorization: Bearer <jwt_token>
```

**Response** (TasksResponse):
```json
{
  "tasks": [
    {
      "id": 1,
      "title": "Complete project report",
      "description": "...",
      "is_completed": false,
      "priority": "high",
      "category": "Work",
      "due_date": "2026-01-10",
      "created_at": "2026-01-05T10:00:00Z",
      "updated_at": "2026-01-05T10:00:00Z",
      "user_id": "user_123"
    }
  ],
  "total": 5
}
```

**Note**: The `limit` parameter may need to be added if not already supported. Client-side slicing is acceptable as a fallback.

---

## State Management Approach

### React Query for Server State

```typescript
// Hook for high-priority tasks
const usePriorityTasks = () => {
  return useQuery({
    queryKey: ['tasks', { priority: 'high' }],
    queryFn: () => fetchTasks({ priority: 'high' }),
    select: (data) => data.tasks.slice(0, 3) // Limit to 3
  });
};

// Hook for total task count
const useTaskCount = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: () => fetchTasks(),
    select: (data) => data.total
  });
};
```

### Local State for Mock Data

Mock data is static and defined as constants, not managed by React Query.

---

## Validation Rules

No new validation rules required. This feature consumes existing validated data.

---

## State Transitions

### Task Completion Toggle

```
[Checkbox Unchecked] --click--> [Optimistic Update] --API Success--> [Checkbox Checked]
                                                     --API Failure--> [Revert + Toast Error]
```

Handled by existing mutation pattern in the codebase.
