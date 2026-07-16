"use client";

import { useState, useEffect, useRef } from "react";
import { getBrowserClient } from "@/lib/supabase-browser";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = () => getBrowserClient() as any;

type Msg = {
  id: string;
  contenu: string;
  expediteur: "visiteur" | "admin";
  admin_nom: string | null;
  created_at: string;
};

function genUUID() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [visitorId, setVisitorId] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [visitorName, setVisitorName] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [unread, setUnread] = useState(0);
  const [sessionClosed, setSessionClosed] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Init visitor ID + restore session
  useEffect(() => {
    let vid = localStorage.getItem("txb_visitor_id");
    if (!vid) { vid = genUUID(); localStorage.setItem("txb_visitor_id", vid); }
    setVisitorId(vid);

    const savedName = localStorage.getItem("txb_visitor_name") ?? "";
    if (savedName) setVisitorName(savedName);

    const sid = localStorage.getItem("txb_session_id");
    if (!sid) return;

    db().from("chat_sessions")
      .select("id, statut, created_at")
      .eq("id", sid)
      .single()
      .then(({ data: sess }: { data: { id: string; statut: string; created_at: string } | null }) => {
        if (!sess) { localStorage.removeItem("txb_session_id"); return; }
        const age = Date.now() - new Date(sess.created_at).getTime();
        if (age > 24 * 3600 * 1000 || sess.statut === "ferme") {
          localStorage.removeItem("txb_session_id");
          if (sess.statut === "ferme") setSessionClosed(true);
          return;
        }
        setSessionId(sid);
        db().from("chat_messages")
          .select("id, contenu, expediteur, admin_nom, created_at")
          .eq("session_id", sid)
          .order("created_at", { ascending: true })
          .then(({ data: msgs }: { data: Msg[] | null }) => { if (msgs) setMessages(msgs); });
      });
  }, []);

  // Realtime subscription
  useEffect(() => {
    if (!sessionId) return;
    const ch = db().channel(`chat_widget:${sessionId}`)
      .on("postgres_changes", {
        event: "INSERT",
        schema: "public",
        table: "chat_messages",
        filter: `session_id=eq.${sessionId}`,
      }, (payload: { new: Msg }) => {
        const msg = payload.new;
        setMessages((prev) => prev.find(m => m.id === msg.id) ? prev : [...prev, msg]);
        if (msg.expediteur === "admin" && !open) setUnread(c => c + 1);
      })
      .on("postgres_changes", {
        event: "UPDATE",
        schema: "public",
        table: "chat_sessions",
        filter: `id=eq.${sessionId}`,
      }, (payload: { new: { statut: string } }) => {
        if (payload.new.statut === "ferme") setSessionClosed(true);
      })
      .subscribe();
    return () => { db().removeChannel(ch); };
  }, [sessionId, open]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);
  useEffect(() => { if (open) setUnread(0); }, [open]);

  async function send() {
    const text = input.trim();
    if (!text || sending) return;
    setSending(true);

    if (!sessionId) {
      const name = nameInput.trim() || null;
      const { data: sess } = await db()
        .from("chat_sessions")
        .insert({ visitor_id: visitorId, visitor_name: name })
        .select("id").single() as { data: { id: string } | null };
      if (!sess) { setSending(false); return; }
      localStorage.setItem("txb_session_id", sess.id);
      if (name) { setVisitorName(name); localStorage.setItem("txb_visitor_name", name); }
      setSessionId(sess.id);
      await db().from("chat_messages").insert({ session_id: sess.id, contenu: text, expediteur: "visiteur" });
    } else {
      await db().from("chat_messages").insert({ session_id: sessionId, contenu: text, expediteur: "visiteur" });
      await db().from("chat_sessions").update({ last_message_at: new Date().toISOString() }).eq("id", sessionId);
    }

    setInput("");
    setSending(false);
  }

  function newConversation() {
    localStorage.removeItem("txb_session_id");
    setSessionId(null);
    setMessages([]);
    setSessionClosed(false);
    setInput("");
    setNameInput("");
  }

  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>

      {/* Panel */}
      {open && (
        <div style={{
          width: 340, height: 480, background: "white", borderRadius: 18,
          boxShadow: "0 12px 48px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.08)",
          display: "flex", flexDirection: "column", overflow: "hidden",
          border: "1px solid rgba(0,0,0,0.06)",
        }}>
          {/* Header */}
          <div style={{ background: "#0D1525", padding: "14px 16px", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: "#FFB800", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0D1525" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
                <div>
                  <p style={{ margin: 0, fontWeight: 800, fontSize: "0.88rem", color: "white", lineHeight: 1.2 }}>TaxiBe</p>
                  <p style={{ margin: 0, fontSize: "0.66rem", color: "rgba(255,255,255,0.45)" }}>
                    {sessionId && !sessionClosed ? "● En ligne" : "Support client"}
                  </p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.45)", fontSize: "1.1rem", padding: 6, lineHeight: 1, borderRadius: 6 }}>✕</button>
            </div>
          </div>

          {/* Body */}
          {sessionClosed ? (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, gap: 14, textAlign: "center" }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <p style={{ margin: 0, fontWeight: 700, fontSize: "0.9rem", color: "#0D1525" }}>Conversation terminée</p>
              <p style={{ margin: 0, fontSize: "0.8rem", color: "#94A3B8", lineHeight: 1.5 }}>Cette session a été fermée par l&apos;équipe TaxiBe.</p>
              <button onClick={newConversation} style={{ background: "#FFB800", border: "none", borderRadius: 8, padding: "9px 18px", fontWeight: 800, fontSize: "0.82rem", color: "#0D1525", cursor: "pointer", fontFamily: "inherit" }}>
                Nouvelle conversation
              </button>
            </div>
          ) : !sessionId ? (
            // Welcome
            <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "18px 16px 0", gap: 12, overflowY: "auto" }}>
              <div style={{ background: "#F8F9FB", borderRadius: 12, padding: "12px 14px" }}>
                <p style={{ margin: 0, fontSize: "0.86rem", color: "#0D1525", lineHeight: 1.65, fontWeight: 500 }}>
                  👋 Bonjour ! Posez-nous votre question, un conseiller TaxiBe vous répondra dès que possible.
                </p>
              </div>
              <input
                type="text"
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                placeholder="Votre nom (optionnel)"
                style={{ padding: "9px 12px", borderRadius: 8, border: "1.5px solid #E2E8F0", fontSize: "0.84rem", fontFamily: "inherit", color: "#0D1525", outline: "none" }}
              />
              <p style={{ margin: 0, fontSize: "0.7rem", color: "#94A3B8", textAlign: "center" }}>
                Réponse généralement sous quelques minutes
              </p>
            </div>
          ) : (
            // Messages
            <div style={{ flex: 1, overflowY: "auto", padding: "12px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
              {visitorName && (
                <p style={{ margin: "0 0 4px", fontSize: "0.7rem", color: "#94A3B8", textAlign: "center" }}>
                  Conversation de {visitorName}
                </p>
              )}
              {messages.map((msg) => (
                <div key={msg.id} style={{ display: "flex", flexDirection: "column", alignItems: msg.expediteur === "visiteur" ? "flex-end" : "flex-start", gap: 2 }}>
                  {msg.expediteur === "admin" && (
                    <span style={{ fontSize: "0.62rem", color: "#94A3B8", marginLeft: 4, fontWeight: 600 }}>
                      {msg.admin_nom ?? "Équipe TaxiBe"}
                    </span>
                  )}
                  <div style={{
                    maxWidth: "82%", padding: "8px 12px",
                    borderRadius: msg.expediteur === "visiteur" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                    background: msg.expediteur === "visiteur" ? "#FFB800" : "#0D1525",
                    color: msg.expediteur === "visiteur" ? "#0D1525" : "white",
                    fontSize: "0.84rem", lineHeight: 1.55, fontWeight: 500, wordBreak: "break-word",
                  }}>
                    {msg.contenu}
                  </div>
                </div>
              ))}
              {messages.length === 0 && (
                <p style={{ margin: "auto", fontSize: "0.78rem", color: "#94A3B8", textAlign: "center" }}>
                  Votre message a été envoyé.<br/>Un conseiller va vous répondre.
                </p>
              )}
              <div ref={bottomRef} />
            </div>
          )}

          {/* Input */}
          {!sessionClosed && (
            <div style={{ padding: "10px 12px", borderTop: "1px solid #F1F5F9", display: "flex", gap: 8, flexShrink: 0, background: "white" }}>
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                placeholder="Votre message…"
                style={{ flex: 1, padding: "9px 12px", borderRadius: 8, border: "1.5px solid #E2E8F0", fontSize: "0.84rem", fontFamily: "inherit", color: "#0D1525", outline: "none", boxSizing: "border-box" }}
              />
              <button
                onClick={send}
                disabled={!input.trim() || sending}
                style={{
                  width: 38, height: 38, borderRadius: 8, border: "none", flexShrink: 0,
                  background: input.trim() ? "#FFB800" : "#F1F5F9", cursor: input.trim() ? "pointer" : "default",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background 0.15s",
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={input.trim() ? "#0D1525" : "#CBD5E0"} strokeWidth="2.5" strokeLinecap="round">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
          )}

          <div style={{ padding: "6px 0", textAlign: "center", background: "white" }}>
            <span style={{ fontSize: "0.58rem", color: "#CBD5E0", fontWeight: 500 }}>Propulsé par TaxiBe</span>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: 54, height: 54, borderRadius: "50%",
          background: open ? "#0D1525" : "#FFB800",
          border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: open ? "0 4px 16px rgba(13,21,37,0.35)" : "0 4px 20px rgba(255,184,0,0.45)",
          transition: "background 0.2s, box-shadow 0.2s",
          position: "relative",
          flexShrink: 0,
        }}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0D1525" strokeWidth="2.2" strokeLinecap="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        )}
        {!open && unread > 0 && (
          <span style={{
            position: "absolute", top: -3, right: -3,
            background: "#ef4444", color: "white",
            fontSize: "0.6rem", fontWeight: 800,
            minWidth: 17, height: 17, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "2px solid white", padding: "0 3px",
          }}>{unread}</span>
        )}
      </button>
    </div>
  );
}
