import { convertToDate, convertToAnyDate } from '$lib/utils/convert';
import type { StoreBranch } from './branch';
import type { Machine } from './machine';
import type { PaymentChannel } from './payment_channel';

export type PaymentTransaction = {
  id: number;
  branch_id: number;
  branch: StoreBranch;
  machine_id: number;
  machine: Machine;
  channel_id: number;
  channel: PaymentChannel;
  created_at: Date;
  updated_at: Date;
  merchant_order_id: string;
  raw_cart: string;
  note: string;
  order_quantity: number;
  order_price: number;
  order_status: string;
  ordered_at: Date;
  payment_requested_at?: Date;
  reference1?: string;
  reference2?: string;
  reference3?: string;
  cancelled_by?: string;
  cancelled_at?: Date;
  confirmed_paid_by?: string;
  confirmed_paid_at?: Date;
  ref_error?: string;
  refund_at?: Date;
  refund_price: number;
  received_item_at?: Date;
  received_quantity: number;
  paid_price: number;
  is_error: boolean;
  error?: string;
  error_at?: Date;
};

export const parsePaymentTransaction = (payment: PaymentTransaction) => {
  payment.created_at = convertToDate(payment.created_at);
  payment.updated_at = convertToDate(payment.updated_at);
  payment.ordered_at = convertToDate(payment.ordered_at);
  payment.payment_requested_at = convertToAnyDate(payment.payment_requested_at);
  payment.cancelled_at = convertToAnyDate(payment.cancelled_at);
  payment.confirmed_paid_at = convertToAnyDate(payment.confirmed_paid_at);
  payment.refund_at = convertToAnyDate(payment.refund_at);
  payment.received_item_at = convertToAnyDate(payment.received_item_at);
  payment.error_at = convertToAnyDate(payment.error_at);

  return payment;
};
