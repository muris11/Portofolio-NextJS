import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const url = request.nextUrl;
  console.log("MIDDLEWARE IS RUNNING!", url.pathname);

  // Handle admin access
  if (url.pathname === "/admin") {
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
  }

  // Add security headers
  const response = NextResponse.next();

  // Add security headers for admin routes
  if (
    url.pathname.startsWith("/admin") ||
    url.pathname.startsWith("/api/admin")
  ) {
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  }

  return response;
}

export const config = {
  matcher: "/admin",
};
