/* eslint-disable  @typescript-eslint/no-explicit-any */
import { error } from '@sveltejs/kit';
import config from './config';

type Fetcher = {
  query?: string | null;
  data?: BodyInit | null;
  token?: string | null;
};

type Protocol<T> = {
  code: number;
  status: 'done' | 'error';
  data?: T;
  message?: string;
};

const requester = async <T = any>(method: string, path: string, { query, data, token }: Fetcher = {}): Promise<T> => {
  try {
    const opts: RequestInit = { method };
    const headers = {} as Record<string, string>;
    const url = new URL(path, config.apiUrl);

    if (query) {
      url.search = query;
    }

    if (data) {
      headers['Content-Type'] = 'application/json';
      opts.body = JSON.stringify(data);
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    opts.headers = headers;

    const request = new Request(url, opts);
    const response = await fetch(request);
    const result = (await response.json()) as Protocol<T>;

    if (result.status === 'error') {
      return Promise.reject(error(result.code, result.message || 'Network response was not OK'));
    }

    return result.data!;
  } catch (e: unknown) {
    throw error(500, 'There has been a problem with API operation');
  }
};

type Options = {
  query?: string | null;
  token?: string | null;
};
const get = <T = any>(path: string, opt?: Options) => {
  return requester<T>('GET', path, { ...opt });
};

const del = <T = any>(path: string, opt?: Options) => {
  return requester<T>('DELETE', path, { ...opt });
};

const post = <T = any>(path: string, data: any, opt?: Options) => {
  return requester<T>('POST', path, { data, ...opt });
};

const put = <T = any>(path: string, data: any, opt?: Options) => {
  return requester<T>('PUT', path, { data, ...opt });
};

const patch = <T = any>(path: string, data: any, opt?: Options) => {
  return requester<T>('PATCH', path, { data, ...opt });
};

export default { get, del, post, put, patch, requester };
