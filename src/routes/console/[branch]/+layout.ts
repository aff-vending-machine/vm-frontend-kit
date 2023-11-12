import { genError } from '$lib/utils/generate';

export async function load({ params, parent }) {
  try {
    const { mapper } = await parent();
    if (!mapper) throw new Error('Mapper not found');
    const branch_id = mapper[params.branch];

    return { branch_id };
  } catch (e) {
    return { branch_id: 0, error: genError(e) };
  }
}
