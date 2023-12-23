import { CatalogGroupService } from '$lib/services/catalog_group';
import { CatalogProductService } from '$lib/services/catalog_product';
import { MachineService } from '$lib/services/machine';

const machineAPI = MachineService.getInstance();
const groupAPI = CatalogGroupService.getInstance();
const productAPI = CatalogProductService.getInstance();

export async function load({ params, parent }) {
  const fetchMachineOptions = async () => {
    const { branchID } = await parent();
    const query = new URLSearchParams();
    if (branchID > 0) query.set('branch_id', branchID.toString());

    const machines = await machineAPI.find(query.toString());
    return machines.data!.map(m => ({ label: m.name, value: m.id }));
  };

  const fetchProductGroupOptions = async () => {
    const groups = await groupAPI.find();
    return groups.data!.map(g => ({ label: g.name, value: g.id }));
  };

  const fetchProductOptions = async () => {
    const products = await productAPI.find();
    return products.data!.map(p => ({
      label: `${p.name} (${p.sale_price}.-)`,
      value: p.id,
      filter: p.group_id,
      data: p,
    }));
  };

  const machineID = parseInt(params.id);

  return {
    machineID,
    options: {
      machines: await fetchMachineOptions(),
      groups: await fetchProductGroupOptions(),
      products: await fetchProductOptions(),
    },
  };
}
