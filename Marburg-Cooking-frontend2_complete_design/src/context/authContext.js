// src/context/authContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // ============ ДОБАВЬТЕ ЭТО В НАЧАЛЕ КОМПОНЕНТА ============
  // Автологин при загрузке на Vercel
  useEffect(() => {
    if (window.location.hostname.includes('vercel.app')) {
      // Проверяем, не установили ли уже демо-режим
      if (!localStorage.getItem('demo_setup')) {
        console.log('🚀 VERCEL DEMO MODE: Setting up auto-login');
        
        // Устанавливаем демо-данные
        localStorage.setItem("token", "demo_token_" + Date.now());
        localStorage.setItem("username", "demo_user");
        localStorage.setItem("email", "demo@marburgcooking.com");
        localStorage.setItem("demo_setup", "true");
        localStorage.setItem("lastAuthChange", Date.now().toString());
        
        // Добавляем баннер
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
        banner.innerHTML = '🚀 ДЕМО-РЕЖИМ | Автоматически залогинен как <strong>Demo User</strong>';
        document.body.appendChild(banner);
        
        // Обновляем состояние компонента
        setToken(localStorage.getItem("token"));
        setUsername(localStorage.getItem("username"));
        setEmail(localStorage.getItem("email"));
        
        // Обновляем title страницы
        document.title = `[DEMO] ${document.title}`;
        
        // Триггерим событие для обновления других вкладок
        window.dispatchEvent(new Event("authChanged"));
      }
    }
  }, []);
  // ============ КОНЕЦ ДОБАВЛЕНИЯ ============

  const [token, setToken] = useState(() => {
    // Инициализация с учетом демо-режима
    if (window.location.hostname.includes('vercel.app')) {
      return localStorage.getItem("token") || "demo_token";
    }
    return localStorage.getItem("token");
  });

  const isAuthenticated = Boolean(token);
  
  const [username, setUsername] = useState(() => {
    if (window.location.hostname.includes('vercel.app')) {
      return localStorage.getItem("username") || "demo_user";
    }
    return localStorage.getItem("username");
  });
  
  const [email, setEmail] = useState(() => {
    if (window.location.hostname.includes('vercel.app')) {
      return localStorage.getItem("email") || "demo@marburgcooking.com";
    }
    return localStorage.getItem("email");
  });

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
    // На Vercel не даем разлогиниться в демо-режиме
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
      alert("В демо-режиме выход из системы отключен. Для тестирования используйте локальный сервер.");
    }
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
