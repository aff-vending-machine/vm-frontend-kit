import { MachineService } from '$lib/services/machine';
const machineAPI = MachineService.getInstance();

export async function load({ parent }) {
  const fetchMachineOptions = async () => {
    const { branch_id } = await parent();
    const query = new URLSearchParams();
    if (branch_id > 0) query.set('branch_id', branch_id.toString());

    const machines = await machineAPI.find(query.toString());
    return machines.data!.map(m => ({ label: m.name, value: m.id }));
  };

  return {
    options: {
      machines: await fetchMachineOptions(),
    },
  };
}
