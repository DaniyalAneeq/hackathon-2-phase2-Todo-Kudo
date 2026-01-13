# Data Model: Modern 3D Landing Page with Glassmorphism

**Feature**: 001-landing-page
**Date**: 2026-01-07
**Phase**: 1 (Design & Contracts)

## Overview

This landing page is a **stateless, frontend-only feature** with no data persistence, database models, or API contracts required.

## Entities

### Static Content Entities (Frontend Component Props)

#### 1. FeatureCard

**Purpose**: Represents a single feature card displayed in the feature grid

**Properties**:
- `icon`: Lucide React icon component (TrendingUp | FolderOpen | CalendarClock | Search)
- `title`: string (feature title, e.g., "Organize with Priorities")
- `description`: string (feature description, e.g., "Focus on what matters.")

**Data Source**: Hardcoded array in `feature-grid.tsx` component

**Example**:
```typescript
interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const features: FeatureCardProps[] = [
  {
    icon: TrendingUp,
    title: "Organize with Priorities",
    description: "Focus on what matters."
  },
  // ... 3 more features
];
```

**Validation**: None required (static content)

**State**: Immutable (no user interaction changes content)

---

#### 2. FooterLink

**Purpose**: Represents navigation links in the footer

**Properties**:
- `label`: string (link text, e.g., "Features")
- `href`: string (route path, e.g., "/features")

**Data Source**: Hardcoded array in `footer.tsx` component

**Example**:
```typescript
interface FooterLinkProps {
  label: string;
  href: string;
}

const footerLinks: FooterLinkProps[] = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" }
];
```

**Validation**: None required (static content)

---

#### 3. SocialLink

**Purpose**: Represents social media links in the footer

**Properties**:
- `platform`: string (social platform name, e.g., "Twitter")
- `icon`: Lucide React icon component (Twitter | Github)
- `href`: string (social profile URL)
- `ariaLabel`: string (accessibility label, e.g., "Visit our Twitter")

**Data Source**: Hardcoded array in `footer.tsx` component

**Example**:
```typescript
interface SocialLinkProps {
  platform: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  ariaLabel: string;
}

const socialLinks: SocialLinkProps[] = [
  {
    platform: "Twitter",
    icon: Twitter,
    href: "https://twitter.com/kudu",
    ariaLabel: "Visit our Twitter"
  },
  {
    platform: "GitHub",
    icon: Github,
    href: "https://github.com/kudu",
    ariaLabel: "Visit our GitHub"
  }
];
```

**Validation**: None required (static content)

---

## State Management

### Client-Side State

#### Navbar Scroll State

**Purpose**: Track whether user has scrolled past threshold to trigger glassmorphic effect

**State**:
```typescript
const [isScrolled, setIsScrolled] = useState<boolean>(false);
```

**Lifecycle**:
- Initial: `false` (transparent navbar)
- Update: Set to `true` when `window.scrollY > 20`
- Reset: Set to `false` when `window.scrollY <= 20`

**Persistence**: None (ephemeral, resets on page reload)

**Scope**: Local to `Navbar` component

---

#### Reduced Motion Preference (Optional)

**Purpose**: Detect user's motion preference for accessibility

**State**:
```typescript
const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
```

**Lifecycle**:
- Initial: Read from browser `matchMedia` API
- Update: Listen for media query changes
- Cleanup: Remove listener on unmount

**Persistence**: None (derived from OS/browser settings)

**Scope**: Local to `HeroSection` component

---

## Data Flow

### Page Load Flow

```
1. User navigates to "/"
2. Next.js SSR renders Server Components (FeatureGrid, Footer)
3. Client hydrates Client Components (Navbar, HeroSection)
4. Navbar initializes scroll listener
5. HeroSection lazy-loads Spline component
6. 3D scene renders when component mounts
```

### Scroll Interaction Flow

```
1. User scrolls page
2. Scroll event listener fires (throttled with requestAnimationFrame)
3. Navbar checks: window.scrollY > 20 ?
   - Yes: setIsScrolled(true) → glassmorphic styles applied
   - No: setIsScrolled(false) → transparent styles applied
4. CSS transitions animate navbar background
```

### Navigation Flow

```
1. User clicks "Login" or "Get Started" button
2. Next.js Link component navigates to target route
   - Login: /login (assumed to exist)
   - Get Started: /signup (assumed to exist)
3. User leaves landing page
```

---

## No Backend Requirements

This feature has **zero backend dependencies**:

- ❌ No database models
- ❌ No API endpoints
- ❌ No authentication (public landing page)
- ❌ No data fetching
- ❌ No user-generated content
- ❌ No server-side state

All content is **statically defined** in React components and rendered client-side or server-side (Next.js SSR).

---

## Future Considerations

If analytics or CMS integration is added in future iterations:

### Potential Analytics Events

- Page view (landing page load)
- CTA click (Login, Get Started)
- Footer link click
- 3D interaction metrics (hover, scroll depth)

### Potential CMS Integration

- Feature cards could be fetched from CMS API
- Footer links could be managed in CMS
- Hero section copy could be dynamic

**Note**: These are **out of scope** for current specification. See spec.md "Out of Scope" section.
