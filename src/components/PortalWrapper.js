"use client";

import React from "react";
import { usePortal } from "../context/PortalContext";
import Book from "./junior/Book";

export default function PortalWrapper({ children }) {
  const { portal } = usePortal();

  if (!portal) return null;

  if (portal === "junior") {
    return <Book />;
  }

  return <main className="w-full min-h-screen">{children}</main>;
}
