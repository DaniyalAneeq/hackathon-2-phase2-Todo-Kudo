# Feature Specification: Modern Dashboard Redesign

**Feature Branch**: `007-modern-dashboard`
**Created**: 2026-01-09
**Status**: Draft
**Input**: User description: "Modern Dashboard Redesign - Replace current table view with Personal OS bento grid layout featuring deep dark mode, energy card, focus card, mini cards, and floating dock"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Personal OS Dashboard (Priority: P1)

As an authenticated user, I want to see a modern "Personal OS" style dashboard when I log in so that I have an organized, visually appealing command center for my tasks and productivity.

**Why this priority**: This is the core visual transformation and foundation for all other dashboard components. Without the base layout, no other components can be displayed. This delivers immediate value by providing a modern, professional interface.

**Independent Test**: Can be fully tested by logging in as an authenticated user and verifying the dashboard displays with the bento grid layout, dark theme, and proper component placement. Delivers value by replacing the plain table view with an inspiring productivity interface.

**Acceptance Scenarios**:

1. **Given** I am logged in, **When** I navigate to the dashboard, **Then** I see a dark-themed bento grid layout with matte black backgrounds and rounded cards
2. **Given** the dashboard is loaded, **When** I view the layout, **Then** I see the Energy Card (left, ~1/3 width) and Do Now Card (right, ~2/3 width) in the top row
3. **Given** the dashboard is loaded, **When** I view the bottom section, **Then** I see the Notes Card and Tasks Summary Card in a smaller grid format
4. **Given** the dashboard is loaded, **When** I view the header, **Then** I see my avatar and name on the left, and notification/settings icons on the right

---

### User Story 2 - View and Interact with Focus Card (Priority: P1)

As a task-focused user, I want to see my high-priority tasks prominently displayed in a "Do Now" card so that I can immediately focus on what matters most.

**Why this priority**: The Focus Card connects real task data to the new UI, making the dashboard functional rather than purely visual. This is critical for demonstrating that the new design integrates with existing backend APIs.

**Independent Test**: Can be fully tested by creating high-priority tasks in the system, loading the dashboard, and verifying the top 3 high-priority tasks appear in the Do Now card with functional checkboxes.

**Acceptance Scenarios**:

1. **Given** I have 5 high-priority tasks, **When** I view the Do Now card, **Then** I see the top 3 high-priority tasks displayed with checkboxes
2. **Given** I have no high-priority tasks, **When** I view the Do Now card, **Then** I see an empty state message encouraging me to set task priorities
3. **Given** I am viewing a high-priority task in the Do Now card, **When** I click the checkbox, **Then** the task is marked as complete and the display updates
4. **Given** I am viewing the Do Now card, **When** I click the "+" button, **Then** I am directed to create a new task (or a task creation modal appears)

---

### User Story 3 - View Energy Card (Priority: P2)

As a productivity-minded user, I want to see an "Energy" card showing my daily progress so that I feel motivated and aware of my productivity status.

**Why this priority**: The Energy Card provides visual motivation but uses mock data initially. It enhances the user experience but doesn't depend on existing APIs, making it lower priority than functional components.

**Independent Test**: Can be fully tested by loading the dashboard and verifying the Energy Card displays with a large green progress bar (100%), circular progress indicator (0 of 0), and "Start your day" action link.

**Acceptance Scenarios**:

1. **Given** I am on the dashboard, **When** I view the Energy Card, **Then** I see a large green progress bar labeled "100% Energy Remaining"
2. **Given** I am on the dashboard, **When** I view the Energy Card, **Then** I see a circular progress indicator showing "0 of 0" tasks completed
3. **Given** I am viewing the Energy Card, **When** I look for actions, **Then** I see a "Start your day" clickable link

---

### User Story 4 - View Mini Cards (Priority: P3)

As a user wanting quick overviews, I want to see compact Notes and Tasks summary cards so that I have at-a-glance visibility into my notes and overall task status.

**Why this priority**: Mini Cards provide supplementary information and can function with mock data (Notes) or simple API calls (Tasks count). They enhance the dashboard but aren't critical for the core experience.

**Independent Test**: Can be fully tested by loading the dashboard and verifying the Notes Card shows 3 placeholder slots and the Tasks Card shows the total task count from the API.

**Acceptance Scenarios**:

1. **Given** I am on the dashboard, **When** I view the Notes Card, **Then** I see a grid of 3 empty placeholder slots with the title "Notes"
2. **Given** I have 10 total tasks, **When** I view the Tasks Card, **Then** I see the title "Tasks" and a summary showing "10 tasks"
3. **Given** I have 0 tasks, **When** I view the Tasks Card, **Then** I see "0 tasks" in the summary

---

### User Story 5 - Use Floating Dock Navigation (Priority: P3)

As a user navigating the application, I want a floating dock at the bottom of the screen with quick action icons so that I can access key features without scrolling.

**Why this priority**: The Floating Dock provides navigation convenience but is an enhancement over the existing header navigation. It adds polish but isn't essential for core dashboard functionality.

**Independent Test**: Can be fully tested by loading the dashboard and verifying the dock is fixed at the bottom center, contains Brain, Microphone, and Search icons, and the Search icon triggers the search feature.

**Acceptance Scenarios**:

1. **Given** I am on the dashboard, **When** I scroll the page, **Then** the floating dock remains fixed at the bottom center of the viewport
2. **Given** I am viewing the dock, **When** I click the Search icon, **Then** the search functionality is triggered (per Spec 005)
3. **Given** I am viewing the dock, **When** I observe the icons, **Then** I see Brain (left), Microphone (center, larger), and Search (right) icons

