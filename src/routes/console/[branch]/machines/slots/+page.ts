import { CatalogGroupService } from '$lib/services/catalog_group';
import { CatalogProductService } from '$lib/services/catalog_product';
import { MachineService } from '$lib/services/machine';
import { MachineSlotService } from '$lib/services/machine_slot';

const machineAPI = MachineService.getInstance();
const groupAPI = CatalogGroupService.getInstance();
const productAPI = CatalogProductService.getInstance();
const slotAPI = MachineSlotService.getInstance();

export async function load({ parent }) {
  const fetchMachineSlot = async (machineId: number) => {
    const { branch_id } = await parent();
    const query = new URLSearchParams();

    if (branch_id > 0) query.set('branch_id', branch_id.toString());
    query.set('preloads', 'Product');
    query.sort();

    const slots = await slotAPI.find(machineId, query.toString());
    return slots;
  };

  const fetchMachine = async (machineId: number) => {
    return await machineAPI.findByID(machineId);
  };

  const fetchMachineOptions = async () => {
    const { branch_id } = await parent();
    const query = new URLSearchParams();
    if (branch_id > 0) query.set('branch_id', branch_id.toString());

    const machines = await machineAPI.find(query.toString());
    return machines.map(m => ({ label: m.name, value: m.id }));
  };

  const fetchProductGroupOptions = async () => {
    const groups = await groupAPI.find();
    return groups.map(g => ({ label: g.name, value: g.id }));
  };

  const fetchProductOptions = async () => {
    const products = await productAPI.find();
    return products.map(p => ({
      label: `${p.name} (${p.sale_price}.-)`,
      value: p.id,
      filter: p.group_id,
      data: p,
    }));
  };

  return {
    fetch: {
      machine: fetchMachine,
      slots: fetchMachineSlot,
    },
    options: {
      machines: await fetchMachineOptions(),
      groups: await fetchProductGroupOptions(),
      products: await fetchProductOptions(),
    },
  };
}
