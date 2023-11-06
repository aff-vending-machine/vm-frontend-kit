/* eslint-disable  @typescript-eslint/no-explicit-any */
import { error } from '@sveltejs/kit';
import config from './config';

type Fetcher = {
  params?: Record<string, string>;
  data?: BodyInit | null;
  token?: string;
};

type Protocol<T> = {
  code: number;
  status: 'done' | 'error';
  data?: T;
  message?: string;
};

const requester = async <T = any>(method: string, path: string, { params, data, token }: Fetcher = {}): Promise<T> => {
  const opts: RequestInit = { method };
  const headers = {} as Record<string, string>;
  const url = new URL(path, config.apiUrl);

  if (params) {
    url.search = new URLSearchParams(params).toString();
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
  if (!response.ok) {
    throw error(response.status, response.statusText);
  }

  return result.data!;
};

const get = <T = any>(path: string, token?: string) => {
  return requester<T>('GET', path, { token });
};

const del = <T = any>(path: string, token?: string) => {
  return requester<T>('DELETE', path, { token });
};

const post = <T = any>(path: string, data: any, token?: string) => {
  return requester<T>('POST', path, { data, token });
};

const put = <T = any>(path: string, data: any, token?: string) => {
  return requester<T>('PUT', path, { data, token });
};

const patch = <T = any>(path: string, data: any, token?: string) => {
  return requester<T>('PATCH', path, { data, token });
};

export default { get, del, post, put, patch, requester };
