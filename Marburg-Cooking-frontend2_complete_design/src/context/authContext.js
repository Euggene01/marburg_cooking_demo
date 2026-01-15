// src/context/authContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const isAuthenticated = Boolean(token);
  const [username, setUsername] = useState(() => localStorage.getItem("username"));
const [email, setEmail] = useState(() => localStorage.getItem("email"));

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "token" || e.key === "lastAuthChange") {
        setToken(localStorage.getItem("token"));
        setUsername(localStorage.getItem("username"));
        setEmail(localStorage.getItem("email"));
      }
    };
    
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

const login = (data) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("username", data.username);
  localStorage.setItem("email", data.email);
  localStorage.setItem("lastAuthChange", Date.now().toString());
  
  // console.log("email",data.token)
  setToken(data.token);
  setUsername(data.username);
  setEmail(data.email);

  window.dispatchEvent(new Event("authChanged"));
};

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    localStorage.setItem("lastAuthChange", Date.now().toString());
    setToken(null);
    setUsername(null);
        setEmail(null);
    // dispatch to update same-tab listeners
    window.dispatchEvent(new Event("authChanged"));
  };

  // return without JSX so file stays valid as .js
  return React.createElement(
    AuthContext.Provider,
    { value: { token, username, email, isAuthenticated, login, logout } },
    children
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
