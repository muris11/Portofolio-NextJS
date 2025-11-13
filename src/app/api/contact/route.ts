import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validasi input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Validasi email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Simpan pesan ke database
    const contactMessage = await db.contactMessage.create({
      data: {
        name,
        email,
        subject: subject || "No Subject",
        message,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully",
        id: contactMessage.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending contact message:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
