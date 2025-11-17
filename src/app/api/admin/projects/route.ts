import { db } from "@/lib/db";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

interface ProjectData {
  id?: string;
  title: string;
  description: string;
  techStack: string | string[];
  liveUrl?: string | null;
  githubUrl?: string | null;
  featured?: boolean;
  imageUrl?: string | null;
}

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

    let body: ProjectData;
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

        // Upload to Vercel Blob (production) or local storage (development)
        let uploadedUrl: string;

        if (process.env.BLOB_READ_WRITE_TOKEN) {
          // Production: Use Vercel Blob
          const fileExtension = imageFile.name.split(".").pop();
          const blob = await put(`project-${Date.now()}.${fileExtension}`, imageFile, {
            access: 'public',
          });
          uploadedUrl = blob.url;
        } else {
          // Development: Use local storage (fallback)
          const fs = await import('fs/promises');
          const path = await import('path');

          const uploadsDir = path.join(process.cwd(), "public", "uploads");
          try {
            await fs.mkdir(uploadsDir, { recursive: true });
          } catch {
            // Directory might already exist, continue
          }

          const fileExtension = imageFile.name.split(".").pop();
          const fileName = `project-${Date.now()}.${fileExtension}`;
          const filePath = path.join(uploadsDir, fileName);

          const bytes = await imageFile.arrayBuffer();
          const buffer = Buffer.from(bytes);
          await fs.writeFile(filePath, buffer);

          uploadedUrl = `/uploads/${fileName}`;
        }

        imageUrl = uploadedUrl;
      }

      body = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        techStack: formData.get("techStack") as string,
        liveUrl: formData.get("liveUrl") as string,
        githubUrl: formData.get("githubUrl") as string,
        featured: formData.get("featured") === "true",
      };
    } else {
      // Handle JSON data (backward compatibility)
      body = await request.json();
      imageUrl = body.imageUrl || null;
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

    // Revalidate the homepage, projects page, and admin page to reflect changes immediately
    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath("/admin");

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

    let body: ProjectData;
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

        // Upload to Vercel Blob (production) or local storage (development)
        let uploadedUrl: string;

        if (process.env.BLOB_READ_WRITE_TOKEN) {
          // Production: Use Vercel Blob
          const fileExtension = imageFile.name.split(".").pop();
          const blob = await put(`project-${Date.now()}.${fileExtension}`, imageFile, {
            access: 'public',
          });
          uploadedUrl = blob.url;
        } else {
          // Development: Use local storage (fallback)
          const fs = await import('fs/promises');
          const path = await import('path');

          const uploadsDir = path.join(process.cwd(), "public", "uploads");
          try {
            await fs.mkdir(uploadsDir, { recursive: true });
          } catch {
            // Directory might already exist, continue
          }

          const fileExtension = imageFile.name.split(".").pop();
          const fileName = `project-${Date.now()}.${fileExtension}`;
          const filePath = path.join(uploadsDir, fileName);

          const bytes = await imageFile.arrayBuffer();
          const buffer = Buffer.from(bytes);
          await fs.writeFile(filePath, buffer);

          uploadedUrl = `/uploads/${fileName}`;
        }

        imageUrl = uploadedUrl;
      }

      body = {
        id: formData.get("id") as string,
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        techStack: formData.get("techStack") as string,
        liveUrl: formData.get("liveUrl") as string,
        githubUrl: formData.get("githubUrl") as string,
        featured: formData.get("featured") === "true",
      };
    } else {
      // Handle JSON data (backward compatibility)
      body = await request.json();
      imageUrl = body.imageUrl || null;
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

    // Revalidate the homepage, projects page, and admin page to reflect changes immediately
    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath("/admin");

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

    // Revalidate the homepage, projects page, and admin page to reflect changes immediately
    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath("/admin");

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
