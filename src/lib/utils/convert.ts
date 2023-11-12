export const convertToDate = (date: Date | string | number): Date => {
  if (date instanceof Date) return date;
  if (typeof date === 'number') return new Date(date * 1000);
  if (typeof date === 'string') return new Date(parseInt(date) * 1000);
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
