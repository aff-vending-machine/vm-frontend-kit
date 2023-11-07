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
