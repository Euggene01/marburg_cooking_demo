// src/context/authContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // ============ ИСПРАВЛЕННАЯ ИНИЦИАЛИЗАЦИЯ ============
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem("token");
    // Если на Vercel и нет токена - устанавливаем демо-токен
    if (window.location.hostname.includes('vercel.app') && !storedToken) {
      const demoToken = "demo_token_" + Date.now();
      localStorage.setItem("token", demoToken);
      localStorage.setItem("username", "demo_user");
      localStorage.setItem("email", "demo@marburgcooking.com");
      localStorage.setItem("demo_setup", "true");
      return demoToken;
    }
    return storedToken;
  });

  const [username, setUsername] = useState(() => {
    const storedUser = localStorage.getItem("username");
    if (window.location.hostname.includes('vercel.app') && !storedUser) {
      return "demo_user";
    }
    return storedUser;
  });

  const [email, setEmail] = useState(() => {
    const storedEmail = localStorage.getItem("email");
    if (window.location.hostname.includes('vercel.app') && !storedEmail) {
      return "demo@marburgcooking.com";
    }
    return storedEmail;
  });

  const isAuthenticated = Boolean(token);
  // ============ КОНЕЦ ИСПРАВЛЕНИЯ ============

  // ============ ДОБАВЬТЕ ЭТОТ ЭФФЕКТ ============
  useEffect(() => {
    // Автологин при загрузке на Vercel
    if (window.location.hostname.includes('vercel.app')) {
      console.log('🔐 VERCEL DEMO: Checking auth state...');
      
      // Принудительно устанавливаем если чего-то нет
      if (!localStorage.getItem("token")) {
        console.log('🔐 Setting demo token...');
        const demoToken = "demo_token_" + Date.now();
        
        localStorage.setItem("token", demoToken);
        localStorage.setItem("username", "demo_user");
        localStorage.setItem("email", "demo@marburgcooking.com");
        localStorage.setItem("demo_setup", "true");
        localStorage.setItem("lastAuthChange", Date.now().toString());
        
        // ОБНОВЛЯЕМ СОСТОЯНИЕ!
        setToken(demoToken);
        setUsername("demo_user");
        setEmail("demo@marburgcooking.com");
        
        window.dispatchEvent(new Event("authChanged"));
      }
      
      // Добавляем баннер
      if (!document.getElementById('demo-banner')) {
        const banner = document.createElement('div');
        banner.id = 'demo-banner';
        banner.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: linear-gradient(90deg, #FF9800, #FF5722);
          color: white;
          text-align: center;
          padding: 8px;
          font-size: 14px;
          font-weight: bold;
          z-index: 9999;
          box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        `;
        banner.innerHTML = '🚀 ДЕМО-РЕЖИМ | Автоматически залогинен';
        document.body.appendChild(banner);
      }
      
      console.log('🔐 Current auth state:', {
        token: localStorage.getItem("token"),
        username: localStorage.getItem("username"),
        isAuthenticated: !!localStorage.getItem("token")
      });
    }
  }, []); // Пустой массив зависимостей - выполняется один раз
  // ============ КОНЕЦ ЭФФЕКТА ============

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
    
    setToken(data.token);
    setUsername(data.username);
    setEmail(data.email);

    window.dispatchEvent(new Event("authChanged"));
  };

  const logout = () => {
    // На Vercel не даем разлогиниться
    if (!window.location.hostname.includes('vercel.app')) {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("username");
      localStorage.setItem("lastAuthChange", Date.now().toString());
      setToken(null);
      setUsername(null);
      setEmail(null);
      window.dispatchEvent(new Event("authChanged"));
    } else {
      alert("В демо-режиме выход отключен");
    }
  };

  // Для отладки
  console.log('🔄 AuthProvider render:', { token, isAuthenticated, username });

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
