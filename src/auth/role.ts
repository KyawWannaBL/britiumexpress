/**
 * File: src/auth/roles.ts
 * Description: 10-tier Role Hierarchy and Permission Mapping [cite: 31, 33]
 */

export type AppRole = 
  | "super_admin" | "manager" | "sub_station_manager" 
  | "supervisor" | "warehouse" | "rider" 
  | "merchant" | "vendor" | "customer" | "accountant";

export const ROLE_HIERARCHY: Record<AppRole, number> = {
  super_admin: 10,
  accountant: 9,
  manager: 8,
  sub_station_manager: 7,
  supervisor: 6,
  warehouse: 5,
  rider: 4,
  merchant: 3,
  vendor: 2,
  customer: 1
};

export const PERMISSIONS = {
  FINANCIAL_VIEW: "financial:view",
  FINANCIAL_EDIT: "financial:edit",
  USER_MANAGEMENT: "users:manage",
  DISPATCH_ASSIGN: "dispatch:assign",
  INVENTORY_SCAN: "inventory:scan",
  ORDER_CREATE: "order:create",
  TRACK_PUBLIC: "track:public",
};

export const ROLE_PERMISSIONS: Record<AppRole, string[]> = {
  super_admin: ["*"], // Full CRUD on all data 
  accountant: [PERMISSIONS.FINANCIAL_VIEW, PERMISSIONS.FINANCIAL_EDIT], // Full financial data access 
  manager: [PERMISSIONS.FINANCIAL_VIEW, PERMISSIONS.DISPATCH_ASSIGN, PERMISSIONS.USER_MANAGEMENT], // Branch staff/finance 
  sub_station_manager: [PERMISSIONS.INVENTORY_SCAN, PERMISSIONS.DISPATCH_ASSIGN], // Local inventory/routes 
  supervisor: [PERMISSIONS.DISPATCH_ASSIGN], // Real-time driver monitoring 
  warehouse: [PERMISSIONS.INVENTORY_SCAN], // Scan parcels in/out 
  rider: [PERMISSIONS.ORDER_CREATE], // Update delivery status / COD 
  merchant: [PERMISSIONS.ORDER_CREATE], // Create shipments / view statements 
  vendor: [PERMISSIONS.TRACK_PUBLIC], // Limited stock order viewing 
  customer: [PERMISSIONS.TRACK_PUBLIC], // Public tracking only 
};