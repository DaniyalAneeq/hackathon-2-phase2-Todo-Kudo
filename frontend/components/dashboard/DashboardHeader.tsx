"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell, Settings, LogOut } from "lucide-react";

interface DashboardHeaderProps {
  user: {
    name: string;
    email: string;
    image?: string;
  };
  onSignOut: () => void;
}

export function DashboardHeader({ user, onSignOut }: DashboardHeaderProps) {
  // Get initials for avatar fallback
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="flex items-center justify-between mb-8">
      {/* Left: Avatar + User Name */}
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 border border-zinc-700">
          <AvatarImage src={user.image} alt={user.name} />
          <AvatarFallback className="bg-zinc-800 text-zinc-200">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-zinc-100 font-medium">{user.name}</p>
          <p className="text-zinc-500 text-sm">{user.email}</p>
        </div>
      </div>

      {/* Right: Icons */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
        >
          <Bell className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
        >
          <Settings className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onSignOut}
          className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
