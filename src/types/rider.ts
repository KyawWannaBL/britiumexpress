import { LucideIcon } from "lucide-react";

export type TaskStatus = 'pickup' | 'delivery' | 'return';
export type JobStatus = 'pending' | 'in_transit' | 'completed' | 'failed';

export interface IRiderStats {
  pending: number;
  completed: number;
  failed: number;
  cod: number;
}

export interface IJob {
  id: string;
  type: TaskStatus;
  customerName: string;
  phone: string;
  address: string;
  codAmount: number;
  slaTime: string;
  notes?: string;
  isFragile: boolean;
  tags: string[];
}

export interface ITransaction {
  id: string;
  type: 'cod' | 'fee';
  amount: number;
  desc: string;
  time: string;
}