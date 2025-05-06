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
        toast.success('Connected to notification service', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          style: {
            background: '#4CAF50',
            color: 'white',
            fontSize: '14px',
            fontWeight: '500',
          }
        });
      };

      this.ws.onmessage = (event) => {
        try {
          const raw = event.data;  
          console.log('Raw WebSocket message received:', raw);
          
          // Parse payload using global JSON
          const payload = JSON.parse(JSON.parse(raw));
          console.log('typeof payload:', typeof payload);        // 'object' cho cả {} lẫn []
          console.table(Object.keys(payload));  // liệt kê các key thật sự
          console.log('Parsed payload:', payload);
        
          // Get type and data from payload
          const type = payload.type;
          const notifData = payload.data;
          console.log('Type:', type);
          console.log('Notification data:', notifData);

          // Kiểm tra nếu là thông báo lỗi login
          if (type === 'error' && notifData?.message?.includes('Login failed')) {
            console.log('Login error detected:', notifData);
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
            console.log('Created notification object:', notification);

            // Dispatch action để thêm thông báo mới
            store.dispatch(addNotification(notification));
            console.log('Current store state after addNotification:', store.getState());
            
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
            console.log('Displayed toast notification');
          }
        } catch (error) {
          console.error('Error processing notification:', error);
          console.error('Error details:', {
            error,
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined
          });
          toast.error('Failed to process notification. Please try again.', {
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
        }
      };

      this.ws.onclose = (event) => {
        console.log('WebSocket connection closed:', event.code, event.reason);
        if (event.code === 1006) {
          console.log('Connection closed abnormally. Check if the server is running and accessible.');
          toast.warning('Lost connection to server. Attempting to reconnect...', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            style: {
              background: '#ff9800',
              color: 'white',
              fontSize: '14px',
              fontWeight: '500',
            }
          });
        }
        this.reconnect();
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        // Log additional connection details
        console.log('Connection details:', {
          url: this.wsUrl,
          readyState: this.ws?.readyState,
          protocol: this.ws?.protocol,
          extensions: this.ws?.extensions
        });
        toast.error('Failed to connect to server. Please check your internet connection.', {
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
      };

    } catch (error) {
      console.error('Failed to connect to WebSocket:', error);
      toast.error('Failed to establish WebSocket connection. Please try again later.', {
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
      this.reconnect();
    }
  }

  private reconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.reconnectTimeout * Math.pow(2, this.reconnectAttempts - 1); // Exponential backoff
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts}) in ${delay}ms`);
      setTimeout(() => {
        this.connect();
      }, delay);
    } else {
      console.error('Max reconnection attempts reached. Please check if the WebSocket server is running.');
      toast.error('Maximum reconnection attempts reached. Please refresh the page.', {
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
    }
  }

  public async markAsRead(notificationId: string) {
    try {
      await httpClient.post({
        url: `${urlSignalR}/api/notifications/${notificationId}/read`,
      });
      store.dispatch(updateUnreadCount(-1));
      toast.success('Notification marked as read', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style: {
          background: '#4CAF50',
          color: 'white',
          fontSize: '14px',
          fontWeight: '500',
        }
      });
    } catch (error) {
      console.error('Error marking notification as read:', error);
      toast.error('Failed to mark notification as read. Please try again.', {
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