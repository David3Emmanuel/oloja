"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface VirtualAccount {
  virtual_account_number: string;
  bank: string;
  account_name: string;
}

export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  skills: string[];
  languages: string[];
  location: string;
  experience: string;
  virtualAccount: VirtualAccount;
  trustScore: number;
  createdAt: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
