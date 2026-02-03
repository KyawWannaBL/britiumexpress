// src/types/user.ts
export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  MANAGER = 'manager',
  SUB_STATION_MANAGER = 'sub_station_manager',
  SUPERVISOR = 'supervisor',
  WAREHOUSE = 'warehouse',
  RIDER = 'rider',
  DRIVER = 'driver',
  MERCHANT = 'merchant',
  VENDOR = 'vendor',
  CUSTOMER = 'customer'
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  status: 'active' | 'inactive' | 'suspended';
  branchId?: string;
  regionId?: string;
  permissions: string[];
  createdAt: Date;
  lastLoginAt?: Date;
  metadata: {
    phoneNumber?: string;
    address?: string;
    employeeId?: string;
    merchantId?: string;
  };
}