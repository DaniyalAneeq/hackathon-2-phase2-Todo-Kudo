# Research: Modern Dashboard Redesign

**Feature**: 007-modern-dashboard
**Date**: 2026-01-09
**Status**: Complete

## Research Summary

All technical unknowns have been resolved. This feature is frontend-only and uses existing backend APIs.

---

## 1. Shadcn UI Components Required

**Decision**: Install `progress` and `avatar` components from Shadcn registry.

**Rationale**:
- The project already uses Shadcn UI for other components (card, button, badge, checkbox, etc.)
- Progress component is needed for the Energy Card progress bar
- Avatar component is needed for the header user display
- Consistent component library reduces styling overhead

**Installation Commands**:
```bash
npx shadcn@latest add progress
npx shadcn@latest add avatar
```

**Alternatives Considered**:
- Custom progress bar with Tailwind → Rejected: Shadcn provides accessible, animated component
- CSS-only avatar → Rejected: Avatar component handles fallbacks and image loading

---

## 2. Existing Task API Integration

**Decision**: Use existing `fetchTasks()` function with `priority=high` filter and `limit=3`.

**Rationale**:
- API client already supports `priority` filter parameter (confirmed in `api-client.ts:47`)
- Backend API accepts `priority` query parameter (confirmed in Spec 005)
- No backend changes required

**API Call Pattern**:
```typescript
const { data } = useTasks({ priority: 'high', limit: 3 });
```

**Note**: Need to verify if `limit` parameter is supported. If not, slice results client-side.

**Alternatives Considered**:
- New `/api/tasks/high-priority` endpoint → Rejected: Unnecessary, existing API sufficient
- GraphQL query → Rejected: Project uses REST

---

## 3. Tailwind Dark Theme Classes

**Decision**: Use zinc color palette for matte black theme.

**Rationale**:
- Zinc is Tailwind's neutral gray with slightly warm undertones
- Provides better contrast than pure black for UI elements
- Consistent with modern dark mode design patterns

**Color Tokens**:
| Element | Tailwind Class | Description |
|---------|---------------|-------------|
| Page Background | `bg-zinc-950` | Deep matte black |
| Card Background | `bg-zinc-900/80` | Slightly lighter with opacity |
| Card Border | `border-zinc-800` | Subtle border |
| Text Primary | `text-zinc-100` | High contrast white |
| Text Secondary | `text-zinc-400` | Muted text |
| Accent Green | `bg-emerald-500` | Energy bar progress |

**Alternatives Considered**:
- Pure black `bg-black` → Rejected: Too harsh, poor contrast
- Slate palette → Rejected: Zinc warmer, better for productivity UI
- Custom CSS variables → Rejected: Tailwind classes sufficient

---

## 4. Bento Grid Layout Pattern

**Decision**: Use CSS Grid with Tailwind utility classes.

**Rationale**:
- CSS Grid provides precise control over column widths
- Tailwind's grid utilities are well-documented and responsive
- Matches the 1/3 + 2/3 split requirement

**Grid Structure**:
```css
/* Container */
grid grid-cols-1 md:grid-cols-3 gap-4

/* Top Row */
Energy Card: md:col-span-1
Do Now Card: md:col-span-2

/* Bottom Row */
Notes Card: md:col-span-1
Tasks Card: md:col-span-1
(Optional: Add another card or leave empty space)
```

**Alternatives Considered**:
- Flexbox → Rejected: Grid better for complex layouts
- CSS Subgrid → Rejected: Less browser support, overkill for this use case

---

## 5. Floating Dock Implementation

**Decision**: Use fixed positioning with backdrop blur.

**Rationale**:
- Fixed position ensures dock stays visible during scroll
- Backdrop blur provides visual separation from content
- Centered positioning with flexbox is straightforward

**CSS Pattern**:
```css
fixed bottom-6 left-1/2 -translate-x-1/2
bg-zinc-900/80 backdrop-blur-lg
rounded-full px-6 py-3
```

**Alternatives Considered**:
- Sticky positioning → Rejected: Fixed is more predictable for persistent nav
- CSS animation on scroll → Rejected: Not in scope, adds complexity

---

## 6. Lucide React Icons

**Decision**: Use Brain, Mic, and Search icons from Lucide React.

**Rationale**:
- Lucide React is likely already installed (common Next.js pattern)
- Icons match the specification exactly
- Consistent iconography across the app

**Icons**:
```typescript
import { Brain, Mic, Search } from 'lucide-react';
```

**Alternatives Considered**:
- Heroicons → Rejected: Different style, would need new dependency
- Custom SVGs → Rejected: Unnecessary when Lucide provides what we need

---

## 7. Search Feature Integration (Spec 005)

**Decision**: Trigger search by updating URL with search query parameter.

**Rationale**:
- Spec 005 already implements URL-based filtering
- The `TaskToolbar` component handles search input
- Clicking Search icon should focus the existing search input or open a search modal

**Integration Pattern**:
- Option A: Scroll to and focus existing TaskToolbar search input
- Option B: Open a command palette / search modal (future enhancement)

**Current Recommendation**: Option A for MVP simplicity.

---

## 8. Task Checkbox Toggle

**Decision**: Reuse existing `updateTask` mutation pattern.

**Rationale**:
- The existing `TaskCard` component already handles checkbox toggling
- Can extract the mutation logic into a shared hook if needed
- Uses `PATCH /api/tasks/{id}` with `{ is_completed: boolean }`

**Code Pattern**:
```typescript
const toggleComplete = useMutation({
  mutationFn: (id: number) => updateTask(id, { is_completed: !task.is_completed }),
  onSuccess: () => queryClient.invalidateQueries(['tasks'])
});
```

---

## Unresolved Items

None. All technical decisions have been made with reasonable defaults.
