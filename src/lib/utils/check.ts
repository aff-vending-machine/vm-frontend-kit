import type { ColumnType } from '$lib/components/elements/tables/table';
import { media } from '$lib/state.svelte';

export const isExpired = (iat: Date, exp: Date) => {
  if (iat > exp) return true;

  const now = new Date();
  return now > exp;
};

export const isIsoDate = (str?: string | null) => {
  if (!str) return false;
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
  const d = new Date(str);
  return d instanceof Date && !isNaN(d.getTime()) && d.toISOString() === str; // valid date
};

export const isMatched = (a?: unknown, b?: unknown) => {
  if (a === b) return true;
  return JSON.stringify(a) === JSON.stringify(b);
};

export const filterColumns = (columns: ColumnType[]) =>
  columns.filter(c => {
    if (!c.responsive || c.responsive === 'all') return true;
    if (c.responsive.includes('mobile') && media.isMobile) return true;
    if (c.responsive.includes('tablet') && media.isTablet) return true;
    if (c.responsive.includes('desktop') && media.isDesktop) return true;
    return false;
  });
