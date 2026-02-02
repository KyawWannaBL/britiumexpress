export type ParcelStatus = 
  | "created" | "inbound_received" | "sorting" | "sorted" 
  | "manifested" | "out_for_delivery" | "delivered" | "cancelled";

export interface IParcel {
  id: string;
  trackingId: string;
  status: ParcelStatus;
  senderName: string;
  receiverName: string;
  receiverPhone: string;
  deliveryAddress: string;
  codAmount: number;
  currentStationId?: string;
  routeCode?: string;
  updatedAt: any;
}

export interface IWarehouseStats {
  inbound: number;
  sorted: number;
  manifested: number;
  outForDelivery: number;
}