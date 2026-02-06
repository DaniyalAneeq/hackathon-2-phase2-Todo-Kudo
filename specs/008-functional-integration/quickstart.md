# Quickstart: Functional Dashboard Restoration

**Feature Branch**: `008-functional-integration`
**Date**: 2026-01-11

## Prerequisites

1. Node.js 18+ installed
2. Frontend dev server accessible (`cd frontend && npm run dev`)
3. Backend API running (`cd backend && fastapi dev main.py`)
4. Authenticated user session (logged in)

## Quick Setup

### 1. Install Required Shadcn Components

```bash
cd frontend
npx shadcn@latest add dialog command
```

This installs:
- `@radix-ui/react-dialog`
- `cmdk`
- Pre-styled Dialog and Command components

### 2. Verify Installation

Check that these files exist after installation:
- `frontend/components/ui/dialog.tsx`
- `frontend/components/ui/command.tsx`

## Development Workflow

### Task 1: CreateTaskDialog Component

```bash
# Create the component
touch frontend/components/dashboard/CreateTaskDialog.tsx

# Verify by running dev server and checking imports work
npm run dev
```

### Task 2: SearchCommand Component

```bash
# Create the component
touch frontend/components/dashboard/SearchCommand.tsx

# Verify by checking Command component import works
```

### Task 3: Task List Route

```bash
# Create the route directory and page
mkdir -p frontend/app/dashboard/list
touch frontend/app/dashboard/list/page.tsx

# Verify by navigating to http://localhost:3000/dashboard/list
```

### Task 4: Update Existing Components

Files to modify:
- `frontend/components/dashboard/ModernDashboardClient.tsx`
- `frontend/components/dashboard/NotesCard.tsx`
- `frontend/components/dashboard/EnergyCard.tsx`
- `frontend/components/dashboard/TasksSummaryCard.tsx`

## Verification Commands

### Test Task Creation Flow
1. Navigate to `/dashboard`
2. Click "+" button on Do Now card
3. Fill form and submit
4. Verify task appears in Do Now list

### Test Search Flow
1. Navigate to `/dashboard`
2. Click Search icon in floating dock
3. Type a task name
4. Click a result
5. Verify navigation to task list

### Test List Navigation
1. Navigate to `/dashboard`
2. Click "Start your day" link
3. Verify navigation to `/dashboard/list`
4. Verify TaskToolbar is visible

### Test Notes Persistence
1. Navigate to `/dashboard`
2. Type in a note field
3. Refresh page
4. Verify note content persists

## File Structure After Implementation

```
frontend/
├── app/
│   └── dashboard/
│       ├── page.tsx                    # Modern Bento Grid dashboard
│       └── list/
│           └── page.tsx                # NEW: Full task list view
├── components/
│   ├── dashboard/
│   │   ├── CreateTaskDialog.tsx        # NEW: Task creation modal
│   │   ├── SearchCommand.tsx           # NEW: Search command palette
│   │   ├── ModernDashboardClient.tsx   # MODIFIED: Dialog state management
│   │   ├── NotesCard.tsx               # MODIFIED: localStorage persistence
│   │   ├── EnergyCard.tsx              # MODIFIED: Link to /dashboard/list
│   │   ├── TasksSummaryCard.tsx        # MODIFIED: Clickable navigation
│   │   ├── DoNowCard.tsx               # Unchanged (already has onAddTask)
│   │   ├── FloatingDock.tsx            # Unchanged (already has onSearch)
│   │   └── DashboardHeader.tsx         # Unchanged
│   └── ui/
│       ├── dialog.tsx                  # NEW: Shadcn Dialog
│       └── command.tsx                 # NEW: Shadcn Command
└── hooks/
    └── useDebounced.ts                 # Existing (used by SearchCommand)
```

## Common Issues

### Dialog Not Opening
- Check that `isCreateDialogOpen` state is being set to `true`
- Verify `onAddTask` prop is passed from ModernDashboardClient to DoNowCard

### Search Not Returning Results
- Check that backend API supports `search` query parameter
- Verify debounced query is being passed to `useTasks`

### Notes Not Persisting
- Check localStorage key is exactly `kudu_quick_notes`
- Verify JSON.stringify/parse is working correctly
- Check for hydration errors in console

### List Route 404
- Ensure file is at exact path: `frontend/app/dashboard/list/page.tsx`
- Verify export default function component
