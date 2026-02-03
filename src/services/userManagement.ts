// src/services/userManagement.ts
import { 
  collection, doc, setDoc, getDoc, updateDoc, 
  query, where, getDocs, serverTimestamp 
} from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

// FIX: Import from the correct config file you created
import { auth, db } from '../firebaseconfig'; 
import { UserRole, UserProfile } from '../types/user';

export class UserManagementService {
  async createUser(userData: {
    email: string;
    password: string;
    displayName: string;
    role: UserRole;
    branchId?: string;
    permissions: string[];
  }): Promise<string> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
      const user = userCredential.user;
      
      await updateProfile(user, { displayName: userData.displayName });

      const userProfile: UserProfile = {
        uid: user.uid,
        email: userData.email,
        displayName: userData.displayName,
        role: userData.role,
        status: 'active',
        branchId: userData.branchId,
        permissions: userData.permissions,
        createdAt: new Date(),
        metadata: {}
      };

      await setDoc(doc(db, 'users', user.uid), {
        ...userProfile,
        createdAt: serverTimestamp()
      });

      return user.uid;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async getUsersByRole(role: UserRole): Promise<UserProfile[]> {
    try {
      const q = query(collection(db, 'users'), where('role', '==', role));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => doc.data() as UserProfile);
    } catch (error) {
      console.error('Error getting users by role:', error);
      return [];
    }
  }

  async updateUserStatus(uid: string, status: 'active' | 'inactive' | 'suspended'): Promise<void> {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, { status, updatedAt: serverTimestamp() });
  }
}