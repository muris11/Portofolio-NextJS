import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const skills = await db.skill.findMany({
      orderBy: [{ category: "asc" }, { level: "desc" }],
    });
    return NextResponse.json(skills);
  } catch (error) {
    console.error("Error fetching skills:", error);
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, category, icon, level } = body;

    // Validasi input
    if (!name || !category) {
      return NextResponse.json(
        { error: "Name and category are required" },
        { status: 400 }
      );
    }

    const skill = await db.skill.create({
      data: {
        name,
        category,
        icon: icon || null,
        level: level || null,
      },
    });

    // Revalidate the homepage to reflect skill changes immediately
    revalidatePath("/");

    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    console.error("Error creating skill:", error);
    return NextResponse.json(
      { error: "Failed to create skill" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, category, icon, level } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Skill ID is required" },
        { status: 400 }
      );
    }

    const skill = await db.skill.update({
      where: { id },
      data: {
        name,
        category,
        icon: icon || null,
        level: level || null,
      },
    });

    // Revalidate the homepage to reflect skill changes immediately
    revalidatePath("/");

    return NextResponse.json(skill);
  } catch (error) {
    console.error("Error updating skill:", error);
    return NextResponse.json(
      { error: "Failed to update skill" },
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
        { error: "Skill ID is required" },
        { status: 400 }
      );
    }

    await db.skill.delete({
      where: { id },
    });

    // Revalidate the homepage to reflect skill changes immediately
    revalidatePath("/");

    return NextResponse.json({ message: "Skill deleted successfully" });
  } catch (error) {
    console.error("Error deleting skill:", error);
    return NextResponse.json(
      { error: "Failed to delete skill" },
      { status: 500 }
    );
  }
}
