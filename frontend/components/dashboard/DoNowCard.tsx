"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { useTasks } from "@/hooks/useTasks";
import { useUpdateTask } from "@/hooks/useUpdateTask";
import { cn } from "@/lib/utils";

interface DoNowCardProps {
  onAddTask?: () => void;
}

export function DoNowCard({ onAddTask }: DoNowCardProps) {
  const { data, isLoading } = useTasks({
    priority: 'high',
    search: '',
    sortBy: 'created_at',
    order: 'desc',
    category: ''
  });
  const updateTask = useUpdateTask();

  // Get top 3 high-priority tasks (client-side filter with case-insensitive check + slice)
  const priorityTasks = data?.tasks
    .filter((task) => task.priority?.toLowerCase() === 'high')
    .slice(0, 3) || [];

  const handleAddClick = () => {
    if (onAddTask) {
      onAddTask();
    } else {
      // Fallback: scroll to top where CreateTaskForm typically is
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-zinc-100 font-semibold text-lg">Do now</h2>
          <p className="text-zinc-400 text-sm">Latest priority tasks</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleAddClick}
          className="h-10 w-10 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-100"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      {/* Task List */}
      <div className="flex-1 space-y-3">
        {/* Loading State */}
        {isLoading && (
          <>
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/50">
                <Skeleton className="w-5 h-5 rounded bg-zinc-700" />
                <Skeleton className="h-4 flex-1 bg-zinc-700" />
              </div>
            ))}
          </>
        )}

        {/* Empty State */}
        {!isLoading && priorityTasks.length === 0 && (
          <p className="text-zinc-500 text-sm text-center py-8">
            No high-priority tasks. Set priorities to see them here.
          </p>
        )}

        {/* Task Items */}
        {!isLoading && priorityTasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800/70 transition-colors"
          >
            <Checkbox
              id={`donow-task-${task.id}`}
              checked={task.is_completed}
              onCheckedChange={(checked) => {
                updateTask.mutate({
                  id: task.id,
                  data: { is_completed: !!checked },
                });
              }}
              className="h-5 w-5 rounded border-2 border-zinc-600 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
            />
            <label
              htmlFor={`donow-task-${task.id}`}
              className={cn(
                "flex-1 text-sm cursor-pointer truncate",
                task.is_completed
                  ? "text-zinc-500 line-through"
                  : "text-zinc-200"
              )}
            >
              {task.title}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
