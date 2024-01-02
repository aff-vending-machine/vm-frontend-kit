import type { AccountUserEntity } from '$lib/types/account_user';

export type OverlayMode =
  | { display: 'none'; view: 'none' }
  | { display: 'modal'; view: 'password-changer' | 'role-changer' }
  | { display: 'alert'; view: 'eraser' }
  | { display: 'drawer'; view: 'creator' | 'viewer' };

export class OverlayState {
  #mode = $state<OverlayMode>({ display: 'none', view: 'none' });
  #data = $state<AccountUserEntity>();

  constructor() {}

  close = () => {
    this.#mode = { display: 'none', view: 'none' };
    this.#data = undefined;
  };

  onOpenCreator = () => {
    this.#mode = { display: 'drawer', view: 'creator' };
  };

  onOpenPasswordChanger = () => {
    this.#mode = { display: 'modal', view: 'password-changer' };
  };

  onOpenRoleChanger = (data: AccountUserEntity) => {
    this.#mode = { display: 'modal', view: 'role-changer' };
    this.#data = data;
  };

  onOpenEraser = (data: AccountUserEntity) => {
    this.#mode = { display: 'alert', view: 'eraser' };
    this.#data = data;
  };

  onOpenViewer = (data: AccountUserEntity) => {
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
