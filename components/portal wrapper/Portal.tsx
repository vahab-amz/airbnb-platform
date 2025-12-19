"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

export function Portal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);
  if (!mounted) return null;

  return createPortal(children, document.body);
}
