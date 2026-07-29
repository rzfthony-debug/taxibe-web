"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackPageView } from "@/app/actions";

export default function TrackPageView() {
  const pathname = usePathname();
  const last = useRef<string | null>(null);

  useEffect(() => {
    if (pathname === last.current) return;
    if (pathname.startsWith("/gestion")) return;
    last.current = pathname;
    trackPageView(pathname).catch(() => {});
  }, [pathname]);

  return null;
}
