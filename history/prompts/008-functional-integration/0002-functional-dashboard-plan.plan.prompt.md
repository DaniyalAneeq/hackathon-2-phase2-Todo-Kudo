---
id: 0002
title: Functional Dashboard Implementation Plan
stage: plan
date: 2026-01-11
surface: agent
model: claude-opus-4-5-20251101
feature: 008-functional-integration
branch: 008-functional-integration
user: developer
command: /sp.plan
labels: ["architecture", "components", "state-management", "routing", "localStorage"]
links:
  spec: specs/008-functional-integration/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/008-functional-integration/plan.md
  - specs/008-functional-integration/research.md
  - specs/008-functional-integration/data-model.md
  - specs/008-functional-integration/quickstart.md
  - specs/008-functional-integration/contracts/component-props.md
tests:
  - null
---

## Prompt

The specification `specs/008-functional-integration/spec.md` is approved.

Now, perform the **PLAN** phase of the Spec-Kit workflow.

**Action**: Create `specs/008-functional-integration/plan.md`.

**Requirements for the Plan**:
1.  **Components**:
    * Plan `CreateTaskDialog.tsx`: It must accept an `open` prop and use the `Dialog` component from Shadcn. Inside, it renders `<CreateTaskForm />`.
    * Plan `SearchCommand.tsx`: A `CommandDialog` component that fetches tasks based on the input value using `useTasks({ search: query })`.
    * Plan `NotesCard.tsx`: Update the existing card to use `useLocalStorage` (or a simple `useEffect`) to save the textarea values.
2.  **Routing**:
    * Plan the new route `app/dashboard/list/page.tsx`. This file should basically copy the code from the *old* `dashboard/page.tsx` (the one with the Toolbar and Table).
3.  **Integration**:
    * Explain how `ModernDashboardClient` will state-manage the dialogs (e.g., `const [isSearchOpen, setIsSearchOpen] = useState(false)`).

Output the content for `plan.md`.

## Response snapshot

Created comprehensive implementation plan covering:

**Architecture**:
- Component hierarchy with ModernDashboardClient as state owner
- State management pattern: useState for dialog open states (isCreateDialogOpen, isSearchDialogOpen)
- Props drilling pattern for callbacks to child components

**Component Designs**:
1. CreateTaskDialog: Shadcn Dialog wrapping existing CreateTaskForm
2. SearchCommand: CommandDialog with useDebounced + useTasks integration
3. NotesCard: useEffect-based localStorage persistence with hydration handling
4. Task List Route: /dashboard/list reusing DashboardClient component

**Dependencies**:
- `npx shadcn@latest add dialog command` for new UI primitives

**Constitution Check**: All 7 principles PASS (no violations)

## Outcome

- Impact: Complete architectural plan enabling restoration of dashboard functionality
- Tests: Manual testing checklist defined; automated tests deferred to future
- Files: 5 files created (plan.md, research.md, data-model.md, quickstart.md, contracts/component-props.md)
- Next prompts: /sp.tasks to generate implementation tasks
- Reflection: Plan leverages existing components (CreateTaskForm, useTasks, DashboardClient) to minimize new code

## Evaluation notes (flywheel)

- Failure modes observed: None - existing components well-structured for integration
- Graders run and results (PASS/FAIL): Constitution check PASS (7/7 principles)
- Prompt variant (if applicable): Standard /sp.plan flow
- Next experiment: Proceed to /sp.tasks for atomic task breakdown
