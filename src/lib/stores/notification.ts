import { writable } from 'svelte/store';
import type { NotificationData, NotificationType } from '$types/notification';

const notifications = writable<NotificationData[]>([]);

function addNotification(type: NotificationType, message: string) {
  const id = Date.now();
  notifications.update(current => [...current, { id, type, message }]);
}

function removeNotification(id: number) {
  notifications.update(current => current.filter(n => n.id !== id));
}

export default {
  subscribe: notifications.subscribe,
  add: addNotification,
  remove: removeNotification,
};
