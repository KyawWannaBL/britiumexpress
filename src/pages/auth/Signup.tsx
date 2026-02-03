import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../../firebaseConfig';
import { useNavigate, Link } from 'react-router-dom';

// Using the hosted images provided
const LOGO_URL = "https://img.sanishtech.com/u/b9beae3ecc1df0244610c786c48992ab.png";
const COVER_URL = "https://img.sanishtech.com/u/4774210f087879ff509300bbb082cc86.jpg";

// Define the documents required for each role
const ROLE_REQUIREMENTS: Record<string, string[]> = {
  rider: ['Driving License (Front)', 'Driving License (Back)', 'NRC / ID Card'],
  driver: ['Driving License (Heavy)', 'Vehicle Registration', 'NRC / ID Card'],
  merchant: ['Business License', 'Shop Photo', 'Tax ID'],
  sub_station: ['Manager ID', 'Branch Permit'],
  warehouse: ['NRC / ID Card', 'Recommendation Letter'],
  supervisor: ['NRC / ID Card', 'Staff ID'],
  customer: ['NRC / ID Card']
};

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
    role: 'customer', 
    branchId: '',
  });

  // File State
  const [files, setFiles] = useState<Record<string, File | null>>({});

  const handleFileChange = (docName: string, file: File | null) => {
    if (file && file.size > 5 * 1024 * 1024) {
      alert("File too large! Max 5MB.");
      return;
    }
    setFiles(prev => ({ ...prev, [docName]: file }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      const documentUrls: Record<string, string> = {};
      const requiredDocs = ROLE_REQUIREMENTS[formData.role] || [];

      for (const docName of requiredDocs) {
        const file = files[docName];
        if (file) {
          const storageRef = ref(storage, `uploads/${user.uid}/${docName}_${Date.now()}`);
          const snapshot = await uploadBytes(storageRef, file);
          const url = await getDownloadURL(snapshot.ref);
          documentUrls[docName] = url;
        }
      }

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: formData.email,
        displayName: formData.fullName,
        phone: formData.phone,
        role: formData.role,
        branchId: formData.branchId || null,
        status: 'pending',
        documents: documentUrls,
        createdAt: serverTimestamp(),
        authorityLevel: 1
      });

      await updateProfile(user, { displayName: formData.fullName });
      navigate('/pending-approval');

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const requiredDocs = ROLE_REQUIREMENTS[formData.role] || [];

  return (
    <div className="min-h-screen flex w-full bg-white">
      
      {/* LEFT SIDE - Consistent visual theme with Login */}
      <div className="hidden lg:flex w-5/12 relative overflow-hidden bg-gray-900 sticky top-0 h-screen">
         <div className="absolute inset-0 bg-blue-900/60 z-10 mix-blend-multiply"></div>
         <img 
          src={COVER_URL} 
          alt="Background" 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-white p-8 text-center">
            <div className="w-32 mb-8 transition-transform hover:scale-110 duration-500 drop-shadow-2xl">
               <img src={LOGO_URL} alt="Logo" className="w-full h-auto" />
            </div>
            <h2 className="text-4xl font-bold mb-4">Join the Fleet</h2>
            <p className="opacity-90 text-lg max-w-md mx-auto leading-relaxed">
                Become part of the most reliable logistics network in the country. Secure. Efficient. Rewarding.
            </p>
        </div>
      </div>

      {/* RIGHT SIDE - Scrollable Registration Form */}
      <div className="flex-1 flex flex-col items-center p-4 lg:p-12 overflow-y-auto bg-gray-50/50">
        <div className="w-full max-w-2xl bg-white p-8 lg:p-10 rounded-3xl shadow-xl border border-gray-100">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Create Account</h1>
                <p className="text-gray-500 mt-2">Enter your details below to start your application</p>
            </div>

            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg flex items-center">
                    <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                    <span className="text-red-700 text-sm font-medium">{error}</span>
                </div>
            )}

            <form onSubmit={handleRegister} className="space-y-8">
            
            {/* Role Selection */}
            <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                <label className="block text-sm font-bold text-[#0D47A1] mb-2 uppercase tracking-wide">I am registering as a:</label>
                <div className="relative">
                    <select 
                    value={formData.role}
                    onChange={(e) => { setFormData({...formData, role: e.target.value}); setFiles({}); }}
                    className="w-full p-4 pl-4 pr-10 border-none bg-white rounded-xl shadow-sm focus:ring-2 focus:ring-[#0D47A1] text-lg font-medium text-gray-800 appearance-none cursor-pointer"
                    >
                    <option value="customer">Customer (Sender/Receiver)</option>
                    <option value="rider">Rider (Bike Delivery)</option>
                    <option value="driver">Driver (Truck/Van)</option>
                    <option value="merchant">Merchant (Business Partner)</option>
                    <option value="sub_station">Sub-station Manager</option>
                    <option value="warehouse">Warehouse Staff</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                        <svg className="w-5 h-5 text-[#0D47A1]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative group">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 group-focus-within:text-[#0D47A1]">Full Name</label>
                    <input type="text" required 
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0D47A1] focus:border-transparent transition-all outline-none"
                        placeholder="e.g. Kyaw Kyaw"
                        value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
                </div>
                <div className="relative group">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 group-focus-within:text-[#0D47A1]">Phone Number</label>
                    <input type="tel" required 
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0D47A1] focus:border-transparent transition-all outline-none"
                        placeholder="+959..."
                        value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
                <div className="relative group">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 group-focus-within:text-[#0D47A1]">Email</label>
                    <input type="email" required 
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0D47A1] focus:border-transparent transition-all outline-none"
                        placeholder="you@example.com"
                        value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="relative group">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 group-focus-within:text-[#0D47A1]">Password</label>
                    <input type="password" required 
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0D47A1] focus:border-transparent transition-all outline-none"
                        placeholder="••••••••"
                        value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                </div>
            </div>

            {/* Dynamic Document Upload Section */}
            {requiredDocs.length > 0 && (
                <div className="mt-10 pt-8 border-t border-gray-100">
                <div className="flex items-start mb-6">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Identity Verification</h3>
                        <p className="text-sm text-gray-500 leading-relaxed">To comply with security regulations, please upload clear photos of the required documents for your selected role. These will be reviewed by an administrator.</p>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 gap-5 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    {requiredDocs.map((docName) => (
                    <div key={docName} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:border-[#0D47A1] transition-colors group">
                        <label className="text-sm font-bold text-gray-700 mb-3 block group-hover:text-[#0D47A1] transition-colors">
                        {docName} <span className="text-red-500">*</span>
                        </label>
                        <input 
                        type="file" 
                        required
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileChange(docName, e.target.files?.[0] || null)}
                        className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2.5 file:px-5
                            file:rounded-full file:border-0
                            file:text-xs file:font-bold
                            file:uppercase file:tracking-wide
                            file:bg-[#0D47A1] file:text-white
                            hover:file:bg-blue-800 cursor-pointer"
                        />
                    </div>
                    ))}
                </div>
                </div>
            )}

            <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#0D47A1] to-[#1565C0] text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:to-[#0D47A1] transition-all disabled:opacity-70 transform hover:-translate-y-0.5"
            >
                {loading ? 'Processing Registration...' : 'Submit Registration'}
            </button>
            
            <div className="text-center pt-2 pb-6">
                <Link to="/login" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-[#0D47A1] transition-colors">
                    Already have an account? <span className="font-bold ml-1 underline decoration-2 underline-offset-2">Log In</span>
                </Link>
            </div>
            </form>
        </div>
      </div>
    </div>
  );
}