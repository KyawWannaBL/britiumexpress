/**
 * Britium Express Mobile App - Core Constants and Types
 * Current Year: 2026
 */

export const ROUTE_PATHS = {
  LOGIN: '/login',
  DASHBOARD: '/',
  ORDERS: '/orders',
  DELIVERY: '/delivery',
  WAREHOUSE: '/warehouse',
  PROFILE: '/profile',
} as const;

export const USER_ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  MANAGER: 'MANAGER',
  SUB_STATION_MANAGER: 'SUB_STATION_MANAGER',
  SUPERVISOR: 'SUPERVISOR',
  WAREHOUSE: 'WAREHOUSE',
  RIDER: 'RIDER',
  DRIVER: 'DRIVER',
  MERCHANT: 'MERCHANT',
  VENDOR: 'VENDOR',
  CUSTOMER: 'CUSTOMER',
} as const;

export type UserRole = keyof typeof USER_ROLES;

export const ORDER_STATUS = {
  PENDING: 'PENDING',
  PICKED_UP: 'PICKED_UP',
  IN_TRANSIT: 'IN_TRANSIT',
  ARRIVED_AT_STATION: 'ARRIVED_AT_STATION',
  OUT_FOR_DELIVERY: 'OUT_FOR_DELIVERY',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
  RETURNED: 'RETURNED',
} as const;

export type OrderStatus = keyof typeof ORDER_STATUS;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  stationId?: string;
  vehicleId?: string;
  phone?: string;
  lastSync?: string;
  isOffline?: boolean;
}

export interface Order {
  id: string;
  trackingNumber: string;
  status: OrderStatus;
  senderName: string;
  receiverName: string;
  origin: string;
  destination: string;
  weight: number;
  createdAt: string;
  updatedAt: string;
  description?: string;
  value?: number;
  currency?: string;
}

export interface DeliveryTask {
  id: string;
  orderId: string;
  trackingNumber: string;
  type: 'pickup' | 'delivery';
  status: 'assigned' | 'in_progress' | 'completed' | 'failed';
  address: string;
  customerName: string;
  customerContact: string;
  priority: 'low' | 'medium' | 'high';
  scheduledTime: string;
  lat?: number;
  lng?: number;
  notes?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  isRead: boolean;
}

export const API_ENDPOINTS = {
  BASE_URL: 'https://api.britiumexpress.com/v1',
  AUTH: '/auth',
  ORDERS: '/orders',
  TASKS: '/tasks',
  WAREHOUSE: '/warehouse',
  SYNC: '/sync',
  NOTIFICATIONS: '/notifications',
} as const;

export const APP_VERSION = '2.4.0';
export const COPYRIGHT_YEAR = '2026';

/**
 * Formats a tracking ID by removing whitespace and making it uppercase
 */
export const formatTrackingID = (id: string) => id.toUpperCase().replace(/\s/g, '');

/**
 * Maps order status to design system chart colors
 */
export const getStatusColor = (status: OrderStatus | string) => {
  switch (status) {
    case ORDER_STATUS.DELIVERED:
      return 'text-chart-2'; // Success Green
    case ORDER_STATUS.PENDING:
    case ORDER_STATUS.PICKED_UP:
      return 'text-chart-3'; // Warning Amber
    case ORDER_STATUS.CANCELLED:
      return 'text-destructive'; // Error Red
    case ORDER_STATUS.IN_TRANSIT:
    case ORDER_STATUS.OUT_FOR_DELIVERY:
      return 'text-primary'; // Brand Blue
    default:
      return 'text-muted-foreground';
  }
};

/**
 * Simple helper for role-based access checks
 */
export const hasPermission = (userRole: UserRole, allowedRoles: UserRole[]) => {
  return allowedRoles.includes(userRole);
};