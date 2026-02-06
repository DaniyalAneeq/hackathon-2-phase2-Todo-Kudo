/**
 * React Query hooks for notification operations
 * Includes automatic polling for deadline checks
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchNotifications,
  fetchUnreadCount,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
  checkDeadlines,
} from "@/lib/api-client";

/**
 * Hook to fetch notifications with optional read filter
 */
export function useNotifications(isRead?: boolean) {
  return useQuery({
    queryKey: ["notifications", isRead],
    queryFn: () => fetchNotifications(isRead),
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}

/**
 * Hook to fetch unread notification count (for badge)
 */
export function useUnreadCount() {
  return useQuery({
    queryKey: ["notifications", "unread-count"],
    queryFn: fetchUnreadCount,
    refetchInterval: 15000, // Refetch every 15 seconds
  });
}

/**
 * Hook to check for upcoming deadlines
 * This creates notifications for tasks with deadlines within 10 minutes
 */
export function useCheckDeadlines() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: checkDeadlines,
    onSuccess: (data) => {
      if (data.new_notifications_count > 0) {
        // Invalidate notifications cache to show new notifications
        queryClient.invalidateQueries({ queryKey: ["notifications"] });
      }
    },
  });
}

/**
 * Hook to mark a single notification as read
 */
export function useMarkNotificationRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markNotificationRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

/**
 * Hook to mark all notifications as read
 */
export function useMarkAllRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAllNotificationsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

/**
 * Hook to delete a notification
 */
export function useDeleteNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}
