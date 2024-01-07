import { goto } from '$app/navigation';
import { generateError } from '$lib/helpers/generator';
import { MachineService } from '$lib/services/machine';
import { profile } from '$lib/state.svelte';
import type { MachineEntity } from '$lib/types/machine';

const machineAPI = MachineService.getInstance();

export class PortalState {
  #url: URL;
  #route = '';
  #machine = $state<MachineEntity>();

  constructor(url: URL, route?: string | null, machineID?: string) {
    this.#url = url;
    this.#route = route ?? '';
    const id = parseInt(machineID ?? '0') ?? 0;

    $effect(() => {
      if (id !== 0) {
        this.#fetch(id);
      }
    });
  }

  #fetch = async (id: number) => {
    const result = await machineAPI.findByID(id);
    if (result.status === 'error') throw generateError(result.message);
    this.#machine = result.data;
  };

  onChange = (e: Event) => {
    e.preventDefault();

    const newBranch = (e.target as HTMLSelectElement).value;
    const url = this.#route.replace('/(app)/', '/').replace('[branch]', newBranch);
    goto(`${url}?${this.#url.searchParams.toString()}`);
  };

  get machine() {
    return this.#machine;
  }

  get username() {
    return profile.value?.username ?? 'unknown';
  }

  get role() {
    return profile.value?.role ?? 'unknown';
  }
}
