import { isIsoDate } from './check';

export const convertToDate = (date: Date | string | number): Date => {
  if (date instanceof Date) return date;
  if (typeof date === 'number') return new Date(date * 1000);
  if (typeof date === 'string') return new Date(date);
  return new Date(date);
};

export const convertToAnyDate = (date: Date | string | number | undefined): Date | undefined => {
  if (!date) return;
  return convertToDate(date);
};

export const convertToQuery = (obj: Record<string, string>) => {
  return Object.keys(obj)
    .filter((key: string) => !!obj[key])
    .reduce((res: Record<string, string>, key: string) => {
      res[key] = obj[key].toString();
      return res;
    }, {});
};

export const parseDate = (str: string | null, _default: Date): Date => {
  if (!str || !isIsoDate(str)) return _default;
  try {
    return new Date(str);
  } catch (e) {
    return _default;
  }
};

export const parseBoolean = (str: string | null, _default: boolean = false): boolean => {
  if (!str || !(str === 'true' || str === 'false')) return _default;
  return str === 'true';
};

export function clone<T>(a?: T[]): T[] {
  return a?.map(o => ({ ...o })) || [];
}
