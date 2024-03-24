import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoggedIn = cookies().get("token");

  if (isLoggedIn && pathname.includes("auth"))
    return NextResponse.redirect(new URL("/categories", request.url));

  if (!isLoggedIn && !pathname.includes("auth"))
    return NextResponse.redirect(new URL("/auth/login", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/categories", "/auth/:path*"],
};
