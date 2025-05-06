import { Notification } from '../models/notification';
import store from '../store';
import { addNotification, updateUnreadCount } from '../slice/notification';
import { urlSignalR } from '../utils/api-link';
import httpClient from '../utils/http-client';
import { toast } from 'react-toastify';

class NotificationService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectTimeout = 3000;
  private wsUrl = 'ws://dm.anhkiet.xyz/notifications/ws/2';
  private eventTarget: EventTarget;

  constructor() {
    this.eventTarget = new EventTarget();
    this.connect();
  }

  public addEventListener(callback: () => void) {
    this.eventTarget.addEventListener('notification', callback);
  }

  public removeEventListener(callback: () => void) {
    this.eventTarget.removeEventListener('notification', callback);
  }

  private notifyListeners() {
    this.eventTarget.dispatchEvent(new Event('notification'));
  }

  private connect() {
    try {
      console.log('Attempting to connect to WebSocket:', this.wsUrl);
      // Kết nối tới WebSocket server
      this.ws = new WebSocket(this.wsUrl);

      this.ws.onopen = () => {
        console.log('Connected to WebSocket server');
        this.reconnectAttempts = 0;
        // Send a ping message to verify connection
        this.ws?.send(JSON.stringify({ type: 'ping' }));
      };

      this.ws.onmessage = (event) => {
        try {
          const raw = event.data;  
          const payload = JSON.parse(JSON.parse(raw));
          const type = payload.type;
          const notifData = payload.data;

          // Kiểm tra nếu là thông báo lỗi login
          if (type === 'error' && notifData?.message?.includes('Login failed')) {
            toast.error('Login failed. Please check your credentials and try again.', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              style: {
                background: '#f44336',
                color: 'white',
                fontSize: '14px',
                fontWeight: '500',
              }
            });
            return;
          }

          // Xử lý thông báo thông thường
          if (type === 'notification' && notifData) {
            const notification: Notification = {
              id: notifData.id?.toString() || Date.now().toString(),
              title: notifData.title || '',
              message: notifData.message || '',
              timestamp: notifData.timestamp || new Date().toISOString(),
              isRead: false,
              status: notifData.status || 'info'
            };

            // Dispatch action để thêm thông báo mới
            store.dispatch(addNotification(notification));
            
            // Thông báo cho các listeners
            this.notifyListeners();
            
            // Xác định màu sắc dựa trên status
            let toastStyle = {
              background: '#2196F3', // Mặc định là màu xanh dương
              color: 'white',
              fontSize: '14px',
              fontWeight: '500',
            };

            if (notification.status === 'good') {
              toastStyle.background = '#4CAF50'; // Màu xanh lá
            } else if (notification.status === 'danger') {
              toastStyle.background = '#f44336'; // Màu đỏ
            }
            
            // Hiển thị toast thông báo
            toast.info(
              `${notification.title}\n${notification.message}`, 
              {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                style: toastStyle
              }
            );

            // Tự động đánh dấu đã đọc sau khi nhận thông báo
            if (notification.id) {
              this.markAsRead(notification.id);
            }
          }
        } catch (error) {
          console.error('Error processing notification:', error);
        }
      };

      this.ws.onclose = (event) => {
        if (event.code === 1006) {
          console.log('Connection closed abnormally');
        }
        this.reconnect();
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

    } catch (error) {
      console.error('Failed to connect to WebSocket:', error);
      this.reconnect();
    }
  }

  private reconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.reconnectTimeout * Math.pow(2, this.reconnectAttempts - 1); // Exponential backoff
      setTimeout(() => {
        this.connect();
      }, delay);
    } else {
      console.error('Max reconnection attempts reached');
    }
  }

  public async markAsRead(notificationId: string) {
    try {
      const id = parseInt(notificationId, 10);
      if (isNaN(id)) {
        console.error('Invalid notification ID:', notificationId);
        return;
      }
      await httpClient.post({
        url: `${urlSignalR}/api/notifications/${id}/read`,
      });
      store.dispatch(updateUnreadCount(-1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  }

  public disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

export default new NotificationService(); 