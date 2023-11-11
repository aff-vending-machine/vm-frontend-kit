import { MachineService } from '$lib/services/machine';

const machineService = MachineService.getInstance();

export async function load({ url, params, parent }) {
  try {
    const { mapper } = await parent();
    if (!mapper) return { error: new Error('unexpected') };

    const query = new URLSearchParams(url.searchParams);
    const branch_id = mapper[params.branch];
    if (branch_id > 0) query.set('branch_id', branch_id.toString());

    const machines = await machineService.find(query.toString());

    return { machines };
  } catch (e) {
    const error = e instanceof Error ? e : new Error(String(e));
    return { error };
  }
}
