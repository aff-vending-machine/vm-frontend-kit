import { browser } from '$app/environment';

export const storage = (key: string, value?: string | null): string | null => {
  if (browser) {
    if (value) {
      localStorage.setItem(key, value);
      return value;
    }

    if (value === null) {
      localStorage.removeItem(key);
      return null;
    }

    if (!value) {
      const item = localStorage.getItem(key);
      if (item) {
        return item;
      }
    }
  }

  return null;
};

export const json = (key: string) => ({
  clear: () => localStorage.removeItem(key),
  get: () => JSON.parse(localStorage.getItem(key) || '{}'),
  set: (value: Record<string, any>) => localStorage.setItem(key, JSON.stringify(value)),
  update: (value: Record<string, any>) => {
    const data = JSON.parse(localStorage.getItem(key) || '{}');
    localStorage.setItem(key, JSON.stringify({ ...data, ...value }));
  },
});
