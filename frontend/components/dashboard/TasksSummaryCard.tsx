"use client";

import Link from "next/link";
import { CheckSquare } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useTasks } from "@/hooks/useTasks";

export function TasksSummaryCard() {
  const { data, isLoading } = useTasks({
    search: '',
    sortBy: 'created_at',
    order: 'desc',
    priority: '',
    category: ''
  });

  const totalCount = data?.total ?? 0;

  return (
    <Link
      href="/dashboard/list"
      className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4 h-full flex flex-col cursor-pointer hover:border-zinc-700 transition-colors"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <CheckSquare className="h-4 w-4 text-zinc-400" />
        <h3 className="text-zinc-100 font-medium text-sm">Tasks</h3>
      </div>

      {/* Task Count */}
      <div className="flex-1 flex flex-col justify-center">
        {isLoading ? (
          <Skeleton className="h-8 w-16 bg-zinc-700 rounded" />
        ) : (
          <>
            <p className="text-zinc-100 text-2xl font-bold">{totalCount}</p>
            <p className="text-zinc-500 text-sm">
              {totalCount === 1 ? "task" : "tasks"}
            </p>
          </>
        )}
      </div>

      {/* Visual lines placeholder to match reference */}
      <div className="space-y-2 mt-4">
        <div className="h-1 bg-zinc-800 rounded-full w-full" />
        <div className="h-1 bg-zinc-800 rounded-full w-3/4" />
        <div className="h-1 bg-zinc-800 rounded-full w-1/2" />
      </div>
    </Link>
  );
}
