import { goto } from '$app/navigation';
import { BranchService } from '$lib/services/store_branch';
import { genKey } from '$lib/utils/generate';

const branchAPI = BranchService.getInstance();

export async function load({ parent }) {
  const fetchBranches = async () => {
    const branches = await branchAPI.find();

    return branches;
  };

  const fetchBranchMapper = async () => {
    const branches = await branchAPI.find();

    const mapper: Record<string, number> = { all: 0 };
    branches.forEach(b => (mapper[genKey(b.name)] = b.id));

    return mapper;
  };

  const fetchBranchOptions = async () => {
    const branches = await branchAPI.find();
    return branches.map(b => ({ label: b.name, value: genKey(b.name) }));
  };

  const { isAuthenticated } = await parent();
  if (!isAuthenticated) {
    goto('/login');
  }

  return {
    branches: await fetchBranches(),
    mapper: await fetchBranchMapper(),
    options: {
      branches: await fetchBranchOptions(),
    },
  };
}
