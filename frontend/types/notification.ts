/**
 * Notification TypeScript interfaces matching backend schema
 */

export type NotificationType = 'deadline_reminder' | 'deadline_passed';

export interface Notification {
  id: number;
  user_id: string;
  task_id: number;
  type: NotificationType;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface NotificationsResponse {
  notifications: Notification[];
  total: number;
  unread_count: number;
}

export interface UnreadCountResponse {
  unread_count: number;
}

export interface CheckDeadlinesResponse {
  new_notifications_count: number;
}

export interface MarkAllReadResponse {
  updated_count: number;
}
