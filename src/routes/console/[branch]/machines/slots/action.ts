import { get, writable } from 'svelte/store';

import useSelector from '$lib/stores/useSelector';
import useSWR from '$lib/stores/useSWR';
import type { MachineSlot } from '$types/machine_slot';

export const slots = useSWR<MachineSlot[]>();
export const selector = useSelector<MachineSlot>();
export const source = writable<MachineSlot[]>([]);

export const action = {
  select: (e: CustomEvent) => {
    const { data } = e.detail;
    selector.select(data);
  },
  adjust: (e: CustomEvent) => {
    const { id, stock } = e.detail;
    source.update(s => {
      const idx = s.findIndex((s: MachineSlot) => s.id === id);
      s[idx].stock = stock;
      return s;
    });
  },
  isEdited: (a: object, b: object) => {
    return JSON.stringify(a) !== JSON.stringify(b);
  },
  getSlot: (id: number): MachineSlot => {
    const slot = get(source).find(s => s.id === id);
    if (!slot) return get(source)[0];
    return slot;
  },
};
