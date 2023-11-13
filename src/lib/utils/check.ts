import type { ColumnType } from '$components/elements/tables/@table';
import { isDesktop, isMobile, isTablet } from '$lib/stores/media';
import { get } from 'svelte/store';

export const isExpired = (iat: Date, exp: Date) => {
  if (iat > exp) return true;

  const now = new Date();
  return now < iat || now > exp;
};

export const isIsoDate = (str?: string | null) => {
  if (!str) return false;
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
  const d = new Date(str);
  return d instanceof Date && !isNaN(d.getTime()) && d.toISOString() === str; // valid date
};

export const filterColumns = (columns: ColumnType[]) =>
  columns.filter(c => {
    if (!c.responsive || c.responsive === 'all') return true;
    if (c.responsive.includes('mobile') && get(isMobile)) return true;
    if (c.responsive.includes('tablet') && get(isTablet)) return true;
    if (c.responsive.includes('desktop') && get(isDesktop)) return true;
    return false;
  });
