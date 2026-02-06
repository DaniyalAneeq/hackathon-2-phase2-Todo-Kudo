"use client";

import { Brain, Mic, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface FloatingDockProps {
  onSearch?: () => void;
}

export function FloatingDock({ onSearch }: FloatingDockProps) {
  const handleBrainClick = () => {
    toast.info("AI Assistant coming soon!");
  };

  const handleMicClick = () => {
    toast.info("Voice input coming soon!");
  };

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch();
    } else {
      toast.info("Search feature coming soon!");
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <div className="flex items-center gap-2 bg-zinc-900/90 backdrop-blur-md border border-zinc-800 rounded-full px-6 py-3 shadow-2xl shadow-black/50 pointer-events-auto">
        {/* Brain Icon - Standard */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBrainClick}
          className="h-10 w-10 rounded-full text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
        >
          <Brain className="h-5 w-5" />
        </Button>

        {/* Mic Icon - Emphasized (Center Action) */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleMicClick}
          className="h-12 w-12 rounded-full text-zinc-100 hover:text-white hover:bg-zinc-800 transition-all scale-110 hover:scale-115 relative"
        >
          <div className="absolute inset-0 rounded-full bg-emerald-500/10 blur-sm" />
          <Mic className="h-6 w-6 relative z-10" />
        </Button>

        {/* Search Icon - Standard */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleSearchClick}
          className="h-10 w-10 rounded-full text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
