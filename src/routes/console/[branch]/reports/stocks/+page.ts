import { MachineService } from '$lib/services/machine';
import { ReportService } from '$lib/services/report';
import { isIsoDate } from '$lib/utils/check';
import { defaultForm, defaultTo } from '$lib/utils/generate';

export async function load({ url, parent }) {
  const fetchStocks = async (machineId: number) => {
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

    const stocks = await reportAPI.stocks(machineId, query.toString());
    return stocks.sort((a, b) => {
      if (a.code < b.code) return -1;
      if (a.code > b.code) return 1;
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
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
      stocks: fetchStocks,
    },
    options: {
      machines: await fetchMachineOptions(),
    },
  };
}
