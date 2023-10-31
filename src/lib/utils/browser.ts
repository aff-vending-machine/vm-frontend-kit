import { browser } from '$app/environment';

export const browserGet = (key: string) => {
  if (browser) {
    const item = localStorage.getItem(key);
    if (item) {
      return item;
    }
  }
  return null;
};

export const browserSet = (key: string, value: string) => {
  if (browser) {
    localStorage.setItem(key, value);
  }
};

export const browserClear = (key: string) => {
  if (browser) {
    localStorage.removeItem(key);
  }
};
