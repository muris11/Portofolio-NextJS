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
        if (profileImage.size > 2 * 1024 * 1024) {
          return NextResponse.json(
            { error: "File size too large. Maximum 2MB allowed." },
            { status: 400 }
          );
        }

        // Additional security: check file extension matches MIME type
        const profileFileExtension = profileImage.name
          .split(".")
          .pop()
          ?.toLowerCase();
        const allowedExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
        if (
          !profileFileExtension ||
          !allowedExtensions.includes(profileFileExtension)
        ) {
          return NextResponse.json(
            { error: "Invalid file extension" },
            { status: 400 }
          );
        }

        // Check for malicious file signatures (basic check)
        const profileBytes = await profileImage.arrayBuffer();
        const profileBuffer = Buffer.from(profileBytes);
        const magicBytes = profileBuffer.subarray(0, 4);

        // JPEG: FF D8 FF
        // PNG: 89 50 4E 47
        // GIF: 47 49 46 38
        // WebP: 52 49 46 46
        const isValidImage =
          (magicBytes[0] === 0xff &&
            magicBytes[1] === 0xd8 &&
            magicBytes[2] === 0xff) || // JPEG
          (magicBytes[0] === 0x89 &&
            magicBytes[1] === 0x50 &&
            magicBytes[2] === 0x4e &&
            magicBytes[3] === 0x47) || // PNG
          (magicBytes[0] === 0x47 &&
            magicBytes[1] === 0x49 &&
            magicBytes[2] === 0x46 &&
            magicBytes[3] === 0x38) || // GIF
          (magicBytes[0] === 0x52 &&
            magicBytes[1] === 0x49 &&
            magicBytes[2] === 0x46 &&
            magicBytes[3] === 0x46); // WebP

        if (!isValidImage) {
          return NextResponse.json(
            { error: "Invalid image file" },
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
        const fileName = `profile-${Date.now()}.${profileFileExtension}`;
        const filePath = join(uploadsDir, fileName);

        // Convert file to buffer and save
        await writeFile(filePath, profileBuffer);

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
