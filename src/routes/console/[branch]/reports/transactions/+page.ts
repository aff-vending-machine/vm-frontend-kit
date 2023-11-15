import { PaymentChannelService } from '$lib/services/payment_channel';
import { ReportService } from '$lib/services/report';
import { isIsoDate } from '$lib/utils/check';
import { defaultForm, defaultTo } from './filter';

export async function load({ url, parent }) {
  const fetchTransactions = async () => {
    const reportAPI = ReportService.getInstance();
    const { branch_id } = await parent();
    const query = new URLSearchParams(url.searchParams);
    if (branch_id > 0) query.set('branch_id', branch_id.toString());
    if (!isIsoDate(query.get('from'))) query.delete('from');
    if (!isIsoDate(query.get('to'))) query.delete('to');
    if (!query.has('from')) query.set('from', defaultForm.toISOString());
    if (!query.has('to')) query.set('to', defaultTo.toISOString());
    const machineId = parseInt(query.get('id') || '1');

    query.delete('id');
    query.sort();

    return await reportAPI.transactions(machineId, query.toString());
  };

  const fetchChannelOptions = async () => {
    const paymentAPI = PaymentChannelService.getInstance();
    const payments = await paymentAPI.find();
    return payments.map(p => ({ label: p.name, value: p.id }));
  };

  return {
    fetch: {
      transactions: fetchTransactions,
    },
    options: {
      channel: fetchChannelOptions(),
    },
  };
}
