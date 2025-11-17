import { db } from "@/lib/db";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

interface ProfileData {
  fullName?: string;
  title?: string;
  bio?: string;
  email?: string;
  phone?: string;
  location?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  profileImage?: string;
}

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

    let body: ProfileData;
    let profileImageUrl: string | null = null;

    if (contentType.includes("multipart/form-data")) {
      // Handle file upload
      const formData = await request.formData();
      const profileImage = formData.get("profileImage") as File | null;

      // Handle file upload if present
      if (profileImage) {
        // Validate file type
        const allowedTypes = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/webp",
        ];
        if (!allowedTypes.includes(profileImage.type)) {
          return NextResponse.json(
            { error: "Invalid image file type. Only JPEG, PNG, GIF, and WebP are allowed." },
            { status: 400 }
          );
        }

        // Validate file size (max 5MB)
        if (profileImage.size > 5 * 1024 * 1024) {
          return NextResponse.json(
            { error: "File size too large. Maximum size is 5MB." },
            { status: 400 }
          );
        }

        // Upload to Vercel Blob (production) or local storage (development)
        let uploadedUrl: string;
        
        if (process.env.BLOB_READ_WRITE_TOKEN) {
          // Production: Use Vercel Blob
          const blob = await put(`profile-${Date.now()}.${profileImage.name.split('.').pop()}`, profileImage, {
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

          const fileName = `profile-${Date.now()}.${profileImage.name.split('.').pop()}`;
          const filePath = path.join(uploadsDir, fileName);
          
          const buffer = Buffer.from(await profileImage.arrayBuffer());
          await fs.writeFile(filePath, buffer);
          
          uploadedUrl = `/uploads/${fileName}`;
        }

        profileImageUrl = uploadedUrl;
      }

      body = {
        fullName: formData.get("fullName") as string,
        title: formData.get("title") as string,
        bio: formData.get("bio") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        location: formData.get("location") as string,
        githubUrl: formData.get("githubUrl") as string,
        linkedinUrl: formData.get("linkedinUrl") as string,
        instagramUrl: formData.get("instagramUrl") as string,
      };
    } else {
      // Handle JSON data (backward compatibility)
      body = await request.json();
      profileImageUrl = body.profileImage || null;
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

    // Get existing profile to preserve profileImage if no new file uploaded
    const existingProfile = await db.profile.findFirst();
    const finalProfileImageUrl =
      profileImageUrl !== null
        ? profileImageUrl
        : existingProfile?.profileImage;

    const profile = await db.profile.upsert({
      where: { id: "default" },
      update: {
        fullName,
        title,
        bio,
        profileImage: finalProfileImageUrl,
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
        profileImage: finalProfileImageUrl,
        email,
        phone: phone || null,
        location: location || null,
        githubUrl: githubUrl || null,
        linkedinUrl: linkedinUrl || null,
        instagramUrl: instagramUrl || null,
      },
    });

    // Revalidate the homepage, profile page, and admin page to reflect changes immediately
    revalidatePath("/");
    revalidatePath("/profile");
    revalidatePath("/admin");

    return NextResponse.json(profile);
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
