---
id: 0003
title: Functional Dashboard Task Breakdown
stage: tasks
date: 2026-01-11
surface: agent
model: claude-opus-4-5-20251101
feature: 008-functional-integration
branch: 008-functional-integration
user: developer
command: /sp.tasks
labels: ["task-breakdown", "implementation", "user-stories", "verification"]
links:
  spec: specs/008-functional-integration/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/008-functional-integration/tasks.md
tests:
  - null
---

## Prompt

The plan `specs/008-functional-integration/plan.md` is approved.

Now, perform the **TASKS** phase of the Spec-Kit workflow.

**Action**: Create `specs/008-functional-integration/tasks.md`.

**Task Breakdown Strategy**:

**Phase 1: Dependencies & Routing (Agent: fullstack_feature_integrator)**
1.  **Dependencies**: Install `dialog` and `command` from Shadcn.
2.  **Route**: Create `frontend/app/dashboard/list/page.tsx`.
    * **Action**: Copy the logic from the *old* `DashboardClient.tsx` (or import it directly if it's reusable) to render the full Table View here.

**Phase 2: Functional Components (Agent: `frontend-dev-agent` and Skills:frontend_component_generator)**
3.  **Search**: Create `SearchCommand.tsx`.
    * **Logic**: Use `cmdk` + `useTasks({ search: query })`.
4.  **Create Task**: Create `CreateTaskDialog.tsx`.
    * **Logic**: Render `<CreateTaskForm />` inside a `<Dialog>`. Add a callback `onSuccess` to close the modal.
5.  **Notes**: Update `NotesCard.tsx`.
    * **Logic**: Implement `localStorage` persistence for the 3 textareas.

**Phase 3: Wiring (Agent: fullstack_feature_integrator)**
6.  **Dashboard**: Update `ModernDashboardClient.tsx`.
    * **State**: Add `useState` for `isCreateOpen` and `isSearchOpen`.
    * **Links**: Update "Tasks" card to link to `/dashboard/list`.
    * **Events**: Wire the "+" button to `setIsCreateOpen(true)` and the Dock Search icon to `setIsSearchOpen(true)`.

**Phase 4: QA (Agent:`qa-spec-validator-agent` and Skills: qa_runner)**
7.  **Build Check**: Run `npm run build`.
8.  **Visual Check**: Verify the modal opens and the route navigation works.

**Output Requirement**:
For every task, include the specific **Verification Command**.

## Response snapshot

Generated comprehensive tasks.md with 18 atomic tasks organized by user story:

**Phase Structure**:
- Phase 1: Setup (T001-T003) - Install Shadcn dialog and command
- Phase 2: Foundational (T004) - Add dialog state hooks to ModernDashboardClient
- Phase 3: US1 Task Creation (T005-T007) - CreateTaskDialog component and wiring
- Phase 4: US2 Search (T008-T010) - SearchCommand component and wiring
- Phase 5: US3 List Route (T011-T013) - /dashboard/list route and navigation links
- Phase 6: US4 Notes (T014) - NotesCard localStorage persistence
- Phase 7: Polish (T015-T018) - Build verification and QA

**Key Features**:
- Every task has specific verification command
- Tasks organized by user story for independent testing
- Parallel opportunities identified (US1/US2 can run simultaneously)
- MVP defined as US1 only (7 tasks)
- Manual testing checklist for each user story checkpoint

## Outcome

- Impact: Complete task breakdown enabling incremental implementation of all 4 user stories
- Tests: Manual verification commands provided for each task (no automated tests per spec)
- Files: 1 file created (tasks.md)
- Next prompts: /sp.implement to execute tasks or direct implementation
- Reflection: Tasks follow strict checklist format with [ID] [P?] [Story] structure; verification commands use grep/ls for quick validation

## Evaluation notes (flywheel)

- Failure modes observed: None - clear task boundaries and verification commands
- Graders run and results (PASS/FAIL): Format validation PASS (all 18 tasks follow checklist format)
- Prompt variant (if applicable): Standard /sp.tasks flow with verification commands
- Next experiment: Execute tasks starting with MVP (US1 - Task Creation)
