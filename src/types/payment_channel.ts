import { convertToDate } from '$lib/utils/convert';

export type PaymentChannel = {
  id: number;
  created_at: Date;
  updated_at: Date;
  name: string;
  channel: string;
  vendor: string;
  is_enable: boolean;
  host: string;
  merchant_id: string;
  merchant_name: string;
  biller_code: string;
  biller_id: string;
  token: string;
  store_id: string;
  terminal_id: string;
};

export type CreatePaymentChannel = {
  name: string;
  channel: string;
  vendor: string;
  is_enable: boolean;
  host?: string;
  merchant_id?: string;
  merchant_name?: string;
  biller_code?: string;
  biller_id?: string;
  token?: string;
  store_id?: string;
  terminal_id?: string;
};

export type UpdatePaymentChannel = {
  name?: string;
  channel?: string;
  vendor?: string;
  is_enable?: boolean;
  host?: string;
  merchant_id?: string;
  merchant_name?: string;
  biller_code?: string;
  biller_id?: string;
  token?: string;
  store_id?: string;
  terminal_id?: string;
};

export type ChangePaymentChannelStatus = {
  is_enable: boolean;
};

export const parsePaymentChannel = (channel: PaymentChannel) => {
  channel.created_at = convertToDate(channel.created_at);
  channel.updated_at = convertToDate(channel.updated_at);

  return channel;
};
