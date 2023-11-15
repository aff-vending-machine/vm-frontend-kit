import { MachineService } from '$lib/services/machine';
import { PaymentChannelService } from '$lib/services/payment_channel';
import { ReportService } from '$lib/services/report';
import { isIsoDate } from '$lib/utils/check';
import { defaultForm, defaultTo } from '$lib/utils/generate';

export async function load({ url, parent }) {
  const fetchTransactions = async (machineId: number) => {
    const reportAPI = ReportService.getInstance();
    const { branch_id } = await parent();
    const query = new URLSearchParams(url.searchParams);

    if (branch_id > 0) query.set('branch_id', branch_id.toString());
    if (!isIsoDate(query.get('from'))) query.delete('from');
    if (!isIsoDate(query.get('to'))) query.delete('to');
    if (!query.has('from')) query.set('from', defaultForm.toISOString());
    if (!query.has('to')) query.set('to', defaultTo.toISOString());

    query.delete('machine_id');
    query.sort();

    return await reportAPI.transactions(machineId, query.toString());
  };

  const fetchChannelOptions = async () => {
    const paymentAPI = PaymentChannelService.getInstance();
    const payments = await paymentAPI.find();
    return payments.map(p => ({ label: p.name, value: p.id }));
  };

  const fetchMachineOptions = async () => {
    const machineAPI = MachineService.getInstance();
    const { branch_id } = await parent();
    const query = new URLSearchParams();
    if (branch_id > 0) query.set('branch_id', branch_id.toString());

    const machines = await machineAPI.find(query.toString());
    return machines.map(m => ({ label: m.name, value: m.id }));
  };

  return {
    fetch: {
      transactions: fetchTransactions,
    },
    options: {
      channel: await fetchChannelOptions(),
      machines: await fetchMachineOptions(),
    },
  };
}
