export type AppRole =
  | "super_admin"
  | "admin"
  | "manager"
  | "accountant"
  | "merchant"
  | "rider"
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
