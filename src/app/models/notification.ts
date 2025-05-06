export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  status?: 'good' | 'danger' | 'info';
}

export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
} 