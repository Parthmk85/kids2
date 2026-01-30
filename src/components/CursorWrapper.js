"use client";

import { usePortal } from "@/context/PortalContext";
import TargetCursor from "./TargetCursor";

export default function CursorWrapper() {
  const { portal } = usePortal();

  // Don't show custom cursor in Junior portal (Book)
  if (portal === "junior") {
    return null;
  }

  return (
    <TargetCursor 
      spinDuration={2}
      hideDefaultCursor
      parallaxOn
      hoverDuration={0.2}
    />
  );
}
