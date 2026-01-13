---
id: 0001
title: Create Modern Dashboard Spec
stage: spec
date: 2026-01-09
surface: agent
model: claude-opus-4-5-20251101
feature: 007-modern-dashboard
branch: 007-modern-dashboard
user: user
command: /sp.specify
labels: ["dashboard", "bento-grid", "ui-redesign", "dark-theme"]
links:
  spec: specs/007-modern-dashboard/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/007-modern-dashboard/spec.md
  - specs/007-modern-dashboard/checklists/requirements.md
tests:
  - N/A (specification phase)
---

## Prompt

I want to create a new specification for **Feature: Modern Dashboard Redesign**.

**Filename**: `specs/007-modern-dashboard.md`

**Context**:
We are completely replacing the current `/dashboard` table view with a modern, grid-based "Personal OS" layout inspired by the provided reference image.

**Requirements**:

1.  **Layout (Agent: frontend_dev_agent and Skills:frontend_design_specialist)**
    * **Theme:** Deep dark mode (Matte Black backgrounds, Gray-900 cards).
    * **Grid:** A bento-grid style layout.
        * Top Row: Energy Card (Left, 1/3 width), Do Now Card (Right, 2/3 width).
        * Bottom Row: Notes Card (Small), Tasks Summary (Small).
    * **Header:** Minimalist. Avatar + Name (Left), Notification/Settings Icons (Right).

2.  **Component: Energy Card (Agent: frontend_dev_agent and Skills:frontend_design_specialist)**
    * **Visuals:** Large Green Progress Bar ("100% Energy Remaining") + Circular Progress ("0 of 0").
    * **Action:** "Start your day" link.
    * **Data:** Use mock data for now.

3.  **Component: Focus Card "Do Now" (Agent:frontend_dev_agent and Skills: frontend_component_generator)**
    * **Title:** "Do now".
    * **Subtitle:** "Latest priority tasks".
    * **Action:** Large "+" button to create a task.
    * **Content:** Connect this to the **existing** Task API. Fetch tasks where `priority=high`. Display the top 3 items with checkboxes.

4.  **Component: Mini Cards (Agent: frontend_dev_agent and Skills:frontend_design_specialist)**
    * **Notes Card:** Grid of 3 empty placeholders. Title "Notes". (Mock data).
    * **Tasks Card:** Simple list summary. Title "Tasks". Connect to API count.

5.  **Component: Floating Dock (Agent: frontend_dev_agent and Skills:frontend_design_specialist)**
    * **Location:** Fixed at the bottom center.
    * **Icons:**
        * Brain Icon (Context/AI).
        * Microphone Icon (Large, center).
        * Search Icon (Triggers the Search feature from Spec 005).

6.  **Page Assembly (Skills: fullstack_feature_integrator)**
    * **File:** `frontend/app/dashboard/page.tsx`.
    * **Update:** Replace the current content with this new Grid Layout.

**Acceptance Criteria**:
* The Dashboard matches the visual style of the reference image (Dark, Rounded, Bento Grid).
* The "Do Now" card displays real High Priority tasks from the database.
* The "Energy" and "Notes" cards render correctly with mock data.
* The Bottom Dock is fixed and responsive.

## Response snapshot

Created comprehensive feature specification for Modern Dashboard Redesign:

1. **Branch Created**: `007-modern-dashboard`
2. **Spec File**: `specs/007-modern-dashboard/spec.md`
3. **Quality Checklist**: `specs/007-modern-dashboard/checklists/requirements.md`

Key specification elements:
- 5 user stories with prioritization (P1-P3)
- 16 functional requirements covering layout, components, and interactions
- 8 success criteria with measurable outcomes
- Clear dependencies on existing Task API (Spec 002/004) and Search feature (Spec 005)
- Explicit out-of-scope items documented

## Outcome

- Impact: Created foundational specification for dashboard UI transformation
- Tests: N/A (specification phase)
- Files: spec.md, checklists/requirements.md
- Next prompts: `/sp.plan` to create implementation plan, or `/sp.clarify` if needed
- Reflection: Comprehensive spec created with all required sections, no clarification markers needed due to clear requirements

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): Standard /sp.specify
- Next experiment (smallest change to try): N/A
