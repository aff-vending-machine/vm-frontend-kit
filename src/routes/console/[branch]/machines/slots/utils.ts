import dayjs from 'dayjs';
import { get } from 'svelte/store';

import { draft, slotsState, type FilterType } from './store';

import type { CatalogProduct } from '$types/catalog_product';
import type { MachineSlot } from '$types/machine_slot';

type BorderType = {
  rows: number;
  cols: number;
};

export type SlotType = {
  id: number;
  index: number;
  machine_id?: number;
  product_id?: number;
  product?: CatalogProduct;
  created_at?: Date;
  updated_at?: Date;
  code: string;
  stock?: number;
  capacity?: number;
  spiral?: number;
  is_enable?: boolean;
};

export const utils = {
  regroupData: (origin: MachineSlot[], filter: FilterType, border: BorderType): SlotType[] => {
    if (origin.length === 0) {
      return [];
    }

    let slots = [...origin];
    const filteredSlots: SlotType[] = [];

    if (filter.stock !== '') {
      const [cond, p] = filter.stock.split(':');
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
    if (filter.changed !== '') {
      const enable = filter.changed === 'true';

      slots = slots.filter(s => {
        const b = origin.find(o => o.id === s.id);
        const isChanged = JSON.stringify(s) !== JSON.stringify(b);
        return isChanged === enable;
      });
    }

    // filter status
    if (filter.status !== '') {
      slots = slots.filter(s => s.is_enable === (filter.status === 'true'));
    }

    // filter search
    if (filter.search !== '') {
      slots = slots.filter(s => [s.code, s.product.name].join('|').indexOf(filter.search) !== -1);
    }

    let index = 0;
    for (let r = 0; r < border.rows; r++) {
      for (let c = 0; c < border.cols; c++) {
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
  },
  findBorder: (list: MachineSlot[]) => {
    let rows = 0;
    let cols = 0;
    const colIdx = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    list.forEach(slots => {
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
  },
  isEditing: (id: number) => {
    const a = get(draft).find(s => s.id === id);
    const b = get(slotsState).data?.find(s => s.id === id);
    return JSON.stringify(a) !== JSON.stringify(b);
  },
  getSlot: (id: number) => {
    return get(draft).find(s => s.id === id) || get(draft)[0];
  },
  isPassed5Seconds: (date?: Date) => {
    if (!date) return true;
    if (dayjs().isAfter(dayjs(date).add(5, 'second'), 'second')) return true;
    return false;
  },
};
