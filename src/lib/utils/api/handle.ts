import type { AxiosError } from 'axios';

export const handleResponse = <T>(result: APIProtocol<T>): T => {
  switch (result.status) {
    case 'done':
      return result.data!;

    case 'error':
      throw Error(result.message);
  }
};

export const handleError = (e: unknown): Error => {
  const err = e as AxiosError;
  if (err.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    if (err.response.data != null) {
      const { message } = err.response.data as APIProtocol<unknown>;
      return Error(message);
    }

    console.log(`unreachable case:\n ${err}`);
    return Error(`unreachable case: ${err.message}`);
  } else if (err.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(`request sent but no response received:\n ${err}`);
    return Error('server time out');
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log(`setting up error case:\n ${err}`);
    return Error('opps! something went wrong while setting up request');
  }
};
