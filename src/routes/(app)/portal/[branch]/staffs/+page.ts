import { AccountRoleService } from '$lib/services/account_role';

const roleAPI = AccountRoleService.getInstance();

export async function load({ parent }) {
  const fetchRoleOptions = async () => {
    const roles = await roleAPI.find();
    if (roles.status === 'error') return [];
    return roles.data.map(r => ({ label: r.name, value: r.id, data: r }));
  };

  const fetchBranchOptions = async () => {
    const { options } = await parent();
    return options.branch.map(b => ({ label: b.label, value: b.data.id, data: b.data }));
  };
  return {
    options: {
      branch: await fetchBranchOptions(),
      role: await fetchRoleOptions(),
    },
  };
}
