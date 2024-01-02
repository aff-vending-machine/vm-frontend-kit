import { AccountRoleService } from '$lib/services/account_role';

const roleAPI = AccountRoleService.getInstance();

export async function load() {
  const fetchRoleOptions = async () => {
    const roles = await roleAPI.find();
    if (roles.status === 'error') return [];
    return roles.data.map(r => ({ label: r.name, value: r.id, data: r }));
  };

  return {
    options: {
      roles: await fetchRoleOptions(),
    },
  };
}
