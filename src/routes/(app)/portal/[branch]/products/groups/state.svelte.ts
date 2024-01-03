import { goto } from '$app/navigation';
import type { ActionState } from '$lib/components/ui/group/actions';
import type { OverlayState } from '$lib/components/ui/group/overlays';
import type { Pagination } from '$lib/helpers/apis/api';
import { generateError } from '$lib/helpers/generator';
import { salert } from '$lib/salert';
import { CatalogGroupService } from '$lib/services/catalog_group';
import type { CatalogGroupCreateEntity, CatalogGroupEntity, CatalogGroupUpdateEntity } from '$lib/types/catalog_group';
import type { Entity } from '$lib/types/common';

const groupAPI = CatalogGroupService.getInstance();

export class GroupState {
  #blocking = $state<string>();
  #loading = $state(false);
  #error = $state<string>();
  #groups = $state<CatalogGroupEntity[]>([]);
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
    query.set('preloads', 'Products');
    query.sort();

    const result = await groupAPI.find(query.toString(), false);
    if (result.status === 'error') throw generateError(result.message);
    if (result.data.length === 0 && this.#action.filter.page !== 1) {
      const query = new URLSearchParams(this.#action.query);
      query.delete('page');
      return await goto(`?${query.toString()}`, { keepFocus: true });
    }

    this.#groups = result.data;
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
    const entity = data as CatalogGroupEntity;
    if (mode === 'viewer') this.#overlay.onOpenViewer(entity);
    if (mode === 'editor') this.#overlay.onOpenEditor(entity);
    if (mode === 'eraser') this.#overlay.onOpenEraser(entity);
  };

  onSelect = (data: Entity) => {
    const entity = data as CatalogGroupEntity;
    this.#overlay.onOpenViewer(entity);
  };

  onCreate = async (data: CatalogGroupCreateEntity) => {
    this.#loading = true;
    this.#error = undefined;

    try {
      const result = await groupAPI.create(data);
      if (result.status === 'error') throw generateError(result.message);
      salert.success(`New group has been created`);
      this.#fetch();
    } catch (e) {
      this.#error = (e as Error).message;
      salert.failure(this.#error);
    } finally {
      this.#overlay.close();
      this.#loading = false;
    }
  };

  onUpdate = async (id: number, data: CatalogGroupUpdateEntity) => {
    this.#loading = true;
    this.#error = undefined;

    try {
      const result = await groupAPI.updateByID(id, data);
      if (result.status === 'error') throw generateError(result.message);
      salert.success(`Group '${id}' has been updated`);
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
      const result = await groupAPI.deleteByID(id);
      if (result.status === 'error') throw generateError(result.message);
      salert.success(`Group '${id}' has been deleted`);
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
    return this.#groups;
  }

  get loading() {
    return this.#loading;
  }

  get error() {
    return this.#error;
  }
}
