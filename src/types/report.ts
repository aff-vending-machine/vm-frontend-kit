export type MachineReport = {
  id: number;
  name: string;
  serial_number: string;
  total_payments: Record<string, number>;
  total: number;
};

export type StockReport = {
  code: string;
  name: string;
  sold: number;
  sale_price: number;
  total_payments: Record<string, number>;
  total_price: number;
};

export type TransactionReport = {
  merchant_order_id: string;
  machine_id: number;
  machine_name: string;
  machine_serial_number: string;
  location: string;
  cart: CartItem[];
  payment_channel: string;
  confirmed_paid_by: string;
  ordered_at: Date;
  payment_requested_at: Date;
  confirmed_paid_at: Date;
  received_item_at: Date;
  order_quantity: number;
  received_quantity: number;
  order_price: number;
  paid_price: number;
  raw_reference: string;
  reference1: string;
  reference2: string;
  reference3: string;
  note: string;
};

export type CartItem = {
  code: string;
  name: string;
  image_url: string;
  price: number;
  quantity: number;
  received: number;
};
