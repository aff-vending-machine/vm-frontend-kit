import { generateKey } from '$lib/helpers/generator';
import { StoreBranchService } from '$lib/services/store_branch';

const branchAPI = StoreBranchService.getInstance();

export async function load() {
  const fetchBranchOptions = async () => {
    const branches = await branchAPI.find();
    if (branches.status === 'error') return [];
    return branches.data.map(b => ({ label: b.name, value: generateKey(b.name), data: b }));
  };

  return {
    options: {
      branches: await fetchBranchOptions(),
    },
  };
}
