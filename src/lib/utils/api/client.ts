import axios, { type AxiosInstance } from 'axios';
import config from '../config';
import { LOCAL_ACCESS_TOKEN } from '../constants';
import { memoizedRefreshToken } from './refresh_token';
import { browserGet } from '../browser';

export const Client = (() => {
  let paivateClient: AxiosInstance;
  let publicClient: AxiosInstance;

  const getPrivate = () => {
    if (paivateClient == null) {
      paivateClient = axios.create({
        baseURL: config.apiUrl,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      paivateClient.interceptors.request.use(
        async config => {
          const accessToken = browserGet(LOCAL_ACCESS_TOKEN);

          if (accessToken) {
            config.headers.set('authorization', `Bearer ${accessToken}`, true);
          }

          return config;
        },
        error => Promise.reject(error),
      );

      paivateClient.interceptors.response.use(
        response => response,
        async error => {
          const config = error?.config;

          if (error?.response?.status === 401 && !config?.sent) {
            config.sent = true;

            const token = await memoizedRefreshToken();

            if (token) {
              config.headers = {
                ...config.headers,
                authorization: `Bearer ${token}`,
              };
            }

            return axios(config);
          }

          return Promise.reject(error);
        },
      );
    }

    paivateClient.defaults.baseURL = config.apiUrl;
    return paivateClient;
  };

  const getPublic = () => {
    if (publicClient == null) {
      publicClient = axios.create({
        baseURL: config.apiUrl,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
    }

    publicClient.defaults.baseURL = config.apiUrl;
    return publicClient;
  };

  return { getPrivate, getPublic };
})();
