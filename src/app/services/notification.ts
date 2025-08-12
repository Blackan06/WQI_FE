import { Notification } from '../models/notification';
import store from '../store';
import { addNotification, updateUnreadCount, clearAllNotifications } from '../slice/notification';
import { urlSignalR } from '../utils/api-link';
import httpClient from '../utils/http-client';
import { toast } from 'react-toastify';

class NotificationService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectTimeout = 3000;
  private baseWsUrl = 'wss://datamanagerment.anhkiet.xyz/notifications/ws/';
  private accountId: number | null = null;
  private eventTarget: EventTarget;
  private isConnecting = false;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    this.eventTarget = new EventTarget();
  }

  public setAccountId(id: number) {
    console.log('Setting account ID:', id);
    console.log('Previous account ID:', this.accountId);
    
    // Only reconnect if account ID actually changed
    if (this.accountId !== id) {
      this.accountId = id;
      console.log('New account ID set:', this.accountId);
      // Nếu đã có kết nối WebSocket, đóng nó và kết nối lại với account_id mới
      if (this.ws) {
        console.log('Disconnecting existing WebSocket connection');
        this.disconnect();
      }
      console.log('Initiating new WebSocket connection with account ID:', this.accountId);
      this.connect();
    }
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
    if (this.accountId === null) {
      console.log('No account ID available, skipping WebSocket connection');
      return;
    }

    if (this.isConnecting || this.ws?.readyState === WebSocket.CONNECTING) {
      console.log('Already connecting or connected, skipping');
      return;
    }

    try {
      this.isConnecting = true;
      const wsUrl = `${this.baseWsUrl}${this.accountId}`;
      console.log('Attempting to connect to WebSocket:', wsUrl);
      // Kết nối tới WebSocket server
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log('Connected to WebSocket server');
        this.reconnectAttempts = 0;
        this.isConnecting = false;
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
                `Title: ${notification.title}\nMessage: ${notification.message}`,
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

            // KHÔNG tự động đánh dấu đã đọc - để user tự click vào notification
          }
        } catch (error) {
          console.error('Error processing WebSocket message:', error);
        }
      };

      this.ws.onclose = (event) => {
        console.log('WebSocket connection closed:', event.code, event.reason);
        this.isConnecting = false;
        
        // Only attempt reconnect if it wasn't a manual close
        if (event.code !== 1000 && this.reconnectAttempts < this.maxReconnectAttempts) {
          this.reconnectAttempts++;
          console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
          
          this.reconnectTimer = setTimeout(() => {
            this.connect();
          }, this.reconnectTimeout);
        }
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.isConnecting = false;
      };

    } catch (error) {
      console.error('Error creating WebSocket connection:', error);
      this.isConnecting = false;
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
      
      // Try PUT method first, fallback to POST if needed
      try {
        await httpClient.put({
          url: `${urlSignalR}/notifications/notifications/${id}/read`,
        });
      } catch (putError) {
        // If PUT fails, try POST as fallback
        console.log('PUT failed, trying POST:', putError);
        await httpClient.post({
          url: `${urlSignalR}/notifications/notifications/${id}/read`,
        });
      }
      
      // Giảm unreadCount đi 1
      store.dispatch(updateUnreadCount(-1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
      // Don't throw error to prevent UI issues
    }
  }

  public disconnect() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    
    this.isConnecting = false;
    this.reconnectAttempts = 0;
  }

  private handleMessage(event: MessageEvent) {
    try {
      const data = JSON.parse(event.data);
      console.log('Received notification:', data);
      
      // Chỉ xử lý thông báo mới nhất
      if (data && data.length > 0) {
        const latestNotification = data[0]; // Lấy thông báo mới nhất
        const notification: Notification = {
          id: latestNotification.id,
          title: latestNotification.title,
          message: latestNotification.message,
          timestamp: latestNotification.timestamp,
          isRead: latestNotification.isRead,
          status: latestNotification.status
        };
        
        store.dispatch(addNotification(notification));
        this.notifyListeners();
      }
    } catch (error) {
      console.error('Error parsing notification:', error);
    }
  }

  public resetUnreadCount() {
    store.dispatch(updateUnreadCount(0));
  }

  // Add method to prevent duplicate notifications
  private isDuplicateNotification(notification: Notification): boolean {
    const state = store.getState();
    const existingNotifications = state.notificationSlice.notifications;
    return existingNotifications.some((n: Notification) => n.id === notification.id);
  }

  // Add method to clean up old notifications
  public cleanupOldNotifications() {
    const state = store.getState();
    const notifications = state.notificationSlice.notifications;
    
    // Remove notifications older than 24 hours
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentNotifications = notifications.filter((n: Notification) => 
      new Date(n.timestamp) > oneDayAgo
    );
    
    if (recentNotifications.length !== notifications.length) {
      // Update store with only recent notifications
      store.dispatch(clearAllNotifications());
      recentNotifications.forEach((n: Notification) => store.dispatch(addNotification(n)));
    }
  }
}

const notificationService = new NotificationService();
export default notificationService; 