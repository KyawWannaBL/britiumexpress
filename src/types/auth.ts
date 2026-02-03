export type AppRole =
  | "super_admin"
  | "admin"
  | "manager"
  | "accountant"
  | "sub_station_manager"
  | "supervisor"
  | "warehouse"
  | "merchant"
  | "rider"
  | "vendor"
  | "customer";

export type UserStatus = "approved" | "pending" | "rejected";

export type UserProfile = {
  uid: string;
  email: string;
  role: AppRole;
  status: UserStatus;
  mustChangePassword: boolean;
  backupEmail?: string;
};
