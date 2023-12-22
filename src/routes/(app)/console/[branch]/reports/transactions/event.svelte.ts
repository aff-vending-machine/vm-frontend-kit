import { ReportService } from '$lib/services/report';
import { isIsoDate } from '$lib/utils/check';
import { defaultForm, defaultTo } from '$lib/utils/generate';

export const call = {
  transactions: async (branchID: number, query: URLSearchParams) => {
    const reportAPI = ReportService.getInstance();

    if (branchID > 0) query.set('branch_id', branchID.toString());
    if (!isIsoDate(query.get('from'))) query.delete('from');
    if (!isIsoDate(query.get('to'))) query.delete('to');
    if (!query.has('from')) query.set('from', defaultForm.toISOString());
    if (!query.has('to')) query.set('to', defaultTo.toISOString());
    const machineID = parseInt(query.get('machine_id') || '0');

    query.delete('machine_id');
    query.sort();

    return await reportAPI.transactions(machineID, query.toString());
  },
};
