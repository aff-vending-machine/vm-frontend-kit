import { goto } from '$app/navigation';
import { BranchService } from '$lib/services/store_branch';
import { genError, genKey } from '$lib/utils/generate';

const branchService = BranchService.getInstance();

export async function load() {
  try {
    const branches = await branchService.find();

    if (branches.length === 1) {
      await goto(`/console/${genKey(branches[0].name)}/machines`, { keepFocus: true });
    }

    const mapper: Record<string, number> = { all: 0 };
    branches.forEach(b => (mapper[genKey(b.name)] = b.id));

    return { branches, mapper };
  } catch (e) {
    return { error: genError(e) };
  }
}
