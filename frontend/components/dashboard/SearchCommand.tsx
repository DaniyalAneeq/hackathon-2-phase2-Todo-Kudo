"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { useTasks } from "@/hooks/useTasks";
import { useDebounced } from "@/hooks/useDebounced";
import { CheckCircle2, Circle, Calendar, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchCommandProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchCommand({ open, onOpenChange }: SearchCommandProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounced(query, 300);

  const { data, isLoading } = useTasks({
    search: debouncedQuery,
    sortBy: "created_at",
    order: "desc",
    priority: "",
    category: "",
  });

  // Limit to 10 results
  const results = data?.tasks?.slice(0, 10) || [];

  const handleSelect = () => {
    // Navigate to task list (could be enhanced to scroll to specific task)
    router.push("/dashboard/list");
    onOpenChange(false);
    setQuery("");
  };

  const getPriorityColor = (priority: string | null) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "text-red-400";
      case "medium":
        return "text-yellow-400";
      case "low":
        return "text-green-400";
      default:
        return "text-zinc-400";
    }
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={(isOpen) => {
        onOpenChange(isOpen);
        if (!isOpen) setQuery("");
      }}
      title="Search Tasks"
      description="Search through your tasks by title or description"
    >
      <CommandInput
        placeholder="Search tasks..."
        value={query}
        onValueChange={setQuery}
        className="border-none focus:ring-0"
      />
      <CommandList className="max-h-[400px]">
        {isLoading && debouncedQuery && (
          <div className="py-6 text-center text-sm text-zinc-400">
            Searching...
          </div>
        )}

        {!isLoading && debouncedQuery && results.length === 0 && (
          <CommandEmpty>No tasks found for &ldquo;{debouncedQuery}&rdquo;</CommandEmpty>
        )}

        {!debouncedQuery && (
          <div className="py-6 text-center text-sm text-zinc-400">
            Type to search your tasks...
          </div>
        )}

        {results.length > 0 && (
          <CommandGroup heading="Tasks">
            {results.map((task) => (
              <CommandItem
                key={task.id}
                value={`${task.title}-${task.id}`}
                onSelect={handleSelect}
                className="flex items-center gap-3 py-3 cursor-pointer"
              >
                {/* Completion Status Icon */}
                {task.is_completed ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                ) : (
                  <Circle className="h-4 w-4 text-zinc-500 shrink-0" />
                )}

                {/* Task Info */}
                <div className="flex-1 min-w-0">
                  <p
                    className={cn(
                      "text-sm truncate",
                      task.is_completed
                        ? "text-zinc-500 line-through"
                        : "text-zinc-100"
                    )}
                  >
                    {task.title}
                  </p>
                  {task.description && (
                    <p className="text-xs text-zinc-500 truncate mt-0.5">
                      {task.description}
                    </p>
                  )}
                </div>

                {/* Metadata */}
                <div className="flex items-center gap-2 shrink-0">
                  {task.priority && (
                    <span
                      className={cn(
                        "text-xs capitalize",
                        getPriorityColor(task.priority)
                      )}
                    >
                      {task.priority}
                    </span>
                  )}
                  {task.category && (
                    <span className="flex items-center gap-1 text-xs text-zinc-500">
                      <Tag className="h-3 w-3" />
                      {task.category}
                    </span>
                  )}
                  {task.due_date && (
                    <span className="flex items-center gap-1 text-xs text-zinc-500">
                      <Calendar className="h-3 w-3" />
                      {new Date(task.due_date).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}
