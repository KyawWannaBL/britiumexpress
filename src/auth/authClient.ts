/**
 * File: src/auth/authClient.ts
 * Description: 10-tier Role Hierarchy and Permission Mapping
 */

export type AppRole = 
  | "super_admin" | "accountant" | "manager" 
  | "sub_station_manager" | "supervisor" | "warehouse" 
  | "rider" | "merchant" | "vendor" | "customer";

export const ROLE_LEVELS: Record<AppRole, number> = {
  super_admin: 10,           // Highest access, manages entire system
  accountant: 9,            // Financial oversight and reports
  manager: 8,               // Branch/Regional oversight
  sub_station_manager: 7,    // Local hub/station management
  supervisor: 6,            // Daily dispatch and driver lead
  warehouse: 5,             // Parcel handling and scanning
  rider: 4,                 // Deliveries and COD collection
  merchant: 3,              // Create orders and view statements
  vendor: 2,                // Supply chain integration
  customer: 1               // Public tracking and preferences
};

export const PERMISSIONS = {
  FULL_ACCESS: "all:crud",
  FINANCIAL_READ: "finance:read",
  FINANCIAL_WRITE: "finance:write",
  DISPATCH_ASSIGN: "dispatch:assign",
  INVENTORY_SCAN: "inventory:scan",
  ORDER_CREATE: "order:create",
  USER_MANAGE: "user:manage"
};

export const ROLE_PERMISSIONS: Record<AppRole, string[]> = {
  super_admin: [PERMISSIONS.FULL_ACCESS],
  accountant: [PERMISSIONS.FINANCIAL_READ, PERMISSIONS.FINANCIAL_WRITE],
  manager: [PERMISSIONS.FINANCIAL_READ, PERMISSIONS.DISPATCH_ASSIGN, PERMISSIONS.USER_MANAGE],
  sub_station_manager: [PERMISSIONS.DISPATCH_ASSIGN, PERMISSIONS.INVENTORY_SCAN],
  supervisor: [PERMISSIONS.DISPATCH_ASSIGN],
  warehouse: [PERMISSIONS.INVENTORY_SCAN],
  rider: [PERMISSIONS.ORDER_CREATE], // For updating status/COD
  merchant: [PERMISSIONS.ORDER_CREATE, PERMISSIONS.FINANCIAL_READ],
  vendor: [PERMISSIONS.INVENTORY_SCAN], // Limited to stock orders
  customer: [] // Public tracking only
};