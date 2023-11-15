import { ReportService } from '$lib/services/report';
import { defaultForm, defaultTo } from './filter';

const reportAPI = ReportService.getInstance();

export async function load({ url, parent }) {
  const fetchMachines = async () => {
    const { branch_id } = await parent();
    const query = new URLSearchParams(url.searchParams);
    if (branch_id > 0) query.set('branch_id', branch_id.toString());
    if (!query.has('from')) query.set('from', defaultForm);
    if (!query.has('to')) query.set('to', defaultTo);

    return await reportAPI.summary(query.toString());
  };
  return {
    summary: fetchMachines(),
  };
}
