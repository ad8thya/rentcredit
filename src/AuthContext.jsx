import React, { createContext, useContext, useEffect, useState } from 'react';
// import { auth, db } from './firebase';
// import { signInWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth';
// import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // DEMO MODE: Hardcoded user and role
  const [user, setUser] = useState({ email: 'demo@rentcredit.com' });
  const [role, setRole] = useState('tenant');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
  //     console.log('onAuthStateChanged firebaseUser:', firebaseUser);
  //     if (firebaseUser) {
  //       setUser(firebaseUser);
  //       // Fetch user role from Firestore
  //       const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
  //       setRole(userDoc.exists() ? userDoc.data().role : null);
  //       console.log('AuthContext user set:', firebaseUser);
  //     } else {
  //       setUser(null);
  //       setRole(null);
  //       console.log('AuthContext user set to null');
  //     }
  //     setLoading(false);
  //   });
  //   return unsubscribe;
  // }, []);

  // const signIn = async (email, password) => {
  //   setError(null);
  //   try {
  //     const result = await signInWithEmailAndPassword(auth, email, password);
  //     console.log('signIn result.user:', result.user);
  //     // Role will be set by onAuthStateChanged
  //     return result.user;
  //   } catch (err) {
  //     setError(err.message);
  //     throw err;
  //   }
  // };

  // const signOutUser = async () => {
  //   await firebaseSignOut(auth);
  //   setUser(null);
  //   setRole(null);
  // };

  // Provide mock signIn/signOut for demo
  const signIn = async () => setUser({ email: 'demo@rentcredit.com' });
  const signOut = async () => setUser(null);

  const value = { user, role, loading, error, signIn, signOut, setUser, setRole };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
} 