import { goto } from '$app/navigation';
import type { ActionState } from '$lib/components/ui/machine/actions';
import type { OverlayState } from '$lib/components/ui/machine/overlays';
import type { Pagination } from '$lib/helpers/apis/api';
import { generateError } from '$lib/helpers/generator';
import { salert } from '$lib/salert';
import { MachineService } from '$lib/services/machine';
import type { Entity } from '$lib/types/common';
import type { MachineEntity, MachineUpdateEntity } from '$lib/types/machine';

const machineAPI = MachineService.getInstance();

export class MachineState {
  #blocking = $state<string>();
  #loading = $state(false);
  #error = $state<string>();
  #machines = $state<MachineEntity[]>([]);
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
    query.set('preloads', 'Branch');
    query.sort();

    const result = await machineAPI.find(query.toString(), false);
    if (result.status === 'error') throw generateError(result.message);
    if (result.data.length === 0 && this.#action.filter.page !== 1) {
      const query = new URLSearchParams(this.#action.query);
      query.delete('page');
      return await goto(`?${query.toString()}`, { keepFocus: true });
    }

    this.#machines = result.data;
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
    const entity = data as MachineEntity;
    if (mode === 'viewer') this.#overlay.onOpenViewer(entity);
    if (mode === 'editor') this.#overlay.onOpenEditor(entity);
    if (mode === 'eraser') this.#overlay.onOpenEraser(entity);
  };

  onSelect = (data: Entity) => {
    const entity = data as MachineEntity;
    this.#overlay.onOpenViewer(entity);
  };

  onUpdate = async (id: number, data: MachineUpdateEntity) => {
    this.#loading = true;
    this.#error = undefined;

    try {
      const result = await machineAPI.updateByID(id, data);
      if (result.status === 'error') throw generateError(result.message);
      salert.success(`User '${id}' has been deleted`);
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
      const result = await machineAPI.deleteByID(id);
      if (result.status === 'error') throw generateError(result.message);
      salert.success(`Machine '${id}' has been deleted`);
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
    return this.#machines;
  }

  get loading() {
    return this.#loading;
  }

  get error() {
    return this.#error;
  }
}
