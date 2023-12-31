import { MachineService } from '$lib/services/machine';
const machineAPI = MachineService.getInstance();

export async function load({ parent }) {
  const fetchMachineOptions = async () => {
    const { branchID } = await parent();
    const query = new URLSearchParams();
    if (branchID > 0) query.set('branch_id', branchID.toString());

    const machines = await machineAPI.find(query.toString());
    if (machines.status === 'error') return [];
    return machines.data.map(m => ({ label: m.name, value: m.id }));
  };

  return {
    options: {
      machines: await fetchMachineOptions(),
    },
  };
}
