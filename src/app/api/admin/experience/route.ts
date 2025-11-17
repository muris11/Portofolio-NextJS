import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const experience = await db.experience.findMany({
      orderBy: { id: "desc" },
    });
    return NextResponse.json(experience);
  } catch (error) {
    console.error("Error fetching experience:", error);
    return NextResponse.json(
      { error: "Failed to fetch experience" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { company, role, description, startDate, endDate } = body;

    // Validasi input
    if (!company || !role || !startDate || !endDate) {
      return NextResponse.json(
        { error: "Company, role, startDate, and endDate are required" },
        { status: 400 }
      );
    }

    const experience = await db.experience.create({
      data: {
        company,
        role,
        description,
        startDate,
        endDate,
      },
    });

    return NextResponse.json(experience, { status: 201 });
  } catch (error) {
    console.error("Error creating experience:", error);
    return NextResponse.json(
      { error: "Failed to create experience" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, company, role, description, startDate, endDate } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Experience ID is required" },
        { status: 400 }
      );
    }

    const experience = await db.experience.update({
      where: { id },
      data: {
        company,
        role,
        description,
        startDate,
        endDate,
      },
    });

    return NextResponse.json(experience);
  } catch (error) {
    console.error("Error updating experience:", error);
    return NextResponse.json(
      { error: "Failed to update experience" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Experience ID is required" },
        { status: 400 }
      );
    }

    await db.experience.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Experience deleted successfully" });
  } catch (error) {
    console.error("Error deleting experience:", error);
    return NextResponse.json(
      { error: "Failed to delete experience" },
      { status: 500 }
    );
  }
}
