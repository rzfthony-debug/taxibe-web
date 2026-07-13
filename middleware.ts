import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const session = request.cookies.get("taxibe_admin")?.value;

  if (pathname === "/gestion/login") {
    if (session) return NextResponse.redirect(new URL("/gestion", request.url));
    return NextResponse.next();
  }

  if (pathname.startsWith("/gestion") && !session) {
    return NextResponse.redirect(new URL("/gestion/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/gestion/:path*"],
};
