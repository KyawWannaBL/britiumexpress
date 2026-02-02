export interface IShipmentForm {
  pickupId: string;
  receiverName: string;
  receiverPhone: string;
  receiverAddress: string;
  weight: number;
  dims: { l: number; w: number; h: number };
  serviceType: 'normal' | 'express' | 'same_day';
  isCod: boolean;
  codAmount: number;
  declaredValue: number;
}

export interface IBulkRow {
  row: number;
  receiver: string;
  phone: string;
  address: string;
  status: 'valid' | 'error';
  msg?: string;
}

export interface IPickupRequest {
  id: string;
  status: 'pending' | 'assigned' | 'completed';
  date: string;
  time: string;
  location: string;
  rider: string | null;
  count: number;
}