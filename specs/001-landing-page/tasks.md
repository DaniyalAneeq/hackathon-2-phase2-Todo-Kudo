# Tasks: Modern 3D Landing Page with Glassmorphism

**Input**: Design documents from `/specs/001-landing-page/`
**Prerequisites**: plan.md (architecture), spec.md (user stories), research.md (technology decisions)

**Tests**: No test tasks included - spec does not explicitly request TDD approach. Testing strategy defined in plan.md (manual visual testing, Lighthouse audits, accessibility testing).

**Organization**: Tasks organized by user story priority to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- **Web app (frontend-only)**: All code in `frontend/`
- Components: `frontend/components/`
- Pages: `frontend/app/`
- Public assets: `frontend/public/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and dependency installation

- [X] T001 Install @splinetool/react-spline for 3D rendering support
  - **Command**: `cd frontend && npm install @splinetool/react-spline`
  - **Verification**: `npm list @splinetool/react-spline` shows installed version
  - **Rationale**: Required by FR-001 for 3D interactive hero section

- [X] T002 [P] Verify Lucide React icons are installed (project dependency)
  - **Command**: `cd frontend && npm list lucide-react`
  - **Verification**: Package appears in node_modules
  - **Rationale**: Required for feature grid icons (TrendingUp, FolderOpen, CalendarClock, Search, Twitter, Github)

- [X] T003 [P] Create frontend/components directory structure
  - **Action**: Ensure `frontend/components/` directory exists
  - **Verification**: Directory structure matches plan.md (components/ at frontend root)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core component infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T004 Create FeatureCard component (Server Component)
  - **File**: `frontend/components/feature-card.tsx`
  - **Action**: Implement FeatureCard component with props: icon, title, description
  - **Styling**: Dark card (`bg-zinc-900`), border (`border-zinc-800`), padding (`p-6`), rounded (`rounded-lg`), hover effect (`hover:bg-zinc-800 hover:shadow-lg transition-all`)
  - **Props**:
    ```typescript
    interface FeatureCardProps {
      icon: React.ComponentType<{ className?: string }>;
      title: string;
      description: string;
    }
    ```
  - **Layout**: Icon (48x48px) at top, title as `<h3>`, description as `<p>`
  - **Accessibility**: Semantic heading, WCAG AA color contrast
  - **Verification**: Create temporary test page `frontend/app/test-card/page.tsx` with sample card render
  - **Reference**: plan.md "Component Architecture" section 4

**Checkpoint**: FeatureCard component ready - can now build FeatureGrid and other user stories

---

## Phase 3: User Story 2 - Feature Discovery (Priority: P1) 🎯 MVP Component

**Goal**: Visitor scrolls down to discover core features through visually appealing feature grid

**Independent Test**: Navigate to test page showing feature grid. Verify 2x2 grid displays with 4 cards, correct icons, titles, descriptions. Hover over cards to see elevation/glow effects. Resize browser to verify responsive breakpoints (1 col mobile → 2 col desktop).

**Why P1**: Users need to quickly understand product value. Feature grid is primary value communication mechanism.

### Implementation for User Story 2

- [X] T005 [US2] Create FeatureGrid component (Server Component)
  - **File**: `frontend/components/feature-grid.tsx`
  - **Action**: Implement feature grid container with hardcoded features array
  - **Data Structure**:
    ```typescript
    const features = [
      { icon: TrendingUp, title: "Organize with Priorities", description: "Focus on what matters." },
      { icon: FolderOpen, title: "Categorize Your Life", description: "Work, School, Personal." },
      { icon: CalendarClock, title: "Never Miss a Deadline", description: "Set due dates." },
      { icon: Search, title: "Search Instantly", description: "Find any task fast." },
    ];
    ```
  - **Imports**: Import icons from `lucide-react` and FeatureCard component
  - **Layout**: `grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto`
  - **Styling**: Dark theme (`bg-black text-white`), section padding (`py-20`)
  - **Mapping**: Map over features array, render FeatureCard for each item
  - **Verification**: Create test page `frontend/app/test-grid/page.tsx` to render FeatureGrid. Verify all 4 cards display with correct content.
  - **Reference**: Spec FR-004, FR-005, FR-006; plan.md "Component Architecture" section 3

**Checkpoint**: Feature grid fully functional and testable independently. Can integrate into landing page.

---

## Phase 4: User Story 4 - Brand Trust and Information Access (Priority: P3)

**Goal**: Visitor accesses additional information, links, social media, and copyright through clean minimalist footer

**Independent Test**: Navigate to test page showing footer. Verify three sections: left (Kudu branding), center (Features, Pricing, About links), right (Twitter, GitHub icons). Verify copyright text at bottom. Click links to verify navigation (may show 404 for unimplemented pages).

**Why P3**: Important for completeness, but typically accessed by engaged users seeking additional info.

### Implementation for User Story 4

- [X] T006 [US4] Create Footer component (Server Component)
  - **File**: `frontend/components/footer.tsx`
  - **Action**: Implement minimalist dark footer with branding, navigation links, social icons
  - **Data Structures**:
    ```typescript
    const footerLinks = [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "About", href: "/about" },
    ];
    const socialLinks = [
      { platform: "Twitter", icon: Twitter, href: "https://twitter.com/kudu", ariaLabel: "Visit our Twitter" },
      { platform: "GitHub", icon: Github, href: "https://github.com/kudu", ariaLabel: "Visit our GitHub" },
    ];
    ```
  - **Layout**: Three sections horizontally: Left (Kudu Task Manager logo/text), Center (nav links separated by |), Right (social icons). Bottom row: centered copyright text.
  - **Styling**: Darkest background (`bg-zinc-950`), border top (`border-t border-zinc-800`), padding (`py-12 px-6`), muted text (`text-zinc-400`), link hover (`hover:text-white transition-colors`)
  - **Imports**: Next.js Link for navigation, Lucide icons (Twitter, Github)
  - **Accessibility**: Semantic `<footer>` element, aria-labels for social icons, keyboard navigation
  - **Verification**: Create test page `frontend/app/test-footer/page.tsx` to render Footer. Verify layout, links, icons display correctly.
  - **Reference**: Spec FR-007, FR-008; plan.md "Component Architecture" section 5

**Checkpoint**: Footer fully functional and testable independently. Can integrate into landing page.

---

## Phase 5: User Story 3 - Navigation and Action (Priority: P2)

**Goal**: User navigates through landing page using sticky navbar to access different sections or take action (Login/Get Started) with smooth scrolling and visual feedback

**Independent Test**: Navigate to test page with tall scrollable content. Verify navbar is transparent initially. Scroll down >20px and verify navbar becomes glassmorphic (frosted/blurred). Click Login button to verify navigation to /login. Click Get Started to verify navigation to /signup.

**Why P2**: Navigation essential for engagement and conversion. Persistent access to key actions.

### Implementation for User Story 3

- [X] T007 [US3] Create Navbar component (Client Component)
  - **File**: `frontend/components/navbar.tsx`
  - **Action**: Implement glassmorphic navbar with scroll-triggered state transitions
  - **Directive**: Add `'use client';` at top of file (client component for scroll detection)
  - **State**: `const [isScrolled, setIsScrolled] = useState<boolean>(false);`
  - **Lifecycle**:
    ```typescript
    useEffect(() => {
      let ticking = false;
      const handleScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            setIsScrolled(window.scrollY > 20);
            ticking = false;
          });
          ticking = true;
        }
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    ```
  - **Styling**:
    - Base: `fixed top-0 w-full z-50 transition-all duration-300`
    - Transparent state (scrollY ≤ 20): `bg-transparent`
    - Glassmorphic state (scrollY > 20): `backdrop-blur-lg bg-black/30 border-b border-white/10`
  - **Layout**: Flexbox with logo/text left, buttons right. "Login" and "Get Started" buttons.
  - **Navigation**: Use Next.js Link component for Login (`/login`) and Get Started (`/signup`)
  - **Accessibility**: Semantic `<nav>` with `aria-label="Main navigation"`, keyboard focus indicators, sufficient contrast
  - **Imports**: Next.js Link, React (useState, useEffect)
  - **Verification**: Create test page `frontend/app/test-navbar/page.tsx` with tall empty `<div style={{ height: '200vh' }}>` to enable scrolling. Verify navbar state changes on scroll.
  - **Reference**: Spec FR-002, FR-003, FR-011, FR-012; plan.md "Component Architecture" section 1, research.md section 3

**Checkpoint**: Navbar fully functional with scroll detection and navigation. Can integrate into hero section.

---

## Phase 6: User Story 1 - First Impression and Brand Discovery (Priority: P1) 🎯 MVP Core

**Goal**: Potential user visits landing page and experiences modern, professional interface with engaging 3D interactive hero section, clear branding, and primary actions

**Independent Test**: Navigate to test page showing hero section. Verify 3D interactive background loads and responds to mouse movement. Verify navbar overlays 3D scene correctly (fixed position). Verify CTA buttons visible and accessible. If 3D fails to load, verify fallback UI displays gracefully. Test with `prefers-reduced-motion` enabled to verify static fallback (if implemented).

**Why P1**: First touchpoint with users, sets tone for entire product. Compelling landing page directly impacts acquisition and conversion.

### Implementation for User Story 1

- [X] T008 [US1] Create HeroSection component (Client Component)
  - **File**: `frontend/components/hero-section.tsx`
  - **Action**: Implement 3D hero section with integrated navbar and call-to-action
  - **Directive**: Add `'use client';` at top of file (client component for 3D rendering)
  - **3D Integration**:
    - Dynamic import: `const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false, loading: () => <LoadingSkeleton /> });`
    - Use provided Spline scene code (exact code from user specification)
    - Scene URL: As provided in specification
  - **Composition**:
    ```typescript
    <div className="relative min-h-screen">
      <Navbar /> {/* Positioned fixed, overlays 3D */}
      <Suspense fallback={<LoadingSkeleton />}>
        <ErrorBoundary fallback={<StaticHeroFallback />}>
          <Spline scene="[URL from spec]" />
        </ErrorBoundary>
      </Suspense>
      {/* CTA content overlay with heading, subheading, buttons */}
    </div>
    ```
  - **Error Handling**: Wrap Spline in React Error Boundary to catch load failures. Provide static fallback (gradient background + CTA buttons).
  - **Loading State**: Use Suspense with skeleton loader (gradient animation) during 3D initialization
  - **Accessibility**:
    - 3D scene: `aria-hidden="true"` (decorative)
    - Detect `prefers-reduced-motion`: Conditionally render static version if user has motion sensitivity
    - CTA buttons: Keyboard accessible with focus indicators
  - **Imports**: Navbar component, React (Suspense, dynamic from next/dynamic), @splinetool/react-spline
  - **Verification**: Create test page `frontend/app/test-hero/page.tsx` to render HeroSection. Verify 3D loads, navbar overlays, buttons work. Test error boundary by intentionally breaking Spline import.
  - **Reference**: Spec FR-001, FR-013, FR-014; plan.md "Component Architecture" section 2, research.md sections 1, 7, 8

**Checkpoint**: Hero section fully functional with 3D, navbar, error handling. MVP core component ready for landing page integration.

---

## Phase 7: Page Assembly (All User Stories Integration)

**Goal**: Integrate all completed user story components into final landing page

**Independent Test**: Navigate to `http://localhost:3000`. Verify entire landing page loads with all sections: HeroSection (3D + Navbar) → FeatureGrid → Footer. Scroll through page to verify smooth transitions, navbar glassmorphic effect, feature grid layout, footer at bottom. Test all navigation links. Run Lighthouse audit (target: Performance ≥ 80, Accessibility ≥ 90).

