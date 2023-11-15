import { writable } from 'svelte/store';

type LoadingType = {
  status: 'IDLE' | 'LOADING' | 'NAVIGATING';
  message: string;
};

const newLoading = () => {
  const { subscribe, update, set } = writable<LoadingType>({
    status: 'IDLE', // IDLE, LOADING, NAVIGATING
    message: '',
  });

  function setNavigate(isNavigating: boolean) {
    update(() => {
      return {
        status: isNavigating ? 'NAVIGATING' : 'IDLE',
        message: '',
      };
    });
  }

  function setLoading(isLoading: boolean, message: string = '') {
    update(() => {
      return {
        status: isLoading ? 'LOADING' : 'IDLE',
        message: isLoading ? message : '',
      };
    });
  }

  return {
    setNavigate,
    setLoading,
    subscribe,
    update,
    set,
  };
};

export const loading = newLoading();
