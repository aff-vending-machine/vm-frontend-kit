import { generateError } from '../generator';

import { getAccessTokenWithAuthRefresh } from './jwt';

import api, { type Result } from '$lib/helpers/apis/api';

export abstract class CRUDService<T, P = unknown> {
  constructor(
    protected ROOT_PATH: string,
    protected SUB_PATH: string,
  ) {}

  protected abstract remap: (data: T) => T;

  protected async requestWrapper<R>(callback: (token: string) => Promise<R>): Promise<R> {
    try {
      const token = await getAccessTokenWithAuthRefresh();
      return await callback(token);
    } catch (e) {
      throw generateError(e);
    }
  }

  async find(rootID: number, query?: string, cache = true): Promise<Result<T[]>> {
    return this.requestWrapper(async token => {
      const result = await api.get<T[]>(`${this.ROOT_PATH}/${rootID}/${this.SUB_PATH}`, { query, token }, cache);
      if (result.status === 'error') return result;
      return { ...result, data: result.data?.map(this.remap) };
    });
  }

  async findByID(rootID: number, id: number, cache = true): Promise<Result<T>> {
    return this.requestWrapper(async token => {
      const result = await api.get<T>(`${this.ROOT_PATH}/${rootID}/${this.SUB_PATH}/${id}`, { token }, cache);
      if (result.status === 'error') return result;
      return { ...result, data: result.data && this.remap(result.data) };
    });
  }

  async create(rootID: number, payload: P): Promise<Result<number>> {
    return this.requestWrapper(async token => {
      const result = await api.post<number>(`${this.ROOT_PATH}/${rootID}/${this.SUB_PATH}`, payload, { token });
      if (result.status === 'error') return result;
      return { ...result, data: result.id! };
    });
  }

  async updateByID(rootID: number, id: number, payload: unknown): Promise<Result<void>> {
    return this.requestWrapper(async token => {
      const result = await api.put<void>(`${this.ROOT_PATH}/${rootID}/${this.SUB_PATH}/${id}`, payload, { token });
      return { ...result };
    });
  }

  async deleteByID(rootID: number, id: number): Promise<Result<void>> {
    return this.requestWrapper(async token => {
      const result = await api.del<void>(`${this.ROOT_PATH}/${rootID}/${this.SUB_PATH}/${id}`, { token });
      return { ...result };
    });
  }
}
