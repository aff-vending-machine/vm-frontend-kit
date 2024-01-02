export type ToastType = 'info' | 'success' | 'warning' | 'error';

export class Toast {
  #spec = $state<{
    icon: string;
    bg: string;
    bar: string;
    txt: string;
    color: string;
  }>();

  constructor(type: ToastType) {
    this.#spec = getSpec(type);
  }

  get spec() {
    return this.#spec!;
  }
}

function getSpec(type: ToastType) {
  switch (type) {
    case 'info':
      return {
        icon: 'mdi:information-outline',
        bg: 'bg-info-light',
        bar: 'bg-info',
        txt: 'text-info-dark',
        color: 'blue',
      };

    case 'success':
      return {
        icon: 'mdi:check-circle-outline',
        bg: 'bg-success-light',
        bar: 'bg-success',
        txt: 'text-success-dark',
        color: 'green',
      };

    case 'warning':
      return {
        icon: 'mdi:alert-decagram-outline',
        bg: 'bg-warning-light',
        bar: 'bg-warning',
        txt: 'text-warning-dark',
        color: 'yellow',
      };

    case 'error':
      return {
        icon: 'mdi:close-octagon',
        bg: 'bg-danger-light',
        bar: 'bg-warning',
        txt: 'text-danger-dark',
        color: 'red',
      };
  }
}
