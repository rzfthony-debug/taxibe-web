import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/gestion") && pathname !== "/gestion/login") {
    const session = request.cookies.get("taxibe_admin")?.value;
    if (!session) {
      return NextResponse.redirect(new URL("/gestion/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/gestion/:path*"],
};
