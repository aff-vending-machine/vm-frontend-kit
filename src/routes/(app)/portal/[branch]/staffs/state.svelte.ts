import { goto } from '$app/navigation';
import type { ActionState } from '$lib/components/ui/user/actions';
import type { OverlayState } from '$lib/components/ui/user/overlays';
import type { Pagination } from '$lib/helpers/apis/api';
import { generateError } from '$lib/helpers/generator';
import { salert } from '$lib/salert';
import { AccountUserService } from '$lib/services/account_user';
import type {
  AccountUserChangePasswordEntity,
  AccountUserChangeRoleEntity,
  AccountUserCreateEntity,
  AccountUserEntity,
} from '$lib/types/account_user';
import type { Entity } from '$lib/types/common';

const userAPI = AccountUserService.getInstance();

export class UserState {
  #blocking = $state<string>();
  #loading = $state(false);
  #error = $state<string>();
  #users = $state<AccountUserEntity[]>([]);
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
    query.set('preloads', 'Branch:Role');
    query.sort();

    const result = await userAPI.find(query.toString(), false);
    if (result.status === 'error') throw generateError(result.message);
    if (result.data.length === 0 && this.#action.filter.page !== 1) {
      const query = new URLSearchParams(this.#action.query);
      query.delete('page');
      return await goto(`?${query.toString()}`, { keepFocus: true });
    }

    this.#users = result.data;
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
    const entity = data as AccountUserEntity;
    if (mode === 'viewer') this.#overlay.onOpenViewer(entity);
    if (mode === 'password-changer') this.#overlay.onOpenPasswordChanger();
    if (mode === 'role-changer') this.#overlay.onOpenRoleChanger(entity);
    if (mode === 'eraser') this.#overlay.onOpenEraser(entity);
  };

  onSelect = (data: Entity) => {
    const entity = data as AccountUserEntity;
    this.#overlay.onOpenViewer(entity);
  };

  onCreate = async (data: AccountUserCreateEntity) => {
    this.#loading = true;
    this.#error = undefined;

    try {
      const result = await userAPI.create(data);
      if (result.status === 'error') throw generateError(result.message);
      salert.success(`New user has been created`);
      this.#fetch();
    } catch (e) {
      this.#error = (e as Error).message;
      salert.failure(this.#error);
    } finally {
      this.#overlay.close();
      this.#loading = false;
    }
  };

  onChangePassword = async (data: AccountUserChangePasswordEntity) => {
    this.#loading = true;
    this.#error = undefined;

    try {
      const result = await userAPI.changePassword(data);
      if (result.status === 'error') throw generateError(result.message);
      salert.success(`Your password has been changed`);
      this.#fetch();
    } catch (e) {
      this.#error = (e as Error).message;
      salert.failure(this.#error);
    } finally {
      this.#overlay.close();
      this.#loading = false;
    }
  };

  onChangeRole = async (id: number, data: AccountUserChangeRoleEntity) => {
    this.#loading = true;
    this.#error = undefined;

    try {
      const result = await userAPI.changeRoleByID(id, data);
      if (result.status === 'error') throw generateError(result.message);
      salert.success(`User '${id}'s Role has been changed`);
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
      const result = await userAPI.deleteByID(id);
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

  get ready() {
    return !this.#loading && !this.#error;
  }

  get pagination() {
    return this.#pagination!;
  }

  get data() {
    return this.#users;
  }

  get loading() {
    return this.#loading;
  }

  get error() {
    return this.#error;
  }
}
