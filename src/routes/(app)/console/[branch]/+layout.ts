export async function load({ params, parent }) {
  const { mapper } = await parent();
  if (!mapper) throw new Error('Mapper not found');
  const branch_id = mapper[params.branch];

  return {
    branch_id,
  };
}
