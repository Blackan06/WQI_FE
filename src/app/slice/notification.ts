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
      // Chỉ lưu trữ thông báo mới nhất
      state.notifications = [action.payload];
      if (!action.payload.isRead) {
        state.unreadCount = 1;
      } else {
        state.unreadCount = 0;
      }
    },
    updateUnreadCount: (state, action: PayloadAction<number>) => {
      // Nếu action.payload là số âm, trừ đi từ unreadCount hiện tại
      // Nếu là số dương, set giá trị tuyệt đối
      if (action.payload < 0) {
        state.unreadCount = Math.max(0, state.unreadCount + action.payload);
      } else {
        state.unreadCount = action.payload;
      }
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification && !notification.isRead) {
        notification.isRead = true;
        state.unreadCount = 0;
      }
    },
  },
});

export const { addNotification, updateUnreadCount, markAsRead } = notificationSlice.actions;
export default notificationSlice.reducer; 