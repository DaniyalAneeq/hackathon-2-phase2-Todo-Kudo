# API Contracts: Modern 3D Landing Page

**Feature**: 001-landing-page
**Date**: 2026-01-07

## Overview

This landing page is a **frontend-only feature** with no backend API requirements.

## No API Contracts

This directory exists to maintain consistency with the spec-kit structure, but contains no API contracts because:

1. **No Data Fetching**: All content is statically defined in React components
2. **No Backend Integration**: Landing page renders entirely client-side/SSR
3. **No Authentication**: Public page accessible without login
4. **No User Actions**: Beyond navigation (handled by Next.js routing)

## Navigation Routes

The landing page **navigates to** these routes (contracts owned by other features):

### Login Route

**Path**: `/login`
**Method**: Navigation (Next.js Link)
**Triggered By**: User clicks "Login" button in Navbar
**Expected Behavior**: Redirect to login page (feature: 003-auth)

---

### Signup Route

**Path**: `/signup` or `/register`
**Method**: Navigation (Next.js Link)
**Triggered By**: User clicks "Get Started" button in Navbar
**Expected Behavior**: Redirect to signup/onboarding page (feature: 003-auth)

---

### Footer Links (Future Routes)

**Paths**: `/features`, `/pricing`, `/about`
**Method**: Navigation (Next.js Link)
**Triggered By**: User clicks footer links
**Expected Behavior**: Redirect to respective pages (to be implemented in future iterations)

**Current State**: These routes may not exist yet. Links should be styled but may show 404 or placeholder pages.

---

## External Dependencies

### Spline 3D Scene

**Resource**: Spline scene file (`.splinecode` format)
**Source**: Embedded in component code (provided by user)
**Access Method**: Direct import in `hero-section.tsx`

**Example**:
```typescript
<Spline scene="https://prod.spline.design/path-to-scene.splinecode" />
```

**Note**: Scene URL will be determined during implementation based on provided code.

---

## Third-Party Libraries

### @splinetool/react-spline

**Type**: NPM package
**Version**: Latest stable (install with `npm install @splinetool/react-spline`)
**Usage**: Client-side 3D rendering

---

### Lucide React

**Type**: NPM package (already installed)
**Usage**: Icon components (TrendingUp, FolderOpen, CalendarClock, Search, Twitter, Github)

---

## Future API Integration

If landing page requires dynamic content in future iterations, potential contracts include:

- **GET /api/features**: Fetch feature cards from CMS
- **GET /api/testimonials**: Fetch customer testimonials
- **POST /api/newsletter**: Subscribe to newsletter
- **GET /api/analytics**: Track page interactions

**Status**: Out of scope for current specification
