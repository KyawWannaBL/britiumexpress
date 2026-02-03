import React, { useState, useEffect, useRef } from 'react';
import { db, auth } from '../../firebase';
import { 
  collection, 
  query, 
  where, 
  limit, 
  onSnapshot, 
  orderBy, 
  doc, 
  writeBatch, 
  serverTimestamp 
} from 'firebase/firestore';

const WarehouseDashboard = () => {
  const [activeStage, setActiveStage] = useState('Scanning');
  const [barcode, setBarcode] = useState('');
  const [location, setLocation] = useState('');
  const [recentScans, setRecentScans] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input for continuous scanning
  useEffect(() => {
    inputRef.current?.focus();
  }, [activeStage]);

  // Real-time feed of recent scans by this staff member
  useEffect(() => {
    const q = query(
      collection(db, "warehouse_logs"),
      where("processedBy", "==", auth.currentUser?.uid),
      orderBy("timestamp", "desc"),
      limit(5)
    );
    return onSnapshot(q, (snapshot) => {
      setRecentScans(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!barcode) return;
    setLoading(true);

    try {
      const batch = writeBatch(db);
      const timestamp = serverTimestamp();
      const staffId = auth.currentUser?.uid || "unknown_staff";

      // 1. Create the Activity Log
      const logRef = doc(collection(db, "warehouse_logs"));
      batch.set(logRef, {
        barcode,
        stage: activeStage,
        location: location || 'Warehouse Floor',
        timestamp,
        processedBy: staffId
      });

      // 2. Update the main Parcel/Item document
      // Assuming parcels are indexed by their barcode string
      const parcelRef = doc(db, "parcels", barcode);
      batch.update(parcelRef, {
        currentStatus: activeStage,
        lastLocation: location || 'Warehouse Floor',
        lastUpdated: timestamp,
        updatedBy: staffId
      });

      await batch.commit();
      setBarcode('');
      inputRef.current?.focus();
    } catch (err) {
      console.error(err);
      alert("Scan Failed: Check if Parcel ID exists in database.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Stage Selector */}
      <nav style={styles.nav}>
        {['Scanning', 'Staging', 'Storage', 'Shipment'].map((s) => (
          <button 
            key={s} 
            onClick={() => { setActiveStage(s); setLocation(''); }}
            style={{...styles.tab, borderBottom: activeStage === s ? '4px solid #fff' : 'none'}}
          >
            {s}
          </button>
        ))}
      </nav>

      <div style={styles.main}>
        {/* Large Input Area for Scanners */}
        <section style={styles.scanSection}>
          <form onSubmit={handleScan}>
            <input
              ref={inputRef}
              style={styles.barcodeInput}
              placeholder="SCAN BARCODE"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              disabled={loading}
            />
            
            {(activeStage === 'Storage' || activeStage === 'Staging') && (
              <input
                style={styles.locationInput}
                placeholder="ENTER BIN/ZONE ID"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            )}
            <button type="submit" style={styles.submitBtn}>
              {loading ? '...' : 'SUBMIT SCAN'}
            </button>
          </form>
        </section>

        {/* Recent Activity Feed */}
        <section style={styles.feedSection}>
          <h4 style={{margin: '0 0 10px 0'}}>Recent Activity</h4>
          {recentScans.map((scan) => (
            <div key={scan.id} style={styles.scanItem}>
              <span>📦 {scan.barcode}</span>
              <span style={styles.badge}>{scan.stage}</span>
              <small>{scan.location}</small>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

const styles = {
  container: { height: '100vh', display: 'flex', flexDirection: 'column' as const, backgroundColor: '#f4f7f6' },
  nav: { display: 'flex', backgroundColor: '#2c3e50', padding: '10px', justifyContent: 'space-around' },
  tab: { background: 'none', border: 'none', color: '#fff', padding: '10px', fontSize: '16px', fontWeight: 'bold' as const, cursor: 'pointer' },
  main: { flex: 1, padding: '20px', display: 'flex', flexDirection: 'column' as const, gap: '20px' },
  scanSection: { backgroundColor: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
  barcodeInput: { width: '100%', padding: '20px', fontSize: '24px', textAlign: 'center' as const, borderRadius: '8px', border: '2px solid #2c3e50', marginBottom: '15px' },
  locationInput: { width: '100%', padding: '15px', fontSize: '18px', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '15px' },
  submitBtn: { width: '100%', padding: '20px', backgroundColor: '#27ae60', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold' as const },
  feedSection: { flex: 1, backgroundColor: '#fff', padding: '15px', borderRadius: '12px', overflowY: 'auto' as const },
  scanItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #eee', fontSize: '14px' },
  badge: { backgroundColor: '#e1f5fe', color: '#01579b', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' as const },
};

export default WarehouseDashboard;