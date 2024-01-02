import { PaymentService } from '$lib/services/payment';

const paymentAPI = PaymentService.getInstance();

export async function load() {
  const fetchPaymentOptions = async () => {
    const roles = await paymentAPI.find();
    if (roles.status === 'error') return [];
    return roles.data.map(r => ({ label: r.name, value: r.id, data: r }));
  };

  return {
    options: {
      roles: await fetchPaymentOptions(),
    },
  };
}
