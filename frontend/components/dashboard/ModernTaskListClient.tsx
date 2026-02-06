"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Filter, X, SortAsc, Plus, ClipboardList } from "lucide-react";
import { DashboardHeader } from "./DashboardHeader";
import { FloatingDock } from "./FloatingDock";
import { CreateTaskDialog } from "./CreateTaskDialog";
import { SearchCommand } from "./SearchCommand";
import { useTasks } from "@/hooks/useTasks";
import { useTaskFilters } from "@/hooks/useTaskFilters";
import { useDebounced } from "@/hooks/useDebounced";
import { ModernTaskCard } from "./ModernTaskCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SORT_OPTIONS } from "@/types/filters";
import { useEffect } from "react";

interface ModernTaskListClientProps {
  user: {
    name: string;
    email: string;
    image?: string;
  };
  onSignOut: () => void;
}

export function ModernTaskListClient({
  user,
  onSignOut,
}: ModernTaskListClientProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);

  const { filters, setFilters, clearFilters, hasActiveFilters } = useTaskFilters();
  const [searchInput, setSearchInput] = useState(filters.search);
  const debouncedSearch = useDebounced(searchInput, 300);

  // Update filters when debounced search changes
  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      setFilters({ search: debouncedSearch });
    }
  }, [debouncedSearch, filters.search, setFilters]);

  const { data, isLoading, isError, error } = useTasks(filters);

  // Find current sort option label
  const currentSortOption = SORT_OPTIONS.find(
    (opt) => opt.sortBy === filters.sortBy && opt.order === filters.order
  );

  // Count active filters
  const activeFilterCount = [
    filters.search,
    filters.priority,
    filters.category,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-zinc-950 p-6 md:p-8 pb-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <DashboardHeader user={user} onSignOut={onSignOut} />

        {/* Back to Dashboard + Title */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-zinc-100 tracking-tight">
                All Tasks
              </h1>
              <p className="text-zinc-400 mt-1">
                Manage and organize your tasks
              </p>
            </div>
            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Task
            </Button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <Input
              placeholder="Search tasks..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-10 bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-700"
            />
          </div>

          {/* Sort Dropdown */}
          <Select
            value={currentSortOption?.label || SORT_OPTIONS[0].label}
            onValueChange={(label) => {
              const option = SORT_OPTIONS.find((opt) => opt.label === label);
              if (option) {
                setFilters({ sortBy: option.sortBy, order: option.order });
              }
            }}
          >
            <SelectTrigger className="w-[180px] bg-zinc-900 border-zinc-800 text-zinc-100">
              <SortAsc className="h-4 w-4 mr-2 text-zinc-400" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-800">
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.label} value={option.label}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Filter Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="relative bg-zinc-900 border-zinc-800 text-zinc-100 hover:bg-zinc-800 hover:text-zinc-100"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
                {activeFilterCount > 0 && (
                  <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-xs text-white">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-zinc-900 border-zinc-800">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block text-zinc-300">
                    Priority
                  </label>
                  <Select
                    value={filters.priority || "all"}
                    onValueChange={(value: "high" | "medium" | "low" | "all") =>
                      setFilters({ priority: value === "all" ? "" : value })
                    }
                  >
                    <SelectTrigger className="bg-zinc-800 border-zinc-700 text-zinc-100">
                      <SelectValue placeholder="All priorities" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      <SelectItem value="all">All priorities</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block text-zinc-300">
                    Category
                  </label>
                  <Input
                    placeholder="Enter category..."
                    value={filters.category}
                    onChange={(e) => setFilters({ category: e.target.value })}
                    className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
            >
              <X className="h-4 w-4 mr-2" />
              Clear
            </Button>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-3"
              >
                <Skeleton className="h-5 w-3/4 bg-zinc-800" />
                <Skeleton className="h-4 w-full bg-zinc-800" />
                <Skeleton className="h-4 w-5/6 bg-zinc-800" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="rounded-xl border border-red-900/50 bg-red-950/20 p-6">
            <p className="text-sm text-red-400">
              Error loading tasks: {error?.message || "Unknown error"}
            </p>
          </div>
        )}

        {/* Tasks */}
        {data && (
          <>
            {data.tasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="rounded-full bg-zinc-800 p-4 mb-4">
                  <ClipboardList className="h-8 w-8 text-zinc-500" />
                </div>
                <p className="text-zinc-400 mb-4">
                  {hasActiveFilters
                    ? "No tasks found matching your filters."
                    : "No tasks yet. Create your first task!"}
                </p>
                {hasActiveFilters ? (
                  <Button
                    onClick={clearFilters}
                    variant="outline"
                    className="bg-zinc-900 border-zinc-800 text-zinc-100 hover:bg-zinc-800"
                  >
                    Clear Filters
                  </Button>
                ) : (
                  <Button
                    onClick={() => setIsCreateDialogOpen(true)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Task
                  </Button>
                )}
              </div>
            ) : (
              <>
                <div className="text-sm text-zinc-500 mb-4">
                  {data.total} {data.total === 1 ? "task" : "tasks"} found
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {data.tasks.map((task) => (
                    <ModernTaskCard key={task.id} task={task} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* Floating Dock */}
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
