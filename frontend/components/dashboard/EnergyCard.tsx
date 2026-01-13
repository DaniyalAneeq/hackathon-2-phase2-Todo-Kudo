"use client";

import Link from "next/link";
import { Zap } from "lucide-react";

interface EnergyCardProps {
  energyPercentage?: number;
  completedTasks?: number;
  totalTasks?: number;
}

export function EnergyCard({
  energyPercentage = 100,
  completedTasks = 0,
  totalTasks = 0,
}: EnergyCardProps) {
  return (
    <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Zap className="h-5 w-5 text-emerald-500" />
        <h2 className="text-zinc-100 font-semibold">Energy</h2>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-300"
            style={{ width: `${energyPercentage}%` }}
          />
        </div>
        <p className="text-zinc-400 text-sm mt-2">
          {energyPercentage}% Energy Remaining
        </p>
      </div>

      {/* Circular Progress Placeholder */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-20 h-20">
          {/* Background circle */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="40"
              cy="40"
              r="36"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="text-zinc-800"
            />
            <circle
              cx="40"
              cy="40"
              r="36"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              strokeDasharray={`${(completedTasks / Math.max(totalTasks, 1)) * 226} 226`}
              className="text-emerald-500"
            />
          </svg>
          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-zinc-100 text-sm font-medium">
              {completedTasks}/{totalTasks}
            </span>
          </div>
        </div>
      </div>

      {/* Action Link */}
      <Link
        href="/dashboard/list"
        className="text-blue-400 hover:text-blue-300 text-sm mt-4 inline-flex items-center gap-1 transition-colors"
      >
        → Start your day
      </Link>
    </div>
  );
}
