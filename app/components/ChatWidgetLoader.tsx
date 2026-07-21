"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ChatWidget = dynamic(() => import("./ChatWidget"), { ssr: false });

export default function ChatWidgetLoader() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Charge le widget (et sa connexion Supabase Realtime) une fois la page
    // principale rendue, pour ne pas ralentir le premier affichage.
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setReady(true));
      return () => (window as unknown as { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback?.(id);
    }
    const t = setTimeout(() => setReady(true), 2000);
    return () => clearTimeout(t);
  }, []);

  if (!ready) return null;
  return <ChatWidget />;
}
