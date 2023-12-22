import { BranchService } from '$lib/services/store_branch';
import { genKey } from '$lib/utils/generate';

const branchAPI = BranchService.getInstance();

export async function load() {
  const fetchBranches = async () => {
    const branches = await branchAPI.find();

    return branches.data;
  };

  const fetchBranchMapper = async () => {
    const branches = await branchAPI.find();

    const mapper: Record<string, number> = { all: 0 };
    branches.data!.forEach(b => (mapper[genKey(b.name)] = b.id));

    return mapper;
  };

  const fetchBranchOptions = async () => {
    const branches = await branchAPI.find();
    return branches.data!.map(b => ({ label: b.name, value: b.id, data: genKey(b.name) }));
  };

  return {
    branches: await fetchBranches(),
    mapper: await fetchBranchMapper(),
    options: {
      branches: await fetchBranchOptions(),
    },
  };
}
