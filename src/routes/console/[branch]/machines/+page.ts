import { MachineService } from '$lib/services/machine';

const machineAPI = MachineService.getInstance();

export async function load({ url, parent }) {
  const fetchMachines = async () => {
    const { branch_id } = await parent();
    const query = new URLSearchParams(url.searchParams);
    if (branch_id > 0) query.set('branch_id', branch_id.toString());
    query.sort();

    const machines = await machineAPI.find(query.toString());
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
      products: fetchMachines,
    },
    count: await fetchMachineCount(),
  };
}
