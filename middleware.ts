import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const adminId = request.cookies.get("taxibe_admin")?.value;

  if (pathname === "/gestion/login") {
    if (adminId) return NextResponse.redirect(new URL("/gestion", request.url));
    return NextResponse.next();
  }

  if (pathname.startsWith("/gestion")) {
    if (!adminId) {
      return NextResponse.redirect(new URL("/gestion/login", request.url));
    }

    // Validate session against DB — prevents forged cookies
    try {
      const db = createClient(
        process.env.SUPABASE_URL ?? "",
        process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
        { auth: { persistSession: false } }
      );
      const { data } = await db
        .from("admin_users")
        .select("id")
        .eq("id", adminId)
        .eq("actif", true)
        .maybeSingle();

      if (!data) {
        const res = NextResponse.redirect(new URL("/gestion/login", request.url));
        res.cookies.delete("taxibe_admin");
        res.cookies.delete("taxibe_admin_nom");
        res.cookies.delete("taxibe_admin_role");
        return res;
      }
    } catch {
      // DB unavailable — deny access (fail-closed)
      return NextResponse.redirect(new URL("/gestion/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/gestion/:path*"],
};
