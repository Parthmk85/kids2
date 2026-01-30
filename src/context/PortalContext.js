"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export const PortalContext = createContext();

export const PortalProvider = ({ children }) => {
  const [portal, setPortal] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.includes("junior")) {
      setPortal("junior");
    } else if (pathname?.includes("senior")) {
      setPortal("senior");
    } else {
      setPortal(null);
    }
  }, [pathname]);

  useEffect(() => {
    document.body.classList.remove("portal-junior", "portal-senior", "portal-active");

    if (portal) {
      document.body.classList.add(`portal-${portal}`, "portal-active");
    }
  }, [portal]);

  const selectPortal = (type) => {
    setPortal(type);
  };

  const resetPortal = () => {
    setPortal(null);
  };

  return (
    <PortalContext.Provider value={{ portal, selectPortal, resetPortal }}>
      <div className="portal-content-wrapper">
        {children}
      </div>
    </PortalContext.Provider>
  );
};

export const usePortal = () => {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error("usePortal must be used within a PortalProvider");
  }
  return context;
};
