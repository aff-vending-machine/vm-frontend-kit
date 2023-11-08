let timer: number;

export function debounce(func: (...args: unknown[]) => void, wait: number) {
  return (...args: unknown[]) => {
    clearTimeout(timer);
    timer = window.setTimeout(() => func(null, args), wait);
  };
}
