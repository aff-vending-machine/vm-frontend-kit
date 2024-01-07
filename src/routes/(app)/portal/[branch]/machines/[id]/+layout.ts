export async function load({ params, parent }) {
  await parent();

  return {
    machineID: parseInt(params.id) ?? 0,
  };
}
