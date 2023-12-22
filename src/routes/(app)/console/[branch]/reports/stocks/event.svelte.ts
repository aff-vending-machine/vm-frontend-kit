import { ReportService } from '$lib/services/report';
import type { StockReport } from '$lib/types/report';
import { isIsoDate } from '$lib/utils/check';
import { defaultForm, defaultTo } from '$lib/utils/generate';

const reportAPI = ReportService.getInstance();

export const call = {
  stocks: async (branchID: number, query: URLSearchParams) => {
    if (branchID > 0) query.set('branch_id', branchID.toString());
    if (!isIsoDate(query.get('from'))) query.delete('from');
    if (!isIsoDate(query.get('to'))) query.delete('to');
    if (!query.has('from')) query.set('from', defaultForm.toISOString());
    if (!query.has('to')) query.set('to', defaultTo.toISOString());
    const machineID = parseInt(query.get('machine_id') || '0');

    query.delete('machine_id');
    query.sort();

    const stocks = await reportAPI.stocks(machineID, query.toString());
    return stocks.data?.sort((a: StockReport, b: StockReport) => {
      if (a.code < b.code) return -1;
      if (a.code > b.code) return 1;
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
  },
};
