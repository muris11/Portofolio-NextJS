import { db } from "@/lib/db";
import { mkdir, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function GET() {
  try {
    const profile = await db.profile.findFirst();
    return NextResponse.json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";

    let body: any;
    let profileImageUrl: string | null = null;

    if (contentType.includes("multipart/form-data")) {
      // Handle file upload
      const formData = await request.formData();
      const profileImage = formData.get("profileImage") as File | null;

      // Handle file upload if present
      if (profileImage && profileImage.size > 0) {
        // Validate file type
        const allowedTypes = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/webp",
        ];
        if (!allowedTypes.includes(profileImage.type)) {
          return NextResponse.json(
            {
              error:
                "Invalid file type. Only JPG, PNG, GIF, and WebP are allowed.",
            },
            { status: 400 }
          );
        }

        // Validate file size (5MB max)
        if (profileImage.size > 5 * 1024 * 1024) {
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
        const fileExtension = profileImage.name.split(".").pop();
        const fileName = `profile-${Date.now()}.${fileExtension}`;
        const filePath = join(uploadsDir, fileName);

        // Convert file to buffer and save
        const bytes = await profileImage.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(filePath, buffer);

        profileImageUrl = `/uploads/${fileName}`;
      }

      body = {
        fullName: formData.get("fullName"),
        title: formData.get("title"),
        bio: formData.get("bio"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        location: formData.get("location"),
        githubUrl: formData.get("githubUrl"),
        linkedinUrl: formData.get("linkedinUrl"),
        instagramUrl: formData.get("instagramUrl"),
      };
    } else {
      // Handle JSON data (backward compatibility)
      body = await request.json();
      profileImageUrl = body.profileImage;
    }

    const {
      fullName,
      title,
      bio,
      email,
      phone,
      location,
      githubUrl,
      linkedinUrl,
      instagramUrl,
    } = body;

    // Validasi input
    if (!fullName || !title || !bio || !email) {
      return NextResponse.json(
        { error: "Full name, title, bio, and email are required" },
        { status: 400 }
      );
    }

    const profile = await db.profile.upsert({
      where: { id: "default" },
      update: {
        fullName,
        title,
        bio,
        profileImage: profileImageUrl,
        email,
        phone: phone || null,
        location: location || null,
        githubUrl: githubUrl || null,
        linkedinUrl: linkedinUrl || null,
        instagramUrl: instagramUrl || null,
        updatedAt: new Date(),
      },
      create: {
        id: "default",
        fullName,
        title,
        bio,
        profileImage: profileImageUrl,
        email,
        phone: phone || null,
        location: location || null,
        githubUrl: githubUrl || null,
        linkedinUrl: linkedinUrl || null,
        instagramUrl: instagramUrl || null,
      },
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
