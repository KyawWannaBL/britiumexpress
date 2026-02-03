// src/services/wayService.ts
import { db } from '../firebase';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  onSnapshot, 
  serverTimestamp, 
  orderBy 
} from 'firebase/firestore';

// Define the shape of a "Way" based on your screenshot
export interface Way {
  id?: string;
  wayId: string;
  merchant: string;
  merchantId: string;
  town: string;
  pickupBy: string;
  status: string; // 'ARRIVED_REQUESTING', 'PICKED_UP', 'DELIVERED', etc.
  category: string; // 'pickup', 'deliver', 'failed', 'return', 'parcel_in_out'
  createdAt: any;
  totalWays: number;
}

// 1. Function to synchronize data in Real-Time
export const subscribeToWays = (category: string, callback: (data: Way[]) => void) => {
  const waysRef = collection(db, 'ways');
  
  // Create a query based on the selected Tab (Category)
  // We assume your documents have a 'category' field matching the tabs
  const q = query(
    waysRef, 
    where("category", "==", category),
    orderBy("createdAt", "desc")
  );

  // onSnapshot ensures real-time sync (if you add a way, it appears instantly)
  return onSnapshot(q, (snapshot) => {
    const ways = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Way));
    callback(ways);
  });
};

// 2. Function to Create a new Way
export const createNewWay = async (data: Partial<Way>) => {
  try {
    // specific logic to generate a custom ID like 'YGN050...' could go here
    const newWay = {
      ...data,
      createdAt: serverTimestamp(),
      wayId: `WAY-${Math.floor(Math.random() * 100000)}`, // Temporary ID generator
      status: 'ARRIVED_REQUESTING', // Default status
    };
    await addDoc(collection(db, 'ways'), newWay);
    console.log("Way Created Successfully");
  } catch (error) {
    console.error("Error creating way:", error);
    throw error;
  }
};