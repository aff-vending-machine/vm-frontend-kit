import api from '$lib/api';
import { getAccessToken } from '../jwt';
import { genError } from '../generate';

export abstract class CRUDService<T> {
  constructor(protected ROOT_PATH: string) {}

  protected abstract remap: (data: T) => T;

  async find(query?: string): Promise<T[]> {
    try {
      const token = await getAccessToken();
      const data = await api.get<T[]>(this.ROOT_PATH, { query, token });
      const result = data.map(this.remap);
      return Promise.resolve<T[]>(result);
    } catch (e) {
      return Promise.reject(genError(e));
    }
  }

  async count(query?: string): Promise<number> {
    try {
      const token = await getAccessToken();
      const data = await api.get<number>(`${this.ROOT_PATH}/count`, { query, token });
      return Promise.resolve<number>(data);
    } catch (e) {
      return Promise.reject(genError(e));
    }
  }

  async findByID(id: number, query?: string): Promise<T> {
    try {
      const token = await getAccessToken();
      const data = await api.get<T>(`${this.ROOT_PATH}/${id}`, { query, token });
      const result = this.remap(data);
      return Promise.resolve<T>(result);
    } catch (e) {
      return Promise.reject(genError(e));
    }
  }

  async create(payload: unknown): Promise<number> {
    try {
      const token = await getAccessToken();
      const data = await api.post<number>(this.ROOT_PATH, payload, { token });
      return Promise.resolve<number>(data);
    } catch (e) {
      return Promise.reject(genError(e));
    }
  }

  async updateByID(id: number, payload: unknown): Promise<void> {
    try {
      const token = await getAccessToken();
      const data = await api.put<void>(`${this.ROOT_PATH}/${id}`, payload, { token });
      return Promise.resolve<void>(data);
    } catch (e) {
      return Promise.reject(genError(e));
    }
  }

  async deleteByID(id: number): Promise<void> {
    try {
      const token = await getAccessToken();
      const data = await api.del<void>(`${this.ROOT_PATH}/${id}`, { token });
      return Promise.resolve<void>(data);
    } catch (e) {
      return Promise.reject(genError(e));
    }
  }
}