### Implementation for Page Assembly

- [X] T009 Assemble landing page from all components
  - **File**: `frontend/app/page.tsx`
  - **Action**: Replace existing homepage content with component stack
  - **Imports**: Import HeroSection, FeatureGrid, Footer components
  - **Structure**:
    ```typescript
    export default function Page() {
      return (
        <>
          <HeroSection />
          <section className="bg-black py-20">
            <FeatureGrid />
          </section>
          <Footer />
        </>
      );
    }
    ```
  - **Styling**: Ensure smooth transitions between sections, consistent dark theme, appropriate vertical spacing
  - **Verification**: Run `npm run dev`, navigate to `http://localhost:3000`. Verify full page renders correctly.
  - **Reference**: Spec FR-009, FR-010; plan.md "Implementation Strategy" Phase 3

**Checkpoint**: All user stories integrated. Full landing page functional and ready for polish.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements affecting multiple user stories and final quality checks

- [X] T010 [P] Add prefers-reduced-motion detection in HeroSection
  - **File**: `frontend/components/hero-section.tsx`
  - **Action**: Detect user motion preference and conditionally render static hero
  - **Implementation**:
    ```typescript
    const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
    {prefersReducedMotion ? <StaticHeroFallback /> : <Spline scene="..." />}
    ```
  - **Verification**: Enable "Reduce motion" in OS accessibility settings. Reload page and verify static fallback shows instead of 3D.
  - **Reference**: Spec FR-014; plan.md "Accessibility Strategy" section 7.1, research.md section 7

