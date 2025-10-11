/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { flushSync } from "react-dom";
import { router } from "@/router";
import { AuthContext } from "./AuthContext";
// import { Spin } from "antd";
import Loader from "@/components/layout/Loader";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // Restore auth state on app load
  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      // Validate token with your API
      fetch("https://dummyjson.com/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((userData) => {
          if (userData) {
            setUser(userData);
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem("auth-token");
          }
        })
        .catch(() => {
          localStorage.removeItem("auth-token");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  const login = async (username, password) => {
    // Replace with your authentication logic
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const userData = await response.json();

      flushSync(() => {
        setUser(userData);
        setIsAuthenticated(true);
      });
      router.invalidate();
      // Store token for persistence
      localStorage.setItem("auth-token", userData.accessToken);
    } else {
      console.log(`Error: ${response.statusText}`);
      throw new Error("Authentication failed");
    }
  };

  const logout = () => {
    flushSync(() => {
      setUser(null);
      setIsAuthenticated(false);
    });
    router.invalidate();
    localStorage.removeItem("auth-token");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
