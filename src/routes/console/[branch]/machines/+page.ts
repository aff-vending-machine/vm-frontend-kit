import { MachineService } from '$lib/services/machine';

const machineAPI = MachineService.getInstance();

export async function load({ url, parent }) {
  const fetchMachines = async () => {
    const { branch_id } = await parent();
    const query = new URLSearchParams(url.searchParams);
    if (branch_id > 0) query.set('branch_id', branch_id.toString());
    if (!query.get('limit')) query.set('limit', '10');
    if (query.get('page')) {
      const page = parseInt(query.get('page')!);
      const limit = parseInt(query.get('limit')!);
      const offset = ((page || 1) - 1) * limit;
      query.set('offset', offset.toString());
    }
    query.set('preloads', 'Branch');
    query.sort();

    const machines = await machineAPI.find(query.toString(), true);
    return machines.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
  };

  const fetchMachineCount = async () => {
    const query = new URLSearchParams(url.searchParams);
    query.delete('limit');
    query.delete('page');
    return await machineAPI.count(query.toString());
  };

  return {
    fetch: {
      machines: fetchMachines,
    },
    count: await fetchMachineCount(),
  };
}
