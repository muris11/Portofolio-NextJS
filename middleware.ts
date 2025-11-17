import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  console.log("MIDDLEWARE IS RUNNING!", request.nextUrl.pathname);

  if (request.nextUrl.pathname === "/admin") {
    // Check if user has admin session cookie
    const sessionCookie = request.cookies.get("admin_session");

    if (
      !sessionCookie ||
      sessionCookie.value !== process.env.ADMIN_SESSION_TOKEN
    ) {
      console.log("No valid session, redirecting to login");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    console.log("Valid session found, allowing access to admin");
    // User has valid session, allow access to admin
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin",
};
