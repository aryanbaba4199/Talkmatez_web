"use client";

import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <AppContext.Provider value={{ showMenu, setShowMenu, user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

// ✅ Custom Hook for accessing context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
