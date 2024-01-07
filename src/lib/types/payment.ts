export type PaymentEntity = {
  id: number;
  created_at: Date;
  updated_at: Date;
  machine_id: number;
  name: string;
  channel: string;
  vendor: string;
  host: string;
  is_enable: boolean;
  info: Record<string, string>;
};

export type PaymentUpdateEntity = Omit<PaymentEntity, 'id' | 'created_at' | 'updated_at' | 'machine_id'>;

export type PaymentChangeStatusEntity = {
  is_enable: boolean;
};
