import { cookies } from "next/headers";
import { adminDb } from "@/lib/supabase";
import ChatAdmin from "./ChatAdmin";

export const revalidate = 0;

async function getSessions() {
  const since = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
  const { data: sessions } = await adminDb
    .from("chat_sessions")
    .select("id, visitor_name, statut, created_at, last_message_at")
    .gte("created_at", since)
    .order("last_message_at", { ascending: false });

  if (!sessions || sessions.length === 0) return [];

  const sessionIds = sessions.map(s => s.id);
  const { data: unreadCounts } = await adminDb
    .from("chat_messages")
    .select("session_id")
    .in("session_id", sessionIds)
    .eq("expediteur", "visiteur")
    .eq("lu", false);

  const unreadMap: Record<string, number> = {};
  for (const row of unreadCounts ?? []) {
    unreadMap[row.session_id] = (unreadMap[row.session_id] ?? 0) + 1;
  }

  return sessions.map(s => ({ ...s, unread: unreadMap[s.id] ?? 0 }));
}

export default async function ChatPage() {
  const jar = await cookies();
  const adminNom = jar.get("taxibe_admin_nom")?.value ?? "Admin";
  const sessions = await getSessions();

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Chat en direct</h1>
        <span style={{ fontSize: "0.82rem", color: "#94A3B8" }}>
          Conversations des dernières 24 h
        </span>
      </div>
      <ChatAdmin initialSessions={sessions} adminNom={adminNom} />
    </div>
  );
}
