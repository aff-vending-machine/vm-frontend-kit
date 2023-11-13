import { ReportService } from '$lib/services/report';
import { genError } from '$lib/utils/generate';
import { defaultForm, defaultTo } from './filter';

const reportAPI = ReportService.getInstance();

export async function load({ url, parent }) {
  try {
    const { branch_id } = await parent();
    const query = new URLSearchParams(url.searchParams);
    if (branch_id > 0) query.set('branch_id', branch_id.toString());
    if (!query.has('from')) query.set('from', defaultForm);
    if (!query.has('to')) query.set('to', defaultTo);

    return {
      summary: await reportAPI.summary(query.toString()),
    };
  } catch (e) {
    return {
      error: genError(e),
    };
  }
}