---

### Edge Cases

- What happens when network fails while loading high-priority tasks? (Display loading skeleton, then error state with retry option)
- How does the dashboard handle users with 100+ high-priority tasks? (Show only top 3, no pagination in Do Now card)
- What happens if the user resizes the browser to mobile width? (Bento grid stacks vertically, dock remains fixed at bottom)
- How does the dashboard appear before authentication completes? (Show loading skeleton, redirect to login if unauthenticated)

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display the dashboard with a dark theme (matte black backgrounds, gray-900 cards with rounded corners)
- **FR-002**: System MUST render a responsive bento grid layout with configurable column widths (1/3 + 2/3 for top row)
- **FR-003**: System MUST display a minimalist header with user avatar, user name (left), and notification/settings icons (right)
- **FR-004**: System MUST render an Energy Card with a large green progress bar showing "100% Energy Remaining" (mock data)
- **FR-005**: System MUST render an Energy Card with a circular progress indicator showing "0 of 0" (mock data)
- **FR-006**: System MUST render an Energy Card with a "Start your day" action link
- **FR-007**: System MUST render a "Do Now" Focus Card with title "Do now" and subtitle "Latest priority tasks"
- **FR-008**: System MUST fetch and display the top 3 high-priority tasks (priority = "high") from the existing Task API in the Do Now card
- **FR-009**: System MUST display checkboxes for each task in the Do Now card that toggle task completion status
- **FR-010**: System MUST provide a "+" button in the Do Now card for creating new tasks
- **FR-011**: System MUST render a Notes Card with title "Notes" and a grid of 3 empty placeholder slots (mock data)
- **FR-012**: System MUST render a Tasks Card with title "Tasks" showing the total task count from the API
- **FR-013**: System MUST render a floating dock fixed at the bottom center of the viewport
- **FR-014**: System MUST include Brain, Microphone (center, larger), and Search icons in the floating dock
- **FR-015**: System MUST trigger the search feature (per Spec 005) when the Search dock icon is clicked
- **FR-016**: System MUST maintain responsive behavior with the grid stacking vertically on mobile viewports

### Key Entities

- **Dashboard Layout**: Represents the overall page structure with header, bento grid, and floating dock
  - Contains: Header component, Grid sections (top row, bottom row), Floating dock
  - Relationships: Renders data from Task entity via API calls

- **Task** (existing entity - consumed, not modified):
  - Attributes used: id, title, is_completed, priority
  - Filtered by: priority = "high"
  - Limited to: top 3 results

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can load the dashboard and see all layout components (header, grid, dock) within 2 seconds of navigation
- **SC-002**: Users can view their top 3 high-priority tasks in the Do Now card immediately after page load
- **SC-003**: Users can toggle task completion in the Do Now card and see the visual update within 500ms
- **SC-004**: The dashboard layout remains visually consistent with the dark theme across all major browsers (Chrome, Firefox, Safari, Edge)
- **SC-005**: The bento grid adapts properly to mobile viewports (< 768px) by stacking vertically
- **SC-006**: Users can identify and interact with all floating dock icons without scrolling on any viewport size
- **SC-007**: 100% of existing dashboard functionality (viewing tasks, signing out) remains accessible in the new design
- **SC-008**: Users report the new design feels "modern" and "organized" in qualitative feedback (target: 80% positive response)

## Assumptions

- The existing Task API supports filtering by priority (query parameter: `?priority=high`)
- The existing Task API supports limiting results (query parameter: `?limit=3` or similar)
- Shadcn UI components (Card, Avatar, Button, Progress, Badge) are available and compatible with the design
- Lucide React icons library provides Brain, Mic, and Search icons
- The search feature from Spec 005 is implemented and can be triggered programmatically
- Mock data for Energy Card and Notes Card is acceptable for initial implementation
- User session data (name, avatar) is available from the authentication context

## Dependencies

- **External Dependencies**:
  - Shadcn UI components for cards, buttons, progress indicators
  - Lucide React for iconography
  - Tailwind CSS for dark theme styling

- **Internal Dependencies**:
  - Existing Task API (from Spec 002, enhanced in Spec 004) for fetching high-priority tasks
  - Existing authentication system for user session data
  - Search feature (from Spec 005) for dock integration

## Constraints

- **Non-Functional Constraints**:
  - MUST NOT break existing task CRUD functionality
  - MUST NOT modify backend APIs or database schema
  - MUST maintain authentication requirements for dashboard access
  - MUST preserve mobile responsiveness

- **Scope Constraints**:
  - OUT OF SCOPE: Backend changes to Task API (use existing endpoints)
  - OUT OF SCOPE: Actual energy/productivity tracking logic (use mock data)
  - OUT OF SCOPE: Notes functionality (placeholders only)
  - OUT OF SCOPE: Brain and Microphone dock icon functionality (visual only for now)
  - OUT OF SCOPE: Real-time updates or WebSocket integration

## Security & Privacy

- **Security Requirements**:
  - Dashboard access requires valid authentication (existing session/token)
  - All API calls to fetch tasks must include authorization headers
  - No sensitive data should be exposed in component props or client-side state

- **Privacy Requirements**:
  - Users only see their own tasks (existing user isolation maintained)
  - No cross-user data visibility

## Open Questions

None - all requirements are specified with reasonable defaults and assumptions documented above.
