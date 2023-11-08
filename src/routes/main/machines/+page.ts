import { MachineService } from '$lib/services/machine';

export async function load({ url }) {
  try {
    const query = url.searchParams.toString();
    const machineService = MachineService.getInstance();
    const machines = await machineService.find(query);
    return { machines };
  } catch (e: unknown) {
    return { machines: [], error: e };
  }
}
