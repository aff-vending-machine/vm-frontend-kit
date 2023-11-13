import api from '$lib/api';
import { getAccessToken } from '../jwt';
import { genError } from '../generate';

export abstract class CRUDService<T> {
  constructor(
    private ROOT_PATH: string,
    private SUB_PATH: string,
  ) {}

  async find(root_id: number, query?: string): Promise<T[]> {
    try {
      const token = await getAccessToken();
      const data = await api.get<T[]>(`${this.ROOT_PATH}/${root_id}/${this.SUB_PATH}`, { query, token });
      return Promise.resolve<T[]>(data);
    } catch (e) {
      return Promise.reject(genError(e));
    }
  }

  async count(root_id: number, query?: string): Promise<number> {
    try {
      const token = await getAccessToken();
      const data = await api.get<number>(`${this.ROOT_PATH}/${root_id}/${this.SUB_PATH}/count`, { query, token });
      return Promise.resolve<number>(data);
    } catch (e) {
      return Promise.reject(genError(e));
    }
  }

  async findByID(root_id: number, id: number): Promise<T> {
    try {
      const token = await getAccessToken();
      const data = await api.get<T>(`${this.ROOT_PATH}/${root_id}/${this.SUB_PATH}/${id}`, { token });
      return Promise.resolve<T>(data);
    } catch (e) {
      return Promise.reject(genError(e));
    }
  }

  async create(root_id: number, payload: unknown): Promise<number> {
    try {
      const token = await getAccessToken();
      const data = await api.post<number>(`${this.ROOT_PATH}/${root_id}/${this.SUB_PATH}`, payload, { token });
      return Promise.resolve<number>(data);
    } catch (e) {
      return Promise.reject(genError(e));
    }
  }

  async updateByID(root_id: number, id: number, payload: unknown): Promise<void> {
    try {
      const token = await getAccessToken();
      const data = await api.put<void>(`${this.ROOT_PATH}/${root_id}/${this.SUB_PATH}/${id}`, payload, { token });
      return Promise.resolve<void>(data);
    } catch (e) {
      return Promise.reject(genError(e));
    }
  }

  async deleteByID(root_id: number, id: number): Promise<void> {
    try {
      const token = await getAccessToken();
      const data = await api.del<void>(`${this.ROOT_PATH}/${root_id}/${this.SUB_PATH}/${id}`, { token });
      return Promise.resolve<void>(data);
    } catch (e) {
      return Promise.reject(genError(e));
    }
  }
}