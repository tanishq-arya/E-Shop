import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { auth } from "../library/firebase";

const AuthContext = React.createContext();

export function useAuth()
{
  return useContext(AuthContext);
}

// function that uses auth to connect to firebase
export default function AuthProvider({ children }){
  
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    // console.log(email + " " + password);
    return auth.createUserWithEmailAndPassword(email, password);
  }
  
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return auth.currentUser.updateEmail(email);
  }
  function updatePassword(password) {
    return auth.currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
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
    updateEmail,
    updatePassword 
  }

  return (
    <AuthContext.Provider value={value}>
      { !loading && children }
    </AuthContext.Provider>
  )
}


