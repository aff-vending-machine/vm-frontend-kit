import { error } from '@sveltejs/kit';

import { generateError } from '../generator';

import config from '$lib/config';

interface Fetcher {
  query?: string | null;
  data?: BodyInit | null;
  token?: string | null;
}

export interface Pagination {
  current_page: number;
  items_per_page: number;
  total_pages: number;
  total_items: number;
}

export type Result<T> = SuccessResult<T> | ErrorResult;

type SuccessResult<T> = {
  status: 'success';
  data: T;
  id?: number;
  pagination?: Pagination;
};

type ErrorResult = {
  status: 'error';
  message: string;
};

type CacheData = { result: Result<unknown>; timestamp: number };
const cache: Record<string, CacheData> = {};

async function requester<T>(method: string, path: string, fetcher: Fetcher = {}): Promise<Result<T>> {
  const { query, data, token } = fetcher;
  const opts: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: data ? JSON.stringify(data) : null,
    // credentials: config.sameHost  ? undefined : 'include',
  };

  let base = config.apiUrl;
  if (config.sameHost) {
    base = window.location.origin + '/' + config.apiPath;
  }

  const url = new URL(path, base);
  url.search = query || '';

  try {
    const response = await fetch(url.href, opts);
    if (!response.ok) {
      if (response.headers.get('Content-Type')?.includes('application/json')) {
        const result = await response.json();
        error(400, result.message);
      } else {
        error(500, response.statusText || 'An error occurred during the request');
      }
    }

    if (response.status === 204) return { status: 'success', data: null } as Result<T>;
    return await response.json();
  } catch (err) {
    error(500, generateError(err));
  }
}

// HTTP verb functions simplified and error handling centralized in the requester function
export const get = async <T>(path: string, fetcher?: Fetcher, useCache: boolean = true): Promise<Result<T>> => {
  const cacheKey = new URL(path, config.apiUrl).href + fetcher?.query;
  if (!useCache) delete cache[cacheKey];

  const cachedData = cache[cacheKey];
  if (!!cachedData && Date.now() - cachedData.timestamp < 60 * 60 * 1000) {
    // 1 hour cache validity
    return cachedData.result as Result<T>;
  }

  const result = await requester<T>('GET', path, fetcher);
  if (result.status === 'error') error(400, result.message);
  if (result.status === 'success' && !result.data) error(404, 'Resource is not found');
  cache[cacheKey] = { result, timestamp: Date.now() };
  return result;
};

export const del = <T>(path: string, fetcher?: Fetcher) => requester<T>('DELETE', path, fetcher);
export const post = <T>(path: string, data: any, fetcher?: Fetcher) => requester<T>('POST', path, { ...fetcher, data });
export const put = <T>(path: string, data: any, fetcher?: Fetcher) => requester<T>('PUT', path, { ...fetcher, data });
export const patch = <T>(path: string, data: any, fetcher?: Fetcher) =>
  requester<T>('PATCH', path, { ...fetcher, data });

export default { get, del, post, put, patch };
