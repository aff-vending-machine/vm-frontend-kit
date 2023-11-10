import { BranchService } from '$lib/services/branch';
import { MachineService } from '$lib/services/machine';

export async function load({ url }) {
  const machineService = MachineService.getInstance();
  const branchService = BranchService.getInstance();

  const query = url.searchParams.toString();

  return {
    machines: await machineService.find(query),
    options: {
      branches: await branchService.find().then(r => r.map(c => ({ value: c.id, label: c.name }))),
    },
  };
}
