import { MachineService } from '$lib/services/machine';
import { PaymentService } from '$lib/services/payment';

export async function load({ parent }) {
  const fetchChannelOptions = async () => {
    const paymentAPI = PaymentService.getInstance();
    const payments = await paymentAPI.find();
    return payments.data!.map(p => ({ label: p.name, value: p.id }));
  };

  const fetchMachineOptions = async () => {
    const machineAPI = MachineService.getInstance();
    const { branch_id } = await parent();
    const query = new URLSearchParams();
    if (branch_id > 0) query.set('branch_id', branch_id.toString());

    const machines = await machineAPI.find(query.toString());
    return machines.data!.map(m => ({ label: m.name, value: m.id }));
  };

  return {
    options: {
      channel: await fetchChannelOptions(),
      machines: await fetchMachineOptions(),
    },
  };
}
