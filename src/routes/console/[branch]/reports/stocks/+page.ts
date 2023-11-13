import { ReportService } from '$lib/services/report';
import { isIsoDate } from '$lib/utils/check';
import { genError } from '$lib/utils/generate';
import { defaultForm, defaultTo } from './filter';

const reportAPI = ReportService.getInstance();

export async function load({ url, parent }) {
  try {
    const { branch_id } = await parent();
    const query = new URLSearchParams(url.searchParams);
    if (branch_id > 0) query.set('branch_id', branch_id.toString());
    if (!isIsoDate(query.get('from'))) query.delete('from');
    if (!isIsoDate(query.get('to'))) query.delete('to');
    if (!query.has('from')) query.set('from', defaultForm.toISOString());
    if (!query.has('to')) query.set('to', defaultTo.toISOString());
    const machineId = parseInt(query.get('id') || '1');

    query.delete('id');
    query.sort();

    return {
      stocks: reportAPI.stocks(machineId, query.toString()),
    };
  } catch (e) {
    return {
      error: genError(e),
    };
  }
}
