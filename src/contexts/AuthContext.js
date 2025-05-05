"use client";

import { createContext, useContext } from "react";

// Create the context
const AuthContext = createContext();

// AuthProvider component to wrap pages or components
export function AuthProvider({ isGuest, username, email, children }) {
  return (
    <AuthContext.Provider value={{ isGuest, username, email }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to access the context
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
