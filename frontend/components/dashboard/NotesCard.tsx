"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { StickyNote } from "lucide-react";

const STORAGE_KEY = "kudu_quick_notes";

// Custom hook to track client-side mounting without triggering re-renders in effects
function useIsMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export function NotesCard() {
  // Notes state - 3 quick notes
  const [notes, setNotes] = useState<[string, string, string]>(["", "", ""]);
  // Use ref for hydration flag to avoid cascading renders
  const isHydratedRef = useRef(false);
  // Track if component has mounted using useSyncExternalStore (no effect setState)
  const isMounted = useIsMounted();

  // Load notes from localStorage on mount (client-side only)
  // This is a valid initialization pattern - loading persisted state on mount
  useEffect(() => {
    isHydratedRef.current = true;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 3) {
          // eslint-disable-next-line react-hooks/set-state-in-effect -- Valid pattern: initializing state from localStorage on mount
          setNotes(parsed as [string, string, string]);
        }
      }
    } catch (error) {
      console.error("Failed to load notes from localStorage:", error);
    }
  }, []);

  // Save notes to localStorage whenever they change (after hydration)
  useEffect(() => {
    if (isHydratedRef.current) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
      } catch (error) {
        console.error("Failed to save notes to localStorage:", error);
      }
    }
  }, [notes]);

  // Update a specific note
  const updateNote = (index: number, value: string) => {
    setNotes((prev) => {
      const newNotes = [...prev] as [string, string, string];
      newNotes[index] = value;
      return newNotes;
    });
  };

  return (
    <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <StickyNote className="h-4 w-4 text-zinc-400" />
        <h3 className="text-zinc-100 font-medium text-sm">Notes</h3>
      </div>

      {/* Notes Grid - 3 editable textareas */}
      <div className="grid grid-cols-3 gap-2 flex-1">
        {[0, 1, 2].map((index) => (
          <textarea
            key={index}
            value={isMounted ? notes[index] : ""}
            onChange={(e) => updateNote(index, e.target.value)}
            placeholder="..."
            className="bg-zinc-800/50 rounded-lg p-2 text-xs text-zinc-300 placeholder:text-zinc-600 resize-none border-none focus:outline-none focus:ring-1 focus:ring-zinc-600 aspect-[3/4] w-full"
            disabled={!isMounted}
          />
        ))}
      </div>
    </div>
  );
}
