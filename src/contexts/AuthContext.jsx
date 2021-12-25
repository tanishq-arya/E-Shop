import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { auth } from "../library/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updateEmail, updatePassword, onAuthStateChanged } from '@firebase/auth';
const AuthContext = React.createContext();

export function useAuth()
{
  return useContext(AuthContext);
}

// function that uses auth to connect to firebase
export default function AuthProvider({ children }){
  // const auth = getAuth();
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    // console.log(email + " " + password);
    return createUserWithEmailAndPassword(auth, email, password);
  }
  
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function updateEmailFunction(email) {
    return updateEmail(auth.currentUser, email);
  }
  function updatePasswordFunction(password) {
    return updatePassword(auth.currentUser, password);
  }

  function getUserID() {
    return auth.currentUser.uid;
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    
    return unsubscribe;
  }, []);

  // making the states and functions available to other components.
  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmailFunction,
    updatePasswordFunction,
    getUserID
  }

  return (
    <AuthContext.Provider value={value}>
      { !loading && children }
    </AuthContext.Provider>
  )
}


