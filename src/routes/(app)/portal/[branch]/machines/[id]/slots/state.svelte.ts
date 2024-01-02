import dayjs from 'dayjs';

import type { ActionState } from '$lib/components/ui/slot/actions';
import type { OverlayState } from '$lib/components/ui/slot/overlays';
import { generateError } from '$lib/helpers/generator';
import { salert } from '$lib/salert';
import { MachineService } from '$lib/services/machine';
import { MachineSlotService } from '$lib/services/machine_slot';
import type { CatalogProductEntity } from '$lib/types/catalog_product';
import type { MachineEntity } from '$lib/types/machine';
import type { MachineSlotEntity, MachineSlotUpdateEntity } from '$lib/types/machine_slot';
import { clone } from '$lib/utils/generate';

type BorderType = {
  rows: number;
  cols: number;
};

export type SlotType = {
  id: number;
  index: number;
  machine_id?: number;
  product_id?: number;
  product?: CatalogProductEntity;
  created_at?: Date;
  updated_at?: Date;
  code: string;
  stock?: number;
  capacity?: number;
  spiral?: number;
  is_enable?: boolean;
};

const machineAPI = MachineService.getInstance();
const slotAPI = MachineSlotService.getInstance();

export class SlotState {
  #blocking = $state<string>();
  #loading = $state(false);
  #error = $state<string>();
  #machine = $state<MachineEntity>();
  #slots = $state<MachineSlotEntity[]>([]);
  #draft = $state<MachineSlotEntity[]>([]);
  #border = $state<BorderType>();

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
    query.set('preloads', 'Slots:Slots.Product');
    query.sort();

    await slotAPI.fetch(this.#action.filter.machineID);

    const result = await machineAPI.findByID(this.#action.filter.machineID, query.toString(), false);
    if (result.status === 'error') throw generateError(result.message);
    this.#machine = result.data;
    this.#slots = result.data.slots;
    this.#draft = clone(this.#slots);
    this.#border = this.#findBorder();
  };

  #findBorder = () => {
    let rows = 0;
    let cols = 0;
    const colIdx = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    this.#slots.forEach(slots => {
      const index = parseInt(slots.code[1]);
      colIdx[index]++;
      if (cols < colIdx[index]) {
        cols = colIdx[index];
      }
      if (rows < index) {
        rows = index;
      }
    });

    return { rows, cols };
  };

  regroup = (): SlotType[] => {
    if (this.#draft.length === 0) return [];
    if (!this.#border) return [];

    let slots = clone(this.#draft);
    const filteredSlots: SlotType[] = [];

    if (this.#action.stock !== '') {
      const [cond, p] = this.#action.stock.split(':');
      const percent = parseFloat(p);
      switch (cond) {
        case '<':
          slots = slots.filter(s => s.stock / s.capacity < percent);
          break;

        case '>':
          slots = slots.filter(s => s.stock / s.capacity > percent);
          break;

        case '<=':
          slots = slots.filter(s => s.stock / s.capacity <= percent);
          break;
      }
    }

    // filter changed
    if (this.#action.changed !== '') {
      const enable = this.#action.changed === 'true';

      slots = slots.filter(s => {
        const b = this.#slots.find(o => o.id === s.id);
        const isChanged = JSON.stringify(s) !== JSON.stringify(b);
        return isChanged === enable;
      });
    }

    // filter status
    if (this.#action.status !== '') {
      slots = slots.filter(s => s.is_enable === (this.#action.status === 'true'));
    }

    // filter search
    if (this.#action.search !== '') {
      slots = slots.filter(s => [s.code, s.product?.name].join('|').indexOf(this.#action.search) !== -1);
    }

    let index = 0;
    for (let r = 0; r < this.#border.rows; r++) {
      for (let c = 0; c < this.#border.cols; c++) {
        const code = '0' + (r + 1) + c;
        const slot = slots.find(s => s.code === code);
        if (slot === undefined) {
          filteredSlots.push({ id: -1, index, code });
        } else {
          filteredSlots.push({ ...slot, index });
        }
        index++;
      }
    }

    return filteredSlots;
  };

  #onfetch = async () => {
    this.#loading = true;
    this.#error = undefined;

    try {
      await this.#fetch();
    } catch (e) {
      this.#error = (e as Error).message;
      salert.failure(this.#error);
    } finally {
      this.#loading = false;
    }
  };

  onSelect = (data: MachineSlotEntity) => {
    this.#overlay.onOpenEditor(data);
  };

  onAdjust = (id: number, stock: number) => {
    const idx = this.#draft.findIndex(d => d.id === id);
    const slots = this.#draft;
    slots[idx].stock = stock;
    this.#draft = [...slots];
  };

  onUpdate = (id: number, data: MachineSlotUpdateEntity) => {
    const idx = this.#draft.findIndex(d => d.id === id);
    const slots = this.#draft;
    slots[idx] = { ...this.#draft[idx], ...data };
    this.#draft = [...slots];
  };

  onRefresh = () => {
    this.#onfetch();
  };

  onSave = async () => {
    this.#loading = true;
    this.#error = undefined;

    try {
      const result = await slotAPI.bulkUpdate(this.#action.filter.machineID, this.#draft);
      if (result.status === 'error') throw generateError(result.message);
      salert.success(`All slots has been saved`);
      this.#fetch();
    } catch (e) {
      this.#error = (e as Error).message;
      salert.failure(this.#error);
    } finally {
      this.#overlay.close();
      this.#loading = false;
    }
  };

  onReset = () => {
    this.#draft = clone(this.#slots);
  };

  isEditing = (id: number) => {
    const a = this.#draft.find(s => s.id === id);
    const b = this.#slots.find(s => s.id === id);
    return JSON.stringify(a) !== JSON.stringify(b);
  };

  getSlot = (id: number) => {
    return this.#draft.find(s => s.id === id) || this.#draft[0];
  };

  get ready() {
    return !this.#loading && !this.#error;
  }

  get machine() {
    return this.#machine;
  }

  get data() {
    return this.#draft;
  }

  get loading() {
    return this.#loading;
  }

  get error() {
    return this.#error;
  }

  get border() {
    return this.#border;
  }

  get time() {
    return this.#machine?.sync_slot_time;
  }

  get editing() {
    return JSON.stringify(this.#slots) !== JSON.stringify(this.#draft);
  }

  get syncing() {
    const date = this.#machine?.sync_slot_time;
    if (!date) return true;
    if (dayjs().isAfter(dayjs(date).add(5, 'second'), 'second')) return true;
    return false;
  }
}
