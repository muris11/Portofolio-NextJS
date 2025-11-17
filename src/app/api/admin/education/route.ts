import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const education = await db.education.findMany({
      orderBy: { startDate: "desc" },
    });
    return NextResponse.json(education);
  } catch (error) {
    console.error("Error fetching education:", error);
    return NextResponse.json(
      { error: "Failed to fetch education" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { institution, degree, startDate, endDate, description } = body;

    // Validasi input
    if (!institution || !degree || !startDate || !endDate) {
      return NextResponse.json(
        { error: "Institution, degree, startDate, and endDate are required" },
        { status: 400 }
      );
    }

    const education = await db.education.create({
      data: {
        institution,
        degree,
        startDate,
        endDate,
        description: description || null,
      },
    });

    // Revalidate the homepage, resume page, and admin page to reflect education changes
    revalidatePath("/");
    revalidatePath("/resume");
    revalidatePath("/admin");

    return NextResponse.json(education, { status: 201 });
  } catch (error) {
    console.error("Error creating education:", error);
    return NextResponse.json(
      { error: "Failed to create education" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, institution, degree, startDate, endDate, description } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Education ID is required" },
        { status: 400 }
      );
    }

    const education = await db.education.update({
      where: { id },
      data: {
        institution,
        degree,
        startDate,
        endDate,
        description: description || null,
      },
    });

    // Revalidate the homepage, resume page, and admin page to reflect education changes
    revalidatePath("/");
    revalidatePath("/resume");
    revalidatePath("/admin");

    return NextResponse.json(education);
  } catch (error) {
    console.error("Error updating education:", error);
    return NextResponse.json(
      { error: "Failed to update education" },
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
        { error: "Education ID is required" },
        { status: 400 }
      );
    }

    await db.education.delete({
      where: { id },
    });

    // Revalidate the homepage, resume page, and admin page to reflect education changes
    revalidatePath("/");
    revalidatePath("/resume");
    revalidatePath("/admin");

    return NextResponse.json({ message: "Education deleted successfully" });
  } catch (error) {
    console.error("Error deleting education:", error);
    return NextResponse.json(
      { error: "Failed to delete education" },
      { status: 500 }
    );
  }
}