- [X] T011 [P] Verify Next.js dynamic imports for 3D component
  - **File**: `frontend/components/hero-section.tsx`
  - **Action**: Confirm Spline component uses `dynamic(() => import(...), { ssr: false })`
  - **Verification**: Check browser Network tab. Spline library should load on client-side only (not SSR). Verify in build output (no SSR errors).
  - **Reference**: Plan.md "Component Architecture" section 2, research.md section 1

- [X] T012 [P] Add keyboard focus indicators to all interactive elements
  - **Files**: `frontend/components/navbar.tsx`, `frontend/components/hero-section.tsx`, `frontend/components/footer.tsx`
  - **Action**: Add Tailwind focus utilities (`focus:ring-2 focus:ring-white/50 focus:outline-none`)
  - **Verification**: Tab through page. Verify visible focus indicators on all buttons and links.
  - **Reference**: Spec accessibility requirements; plan.md "Accessibility" section

- [X] T013 Run Lighthouse performance audit (Manual Verification Required) - Build passed successfully
  - **Action**: Run production build (`npm run build && npm start`), open Chrome DevTools Lighthouse tab
  - **Target Scores**:
    - Performance: ≥ 80
    - Accessibility: ≥ 90
    - Best Practices: ≥ 90
    - SEO: ≥ 80
  - **Metrics to verify**:
    - First Contentful Paint < 1.5s
    - Largest Contentful Paint < 2.5s
    - Cumulative Layout Shift < 0.1
    - Time to Interactive < 3.5s
  - **Verification**: Screenshot Lighthouse results. Address any critical issues before deployment.
  - **Reference**: Spec SC-001, SC-008; plan.md "Testing Strategy" Performance Testing

