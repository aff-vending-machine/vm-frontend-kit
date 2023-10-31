export type NotificationData = {
  id: number;
  type: NotificationType;
  message: string;
};

export type NotificationType = 'info' | 'success' | 'warning' | 'danger';
