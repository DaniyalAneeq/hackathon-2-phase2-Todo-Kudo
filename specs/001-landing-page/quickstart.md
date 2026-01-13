# Quickstart: Modern 3D Landing Page Development

**Feature**: 001-landing-page
**Date**: 2026-01-07
**Estimated Setup Time**: 10 minutes

## Prerequisites

Before starting development, ensure you have:

- ✅ Node.js 18+ installed
- ✅ npm, yarn, or pnpm package manager
- ✅ Next.js 16+ project initialized (frontend directory)
- ✅ Tailwind CSS configured
- ✅ Lucide React icons installed
- ✅ Git repository initialized

## Installation

### 1. Install Required Dependencies

Navigate to the frontend directory and install the 3D library:

```bash
cd frontend
npm install @splinetool/react-spline
```

**Expected output**:
```
+ @splinetool/react-spline@1.x.x
added 1 package
```

**Verify installation**:
```bash
npm list @splinetool/react-spline
```

### 2. Verify Existing Dependencies

Ensure these packages are already installed (they should be per constitution):

```bash
npm list lucide-react
npm list next
npm list tailwindcss
```

If any are missing, install them:

```bash
npm install lucide-react next@latest tailwindcss
```

## Project Structure Setup

Create the component directory structure:

```bash
# From frontend directory
mkdir -p components
touch components/navbar.tsx
touch components/hero-section.tsx
touch components/feature-grid.tsx
touch components/feature-card.tsx
touch components/footer.tsx
```

**Expected directory tree**:
```
frontend/
├── app/
│   └── page.tsx              # Landing page (will be modified)
└── components/
    ├── navbar.tsx            # New: Glassmorphic navbar
    ├── hero-section.tsx      # New: 3D hero section
    ├── feature-grid.tsx      # New: Feature grid container
    ├── feature-card.tsx      # New: Individual feature card
    └── footer.tsx            # New: Footer component
```

## Development Workflow

### 1. Start Development Server

```bash
cd frontend
npm run dev
```

**Expected output**:
```
  ▲ Next.js 16.x.x
  - Local:        http://localhost:3000
  - Network:      http://192.168.x.x:3000

 ✓ Ready in 2.5s
```

### 2. Verify Landing Page Route

Open browser to `http://localhost:3000`

**Expected**: Current landing page loads (will be replaced)

### 3. Component Development Order

Implement components in this order (matches dependency tree):

1. **Navbar** (`components/navbar.tsx`)
   - Glassmorphic styling
   - Scroll detection logic
   - Test: Scroll page, navbar should change appearance

2. **Feature Card** (`components/feature-card.tsx`)
   - Icon, title, description rendering
   - Hover effects
   - Test: Hover over card, visual feedback appears

3. **Feature Grid** (`components/feature-grid.tsx`)
   - Grid layout with 4 hardcoded features
   - Responsive breakpoints
   - Test: Resize browser, grid adapts (1 col → 2 col)

4. **Footer** (`components/footer.tsx`)
   - Branding, links, social icons
   - Dark theme styling
   - Test: Click links, navigation works

5. **Hero Section** (`components/hero-section.tsx`)
   - Integrate Navbar
   - Integrate Spline 3D component
   - Error boundary wrapper
   - Test: 3D scene loads and responds to mouse movement

6. **Landing Page** (`app/page.tsx`)
   - Assemble all components
   - Test: Full page renders with all sections

### 4. Testing Each Component

For each component, use these verification steps:

**Visual Testing**:
```bash
# Server should be running (npm run dev)
# Navigate to http://localhost:3000
# Inspect element with browser DevTools
```

**Accessibility Testing**:
- Tab through interactive elements (keyboard navigation)
- Check color contrast (browser DevTools > Lighthouse)
- Test with screen reader (optional: NVDA, VoiceOver)

**Performance Testing**:
```bash
# Run Lighthouse audit
# Target: Performance score 80+
# Target: Accessibility score 90+
```

## Troubleshooting

### Issue: @splinetool/react-spline not found

**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Backdrop-filter not working

**Cause**: Browser compatibility or missing Tailwind config

**Solution**:
1. Check browser version (requires Chrome 100+, Firefox 100+, Safari 15+)
2. Verify Tailwind config includes backdrop utilities:
```javascript
// tailwind.config.js
module.exports = {
  // ... other config
  corePlugins: {
    backdropFilter: true, // Ensure this is enabled
  },
}
```

### Issue: 3D scene not loading

**Causes**:
- Network issue (scene file not accessible)
- JavaScript disabled
- Browser security policy blocking external resources

**Solutions**:
1. Check browser console for errors
2. Verify Spline scene URL is correct
3. Test in different browser
4. Implement error boundary fallback (per spec)

### Issue: Navbar scroll detection not working

**Cause**: Incorrect component setup (Server Component instead of Client Component)

**Solution**:
Ensure `navbar.tsx` starts with `'use client';` directive:
```typescript
'use client';

import { useEffect, useState } from 'react';
// ... rest of component
```

### Issue: Icons not displaying

**Cause**: Incorrect import or missing Lucide React package

**Solution**:
1. Verify import syntax:
```typescript
import { TrendingUp } from 'lucide-react'; // Correct
import TrendingUp from 'lucide-react'; // Incorrect
```
2. Reinstall package:
```bash
npm install lucide-react
```

## Performance Optimization Checklist

Before deployment, verify these optimizations:

- [ ] Spline component uses dynamic import with `ssr: false`
- [ ] Scroll listener uses `requestAnimationFrame` throttling
- [ ] Scroll listener has `passive: true` flag
- [ ] Feature Grid and Footer are Server Components
- [ ] Images use Next.js Image component (if applicable)
- [ ] No unused Lucide icons imported
- [ ] Tailwind CSS purge is enabled (production build)
- [ ] Lighthouse performance score ≥ 80

## Next Steps

After quickstart setup:

1. **Read plan.md**: Review full architectural plan
2. **Read tasks.md**: See detailed implementation tasks (generated by `/sp.tasks`)
3. **Start implementation**: Follow task order in tasks.md
4. **Run tests**: Verify each component as you build
5. **QA validation**: Run full-page tests after all components complete

## Resources

### Documentation Links

- Next.js 16 App Router: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Lucide React: https://lucide.dev/guide/packages/lucide-react
- @splinetool/react-spline: https://github.com/splinetool/react-spline
- React Error Boundaries: https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary

### Project-Specific Files

- Specification: `specs/001-landing-page/spec.md`
- Research: `specs/001-landing-page/research.md`
- Data Model: `specs/001-landing-page/data-model.md`
- Implementation Plan: `specs/001-landing-page/plan.md`
- Tasks: `specs/001-landing-page/tasks.md` (generated by `/sp.tasks`)

### Internal References

- Constitution: `.specify/memory/constitution.md`
- Project README: Root `README.md`
- Frontend README: `frontend/README.md`

## Getting Help

If you encounter issues not covered in this quickstart:

1. Check browser console for errors
2. Review spec.md "Edge Cases" section
3. Consult research.md "Alternatives Considered" sections
4. Review constitution for technology constraints
5. Ask for clarification on specific technical decisions
