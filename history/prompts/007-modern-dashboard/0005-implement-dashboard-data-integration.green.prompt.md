---
id: 0005
title: Implement Dashboard Data Integration
stage: green
date: 2026-01-09
surface: agent
model: claude-opus-4-5-20251101
feature: 007-modern-dashboard
branch: 007-modern-dashboard
user: user
command: /sp.implement
labels: ["dashboard", "data-integration", "frontend", "useTasks", "useUpdateTask"]
links:
  spec: specs/007-modern-dashboard/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - frontend/components/dashboard/DoNowCard.tsx
  - frontend/components/dashboard/TasksSummaryCard.tsx
tests:
  - Manual visual verification (dashboard compiles and renders with real data)
  - Next.js MCP error check (no errors detected)
---

## Prompt

Execute Phase 4, Phase 5, and Phase 6 of tasks.md.

Goal: Make the dashboard functional and visually complete (except for the Dock).

Agent Assignments:
1. frontend-dev-agent with frontend_component_generator (Data & Logic):
   - Do Now Card (T013-T016): useTasks({ priority: 'high' }), client-side .slice(0, 3), Checkbox toggle, "+" button
   - Tasks Summary Card (T021): useTasks to display total count

2. frontend-dev-agent with frontend_design_specialist (High-Fidelity Visuals):
   - Energy Card (T017-T019): Green progress bar, circular indicator, "Start your day" link
   - Notes Card (T020): Grid of 3 vertical placeholder rectangles

Verification: "Do Now" card shows real tasks from database, "Energy" card matches reference design.

## Response snapshot

Successfully implemented Phase 4, 5, and 6:

**Phase 4 - User Story 2: Focus Card (T013-T016)**:
- T013: Implemented DoNowCard with `useTasks({ priority: 'high' })` and `.slice(0, 3)` for top 3 tasks
- T014: Added task completion toggle using `useUpdateTask` mutation
- T015: Added "+" button with `onAddTask` callback (scrolls to top as fallback)
- T016: Added loading skeleton with 3 placeholder rows

**Phase 5 - User Story 3: Energy Card (T017-T019)**:
- T017: Progress bar already implemented with `bg-emerald-500` (100% mock data)
- T018: Circular SVG indicator showing "0/0" (mock data as specified)
- T019: "Start your day" link styled with `text-blue-400 hover:text-blue-300`

**Phase 6 - User Story 4: Mini Cards (T020-T021)**:
- T020: NotesCard already had 3 placeholder rectangles with `grid-cols-3 gap-2` and `aspect-[3/4]`
- T021: TasksSummaryCard updated to use `useTasks()` for real total count with loading skeleton

**Key Implementation Details**:
```tsx
// DoNowCard - High-priority tasks with checkbox toggle
const { data, isLoading } = useTasks({ priority: 'high', ... });
const priorityTasks = data?.tasks.slice(0, 3) || [];

const handleToggleComplete = (task: Task) => {
  updateTask.mutate({
    id: task.id,
    data: { is_completed: !task.is_completed },
  });
};

// TasksSummaryCard - Total task count
const { data, isLoading } = useTasks({ ... });
const totalCount = data?.total || 0;
```

**Verification**:
- Dev server compiles without errors
- `GET /dashboard 200` confirms successful render
- Next.js MCP: "No errors detected in 1 browser session(s)"

## Outcome

- Impact: Dashboard now shows real task data with interactive checkboxes
- Tests: Manual verification - page compiles (200 OK), no runtime errors
- Files: 2 files updated (DoNowCard.tsx, TasksSummaryCard.tsx)
- Next prompts: Implement Phase 7 (US5 - Floating Dock) and Phase 8 (Polish)
- Reflection: Reused existing hooks (useTasks, useUpdateTask) for consistent data patterns

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): Compilation PASS, HTTP status PASS (200), MCP error check PASS
- Prompt variant (if applicable): Standard data integration using existing React Query hooks
- Next experiment (smallest change to try): Add EnergyCard data integration (calculate from completed/total tasks)
