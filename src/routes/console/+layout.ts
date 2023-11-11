import { goto } from '$app/navigation';
import { BranchService } from '$lib/services/branch';
import { genKey } from '$lib/utils/generate';

const branchService = BranchService.getInstance();

export async function load() {
  try {
    const branches = await branchService.find();

    if (branches.length === 1) {
      await goto(`/console/${genKey(branches[0].name)}/machines`, { keepFocus: true });
    }

    const mapper: Record<string, number> = { all: 0 };

    branches
      .map(b => ({ ...b, key: genKey(b.name) }))
      .forEach(b => {
        mapper[b.key] = b.id;
      });

    return { branches, mapper };
  } catch (e) {
    const error = e instanceof Error ? e : new Error(String(e));
    return { error };
  }
}
