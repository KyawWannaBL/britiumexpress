// src/services/orderManagement.ts
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  getDoc, 
  query, 
  where, 
  orderBy, 
  getDocs,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface Order {
  id?: string;
  merchantId: string;
  customerId: string;
  customerInfo: {
    name: string;
    phone: string;
    address: string;
  };
  packageInfo: {
    description: string;
    weight: number;
    dimensions: object;
    value: number;
  };
  status: 'pending' | 'confirmed' | 'picked_up' | 'in_transit' | 'delivered' | 'cancelled';
  assignedRider?: string;
  assignedDriver?: string;
  branchId: string;
  trackingNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

export class OrderManagementService {
  // Create new order
  async createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'orders'), {
        ...orderData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  // Update order status
  async updateOrderStatus(orderId: string, status: Order['status'], assignedPersonnel?: string): Promise<void> {
    try {
      const updateData: any = {
        status,
        updatedAt: serverTimestamp()
      };

      if (assignedPersonnel) {
        if (status === 'picked_up' || status === 'in_transit') {
          updateData.assignedRider = assignedPersonnel;
        }
      }

      await updateDoc(doc(db, 'orders', orderId), updateData);
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  }

  // Get orders by merchant
  async getOrdersByMerchant(merchantId: string): Promise<Order[]> {
    try {
      const q = query(
        collection(db, 'orders'), 
        where('merchantId', '==', merchantId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Order));
    } catch (error) {
      console.error('Error getting orders by merchant:', error);
      throw error;
    }
  }

  // Get orders by status
  async getOrdersByStatus(status: Order['status']): Promise<Order[]> {
    try {
      const q = query(
        collection(db, 'orders'), 
        where('status', '==', status),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Order));
    } catch (error) {
      console.error('Error getting orders by status:', error);
      throw error;
    }
  }
}