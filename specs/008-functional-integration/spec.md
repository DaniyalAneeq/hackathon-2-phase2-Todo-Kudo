# Feature Specification: Functional Dashboard Restoration

**Feature Branch**: `008-functional-integration`
**Created**: 2026-01-11
**Status**: Draft
**Input**: User description: "Wire the new Bento Grid dashboard UI (Spec 007) to existing task management logic (Spec 004/005/006) to restore full functionality"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Create Task from Dashboard (Priority: P1)

As a user viewing my dashboard, I want to quickly create a new task by clicking the "+" button on the "Do Now" card, so that I can add high-priority items without leaving the modern dashboard view.

**Why this priority**: Task creation is the core functionality; without it, the dashboard is read-only and delivers no value. This is the primary user interaction.

**Independent Test**: Can be fully tested by clicking the "+" button, filling in task details (title, category, priority, due date), submitting, and verifying the task appears in the Do Now list. Delivers immediate value by restoring task creation.

**Acceptance Scenarios**:

1. **Given** I am on the modern dashboard, **When** I click the "+" button on the Do Now card, **Then** a modal dialog opens with the task creation form.
2. **Given** the task creation dialog is open, **When** I enter a title, select "Work" category, set priority to "High", pick a due date, and click submit, **Then** the dialog closes and the task is saved to the database.
3. **Given** I just created a high-priority task, **When** the dialog closes, **Then** the Do Now list immediately shows the new task without page refresh.
4. **Given** the task creation dialog is open, **When** I click outside the dialog or press Escape, **Then** the dialog closes without creating a task.

---

### User Story 2 - Search Tasks from Dashboard (Priority: P1)

As a user with many tasks, I want to search for tasks by name using the Search icon in the floating dock, so that I can quickly find specific items without navigating away.

**Why this priority**: Search is essential for users with multiple tasks to find items quickly. Without it, the dashboard loses discoverability.

**Independent Test**: Can be fully tested by clicking the Search icon, typing a partial task name, and verifying matching tasks appear. Clicking a result should highlight or expand that task.

**Acceptance Scenarios**:

1. **Given** I am on the modern dashboard, **When** I click the Search icon in the floating dock, **Then** a command palette modal opens with a search input focused.
2. **Given** the search modal is open, **When** I type "grocery", **Then** tasks containing "grocery" in the title appear as results in real-time.
3. **Given** search results are displayed, **When** I click on a task result, **Then** the modal closes and I am navigated to see that task's details.
4. **Given** the search modal is open, **When** I press Escape or click outside, **Then** the modal closes.
5. **Given** the search modal is open with no matching results, **When** I search for "xyz123nonexistent", **Then** an empty state message appears indicating no tasks found.

---

### User Story 3 - Access Full Task List View (Priority: P2)

As a user who needs advanced filtering and sorting, I want to access the full task list view from the dashboard, so that I can manage all my tasks with the complete toolbar functionality.

**Why this priority**: Power users need access to filtering/sorting that doesn't fit in the Bento Grid. This restores deep task management without cluttering the modern dashboard.

**Independent Test**: Can be tested by clicking "Start your day" or the Tasks card, verifying navigation to `/dashboard/list`, and confirming the full filter/sort toolbar is available.

**Acceptance Scenarios**:

1. **Given** I am on the modern dashboard, **When** I click the "Start your day" link in the Energy card, **Then** I am navigated to `/dashboard/list` showing the full task list.
2. **Given** I am on the modern dashboard, **When** I click anywhere on the Tasks summary card, **Then** I am navigated to `/dashboard/list`.
3. **Given** I am on `/dashboard/list`, **When** the page loads, **Then** I see the full task list with the TaskToolbar (filter/sort controls).
4. **Given** I am on `/dashboard/list`, **When** I use the priority filter to select "High", **Then** only high-priority tasks are displayed.

---

### User Story 4 - Persistent Quick Notes (Priority: P3)

