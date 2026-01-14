"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { StickyNote, Save } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

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
  // Notes state - single note content
  const [note, setNote] = useState("");
  const [draftNote, setDraftNote] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
        // eslint-disable-next-line react-hooks/set-state-in-effect -- Valid pattern: initializing state from localStorage on mount
        setNote(saved);
      }
    } catch (error) {
      console.error("Failed to load notes from localStorage:", error);
    }
  }, []);

  // Save note to localStorage
  const saveNote = () => {
    try {
      localStorage.setItem(STORAGE_KEY, draftNote);
      setNote(draftNote);
      setIsDialogOpen(false);
      toast.success("Note saved successfully!");
    } catch (error) {
      console.error("Failed to save note to localStorage:", error);
      toast.error("Failed to save note");
    }
  };

  // Handle opening dialog
  const handleOpenDialog = () => {
    setDraftNote(note);
    setIsDialogOpen(true);
  };

  // Get preview text (truncated if too long)
  const previewText = note
    ? note.length > 60
      ? note.substring(0, 60) + "..."
      : note
    : "Click to add notes...";

  return (
    <>
      {/* Clickable Notes Card */}
      <div
        onClick={handleOpenDialog}
        className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4 h-full flex flex-col cursor-pointer hover:bg-zinc-900 hover:border-zinc-700 transition-colors"
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <StickyNote className="h-4 w-4 text-amber-500" />
          <h3 className="text-zinc-100 font-medium text-sm">Notes</h3>
        </div>

        {/* Note Preview */}
        <div className="flex-1 flex items-start">
          <p
            className={`text-xs leading-relaxed ${note ? "text-zinc-300" : "text-zinc-500"}`}
          >
            {isMounted ? previewText : "Loading..."}
          </p>
        </div>
      </div>

      {/* Notes Dialog/Popup */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-zinc-100">
              <StickyNote className="h-5 w-5 text-amber-500" />
              My Notes
            </DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <Textarea
              value={draftNote}
              onChange={(e) => setDraftNote(e.target.value)}
              placeholder="Write your notes here..."
              className="min-h-[200px] bg-zinc-800/50 border-zinc-700 text-zinc-200 placeholder:text-zinc-500 focus:border-zinc-600 resize-none"
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="ghost"
              onClick={() => setIsDialogOpen(false)}
              className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
            >
              Cancel
            </Button>
            <Button
              onClick={saveNote}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
