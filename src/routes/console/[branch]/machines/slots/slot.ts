import type { MachineSlot } from '$types/machine_slot';

type BorderType = {
  rows: number;
  cols: number;
};

export const regroupData = (original: MachineSlot[], border: BorderType): MachineSlot[] => {
  if (original.length === 0) {
    return [];
  }
  const filteredSlots: MachineSlot[] = [];

  for (let r = 0; r < border.rows; r++) {
    for (let c = 0; c < border.cols; c++) {
      const code = '0' + (r + 1) + c;
      const slot = original.find(s => s.code === code);
      if (slot === undefined) {
        filteredSlots.push();
      } else {
        filteredSlots.push({ ...slot });
      }
    }
  }

  return filteredSlots;
};

export function findBorder(list: MachineSlot[]) {
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
