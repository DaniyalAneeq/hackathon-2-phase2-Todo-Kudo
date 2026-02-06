---
id: "0001"
title: "deadline-notifications-spec"
stage: spec
date: 2026-01-13
surface: agent
model: claude-opus-4-5-20251101
feature: 009-deadline-notifications
branch: 009-deadline-notifications
user: user
command: /sp.specify
labels: ["deadline", "notifications", "browser-api", "time-picker"]
links:
  spec: specs/009-deadline-notifications/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/009-deadline-notifications/spec.md
  - specs/009-deadline-notifications/checklists/requirements.md
tests:
  - null
---

## Prompt

# Feature Request: Task Deadlines & Browser Notifications

spec file: specs/009-deadline-feature/spec.md

I need to implement time-sensitive task management in the existing Todo application. Please create a specification and implementation plan based on the following requirements:

## 1. Core Objective
Allow users to assign a specific date and time to a Todo item and trigger a native browser notification when that time is reached.

- **API:** Use the native browser `Notification` API and `setTimeout` for logic.

## 3. Data Model Changes
Update the `Todo` interface to include:
- `deadline`: string | null (ISO 8601 format)
- `notificationSent`: boolean (default false, to track state)

## 4. UI Requirements
- **Input:** Replace or augment the add task flow with a Date/Time picker (intervals of 15 mins). Prevent past dates.
- **Display:** Show the deadline next to the task text.
  - Text color: Gray if future, Red if overdue (and incomplete).
- **Permissions:** If notifications are not enabled, show a UI element (button/banner) requesting permission.

## 5. Logic & State Management
- **Permission Check:** Check `Notification.permission` on mount.
- **Timer System:**
  - Create a custom hook `useNotificationSystem`.
  - On load, calculate `deadline - now` for all incomplete tasks.
  - Set `setTimeout` for the remaining duration.
  - If a user adds a new task, immediately register its timer.
- **Trigger:** When timer expires -> Check if task is incomplete -> Send Notification -> Update state.

## 6. Edge Cases
- **Page Refresh:** Timers must be re-calculated and re-registered on page load/mount.
- **Permission Denied:** Fallback to `window.alert` if notifications are blocked.

## Response snapshot

Created specification for Task Deadlines & Browser Notifications feature:

- **Branch**: `009-deadline-notifications`
- **Spec file**: `specs/009-deadline-notifications/spec.md`
- **Checklist**: `specs/009-deadline-notifications/checklists/requirements.md`

Key deliverables:
1. 4 user stories with acceptance scenarios (P1: Set Deadline, P1: Browser Notifications, P2: Permission Grant, P2: Visual Indicators)
2. 16 functional requirements covering deadline setting, notifications, and fallbacks
3. 6 success criteria with measurable outcomes
4. Edge cases for device sleep, timer updates, far-future deadlines
5. Assumptions and out-of-scope items documented

All quality checklist items pass - ready for `/sp.plan`.

## Outcome

- ✅ Impact: Created comprehensive feature specification for deadline notifications
- 🧪 Tests: No tests yet - specification phase
- 📁 Files: 2 files created (spec.md, requirements.md checklist)
- 🔁 Next prompts: /sp.plan to create implementation plan, /sp.tasks to generate tasks
- 🧠 Reflection: User provided detailed requirements making clarifications unnecessary

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): All checklist items PASS
- Prompt variant (if applicable): Standard /sp.specify flow
- Next experiment (smallest change to try): None needed
