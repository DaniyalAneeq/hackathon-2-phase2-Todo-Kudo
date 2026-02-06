"use client";

import { useState } from "react";
import type { Task, PriorityLevel } from "@/types/task";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, X, Pencil, Trash2 } from "lucide-react";
import { useUpdateTask } from "@/hooks/useUpdateTask";
import { useDeleteTask } from "@/hooks/useDeleteTask";
import { cn, formatDueDate } from "@/lib/utils";
import { format } from "date-fns";

interface ModernTaskCardProps {
  task: Task;
}

export function ModernTaskCard({ task }: ModernTaskCardProps) {
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(
    task.description || ""
  );
  const [editedPriority, setEditedPriority] = useState<PriorityLevel>(
    task.priority
  );
  const [editedDueDate, setEditedDueDate] = useState<Date | undefined>(
    task.due_date ? new Date(task.due_date) : undefined
  );

  const normalizedCategory = task.category?.toLowerCase();
  const standardCategories = ["work", "school", "personal"];
  const [editedCategory, setEditedCategory] = useState(
    normalizedCategory && standardCategories.includes(normalizedCategory)
      ? task.category
      : ""
  );

  const handleToggleComplete = (checked: boolean) => {
    updateTask.mutate({
      id: task.id,
      data: { is_completed: checked },
    });
  };

  const handleSaveClick = () => {
    setIsUpdateDialogOpen(true);
  };

  const handleConfirmSave = () => {
    updateTask.mutate(
      {
        id: task.id,
        data: {
          title: editedTitle,
          description: editedDescription || null,
          priority: editedPriority,
          due_date: editedDueDate ? editedDueDate.toISOString() : null,
          category: editedCategory || null,
        },
      },
      {
        onSuccess: () => {
          setIsEditing(false);
          setIsUpdateDialogOpen(false);
        },
      }
    );
  };

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteTask.mutate(task.id, {
      onSuccess: () => {
        setIsDeleteDialogOpen(false);
      },
    });
  };

  const handleCancel = () => {
    setEditedTitle(task.title);
    setEditedDescription(task.description || "");
    setEditedPriority(task.priority);
    setEditedDueDate(task.due_date ? new Date(task.due_date) : undefined);
    setEditedCategory(task.category || "");
    setIsEditing(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "low":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      default:
        return "bg-zinc-500/20 text-zinc-400 border-zinc-500/30";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category?.toLowerCase()) {
      case "work":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "school":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "personal":
        return "bg-pink-500/20 text-pink-400 border-pink-500/30";
      default:
        return "bg-zinc-500/20 text-zinc-400 border-zinc-500/30";
    }
  };

  if (isEditing) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-5">
        <div className="space-y-4">
          <Input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Task title..."
            className="font-semibold text-lg bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
          />
          <Input
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            placeholder="Task description (optional)..."
            className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
          />

          <div>
            <label className="text-sm font-medium mb-2 block text-zinc-300">
              Priority
            </label>
            <Select
              value={editedPriority}
              onValueChange={(value) =>
                setEditedPriority(value as PriorityLevel)
              }
              disabled={updateTask.isPending}
            >
              <SelectTrigger className="bg-zinc-800 border-zinc-700 text-zinc-100">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block text-zinc-300">
              Due Date
            </label>
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "flex-1 justify-start text-left font-normal bg-zinc-800 border-zinc-700 text-zinc-100 hover:bg-zinc-700",
                      !editedDueDate && "text-zinc-500"
                    )}
                    disabled={updateTask.isPending}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {editedDueDate ? format(editedDueDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-zinc-800 border-zinc-700">
                  <Calendar
                    mode="single"
                    selected={editedDueDate}
                    onSelect={setEditedDueDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {editedDueDate && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setEditedDueDate(undefined)}
                  disabled={updateTask.isPending}
                  title="Clear due date"
                  className="bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block text-zinc-300">
              Category
            </label>
            <Select
              value={editedCategory || ""}
              onValueChange={setEditedCategory}
              disabled={updateTask.isPending}
            >
              <SelectTrigger className="bg-zinc-800 border-zinc-700 text-zinc-100">
                <SelectValue placeholder="Select category..." />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                <SelectItem value="Work">Work</SelectItem>
                <SelectItem value="School">School</SelectItem>
                <SelectItem value="Personal">Personal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              onClick={handleSaveClick}
              disabled={!editedTitle.trim() || updateTask.isPending}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {updateTask.isPending ? "Saving..." : "Save"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCancel}
              disabled={updateTask.isPending}
              className="bg-zinc-800 border-zinc-700 text-zinc-100 hover:bg-zinc-700"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 hover:bg-zinc-900/80 transition-colors group">
      {/* Header */}
      <div className="flex items-start gap-3">
        <Checkbox
          id={`task-${task.id}`}
          checked={task.is_completed}
          onCheckedChange={handleToggleComplete}
          className="mt-1 border-zinc-600 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
        />
        <label
          htmlFor={`task-${task.id}`}
          className={cn(
            "flex-1 text-base font-medium leading-snug cursor-pointer",
            task.is_completed
              ? "line-through text-zinc-500"
              : "text-zinc-100"
          )}
        >
          {task.title}
        </label>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsEditing(true)}
            className="h-8 w-8 p-0 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
            title="Edit task"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleDeleteClick}
            className="h-8 w-8 p-0 text-zinc-400 hover:text-red-400 hover:bg-red-950/50"
            title="Delete task"
            disabled={deleteTask.isPending}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p
          className={cn(
            "text-sm mt-2 ml-7",
            task.is_completed ? "text-zinc-600 line-through" : "text-zinc-400"
          )}
        >
          {task.description}
        </p>
      )}

      {/* Metadata */}
      <div className="flex flex-wrap items-center gap-2 mt-3 ml-7">
        <Badge
          variant="outline"
          className={cn("text-xs capitalize", getPriorityColor(task.priority))}
        >
          {task.priority}
        </Badge>

        {task.due_date && (
          <span className="text-xs text-zinc-500 flex items-center gap-1">
            <CalendarIcon className="h-3 w-3" />
            {formatDueDate(task.due_date)}
          </span>
        )}

        {task.category && (
          <Badge
            variant="outline"
            className={cn("text-xs", getCategoryColor(task.category))}
          >
            {task.category}
          </Badge>
        )}
      </div>

      {/* Created date */}
      <p className="text-xs text-zinc-600 mt-3 ml-7">
        {format(new Date(task.created_at), "MMM d, yyyy h:mm a")}
      </p>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-zinc-900 border-zinc-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-zinc-100">Delete Task</AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              Are you sure you want to delete &quot;{task.title}&quot;? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-zinc-800 border-zinc-700 text-zinc-100 hover:bg-zinc-700 hover:text-zinc-100">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={deleteTask.isPending}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {deleteTask.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Update Confirmation Dialog */}
      <AlertDialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <AlertDialogContent className="bg-zinc-900 border-zinc-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-zinc-100">Save Changes</AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              Are you sure you want to save the changes to this task?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-zinc-800 border-zinc-700 text-zinc-100 hover:bg-zinc-700 hover:text-zinc-100">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmSave}
              disabled={updateTask.isPending}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {updateTask.isPending ? "Saving..." : "Save Changes"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
