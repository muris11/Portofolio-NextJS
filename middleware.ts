import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const url = request.nextUrl;

  // Bypass protection for public API routes
  const publicApiRoutes = ["/api/health", "/api/contact"];

  // Check if current path is a public route
  const isPublicRoute = publicApiRoutes.some((route) =>
    url.pathname.startsWith(route)
  );

  // Handle admin page access
  if (
    url.pathname.startsWith("/admin") &&
    !url.pathname.startsWith("/api/admin")
  ) {
    const sessionCookie = request.cookies.get("admin_session");

    if (
      !sessionCookie ||
      sessionCookie.value !== process.env.ADMIN_SESSION_TOKEN
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Handle admin API routes - require authentication
  if (url.pathname.startsWith("/api/admin") && !isPublicRoute) {
    // Skip auth check for auth endpoint itself and test endpoint
    if (
      url.pathname === "/api/admin/auth" ||
      url.pathname === "/api/admin/test" ||
      url.pathname === "/api/admin/test/info"
    ) {
      const response = NextResponse.next();
      response.headers.set("X-Frame-Options", "DENY");
      response.headers.set("X-Content-Type-Options", "nosniff");
      response.headers.set(
        "Referrer-Policy",
        "strict-origin-when-cross-origin"
      );
      return response;
    }

    // Check for valid admin session
    const sessionCookie = request.cookies.get("admin_session");

    if (
      !sessionCookie ||
      sessionCookie.value !== process.env.ADMIN_SESSION_TOKEN
    ) {
      return NextResponse.json(
        { error: "Unauthorized - Invalid or missing session" },
        { status: 401 }
      );
    }
  }

  // Add security headers for all admin routes
  const response = NextResponse.next();

  if (
    url.pathname.startsWith("/admin") ||
    url.pathname.startsWith("/api/admin")
  ) {
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    response.headers.set("X-XSS-Protection", "1; mode=block");
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