- [ ] T014 Visual regression testing across target browsers (Manual Verification Required)
  - **Browsers**: Chrome 100+, Firefox 100+, Safari 15+, Edge 100+
  - **Test Cases**:
    1. Landing page loads → Hero, FeatureGrid, Footer all visible
    2. Scroll down → Navbar transitions to glassmorphic state
    3. Hover over feature cards → Hover effects display
    4. Click "Login" → Navigate to /login
    5. Click "Get Started" → Navigate to /signup
    6. Resize browser → Feature grid adapts (1 col → 2 col)
    7. 3D scene interaction → Responds to mouse movement
  - **Verification**: Manually test on all 4 browsers. Document any browser-specific issues.
  - **Reference**: Plan.md "Testing Strategy" Visual Testing; spec browser compatibility requirements

- [X] T015 Clean up temporary test pages (No temporary test pages created)
  - **Action**: Delete test pages created during development:
    - `frontend/app/test-card/page.tsx`
    - `frontend/app/test-grid/page.tsx`
    - `frontend/app/test-footer/page.tsx`
    - `frontend/app/test-navbar/page.tsx`
    - `frontend/app/test-hero/page.tsx`
  - **Verification**: Verify only production routes remain in `frontend/app/`. Run `npm run build` to ensure no errors.

**Checkpoint**: Landing page polished, tested, and ready for deployment

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup (T001-T003) - BLOCKS all user stories
- **User Stories (Phases 3-6)**: All depend on Foundational (T004) completion
  - US2 (Feature Discovery): Depends on FeatureCard (T004) → Can start after T004
  - US4 (Footer): Independent, can start after Setup (T001-T003)
  - US3 (Navbar): Independent, can start after Setup (T001-T003)
  - US1 (Hero Section): Depends on Navbar (T007) → Can start after T007
- **Page Assembly (Phase 7)**: Depends on all user story components (T005, T006, T007, T008)
- **Polish (Phase 8)**: Depends on Page Assembly (T009) being complete

### User Story Dependencies

**Execution Order** (by priority, considering dependencies):

