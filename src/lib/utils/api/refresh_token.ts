import mem from 'mem';

import type { Auth } from '$types/auth';
import { browserGet, browserSet } from '../browser';
import { LOCAL_ACCESS_TOKEN, LOCAL_REFRESH_TOKEN } from '../constants';
import { Client } from './client';

const refreshTokenFn = async () => {
  const refreshToken = browserGet(LOCAL_REFRESH_TOKEN);

  try {
    const response = await Client.getPublic().post<APIProtocol<Auth>>(
      '/auth/refresh-token',
      {},
      {
        headers: { authorization: `Bearer ${refreshToken}` },
      },
    );
    const { status, data } = response.data;

    if (status == 'done' && data !== undefined) {
      browserSet(LOCAL_ACCESS_TOKEN, data.access_token);
      browserSet(LOCAL_REFRESH_TOKEN, data.refresh_token);
    }

    return data!.access_token;
  } catch (error) {
    console.log(error);
  }
};

const maxAge = 10000;

export const memoizedRefreshToken = mem(refreshTokenFn, {
  maxAge,
});
