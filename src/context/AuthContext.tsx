"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type AuthContextType = {
  accessToken: string | null;
  login: (
    access: string,
  ) => void;
  logout: () => void;
  loading: boolean; // 🆕 loading state
};

const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  login: () => {},
  logout: () => {},
  loading : true, // 🆕 loading state
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // 🆕 loading state


  useEffect(() => {
    const access = localStorage.getItem("accessToken");

    if (access) {
      setAccessToken(access);
    }
    setLoading(false);
  }, []);

  const login = (
    access: string,
  ) => {
    setAccessToken(access);
    localStorage.setItem("accessToken", access);
  };

  const logout = () => {
    localStorage.clear();
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};