import type { MachineEntity } from '$lib/types/machine';

type OverlayMode =
  | { display: 'none'; view: 'none' }
  | { display: 'alert'; view: 'eraser' }
  | { display: 'drawer'; view: 'editor' | 'viewer' };

export class OverlayState {
  #mode = $state<OverlayMode>({ display: 'none', view: 'none' });
  #data = $state<MachineEntity>();

  constructor() {}

  close = () => {
    this.#mode = { display: 'none', view: 'none' };
    this.#data = undefined;
  };

  onOpenEditor = (data: MachineEntity) => {
    this.#mode = { display: 'drawer', view: 'editor' };
    this.#data = data;
  };

  onOpenEraser = (data: MachineEntity) => {
    this.#mode = { display: 'alert', view: 'eraser' };
    this.#data = data;
  };

  onOpenViewer = (data: MachineEntity) => {
    this.#mode = { display: 'drawer', view: 'viewer' };
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
