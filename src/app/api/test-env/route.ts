import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Test environment variables
    const envStatus = {
      DATABASE_URL: process.env.DATABASE_URL ? "✅ Set" : "❌ Missing",
      PRISMA_DATABASE_URL: process.env.PRISMA_DATABASE_URL
        ? "✅ Set"
        : "❌ Missing",
      ADMIN_SESSION_TOKEN: process.env.ADMIN_SESSION_TOKEN
        ? "✅ Set"
        : "❌ Missing",
      NODE_ENV: process.env.NODE_ENV || "development",
    };

    // Test database connection
    let dbStatus = "❌ Not tested";
    try {
      const { db } = await import("@/lib/db");
      await db.$connect();
      const adminCount = await db.admin.count();
      dbStatus = `✅ Connected (${adminCount} admin users)`;
      await db.$disconnect();
    } catch (dbError: unknown) {
      const errorMessage =
        dbError instanceof Error ? dbError.message : "Unknown error";
      dbStatus = `❌ Connection failed: ${errorMessage}`;
    }

    return NextResponse.json({
      status: "Environment Check",
      timestamp: new Date().toISOString(),
      environment: envStatus,
      database: dbStatus,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        status: "Error",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
