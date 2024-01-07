import { generateKey } from '$lib/helpers/generator';
import { StoreBranchService } from '$lib/services/store_branch';
import { profile } from '$lib/state.svelte';

const branchAPI = StoreBranchService.getInstance();

export async function load() {
  const fetchBranchOptions = async () => {
    const bid = profile.value?.branch_id;
    const query = bid !== 0 ? `?id=${bid}` : '';
    const branches = await branchAPI.find(query);
    if (branches.status === 'error') return [];
    return branches.data.map(b => ({ label: b.name, value: generateKey(b.name), data: b }));
  };

  return {
    options: {
      branch: await fetchBranchOptions(),
    },
  };
}
