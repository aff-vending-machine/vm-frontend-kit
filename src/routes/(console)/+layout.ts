import { AuthService } from '$lib/services/auth.js';
import { BranchService } from '$lib/services/branch';
import { MachineService } from '$lib/services/machine';

export async function load() {
  const authService = AuthService.getInstance();
  const branchService = BranchService.getInstance();
  const machineService = MachineService.getInstance();
  return {
    token: await authService.authenticate(),
    branches: await branchService.find(),
    machines: await machineService.find(),
  };
}
