import { AuthService } from '$lib/services/auth';

const authAPI = AuthService.getInstance();

export const handle = {
  logout: async () => {
    await authAPI.logout();
  },
};
