import { generateKey } from '$lib/helpers/generator';
import { BranchService } from '$lib/services/store_branch';

const branchAPI = BranchService.getInstance();

export async function load() {
  const fetchBranchOptions = async () => {
    const branches = await branchAPI.find();
    return branches.data!.map(b => ({ label: b.name, value: generateKey(b.name), data: b }));
  };

  return {
    options: {
      branches: await fetchBranchOptions(),
    },
  };
}
