import type { CatalogProductEntity } from '$lib/types/catalog_product';

type OverlayMode =
  | { display: 'none'; view: 'none' }
  | { display: 'alert'; view: 'eraser' }
  | { display: 'drawer'; view: 'creator' | 'editor' | 'viewer' };

export class OverlayState {
  #mode = $state<OverlayMode>({ display: 'none', view: 'none' });
  #data = $state<CatalogProductEntity>();

  constructor() {}

  close = () => {
    this.#mode = { display: 'none', view: 'none' };
    this.#data = undefined;
  };

  onOpenCreator = () => {
    this.#mode = { display: 'drawer', view: 'creator' };
    this.#data = undefined;
  };

  onOpenEditor = (data: CatalogProductEntity) => {
    this.#mode = { display: 'drawer', view: 'editor' };
    this.#data = data;
  };

  onOpenEraser = (data: CatalogProductEntity) => {
    this.#mode = { display: 'alert', view: 'eraser' };
    this.#data = data;
  };

  onOpenViewer = (data: CatalogProductEntity) => {
    this.#mode = { display: 'drawer', view: 'viewer' };
    this.#data = data;
  };

  onCancel = () => {
    this.close();
  };

  get data() {
    return this.#data;
  }

  get mode() {
    return this.#mode!;
  }
}
