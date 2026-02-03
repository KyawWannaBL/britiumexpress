import React, { useState, useEffect } from 'react';

// --- 1. FIREBASE IMPORTS ---
// Adjust this path if your file is in a subfolder!
// If this file is in 'src/pages/', use '../firebase'
// If this file is in 'src/pages/admin/', use '../../firebase'
import { db } from '../firebase'; 
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  onSnapshot, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';

// --- 2. INTERFACE DEFINITION (Internal) ---
interface Way {
  id?: string;
  wayId: string;
  merchant: string;
  merchantId: string;
  town: string;
  pickupBy: string;
  status: string;
  category: string;
  createdAt: any;
  totalWays: number;
}

const WayManagement = () => {
  const [activeTab, setActiveTab] = useState('parcel_in_out'); 
  const [ways, setWays] = useState<Way[]>([]);
  const [loading, setLoading] = useState(true);

  // --- 3. SYNCHRONIZATION LOGIC (Inside Component) ---
  useEffect(() => {
    setLoading(true);
    
    // Safety check for DB connection
    if (!db) {
      console.error("Firebase DB is not initialized");
      setLoading(false);
      return;
    }

    try {
      const waysRef = collection(db, 'ways');
      const q = query(
        waysRef, 
        where("category", "==", activeTab),
        orderBy("createdAt", "desc")
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const loadedWays = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Way));
        setWays(loadedWays);
        setLoading(false);
      }, (error) => {
        console.error("Snapshot Error:", error);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      console.error("Query Error:", err);
      setLoading(false);
    }
  }, [activeTab]);

  // --- 4. DEBUG CREATE FUNCTION ---
  const handleCreateWay = async () => {
    const confirmCreate = window.confirm("Create a new test Way?");
    if (!confirmCreate) return;

    if (!db) {
      alert("CRITICAL ERROR: 'db' is undefined. Check your firebase.ts import path!");
      return;
    }

    try {
      setLoading(true);
      const newWay = {
        merchant: "The Shopping Cart",
        merchantId: "M000004287",
        town: "ADSIT",
        pickupBy: "Kyaw Zin Khant",
        category: activeTab,
        totalWays: 1,
        status: 'ARRIVED_REQUESTING',
        wayId: `WAY-${Math.floor(Math.random() * 100000)}`,
        createdAt: serverTimestamp(),
      };

      // Writing to 'ways' collection
      await addDoc(collection(db, 'ways'), newWay);
      alert("✅ Way Created Successfully!");
      
    } catch (e: any) {
      console.error("Firebase Write Error:", e);
      alert(`❌ FAILED: ${e.message}`); 
    } finally {
      setLoading(false);
    }
  };

  // --- 5. EXPORT FUNCTION ---
  const handleExport = () => {
    if (ways.length === 0) {
      alert("No data to export!");
      return;
    }

    const headers = ["Way ID", "Merchant", "Status", "Town", "Pickup By"];
    const csvContent = [
      headers.join(","),
      ...ways.map(w => 
        `${w.wayId},"${w.merchant}",${w.status},${w.town},${w.pickupBy}`
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `way_export_${activeTab}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Way Management</h1>
          <p className="text-gray-500">Comprehensive order processing and tracking</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleExport}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 text-gray-700 flex items-center gap-2"
          >
            Export
          </button>
          <button 
            onClick={handleCreateWay}
            className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 flex items-center gap-2"
          >
            + Create Way (Debug)
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-6 border-b border-gray-200 mb-6 text-sm font-medium text-gray-500 overflow-x-auto">
        {['Pickup ways', 'Deliver ways', 'Failed ways', 'Return ways', 'parcel_in_out', 'Transit route', 'Tracking map'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase().replace(/ /g, '_'))}
            className={`pb-3 whitespace-nowrap ${
              activeTab === tab.toLowerCase().replace(/ /g, '_') 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'hover:text-gray-700'
            }`}
          >
            {tab.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            {tab === 'parcel_in_out' ? 'Parcel In/Out' : ''} 
          </button>
        ))}
      </div>

      {/* SUB TABS */}
      {activeTab === 'parcel_in_out' && (
        <div className="flex gap-4 mb-4">
            <button className="text-blue-800 font-semibold border-b-2 border-blue-800 pb-1">Pickup parcels (IN)</button>
            <button className="text-gray-500 pb-1">Deliver parcels (OUT)</button>
        </div>
      )}

      {/* TABLE */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="p-4"><input type="checkbox" /></th>
              <th className="p-4">STATUS</th>
              <th className="p-4">TOTAL WAYS</th>
              <th className="p-4">WAY ID</th>
              <th className="p-4">MERCHANT</th>
              <th className="p-4">MERCHANT ID</th>
              <th className="p-4">TOWN</th>
              <th className="p-4">PICKUP BY</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
               <tr><td colSpan={8} className="p-6 text-center">Loading data...</td></tr>
            ) : ways.length === 0 ? (
               <tr><td colSpan={8} className="p-6 text-center text-gray-500">No ways found in this category.</td></tr>
            ) : (
              ways.map((way) => (
                <tr key={way.id} className="border-b hover:bg-gray-50">
                  <td className="p-4"><input type="checkbox" /></td>
                  <td className="p-4">
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-bold">
                      {way.status}
                    </span>
                  </td>
                  <td className="p-4 font-bold">{way.totalWays || 1}</td>
                  <td className="p-4 font-mono text-gray-600">{way.wayId}</td>
                  <td className="p-4">{way.merchant}</td>
                  <td className="p-4 text-gray-500">{way.merchantId}</td>
                  <td className="p-4">{way.town}</td>
                  <td className="p-4 text-blue-600 cursor-pointer">{way.pickupBy}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WayManagement;