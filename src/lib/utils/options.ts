export type SelectOptionsType<V = string | number, T = unknown> = {
  label: string;
  value: V;
  data?: T;
  filter?: V;
};

export const viewOptions: SelectOptionsType<number>[] = [
  { label: '10', value: 10 },
  { label: '25', value: 25 },
  { label: '50', value: 50 },
  { label: '100', value: 100 },
];
