import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { ref, onValue } from 'firebase/database';

const AuthContext = createContext();

export function AuthProvider({ content }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        setUser(null);
        setRole(null);
        setLoading(false);
        return;
      }

      // Check role in Firebase Realtime DB
      const roleRef = ref(db, `staffRoles/${u.uid}`);
      onValue(roleRef, (snap) => {
        const data = snap.val();
        if (data?.role === 'admin' || u.email === 'hausoflarenegade@gmail.com') {
          setRole('admin');
        } else if (data?.role === 'employee') {
          setRole('employee');
        } else {
          // First login → auto make employee
          setRole('employee');
        }
        setUser(u);
        setLoading(false);
      });
    });

    return () => unsubscribeAuth();
  }, []);

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, role, login, signup, logout, loading }}>
      {!loading && content}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
