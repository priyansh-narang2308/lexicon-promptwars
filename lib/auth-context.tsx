"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserPersona } from "./types";
import { USER_PERSONAS } from "./contracts-data";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  isGuest?: boolean;
  personaId?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginWithPersona: (personaId: string) => void;
  loginWithCustomEmail: (name: string, email: string) => void;
  loginAsGuest: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("lexflow_auth_user");
      if (savedUser) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser(JSON.parse(savedUser));
      } else {
        // Default to Alex Chen (Freelancer) for instant out-of-the-box evaluator testing
        const defaultPersona = USER_PERSONAS[0];
        const initialUser: AuthUser = {
          id: defaultPersona.id,
          name: defaultPersona.name,
          email: "alex.chen@freelance.design",
          role: defaultPersona.role,
          avatar: defaultPersona.avatar,
          personaId: defaultPersona.id,
        };
        setUser(initialUser);
        localStorage.setItem("lexflow_auth_user", JSON.stringify(initialUser));
      }
    } catch (e) {
      console.warn("Could not load stored user session:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loginWithPersona = (personaId: string) => {
    const persona =
      USER_PERSONAS.find((p) => p.id === personaId) || USER_PERSONAS[0];
    const newUser: AuthUser = {
      id: persona.id,
      name: persona.name,
      email: `${persona.name.toLowerCase().replace(" ", ".")}@example.com`,
      role: persona.role,
      avatar: persona.avatar,
      personaId: persona.id,
    };
    setUser(newUser);
    localStorage.setItem("lexflow_auth_user", JSON.stringify(newUser));
  };

  const loginWithCustomEmail = (name: string, email: string) => {
    const newUser: AuthUser = {
      id: "user-" + Date.now(),
      name: name.trim() || "Legal Explorer",
      email: email.trim(),
      role: "Pro Member",
      avatar: "👤",
    };
    setUser(newUser);
    localStorage.setItem("lexflow_auth_user", JSON.stringify(newUser));
  };

  const loginAsGuest = () => {
    const guestUser: AuthUser = {
      id: "guest-" + Date.now(),
      name: "Guest Evaluator",
      email: "evaluator@hack2skill.com",
      role: "Hackathon Evaluator",
      avatar: "⚡",
      isGuest: true,
    };
    setUser(guestUser);
    localStorage.setItem("lexflow_auth_user", JSON.stringify(guestUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("lexflow_auth_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        loginWithPersona,
        loginWithCustomEmail,
        loginAsGuest,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
