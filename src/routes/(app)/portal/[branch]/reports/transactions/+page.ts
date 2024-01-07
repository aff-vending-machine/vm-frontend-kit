import { MachineService } from '$lib/services/machine';
import { PaymentChannelService } from '$lib/services/payment_channel';

const machineAPI = MachineService.getInstance();
const channelAPI = PaymentChannelService.getInstance();

export async function load({ parent }) {
  const fetchChannelOptions = async () => {
    const payments = await channelAPI.find();
    if (payments.status === 'error') return [];
    return payments.data.map(p => ({ label: p.name, value: p.id }));
  };

  const fetchMachineOptions = async () => {
    const { branchID } = await parent();
    const query = new URLSearchParams();
    if (branchID > 0) query.set('branch_id', branchID.toString());

    const machines = await machineAPI.find(query.toString());
    if (machines.status === 'error') return [];
    return machines.data.map(m => ({ label: m.name, value: m.id }));
  };

  return {
    options: {
      channel: await fetchChannelOptions(),
      machines: await fetchMachineOptions(),
    },
  };
}
