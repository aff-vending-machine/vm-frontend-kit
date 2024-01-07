import type { CatalogGroupEntity } from '$lib/types/catalog_group';

type OverlayMode =
  | { display: 'none'; view: 'none' }
  | { display: 'alert'; view: 'eraser' }
  | { display: 'drawer'; view: 'creator' | 'editor' | 'viewer' };

export class OverlayState {
  #mode = $state<OverlayMode>({ display: 'none', view: 'none' });
  #data = $state<CatalogGroupEntity>();

  constructor() {}

  close = () => {
    this.#mode = { display: 'none', view: 'none' };
    this.#data = undefined;
  };

  onOpenCreator = () => {
    this.#mode = { display: 'drawer', view: 'creator' };
    this.#data = undefined;
  };

  onOpenEditor = (data: CatalogGroupEntity) => {
    this.#mode = { display: 'drawer', view: 'editor' };
    this.#data = data;
  };

  onOpenEraser = (data: CatalogGroupEntity) => {
    this.#mode = { display: 'alert', view: 'eraser' };
    this.#data = data;
  };

  onOpenViewer = (data: CatalogGroupEntity) => {
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
