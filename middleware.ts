import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  console.log("MIDDLEWARE IS RUNNING!", request.nextUrl.pathname);

  if (request.nextUrl.pathname === "/admin") {
    console.log("Redirecting /admin to /login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin",
};
