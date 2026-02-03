import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase'; // Ensure path matches your setup
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Assuming you use react-router-dom

const Settings = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  const [role, setRole] = useState<string>('loading'); // 'admin' | 'user' | 'loading'

  // Fetch User Role from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          // Assuming you have a 'users' collection where doc ID = user UID
          const userDocRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserData(data);
            setRole(data.role || 'user'); // Default to user if no role found
          } else {
            // Fallback if no specific user doc exists yet
            setRole('user');
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setRole('user');
        }
      } else {
        // Not logged in
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redirect to login after logout
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  if (role === 'loading') return <div style={styles.container}>Loading settings...</div>;

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.title}>Settings</h1>
        <span style={role === 'admin' ? styles.badgeAdmin : styles.badgeUser}>
          {role.toUpperCase()} ACCOUNT
        </span>
      </header>

      {/* Profile Card */}
      <section style={styles.card}>
        <div style={styles.profileHeader}>
          <div style={styles.avatarPlaceholder}>
            {auth.currentUser?.email?.charAt(0).toUpperCase() || "U"}
          </div>
          <div>
            <h2 style={styles.cardTitle}>{userData?.name || "User"}</h2>
            <p style={styles.emailText}>{auth.currentUser?.email}</p>
          </div>
        </div>
      </section>

      {/* Admin Only Controls */}
      {role === 'admin' && (
        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>Admin Controls</h3>
          <div style={styles.card}>
            <button style={styles.menuItem} onClick={() => navigate('/admin/users')}>
              Manage Users
            </button>
            <button style={styles.menuItem} onClick={() => navigate('/admin/reports')}>
              System Reports
            </button>
            <button style={styles.menuItem} onClick={() => navigate('/admin/settings')}>
              Global Configuration
            </button>
          </div>
        </section>
      )}

      {/* General Settings (For Everyone) */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>General</h3>
        <div style={styles.card}>
          <button style={styles.menuItem}>Change Password</button>
          <button style={styles.menuItem}>Notification Preferences</button>
          <button style={styles.menuItem}>Privacy Policy</button>
        </div>
      </section>

      {/* Logout Button */}
      <button style={styles.logoutButton} onClick={handleLogout}>
        Sign Out
      </button>
    </div>
  );
};

// --- Simple Inline CSS Styles ---
// You can replace these with Tailwind classes if you prefer
const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  },
  badgeAdmin: {
    backgroundColor: '#ff4757',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  badgeUser: {
    backgroundColor: '#2ed573',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '10px',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    padding: '15px',
    overflow: 'hidden',
  },
  profileHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  avatarPlaceholder: {
    width: '50px',
    height: '50px',
    backgroundColor: '#dfe4ea',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#555',
  },
  cardTitle: {
    fontSize: '18px',
    margin: '0',
    color: '#333',
  },
  emailText: {
    fontSize: '14px',
    color: '#777',
    margin: '0',
  },
  menuItem: {
    display: 'block',
    width: '100%',
    padding: '12px 0',
    border: 'none',
    borderBottom: '1px solid #f0f0f0',
    backgroundColor: 'transparent',
    textAlign: 'left' as const,
    fontSize: '16px',
    cursor: 'pointer',
    color: '#333',
  },
  logoutButton: {
    width: '100%',
    padding: '15px',
    backgroundColor: '#fff',
    color: '#ff4757',
    border: '1px solid #ff4757',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '20px',
  }
};

export default Settings;