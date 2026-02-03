import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebaseconfig';
import { useNavigate } from 'react-router-dom';

export default function AdminSeeder() {
  const [status, setStatus] = useState('Ready to create Admin account.');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createAdmin = async () => {
    setLoading(true);
    setStatus('Processing...');
    
    // THE MASTER CREDENTIALS
    const email = "md@britiumexpress.com";
    const password = "P@ssw0rd1";

    try {
      let user;
      
      try {
        // Attempt to sign in if user already exists
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        user = userCredential.user;
        setStatus('User exists in Auth. Updating database permissions...');
      } catch (loginError: any) {
        // If user doesn't exist, create them
        if (loginError.code === 'auth/user-not-found' || loginError.code === 'auth/invalid-credential') {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          user = userCredential.user;
          setStatus('New Auth account created. Setting roles...');
        } else {
          throw loginError;
        }
      }

      if (user) {
        // FORCE the database to set this user as super_admin
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: email,
          displayName: "Super Admin",
          role: "super_admin",
          status: "active",
          permissions: ["all"],
          updatedAt: serverTimestamp()
        }, { merge: true });

        setStatus('SUCCESS! Database updated. Redirecting...');
        setTimeout(() => navigate('/admin'), 2000);
      }
    } catch (e: any) {
      console.error(e);
      setStatus('Critical Error: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-md w-full text-center border border-gray-700">
        <h1 className="text-2xl font-bold mb-4 text-blue-400">Admin Account Fixer</h1>
        <p className="mb-6 text-gray-400 text-sm">
          This will register <strong>md@britiumexpress.com</strong> and force the <strong>super_admin</strong> role in Firestore.
        </p>
        
        <div className={`mb-6 p-4 rounded font-mono text-sm border ${status.includes('Error') ? 'bg-red-900/30 border-red-500 text-red-400' : 'bg-black border-green-500 text-green-400'}`}>
          {status}
        </div>

        <button 
          onClick={createAdmin}
          disabled={loading}
          className={`w-full py-3 font-bold rounded-lg transition-all ${loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg'}`}
        >
          {loading ? 'FIXING...' : 'RUN ADMIN FIXER'}
        </button>
      </div>
    </div>
  );
}