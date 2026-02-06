# Quickstart: Modern Dashboard Implementation

**Feature**: 007-modern-dashboard
**Date**: 2026-01-09

## Prerequisites

Before starting implementation, ensure:

1. **Current Branch**: `007-modern-dashboard`
2. **Development Server**: Frontend running at `http://localhost:3000`
3. **Backend Server**: API running at `http://localhost:8000`
4. **Authentication**: Login functionality working (test with existing account)

---

## Step 1: Install Required Shadcn Components

```bash
cd frontend
npx shadcn@latest add progress
npx shadcn@latest add avatar
```

Verify installation:
```bash
ls components/ui/progress.tsx
ls components/ui/avatar.tsx
```

---

## Step 2: Create Dashboard Component Directory

```bash
mkdir -p frontend/components/dashboard
```

---

## Step 3: Implement Components (Order of Implementation)

### 3.1 FloatingDock (No dependencies)

```bash
# Create file
touch frontend/components/dashboard/FloatingDock.tsx
```

**Key imports**:
```typescript
import { Brain, Mic, Search } from 'lucide-react';
```

**Verification**: Component renders at bottom center of viewport.

---

### 3.2 EnergyCard (Mock data only)

```bash
touch frontend/components/dashboard/EnergyCard.tsx
```

**Key imports**:
```typescript
import { Progress } from '@/components/ui/progress';
```

**Verification**: Card displays green progress bar at 100%.

---

### 3.3 NotesCard (Mock data only)

```bash
touch frontend/components/dashboard/NotesCard.tsx
```

**Verification**: Card displays 3 empty placeholder slots.

---

### 3.4 TasksSummaryCard (API call for count)

```bash
touch frontend/components/dashboard/TasksSummaryCard.tsx
```

**Verification**: Card displays total task count from API.

---

### 3.5 DoNowCard (API integration)

```bash
touch frontend/components/dashboard/DoNowCard.tsx
```

**Key integration**:
```typescript
const { data, isLoading } = useTasks({ priority: 'high' });
const displayTasks = data?.tasks.slice(0, 3) || [];
```

**Verification**:
1. Create a high-priority task via existing dashboard
2. New DoNowCard should display it
3. Checkbox should toggle completion

---

### 3.6 DashboardHeader

```bash
touch frontend/components/dashboard/DashboardHeader.tsx
```

**Key imports**:
```typescript
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
```

**Verification**: Header shows user name and avatar.

---

### 3.7 ModernDashboardClient (Composition)

```bash
touch frontend/components/dashboard/ModernDashboardClient.tsx
```

This component assembles all others with the bento grid layout.

**Verification**: Full dashboard layout renders correctly.

---

### 3.8 Update Dashboard Page

Modify `frontend/app/dashboard/page.tsx` to use `ModernDashboardClient`.

**Verification**: Navigate to `/dashboard` and see new design.

---

## Step 4: Testing Checklist

- [ ] Dashboard loads within 2 seconds
- [ ] Dark theme applied (zinc-950 background)
- [ ] Bento grid layout correct on desktop
- [ ] Grid stacks vertically on mobile
- [ ] High-priority tasks appear in Do Now card
- [ ] Task checkbox toggles completion
- [ ] Total task count displays correctly
- [ ] Floating dock visible at bottom
- [ ] Search icon triggers search (focus input or modal)
- [ ] Sign out button works

---

## Common Issues & Solutions

### Issue: Progress component not found
```
Error: Module not found: Can't resolve '@/components/ui/progress'
```
**Solution**: Run `npx shadcn@latest add progress`

### Issue: Avatar component not found
**Solution**: Run `npx shadcn@latest add avatar`

### Issue: Tasks not loading in DoNowCard
**Check**:
1. Is the user authenticated?
2. Does the user have high-priority tasks?
3. Are there console errors in browser dev tools?

### Issue: Floating dock overlaps content
**Solution**: Add `pb-24` padding to the main content container.

---

## Development Tips

1. **Use Tailwind Play** to prototype styles: https://play.tailwindcss.com/
2. **Test mobile view** using browser dev tools responsive mode
3. **Check accessibility** with browser accessibility tools
4. **Use React Query DevTools** to debug API calls

---

## Next Steps After Implementation

1. Run `/sp.tasks` to generate detailed implementation tasks
2. Create each component following contracts in `contracts/dashboard-components.md`
3. Test each component independently before integration
4. Run QA validation with `/sp.qa`
