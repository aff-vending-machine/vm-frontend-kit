import api from '$lib/api';
import type { HttpError_1 } from '@sveltejs/kit';
import { getAccessToken } from '../jwt';

export abstract class CRUDService<T> {
  constructor(protected ROOT_PATH: string) {}

  async find(query?: string): Promise<T[]> {
    try {
      const token = await getAccessToken();
      const data = await api.get<T[]>(this.ROOT_PATH, { query, token });
      return Promise.resolve<T[]>(data);
    } catch (e: unknown) {
      const err = e as HttpError_1;
      return Promise.reject(err.body?.message);
    }
  }

  async count(query?: string): Promise<number> {
    try {
      const token = await getAccessToken();
      const data = await api.get<number>(`${this.ROOT_PATH}/count`, { query, token });
      return Promise.resolve<number>(data);
    } catch (e: unknown) {
      const err = e as HttpError_1;
      return Promise.reject(err.body?.message);
    }
  }

  async findByID(id: number): Promise<T> {
    try {
      const token = await getAccessToken();
      const data = await api.get<T>(`${this.ROOT_PATH}/${id}`, { token });
      return Promise.resolve<T>(data);
    } catch (e: unknown) {
      const err = e as HttpError_1;
      return Promise.reject(err.body?.message);
    }
  }

  async create(payload: unknown): Promise<void> {
    try {
      const token = await getAccessToken();
      const data = await api.post<void>(this.ROOT_PATH, payload, { token });
      return Promise.resolve<void>(data);
    } catch (e: unknown) {
      const err = e as HttpError_1;
      return Promise.reject(err.body?.message);
    }
  }

  async updateByID(id: number, payload: unknown): Promise<void> {
    try {
      const token = await getAccessToken();
      const data = await api.put<void>(`${this.ROOT_PATH}/${id}`, payload, { token });
      return Promise.resolve<void>(data);
    } catch (e: unknown) {
      const err = e as HttpError_1;
      return Promise.reject(err.body?.message);
    }
  }

  async deleteByID(id: number): Promise<void> {
    try {
      const token = await getAccessToken();
      const data = await api.del<void>(`${this.ROOT_PATH}/${id}`, { token });
      return Promise.resolve<void>(data);
    } catch (e: unknown) {
      const err = e as HttpError_1;
      return Promise.reject(err.body?.message);
    }
  }
}
