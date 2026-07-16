"use client";

import { useState, useEffect, useRef } from "react";
import { getBrowserClient } from "@/lib/supabase-browser";
import { sendAdminMessage, closeChatSession } from "@/app/gestion/actions";

type Session = {
  id: string;
  visitor_name: string | null;
  statut: string;
  created_at: string;
  last_message_at: string;
  unread: number;
};

type Msg = {
  id: string;
  contenu: string;
  expediteur: "visiteur" | "admin";
  admin_nom: string | null;
  created_at: string;
};

function timeAgo(iso: string) {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return "maintenant";
  if (diff < 3600) return `il y a ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `il y a ${Math.floor(diff / 3600)} h`;
  return `il y a ${Math.floor(diff / 86400)} j`;
}

export default function ChatAdmin({ initialSessions, adminNom }: { initialSessions: Session[]; adminNom: string }) {
  const [sessions, setSessions] = useState<Session[]>(initialSessions);
  const [selected, setSelected] = useState<string | null>(initialSessions[0]?.id ?? null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Load messages for selected session
  useEffect(() => {
    if (!selected) return;
    const db = getBrowserClient();
    db.from("chat_messages")
      .select("id, contenu, expediteur, admin_nom, created_at")
      .eq("session_id", selected)
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (data) setMessages(data);
        // Mark as read
        db.from("chat_messages").update({ lu: true }).eq("session_id", selected).eq("expediteur", "visiteur").eq("lu", false);
        setSessions(prev => prev.map(s => s.id === selected ? { ...s, unread: 0 } : s));
      });
  }, [selected]);

  // Realtime: new messages
  useEffect(() => {
    const db = getBrowserClient();
    const ch = db.channel("admin_chat_messages")
      .on("postgres_changes", {
        event: "INSERT", schema: "public", table: "chat_messages",
      }, (payload) => {
        const msg = payload.new as Msg & { session_id: string };
        if (msg.session_id === selected) {
          setMessages(prev => prev.find(m => m.id === msg.id) ? prev : [...prev, msg]);
          // Mark read immediately
          db.from("chat_messages").update({ lu: true }).eq("id", msg.id);
        } else if (msg.expediteur === "visiteur") {
          setSessions(prev => prev.map(s => s.id === msg.session_id ? { ...s, unread: s.unread + 1, last_message_at: msg.created_at } : s));
        }
      })
      .subscribe();
    return () => { db.removeChannel(ch); };
  }, [selected]);

  // Realtime: new sessions
  useEffect(() => {
    const db = getBrowserClient();
    const ch = db.channel("admin_chat_sessions")
      .on("postgres_changes", {
        event: "INSERT", schema: "public", table: "chat_sessions",
      }, (payload) => {
        const s = payload.new as Session;
        setSessions(prev => [{ ...s, unread: 0 }, ...prev]);
      })
      .on("postgres_changes", {
        event: "UPDATE", schema: "public", table: "chat_sessions",
      }, (payload) => {
        const s = payload.new as Session;
        setSessions(prev => prev.map(p => p.id === s.id ? { ...p, statut: s.statut } : p));
      })
      .subscribe();
    return () => { db.removeChannel(ch); };
  }, []);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  async function handleSend() {
    const text = reply.trim();
    if (!text || !selected || sending) return;
    setSending(true);
    const fd = new FormData();
    fd.append("session_id", selected);
    fd.append("contenu", text);
    fd.append("admin_nom", adminNom);
    await sendAdminMessage(fd);
    setReply("");
    setSending(false);
  }

  async function handleClose() {
    if (!selected) return;
    const fd = new FormData();
    fd.append("session_id", selected);
    await closeChatSession(fd);
    setSessions(prev => prev.map(s => s.id === selected ? { ...s, statut: "ferme" } : s));
  }

  const activeSession = sessions.find(s => s.id === selected);
  const activeSessions = sessions.filter(s => s.statut === "actif");
  const closedSessions = sessions.filter(s => s.statut === "ferme");

  return (
    <div style={{ display: "flex", height: "calc(100vh - 96px)", background: "white", borderRadius: 16, border: "1px solid #E2E8F0", overflow: "hidden" }}>

      {/* Sessions list */}
      <div style={{ width: 280, flexShrink: 0, borderRight: "1px solid #E8ECF0", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "14px 16px", borderBottom: "1px solid #E8ECF0" }}>
          <p style={{ margin: 0, fontWeight: 800, fontSize: "0.82rem", color: "#0D1525" }}>Conversations</p>
          <p style={{ margin: "3px 0 0", fontSize: "0.7rem", color: "#94A3B8" }}>
            {activeSessions.length} active{activeSessions.length > 1 ? "s" : ""}
          </p>
        </div>

        <div style={{ flex: 1, overflowY: "auto" }}>
          {sessions.length === 0 && (
            <div style={{ padding: 24, textAlign: "center" }}>
              <p style={{ fontSize: "0.8rem", color: "#94A3B8", margin: 0 }}>Aucune conversation</p>
            </div>
          )}

          {activeSessions.length > 0 && (
            <div>
              <p style={{ margin: "10px 14px 4px", fontSize: "0.58rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#94A3B8" }}>En cours</p>
              {activeSessions.map(s => (
                <SessionRow key={s.id} s={s} selected={selected === s.id} onClick={() => setSelected(s.id)} />
              ))}
            </div>
          )}

          {closedSessions.length > 0 && (
            <div>
              <p style={{ margin: "10px 14px 4px", fontSize: "0.58rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#CBD5E0" }}>Fermées</p>
              {closedSessions.map(s => (
                <SessionRow key={s.id} s={s} selected={selected === s.id} onClick={() => setSelected(s.id)} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chat panel */}
      {selected && activeSession ? (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
          {/* Header */}
          <div style={{ padding: "12px 20px", borderBottom: "1px solid #E8ECF0", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
            <div>
              <p style={{ margin: 0, fontWeight: 800, fontSize: "0.88rem", color: "#0D1525" }}>
                {activeSession.visitor_name ?? "Visiteur anonyme"}
              </p>
              <p style={{ margin: 0, fontSize: "0.68rem", color: "#94A3B8" }}>
                {timeAgo(activeSession.last_message_at)}
                <span style={{ marginLeft: 8, padding: "1px 7px", borderRadius: 20, fontSize: "0.62rem", fontWeight: 700, background: activeSession.statut === "actif" ? "#dcfce7" : "#F1F5F9", color: activeSession.statut === "actif" ? "#16a34a" : "#94A3B8" }}>
                  {activeSession.statut === "actif" ? "actif" : "fermé"}
                </span>
              </p>
            </div>
            {activeSession.statut === "actif" && (
              <button onClick={handleClose} style={{ padding: "6px 14px", borderRadius: 8, border: "1px solid #E2E8F0", background: "white", color: "#64748B", fontSize: "0.76rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                Fermer la session
              </button>
            )}
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 10, background: "#F8F9FB" }}>
            {messages.map(msg => (
              <div key={msg.id} style={{ display: "flex", flexDirection: "column", alignItems: msg.expediteur === "admin" ? "flex-end" : "flex-start", gap: 2 }}>
                {msg.expediteur === "admin" && (
                  <span style={{ fontSize: "0.62rem", color: "#94A3B8", marginRight: 4, fontWeight: 600 }}>
                    {msg.admin_nom ?? adminNom}
                  </span>
                )}
                {msg.expediteur === "visiteur" && (
                  <span style={{ fontSize: "0.62rem", color: "#94A3B8", marginLeft: 4, fontWeight: 600 }}>
                    {activeSession.visitor_name ?? "Visiteur"}
                  </span>
                )}
                <div style={{
                  maxWidth: "72%", padding: "9px 13px",
                  borderRadius: msg.expediteur === "admin" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                  background: msg.expediteur === "admin" ? "#FFB800" : "white",
                  color: "#0D1525", fontSize: "0.86rem", lineHeight: 1.55, fontWeight: 500,
                  border: msg.expediteur === "visiteur" ? "1px solid #E8ECF0" : "none",
                  wordBreak: "break-word",
                }}>
                  {msg.contenu}
                </div>
              </div>
            ))}
            {messages.length === 0 && (
              <p style={{ margin: "auto", fontSize: "0.8rem", color: "#94A3B8", textAlign: "center" }}>
                Aucun message pour le moment.
              </p>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Reply */}
          {activeSession.statut === "actif" ? (
            <div style={{ padding: "12px 16px", borderTop: "1px solid #E8ECF0", display: "flex", gap: 10, flexShrink: 0, background: "white" }}>
              <textarea
                value={reply}
                onChange={e => setReply(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                placeholder="Votre réponse… (Entrée pour envoyer)"
                rows={2}
                style={{
                  flex: 1, padding: "9px 12px", borderRadius: 10, border: "1.5px solid #E2E8F0",
                  fontSize: "0.84rem", fontFamily: "inherit", color: "#0D1525", outline: "none",
                  resize: "none", lineHeight: 1.5, boxSizing: "border-box",
                }}
              />
              <button
                onClick={handleSend}
                disabled={!reply.trim() || sending}
                style={{
                  padding: "0 18px", borderRadius: 10, border: "none", flexShrink: 0,
                  background: reply.trim() ? "#FFB800" : "#F1F5F9",
                  color: reply.trim() ? "#0D1525" : "#94A3B8",
                  fontWeight: 800, fontSize: "0.82rem", cursor: reply.trim() ? "pointer" : "default",
                  fontFamily: "inherit", transition: "background 0.15s",
                }}
              >
                {sending ? "…" : "Envoyer"}
              </button>
            </div>
          ) : (
            <div style={{ padding: "12px 16px", borderTop: "1px solid #E8ECF0", background: "#F8F9FB", textAlign: "center" }}>
              <p style={{ margin: 0, fontSize: "0.78rem", color: "#94A3B8" }}>Cette session est fermée</p>
            </div>
          )}
        </div>
      ) : (
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#CBD5E0" strokeWidth="2" strokeLinecap="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <p style={{ margin: 0, fontWeight: 700, color: "#94A3B8", fontSize: "0.85rem" }}>Sélectionnez une conversation</p>
          </div>
        </div>
      )}
    </div>
  );
}

function SessionRow({ s, selected, onClick }: { s: Session; selected: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      display: "flex", alignItems: "center", gap: 10, width: "100%",
      padding: "10px 14px", border: "none", borderLeft: selected ? "3px solid #FFB800" : "3px solid transparent",
      background: selected ? "#FFFBEB" : "transparent", cursor: "pointer",
      textAlign: "left", transition: "background 0.1s",
    }}>
      <div style={{
        width: 34, height: 34, borderRadius: "50%", background: s.statut === "ferme" ? "#F1F5F9" : "#FFB800",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontWeight: 900, fontSize: "0.78rem", color: s.statut === "ferme" ? "#94A3B8" : "#0D1525", flexShrink: 0,
      }}>
        {(s.visitor_name ?? "?").charAt(0).toUpperCase()}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, fontWeight: 700, fontSize: "0.82rem", color: "#0D1525", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {s.visitor_name ?? "Visiteur anonyme"}
        </p>
        <p style={{ margin: 0, fontSize: "0.68rem", color: "#94A3B8" }}>{timeAgo(s.last_message_at)}</p>
      </div>
      {s.unread > 0 && (
        <span style={{ background: "#FFB800", color: "#0D1525", fontSize: "0.62rem", fontWeight: 800, minWidth: 18, height: 18, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {s.unread}
        </span>
      )}
    </button>
  );
}
