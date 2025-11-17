import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Test admin login with known credentials
    const testCredentials = {
      email: "rifqysaputra1102@gmail.com",
      password: "rifqy110205",
    };

    // Test database query
    const { db } = await import("@/lib/db");
    const admin = await db.admin.findUnique({
      where: { email: testCredentials.email },
      select: { id: true, email: true, name: true },
    });

    if (!admin) {
      return NextResponse.json({
        status: "Login Test",
        result: "❌ Admin user not found in database",
        credentials: testCredentials,
        foundUsers: await db.admin.count(),
      });
    }

    // Test password verification
    const bcrypt = await import("bcryptjs");
    const adminWithPassword = await db.admin.findUnique({
      where: { email: testCredentials.email },
    });

    if (!adminWithPassword) {
      return NextResponse.json({
        status: "Login Test",
        result: "❌ Admin user password not found",
      });
    }

    const isValidPassword = await bcrypt.compare(
      testCredentials.password,
      adminWithPassword.password
    );

    // Test session token
    const { ADMIN_SESSION_TOKEN } = await import("@/lib/auth");
    const sessionTokenValid = ADMIN_SESSION_TOKEN ? "✅ Valid" : "❌ Missing";

    return NextResponse.json({
      status: "Login Test",
      timestamp: new Date().toISOString(),
      adminFound: `✅ Found: ${admin.email}`,
      passwordValid: isValidPassword ? "✅ Valid" : "❌ Invalid",
      sessionToken: sessionTokenValid,
      testCredentials: testCredentials,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        status: "Login Test Error",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
