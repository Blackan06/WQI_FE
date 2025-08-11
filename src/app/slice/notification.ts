import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Notification, NotificationState } from '../models/notification';

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      // Check if notification already exists to prevent duplicates
      const existingIndex = state.notifications.findIndex(n => n.id === action.payload.id);
      
      if (existingIndex >= 0) {
        // Update existing notification
        state.notifications[existingIndex] = action.payload;
      } else {
        // Add new notification, but limit to last 10 notifications
        state.notifications.unshift(action.payload);
        if (state.notifications.length > 10) {
          state.notifications = state.notifications.slice(0, 10);
        }
      }
      
      // Update unread count
      if (!action.payload.isRead) {
        state.unreadCount = Math.min(state.unreadCount + 1, 99); // Cap at 99
      }
    },
    updateUnreadCount: (state, action: PayloadAction<number>) => {
      // Nếu action.payload là số âm, trừ đi từ unreadCount hiện tại
      // Nếu là số dương, set giá trị tuyệt đối
      if (action.payload < 0) {
        state.unreadCount = Math.max(0, state.unreadCount + action.payload);
      } else {
        state.unreadCount = Math.min(action.payload, 99); // Cap at 99
      }
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification && !notification.isRead) {
        notification.isRead = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },
    clearOldNotifications: (state) => {
      // Keep only the 5 most recent notifications
      state.notifications = state.notifications.slice(0, 5);
    },
  },
});

export const { addNotification, updateUnreadCount, markAsRead, clearAllNotifications, clearOldNotifications } = notificationSlice.actions;
export default notificationSlice.reducer; 