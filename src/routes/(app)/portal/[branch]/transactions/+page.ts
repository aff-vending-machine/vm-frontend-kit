import { MachineService } from '$lib/services/machine';
import { PaymentChannelService } from '$lib/services/payment_channel';

const machineAPI = MachineService.getInstance();
const channelAPI = PaymentChannelService.getInstance();

export async function load({ parent }) {
  const fetchMachineOptions = async () => {
    const { branchID } = await parent();
    const query = branchID === 0 ? undefined : `?branch_id=${branchID}`;
    const machines = await machineAPI.find(query);
    if (machines.status === 'error') return [];
    return machines.data.map(m => ({ label: m.name, value: m.id, data: m }));
  };

  const fetchChannelOptions = async () => {
    const channels = await channelAPI.find();
    if (channels.status === 'error') return [];
    return channels.data.map(c => ({ label: c.name, value: c.id, data: c }));
  };

  return {
    options: {
      machine: await fetchMachineOptions(),
      channel: await fetchChannelOptions(),
    },
  };
}
