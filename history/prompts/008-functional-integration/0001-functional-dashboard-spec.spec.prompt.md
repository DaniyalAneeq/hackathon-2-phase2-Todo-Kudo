---
id: 0001
title: Functional Dashboard Restoration Specification
stage: spec
date: 2026-01-11
surface: agent
model: claude-opus-4-5-20251101
feature: 008-functional-integration
branch: 008-functional-integration
user: developer
command: /sp.specify
labels: ["dashboard", "integration", "task-creation", "search", "notes"]
links:
  spec: specs/008-functional-integration/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/008-functional-integration/spec.md
  - specs/008-functional-integration/checklists/requirements.md
tests:
  - null
---

## Prompt

I want to create a new specification for **Feature: Functional Dashboard Restoration**.

**Filename**: `specs/008-functional-integration.md`

**Context**:
The visual update (Spec 007) looks great but broke the connectivity to existing features (Spec 004/005/006). We need to wire the new UI to the existing logic to make it fully functional.

**Requirements**:

1.  **Feature: Task Creation (The "+" Button)**
    * **Agent**: `frontend-dev-agent` and Skills: `frontend_component_generator`
    * **Component**: Create `CreateTaskDialog.tsx`.
    * **Behavior**: When the "+" button on the "Do Now" card is clicked, open a Shadcn Dialog.
    * **Content**: Render the existing `CreateTaskForm` inside this dialog.
    * **Fix**: Ensure `CreateTaskForm` correctly saves Priority, Category (Select), and Due Date (Date Picker) to the DB.

2.  **Feature: Global Search (The Dock Icon)**
    * **Agent**: `frontend-dev-agent` and Skills:`frontend_component_generator`
    * **Component**: Create `SearchCommand.tsx` using Shadcn `Command` component.
    * **Behavior**: When the "Search" icon in the Dock is clicked, open this modal.
    * **Logic**: Connect the input to the existing `useTasks({ search: '...' })` hook. Display results dynamically. Clicking a result opens/expands that task.

3.  **Feature: Full Task Management (Restoring Filters/Sort)**
    * **Agent**: `fullstack_feature_integrator`
    * **Action**: Move the *old* dashboard logic (the table view with Sort/Filter/Toolbar) to a new route: `frontend/app/dashboard/list/page.tsx`.
    * **Link**: Update the "Tasks" card and "Start your day" link on the main Dashboard to navigate to `/dashboard/list`.
    * **Goal**: This restores the deep filtering/sorting capability that doesn't fit in the Bento Grid.

4.  **Feature: Functional Notes**
    * **Agent**: `frontend-dev-agent` and Skills:`frontend_component_generator`
    * **Update**: Update `NotesCard.tsx`.
    * **Logic**: Make the text areas editable. Use `useEffect` to save/load the content to `localStorage` (key: `kudu_quick_notes`) so data persists across reloads.

**Acceptance Criteria**:
* Clicking "+" opens a modal where I can select Category (Work/School/Personal), Priority, and Date, and successfully create a task.
* The "Do Now" list immediately updates when a high-priority task is created.
* Clicking "Search" in the dock allows me to find tasks by name.
* Clicking "Start your day" takes me to a full list view where I can sort and filter everything.
* Typing in "Notes" saves the text, even if I refresh the page.

## Response snapshot

Created comprehensive specification for Functional Dashboard Restoration feature (Spec 008). The spec covers 4 user stories:
1. P1: Task Creation from Dashboard modal (CreateTaskDialog)
2. P1: Global Search from Floating Dock (SearchCommand)
3. P2: Full Task List View at /dashboard/list route
4. P3: Persistent Quick Notes with localStorage

Defined 14 functional requirements (FR-001 through FR-014) covering modal behavior, task creation, search integration, navigation, and notes persistence. All acceptance scenarios use Given/When/Then format. Edge cases identified for network errors, large result sets, localStorage unavailability, and direct URL navigation.

## Outcome

- Impact: Created new feature spec enabling restoration of functional connectivity between modern UI and existing task management logic
- Tests: null (spec phase - no tests yet)
- Files: 2 files created (spec.md, checklists/requirements.md)
- Next prompts: /sp.clarify or /sp.plan to proceed with planning
- Reflection: Spec covers all 4 features requested; no clarification markers needed as requirements were clear and specific

## Evaluation notes (flywheel)

- Failure modes observed: None - requirements were well-defined in the user request
- Graders run and results (PASS/FAIL): Checklist validation PASS (all items checked)
- Prompt variant (if applicable): Standard /sp.specify flow
- Next experiment: Proceed to /sp.plan for implementation planning
