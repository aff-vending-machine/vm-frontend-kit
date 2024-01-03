import { goto } from '$app/navigation';
import type { ActionState } from '$lib/components/ui/product/actions';
import type { OverlayState } from '$lib/components/ui/product/overlays';
import type { Pagination } from '$lib/helpers/apis/api';
import { generateError } from '$lib/helpers/generator';
import { salert } from '$lib/salert';
import { CatalogProductService } from '$lib/services/catalog_product';
import type {
  CatalogProductCreateEntity,
  CatalogProductEntity,
  CatalogProductUpdateEntity,
} from '$lib/types/catalog_product';
import type { Entity } from '$lib/types/common';

const productAPI = CatalogProductService.getInstance();

export class ProductState {
  #blocking = $state<string>();
  #loading = $state(false);
  #error = $state<string>();
  #products = $state<CatalogProductEntity[]>([]);
  #pagination = $state<Pagination>();

  #action: ActionState;
  #overlay: OverlayState;

  constructor(action: ActionState, drawer: OverlayState) {
    this.#action = action;
    this.#overlay = drawer;

    $effect(() => {
      if (action.query.toString() !== this.#blocking) {
        this.#blocking = action.query.toString();
        this.#onfetch();
      }
    });
  }

  #fetch = async () => {
    const query = new URLSearchParams(this.#action.query);
    query.set('preloads', 'Group');
    query.sort();

    const result = await productAPI.find(query.toString(), false);
    if (result.status === 'error') throw generateError(result.message);
    if (result.data.length === 0 && this.#action.filter.page !== 1) {
      const query = new URLSearchParams(this.#action.query);
      query.delete('page');
      return await goto(`?${query.toString()}`, { keepFocus: true });
    }

    this.#products = result.data;
    this.#pagination = result.pagination!;
  };

  #onfetch = async () => {
    this.#loading = true;
    this.#error = undefined;

    try {
      this.#fetch();
    } catch (e) {
      this.#error = (e as Error).message;
      salert.failure(this.#error);
    } finally {
      this.#loading = false;
    }
  };

  onAction = (mode: string, data: Entity) => {
    const entity = data as CatalogProductEntity;
    if (mode === 'viewer') this.#overlay.onOpenViewer(entity);
    if (mode === 'editor') this.#overlay.onOpenEditor(entity);
    if (mode === 'eraser') this.#overlay.onOpenEraser(entity);
  };

  onSelect = (data: Entity) => {
    const entity = data as CatalogProductEntity;
    this.#overlay.onOpenViewer(entity);
  };

  onCreate = async (data: CatalogProductCreateEntity) => {
    this.#loading = true;
    this.#error = undefined;

    try {
      const result = await productAPI.create(data);
      if (result.status === 'error') throw generateError(result.message);
      salert.success(`New product has been created`);
      this.#fetch();
    } catch (e) {
      this.#error = (e as Error).message;
      salert.failure(this.#error);
    } finally {
      this.#overlay.close();
      this.#loading = false;
    }
  };

  onUpdate = async (id: number, data: CatalogProductUpdateEntity) => {
    this.#loading = true;
    this.#error = undefined;

    try {
      const result = await productAPI.updateByID(id, data);
      if (result.status === 'error') throw generateError(result.message);
      salert.success(`Product '${id}' has been updated`);
      this.#fetch();
    } catch (e) {
      this.#error = (e as Error).message;
      salert.failure(this.#error);
    } finally {
      this.#overlay.close();
      this.#loading = false;
    }
  };

  onDelete = async (id: number) => {
    this.#loading = true;
    this.#error = undefined;

    try {
      const result = await productAPI.deleteByID(id);
      if (result.status === 'error') throw generateError(result.message);
      salert.success(`Product '${id}' has been deleted`);
      this.#fetch();
    } catch (e) {
      this.#error = (e as Error).message;
      salert.failure(this.#error);
    } finally {
      this.#overlay.close();
      this.#loading = false;
    }
  };

  get ready() {
    return !this.#loading && !this.#error;
  }

  get pagination() {
    return this.#pagination!;
  }

  get data() {
    return this.#products;
  }

  get loading() {
    return this.#loading;
  }

  get error() {
    return this.#error;
  }
}
