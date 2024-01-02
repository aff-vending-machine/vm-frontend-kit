import type { MachineSlotEntity } from '$lib/types/machine_slot';

type OverlayMode = { display: 'none'; view: 'none' } | { display: 'drawer'; view: 'editor' };

export class OverlayState {
  #mode = $state<OverlayMode>({ display: 'none', view: 'none' });
  #data = $state<MachineSlotEntity>();

  constructor() {}

  close = () => {
    this.#mode = { display: 'none', view: 'none' };
    this.#data = undefined;
  };

  onOpenEditor = (data: MachineSlotEntity) => {
    this.#mode = { display: 'drawer', view: 'editor' };
    this.#data = data;
  };

  onCancel = () => {
    this.close();
  };

  get data() {
    return this.#data!;
  }

  get mode() {
    return this.#mode!;
  }
}
