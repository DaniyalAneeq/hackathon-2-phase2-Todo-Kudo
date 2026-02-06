"use client";

import { useState } from "react";
import { DashboardHeader } from "./DashboardHeader";
import { EnergyCard } from "./EnergyCard";
import { DoNowCard } from "./DoNowCard";
import { NotesCard } from "./NotesCard";
import { TasksSummaryCard } from "./TasksSummaryCard";
import { FloatingDock } from "./FloatingDock";
import { CreateTaskDialog } from "./CreateTaskDialog";
import { SearchCommand } from "./SearchCommand";

interface ModernDashboardClientProps {
  user: {
    name: string;
    email: string;
    image?: string;
  };
  onSignOut: () => void;
}

export function ModernDashboardClient({
  user,
  onSignOut,
}: ModernDashboardClientProps) {
  // Dialog state management for task creation and search
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 p-6 md:p-8 pb-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <DashboardHeader user={user} onSignOut={onSignOut} />

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Column Group */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <EnergyCard />
            <div className="grid grid-cols-2 gap-4">
              <NotesCard />
              <TasksSummaryCard />
            </div>
          </div>

          {/* Right Column Group - Do Now Card (spans 8 cols and full height) */}
          <div className="md:col-span-8">
            <DoNowCard onAddTask={() => setIsCreateDialogOpen(true)} />
          </div>
        </div>
      </div>

      {/* Floating Dock - Fixed at bottom center */}
      <FloatingDock onSearch={() => setIsSearchDialogOpen(true)} />

      {/* Dialogs */}
      <CreateTaskDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
      <SearchCommand
        open={isSearchDialogOpen}
        onOpenChange={setIsSearchDialogOpen}
      />
    </div>
  );
}
