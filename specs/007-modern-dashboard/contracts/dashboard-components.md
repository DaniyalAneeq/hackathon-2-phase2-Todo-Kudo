# Component Contracts: Modern Dashboard

**Feature**: 007-modern-dashboard
**Date**: 2026-01-09

## Component Hierarchy

```
app/dashboard/page.tsx (Server Component)
└── ModernDashboardClient.tsx (Client Component)
    ├── DashboardHeader.tsx
    ├── BentoGrid (layout container)
    │   ├── EnergyCard.tsx
    │   ├── DoNowCard.tsx
    │   ├── NotesCard.tsx
    │   └── TasksSummaryCard.tsx
    └── FloatingDock.tsx
```

---

## Component Specifications

### 1. ModernDashboardClient

**File**: `frontend/components/dashboard/ModernDashboardClient.tsx`

**Props**:
```typescript
interface ModernDashboardClientProps {
  session: {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
    };
  };
}
```

**Responsibilities**:
- Container for all dashboard components
- Manages dark theme wrapper
- Handles sign-out functionality

---

### 2. DashboardHeader

**File**: `frontend/components/dashboard/DashboardHeader.tsx`

**Props**:
```typescript
interface DashboardHeaderProps {
  user: {
    name: string;
    image?: string;
  };
  onSignOut: () => void;
}
```

**Structure**:
```
[Avatar] [User Name]                    [Bell Icon] [Settings Icon] [Sign Out]
```

**Styling**:
- Flex container with justify-between
- Avatar: 40x40px rounded-full
- Text: text-zinc-100 font-medium

---

### 3. EnergyCard

**File**: `frontend/components/dashboard/EnergyCard.tsx`

**Props**:
```typescript
interface EnergyCardProps {
  energyPercentage?: number; // Default: 100
  completedTasks?: number;   // Default: 0
  totalTasks?: number;       // Default: 0
}
```

**Structure**:
```
┌─────────────────────────┐
│ ⚡ Energy               │
│                         │
│ [████████████] 100%     │
│ Energy Remaining        │
│                         │
│    ┌───┐                │
│    │0/0│ Tasks          │
│    └───┘                │
│                         │
│ → Start your day        │
└─────────────────────────┘
```

**Styling**:
- Card: `bg-zinc-900/80 border-zinc-800 rounded-2xl p-6`
- Progress bar: `bg-emerald-500` on `bg-zinc-800`
- Circular progress: Custom component or SVG

---

### 4. DoNowCard

**File**: `frontend/components/dashboard/DoNowCard.tsx`

**Props**:
```typescript
interface DoNowCardProps {
  tasks: Task[];
  isLoading: boolean;
  onToggleComplete: (taskId: number, isCompleted: boolean) => void;
  onAddTask: () => void;
}
```

**Structure**:
```
┌─────────────────────────────────────────┐
│ Do now                           [+]    │
│ Latest priority tasks                   │
│                                         │
│ ☐ Complete project report               │
│ ☐ Review pull request                   │
│ ☐ Send weekly update                    │
│                                         │
└─────────────────────────────────────────┘
```

**Behavior**:
- Fetches tasks where `priority=high`
- Displays max 3 tasks
- Checkbox toggles completion via API
- "+" button opens task creation

**Styling**:
- Card: `bg-zinc-900/80 border-zinc-800 rounded-2xl p-6`
- Task items: `flex items-center gap-3`
- Empty state: "No high-priority tasks. Set priorities to see them here."

---

### 5. NotesCard

**File**: `frontend/components/dashboard/NotesCard.tsx`

**Props**:
```typescript
interface NotesCardProps {
  // No props - uses mock data
}
```

**Structure**:
```
┌───────────────────┐
│ Notes             │
│ ┌───┐ ┌───┐ ┌───┐ │
│ │   │ │   │ │   │ │
│ └───┘ └───┘ └───┘ │
└───────────────────┘
```

**Styling**:
- Card: `bg-zinc-900/80 border-zinc-800 rounded-2xl p-4`
- Slots: `aspect-square bg-zinc-800 rounded-lg`

---

### 6. TasksSummaryCard

**File**: `frontend/components/dashboard/TasksSummaryCard.tsx`

**Props**:
```typescript
interface TasksSummaryCardProps {
  totalCount: number;
  isLoading: boolean;
}
```

**Structure**:
```
┌───────────────────┐
│ Tasks             │
│                   │
│ 12 tasks          │
│                   │
└───────────────────┘
```

**Styling**:
- Card: `bg-zinc-900/80 border-zinc-800 rounded-2xl p-4`
- Count: `text-2xl font-bold text-zinc-100`

---

### 7. FloatingDock

**File**: `frontend/components/dashboard/FloatingDock.tsx`

**Props**:
```typescript
interface FloatingDockProps {
  onSearchClick: () => void;
}
```

**Structure**:
```
        ┌──────────────────────┐
        │ 🧠  │  🎤  │  🔍    │
        └──────────────────────┘
```

**Styling**:
- Container: `fixed bottom-6 left-1/2 -translate-x-1/2`
- Background: `bg-zinc-900/80 backdrop-blur-lg rounded-full`
- Icons: `p-3 hover:bg-zinc-800 rounded-full transition-colors`
- Center icon (Mic): `p-4` (larger)

---

## Shared Styling Tokens

```typescript
// styles/dashboard-theme.ts
export const dashboardTheme = {
  // Backgrounds
  pageBg: 'bg-zinc-950',
  cardBg: 'bg-zinc-900/80',
  cardBorder: 'border-zinc-800',

  // Text
  textPrimary: 'text-zinc-100',
  textSecondary: 'text-zinc-400',
  textMuted: 'text-zinc-500',

  // Accents
  accentGreen: 'bg-emerald-500',
  accentBlue: 'bg-blue-500',

  // Spacing
  cardPadding: 'p-6',
  cardRadius: 'rounded-2xl',

  // Transitions
  transition: 'transition-all duration-200',
} as const;
```

---

## File Structure

```
frontend/components/dashboard/
├── ModernDashboardClient.tsx
├── DashboardHeader.tsx
├── EnergyCard.tsx
├── DoNowCard.tsx
├── NotesCard.tsx
├── TasksSummaryCard.tsx
├── FloatingDock.tsx
└── index.ts (barrel export)
```