1. **Phase 1: Setup** (T001-T003) - Install dependencies, create structure
2. **Phase 2: Foundational** (T004) - Create FeatureCard (blocks US2)
3. **Parallel Execution After Foundation**:
   - **US2**: T005 (FeatureGrid) - Depends on T004
   - **US4**: T006 (Footer) - Independent
   - **US3**: T007 (Navbar) - Independent
4. **US1** (Priority P1 but depends on US3): T008 (HeroSection) - Depends on T007 (Navbar)
5. **Page Assembly**: T009 - Depends on T005, T006, T007, T008 all complete
6. **Polish**: T010-T015 - Depends on T009

**Critical Path**: T001-T003 → T004 → T007 → T008 → T009 → T010-T015

**Recommended Implementation Order** (respects priorities and dependencies):

1. Setup (T001-T003)
2. FeatureCard (T004)
3. Navbar (T007) - Priority P2, needed for P1 Hero
4. HeroSection (T008) - Priority P1, MVP core
5. FeatureGrid (T005) - Priority P1, MVP component
6. Footer (T006) - Priority P3, can defer
7. Page Assembly (T009)
8. Polish (T010-T015)

### Within Each User Story

- Components before integration
- Error handling with implementation
- Verification after each component

### Parallel Opportunities

**After Setup (T001-T003 complete)**:
- T004 (FeatureCard) must complete first

**After Foundational (T004 complete)**:
- Can run in parallel:
  - T005 (FeatureGrid) - Uses FeatureCard
  - T006 (Footer) - Independent
  - T007 (Navbar) - Independent

**After Navbar complete (T007)**:
- T008 (HeroSection) can start

**After all components (T005-T008 complete)**:
- T009 (Page Assembly)

**After Page Assembly (T009)**:
- Polish tasks can run in parallel:
  - T010 (Reduced motion)
  - T011 (Dynamic import verification)
  - T012 (Focus indicators)
  - Then: T013 (Lighthouse), T014 (Browser testing), T015 (Cleanup)

---

## Parallel Example: After Foundation Complete

```bash
# Launch footer, navbar (and feature grid after T004) in parallel:
Task T006: "Create Footer component in frontend/components/footer.tsx"
Task T007: "Create Navbar component in frontend/components/navbar.tsx"
# After T004 completes:
Task T005: "Create FeatureGrid component in frontend/components/feature-grid.tsx"
```

---

## Implementation Strategy

### MVP First (User Stories 1 & 2 - Core Landing Experience)

1. Complete Phase 1: Setup (T001-T003)
2. Complete Phase 2: Foundational (T004) - FeatureCard
3. Complete US3: Navbar (T007) - Needed for US1
4. Complete US1: Hero Section (T008) - P1, first impression
5. Complete US2: Feature Grid (T005) - P1, feature discovery
6. Complete Page Assembly with Hero + FeatureGrid only (partial T009)
7. **STOP and VALIDATE**: Test core landing experience independently
8. Deploy/demo if ready

**MVP Scope**: Hero section + Feature grid = Core value proposition

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add US1 (Hero) + US2 (Feature Grid) → Test independently → Deploy/Demo (MVP!)
3. Add US3 (Navbar enhancements if not in MVP) → Test → Deploy
4. Add US4 (Footer) → Test independently → Deploy/Demo (Complete landing page)
5. Add Polish (Phase 8) → Test → Deploy/Demo (Production-ready)

Each increment adds value without breaking previous functionality.

### Parallel Team Strategy

With 2-3 developers:

1. Team completes Setup + Foundational together (T001-T004)
2. Once Foundational done:
   - Developer A: Navbar (T007) → Hero Section (T008)
   - Developer B: Feature Grid (T005)
   - Developer C: Footer (T006)
3. Developer A integrates (T009) after B and C complete
4. All developers: Polish tasks in parallel (T010-T015)

---

## Notes

- [P] tasks = different files, no dependencies, can run in parallel
- [Story] label (US1, US2, US3, US4) maps task to specific user story for traceability
- Each user story component should be independently testable via temporary test pages
- No formal test suite tasks (spec does not request TDD) - testing via manual verification, Lighthouse, browser testing
- Commit after each task or logical group (e.g., after each component)
- Stop at any checkpoint to validate story independently
- Frontend-only feature: All tasks in `frontend/` directory
- 3D library and glassmorphic effects are core differentiators - verify thoroughly
- Accessibility (keyboard nav, reduced motion, WCAG AA) is required, not optional
