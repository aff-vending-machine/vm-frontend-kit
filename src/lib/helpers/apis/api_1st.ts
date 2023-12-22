import { generateError } from '../generator';
import { getAccessTokenWithAuthRefresh } from '../jwt';

import api, { type Result } from '$lib/helpers/apis/api';

export abstract class CRUDService<T, U = unknown> {
  constructor(protected ROOT_PATH: string) {}

  protected abstract remap: (data: T) => T;

  protected async requestWrapper<R>(callback: (token: string) => Promise<R>): Promise<R> {
    try {
      const token = await getAccessTokenWithAuthRefresh();
      return await callback(token);
    } catch (e) {
      throw generateError(e);
    }
  }

  async find(query?: string, cache = true): Promise<Result<T[]>> {
    return this.requestWrapper(async token => {
      const result = await api.get<T[]>(this.ROOT_PATH, { query, token }, cache);
      return { ...result, data: result.data!.map(this.remap) };
    });
  }

  async findByID(id: number, query?: string, cache = true): Promise<Result<T>> {
    return this.requestWrapper(async token => {
      const result = await api.get<T>(`${this.ROOT_PATH}/${id}`, { query, token }, cache);
      return { ...result, data: this.remap(result.data!) };
    });
  }

  async create(payload: U): Promise<Result<number>> {
    return this.requestWrapper(async token => {
      const result = await api.post<number>(this.ROOT_PATH, payload, { token });
      return { ...result, data: result.id! };
    });
  }

  async updateByID(id: number, payload: unknown): Promise<Result<void>> {
    return this.requestWrapper(async token => {
      const result = await api.put<void>(`${this.ROOT_PATH}/${id}`, payload, { token });
      return { ...result };
    });
  }

  async deleteByID(id: number): Promise<Result<void>> {
    return this.requestWrapper(async token => {
      const result = await api.del<void>(`${this.ROOT_PATH}/${id}`, { token });
      return { ...result };
    });
  }
}
