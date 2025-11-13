import { db } from "@/lib/db";
import { mkdir, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function GET() {
  try {
    const projects = await db.project.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";

    let body: any;
    let imageUrl: string | null = null;

    if (contentType.includes("multipart/form-data")) {
      // Handle file upload
      const formData = await request.formData();
      const imageFile = formData.get("imageFile") as File | null;

      // Handle file upload if present
      if (imageFile && imageFile.size > 0) {
        // Validate file type
        const allowedTypes = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/webp",
        ];
        if (!allowedTypes.includes(imageFile.type)) {
          return NextResponse.json(
            {
              error:
                "Invalid file type. Only JPG, PNG, GIF, and WebP are allowed.",
            },
            { status: 400 }
          );
        }

        // Validate file size (5MB max)
        if (imageFile.size > 5 * 1024 * 1024) {
          return NextResponse.json(
            { error: "File size too large. Maximum 5MB allowed." },
            { status: 400 }
          );
        }

        // Create uploads directory if it doesn't exist
        const uploadsDir = join(process.cwd(), "public", "uploads");
        try {
          await mkdir(uploadsDir, { recursive: true });
        } catch (error) {
          // Directory might already exist, continue
        }

        // Generate unique filename
        const fileExtension = imageFile.name.split(".").pop();
        const fileName = `project-${Date.now()}.${fileExtension}`;
        const filePath = join(uploadsDir, fileName);

        // Convert file to buffer and save
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(filePath, buffer);

        imageUrl = `/uploads/${fileName}`;
      }

      body = {
        title: formData.get("title"),
        description: formData.get("description"),
        techStack: formData.get("techStack"),
        liveUrl: formData.get("liveUrl"),
        githubUrl: formData.get("githubUrl"),
        featured: formData.get("featured") === "true",
      };
    } else {
      // Handle JSON data (backward compatibility)
      body = await request.json();
      imageUrl = body.imageUrl;
    }

    const { title, description, techStack, liveUrl, githubUrl, featured } =
      body;

    // Validasi input
    if (!title || !description || !techStack) {
      return NextResponse.json(
        { error: "Title, description, and techStack are required" },
        { status: 400 }
      );
    }

    // Additional validation
    if (
      typeof title !== "string" ||
      title.trim().length < 3 ||
      title.length > 100
    ) {
      return NextResponse.json(
        { error: "Title must be between 3 and 100 characters" },
        { status: 400 }
      );
    }

    if (
      typeof description !== "string" ||
      description.trim().length < 10 ||
      description.length > 1000
    ) {
      return NextResponse.json(
        { error: "Description must be between 10 and 1000 characters" },
        { status: 400 }
      );
    }

    // Validate URLs if provided
    if (liveUrl && typeof liveUrl === "string") {
      try {
        new URL(liveUrl);
      } catch {
        return NextResponse.json(
          { error: "Invalid live URL format" },
          { status: 400 }
        );
      }
    }

    if (githubUrl && typeof githubUrl === "string") {
      try {
        new URL(githubUrl);
      } catch {
        return NextResponse.json(
          { error: "Invalid GitHub URL format" },
          { status: 400 }
        );
      }
    }

    const project = await db.project.create({
      data: {
        title,
        description,
        imageUrl: imageUrl || null,
        techStack:
          typeof techStack === "string" ? techStack : JSON.stringify(techStack),
        liveUrl: liveUrl || null,
        githubUrl: githubUrl || null,
        featured: featured || false,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";

    let body: any;
    let imageUrl: string | null = null;

    if (contentType.includes("multipart/form-data")) {
      // Handle file upload
      const formData = await request.formData();
      const imageFile = formData.get("imageFile") as File | null;

      // Handle file upload if present
      if (imageFile && imageFile.size > 0) {
        // Validate file type
        const allowedTypes = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/webp",
        ];
        if (!allowedTypes.includes(imageFile.type)) {
          return NextResponse.json(
            {
              error:
                "Invalid file type. Only JPG, PNG, GIF, and WebP are allowed.",
            },
            { status: 400 }
          );
        }

        // Validate file size (5MB max)
        if (imageFile.size > 5 * 1024 * 1024) {
          return NextResponse.json(
            { error: "File size too large. Maximum 5MB allowed." },
            { status: 400 }
          );
        }

        // Create uploads directory if it doesn't exist
        const uploadsDir = join(process.cwd(), "public", "uploads");
        try {
          await mkdir(uploadsDir, { recursive: true });
        } catch (error) {
          // Directory might already exist, continue
        }

        // Generate unique filename
        const fileExtension = imageFile.name.split(".").pop();
        const fileName = `project-${Date.now()}.${fileExtension}`;
        const filePath = join(uploadsDir, fileName);

        // Convert file to buffer and save
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(filePath, buffer);

        imageUrl = `/uploads/${fileName}`;
      }

      body = {
        id: formData.get("id"),
        title: formData.get("title"),
        description: formData.get("description"),
        techStack: formData.get("techStack"),
        liveUrl: formData.get("liveUrl"),
        githubUrl: formData.get("githubUrl"),
        featured: formData.get("featured") === "true",
      };
    } else {
      // Handle JSON data (backward compatibility)
      body = await request.json();
      imageUrl = body.imageUrl;
    }

    const { id, title, description, techStack, liveUrl, githubUrl, featured } =
      body;

    if (!id) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }

    // Validasi input
    if (!title || !description || !techStack) {
      return NextResponse.json(
        { error: "Title, description, and techStack are required" },
        { status: 400 }
      );
    }

    // Additional validation
    if (
      typeof title !== "string" ||
      title.trim().length < 3 ||
      title.length > 100
    ) {
      return NextResponse.json(
        { error: "Title must be between 3 and 100 characters" },
        { status: 400 }
      );
    }

    if (
      typeof description !== "string" ||
      description.trim().length < 10 ||
      description.length > 1000
    ) {
      return NextResponse.json(
        { error: "Description must be between 10 and 1000 characters" },
        { status: 400 }
      );
    }

    // Validate URLs if provided
    if (liveUrl && typeof liveUrl === "string") {
      try {
        new URL(liveUrl);
      } catch {
        return NextResponse.json(
          { error: "Invalid live URL format" },
          { status: 400 }
        );
      }
    }

    if (githubUrl && typeof githubUrl === "string") {
      try {
        new URL(githubUrl);
      } catch {
        return NextResponse.json(
          { error: "Invalid GitHub URL format" },
          { status: 400 }
        );
      }
    }

    const project = await db.project.update({
      where: { id },
      data: {
        title,
        description,
        imageUrl: imageUrl || undefined,
        techStack:
          typeof techStack === "string" ? techStack : JSON.stringify(techStack),
        liveUrl: liveUrl || null,
        githubUrl: githubUrl || null,
        featured: featured || false,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
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
        { error: "Project ID is required" },
        { status: 400 }
      );
    }

    await db.project.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
