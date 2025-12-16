"use client";
import { useIsMobile } from "../_hooks/useIsMobile";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

export default function HeaderWrapper() {
  const isMobile = useIsMobile();
  if (isMobile === null) return null;
  return isMobile ? <MobileHeader /> : <DesktopHeader />;
}