As a user, I want to jot down quick notes on the dashboard that persist across page reloads, so that I can keep reminders visible without creating formal tasks.

**Why this priority**: Notes enhance the dashboard experience but are not core task management. They provide supplementary value.

**Independent Test**: Can be tested by typing text into a note area, refreshing the page, and verifying the text is still present.

**Acceptance Scenarios**:

1. **Given** I am on the modern dashboard, **When** I click on a note placeholder in the Notes card, **Then** the placeholder becomes an editable text area.
2. **Given** I am editing a note, **When** I type "Buy groceries" and click away, **Then** the text is automatically saved.
3. **Given** I have saved notes, **When** I refresh the page, **Then** my notes are still displayed with the saved content.
4. **Given** I have notes content, **When** I clear all text in a note and click away, **Then** the note reverts to its empty placeholder state.

---

### Edge Cases

- What happens when task creation fails due to network error? Display error toast and keep dialog open with form data preserved.
- What happens when search returns hundreds of results? Limit displayed results to 10 most relevant with indication that more exist.
- What happens when localStorage is unavailable (private browsing)? Notes should still work for the current session but won't persist after refresh; no error shown to user.
- What happens when the user navigates to `/dashboard/list` directly without going through the main dashboard? Page should work independently.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a modal dialog when the "+" button on the Do Now card is clicked
- **FR-002**: The task creation dialog MUST render the existing `CreateTaskForm` component with full functionality
- **FR-003**: System MUST support selecting Category (Work/School/Personal), Priority (Low/Medium/High), and Due Date in the creation dialog
- **FR-004**: System MUST invalidate the tasks query cache after successful task creation to trigger immediate UI refresh
- **FR-005**: System MUST display a command palette modal when the Search icon in the floating dock is clicked
- **FR-006**: The search modal MUST connect to the existing `useTasks` hook with the `search` filter parameter
- **FR-007**: Search results MUST update in real-time as the user types (debounced for performance)
- **FR-008**: System MUST navigate to task details when a search result is clicked
- **FR-009**: System MUST preserve the full task list view with TaskToolbar at the `/dashboard/list` route
- **FR-010**: The Energy card "Start your day" link and Tasks card MUST navigate to `/dashboard/list`
- **FR-011**: The Notes card MUST provide editable text areas for quick notes
- **FR-012**: Notes content MUST persist to `localStorage` using the key `kudu_quick_notes`
- **FR-013**: Notes MUST load saved content on component mount
- **FR-014**: All dialog modals MUST be closeable via Escape key, clicking outside, or explicit close button

### Key Entities

- **Task**: Existing entity with id, title, description, priority (low/medium/high), category (Work/School/Personal), due_date, is_completed, created_at, user_id
- **QuickNotes**: Client-side only data structure stored in localStorage, containing an array of 3 note strings

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can create a task from the dashboard modal in under 30 seconds
- **SC-002**: Search results appear within 500ms of user stopping typing
- **SC-003**: New high-priority tasks appear in the Do Now list immediately after creation (no page refresh required)
- **SC-004**: Notes persist across page reloads with 100% data retention
- **SC-005**: All four main features (create, search, list navigation, notes) are accessible within 2 clicks from the main dashboard
- **SC-006**: Task creation form captures all required fields (title, category, priority, due date) without data loss

## Assumptions

- The existing `CreateTaskForm`, `useTasks`, `useCreateTask`, `TaskToolbar`, and `TaskList` components are fully functional
- The backend API supports the search parameter in the tasks endpoint
- Users have JavaScript enabled (required for localStorage and interactive features)
- The Shadcn Dialog and Command components are already installed or will be installed
- React Query is configured and provides cache invalidation capabilities

## Out of Scope

- Backend API changes (all functionality uses existing endpoints)
- Authentication changes (uses existing Better Auth integration)
- Database schema changes
- Mobile-specific responsive optimizations beyond existing Tailwind breakpoints
- AI Assistant and Voice Input features (shown in dock but marked as "coming soon")
- Task editing from search results (view/navigate only)
