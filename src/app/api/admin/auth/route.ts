import { ADMIN_SESSION_TOKEN } from "@/lib/auth";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limiting (in production, use Redis or similar)
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_TIME = 15 * 60 * 1000; // 15 minutes

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Check rate limiting
    const now = Date.now();
    const attempts = loginAttempts.get(clientIP) || {
      count: 0,
      lastAttempt: 0,
    };

    // Reset attempts if window has passed
    if (now - attempts.lastAttempt > WINDOW_TIME) {
      attempts.count = 0;
    }

    // Check if too many attempts
    if (attempts.count >= MAX_ATTEMPTS) {
      return NextResponse.json(
        { error: "Too many login attempts. Try again in 15 minutes." },
        { status: 429 }
      );
    }

    // Validate that admin credentials are configured
    // Note: Admin credentials are now stored in the database
    // This check is kept for backwards compatibility but admin users are managed via database

    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      return NextResponse.json(
        { error: "Invalid JSON format" },
        { status: 400 }
      );
    }

    const { email, password } = body;

    // Validate required fields
    if (!email || !password) {
      // Record failed attempt
      attempts.count++;
      attempts.lastAttempt = now;
      loginAttempts.set(clientIP, attempts);

      return NextResponse.json(
        { error: "Email dan password diperlukan" },
        { status: 400 }
      );
    }

    // Validate credentials against database
    const admin = await db.admin.findUnique({
      where: { email: email },
    });

    if (!admin) {
      // Record failed attempt
      attempts.count++;
      attempts.lastAttempt = now;
      loginAttempts.set(clientIP, attempts);

      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      // Record failed attempt
      attempts.count++;
      attempts.lastAttempt = now;
      loginAttempts.set(clientIP, attempts);

      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Successful login - reset attempts
    loginAttempts.delete(clientIP);

    // Create session cookie
    const cookieStore = await cookies();
    cookieStore.set("admin_session", ADMIN_SESSION_TOKEN as string, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return NextResponse.json({ success: true, message: "Login successful" });
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    // Clear session cookie
    const cookieStore = await cookies();
    cookieStore.delete("admin_session");

    return NextResponse.json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Server error occurred" },
      { status: 500 }
    );
  }
}

// GET method to check authentication status
export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("admin_session")?.value;

    if (sessionToken === ADMIN_SESSION_TOKEN) {
      return NextResponse.json({ authenticated: true });
    } else {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
