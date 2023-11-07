import { writable } from 'svelte/store';

export type AlertType = 'info' | 'success' | 'warning' | 'error';

export type AlertData = {
  id: number;
  type: AlertType;
  message: string;
};

const alerts = writable<AlertData[]>([]);

function addAlert(type: AlertType, message: string) {
  const id = Date.now();
  alerts.update(current => [...current, { id, type, message }]);
}

function removeAlert(id: number) {
  alerts.update(current => current.filter(n => n.id !== id));
}

export default {
  subscribe: alerts.subscribe,
  add: addAlert,
  remove: removeAlert,
};
