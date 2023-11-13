import { MachineService } from '$lib/services/machine';
import { genError } from '$lib/utils/generate';

const machineAPI = MachineService.getInstance();

export async function load({ url, parent }) {
  try {
    const { branch_id } = await parent();
    const query = new URLSearchParams(url.searchParams);
    const query2 = new URLSearchParams(url.searchParams);
    if (branch_id > 0) query.set('branch_id', branch_id.toString());

    query2.delete('limit');
    query2.delete('offset');

    return {
      machines: machineAPI.find(query.toString()),
      count: machineAPI.count(query2.toString()),
    };
  } catch (e) {
    return {
      error: genError(e),
      count: 0,
    };
  }
}
