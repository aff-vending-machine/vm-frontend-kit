export async function load({ params, parent }) {
  const { options } = await parent();
  const branch = options.branch.find(b => b.value === params.branch);

  if (branch == null) {
    return {
      branchID: 0,
      branch: params.branch,
    };
  }

  return {
    branchID: branch.data.id,
    branch: params.branch,
  };
}
