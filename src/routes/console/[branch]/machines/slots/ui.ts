import type { MachineSlot } from '$types/machine_slot';

type SlotBlockType = {
  code: string;
  id?: number;
  productId?: number;
  stock?: number;
  capacity?: number;
  isEnable?: boolean;
};

export const regroupData = (original: MachineSlot[]): SlotBlockType[] => {
  if (original.length === 0) {
    return [] as SlotBlockType[];
  }

  const { rows, cols } = findBorder(original);
  const filteredSlots = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const code = '0' + (r + 1) + c;
      const slot = original.find(s => s.code === code);
      if (slot === undefined) {
        filteredSlots.push({ code });
      } else {
        filteredSlots.push({
          id: slot.id,
          code: slot.code,
          productId: slot.product_id,
          stock: slot.stock,
          capacity: slot.capacity,
          isEnable: slot.is_enable,
        });
      }
    }
  }

  return filteredSlots;
};

function findBorder(list: MachineSlot[]) {
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
}
