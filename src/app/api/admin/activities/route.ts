import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export interface RecentActivity {
  id: string;
  type: "project" | "message" | "profile";
  title: string;
  description: string;
  timestamp: string;
  icon: string;
}

export async function GET(request: NextRequest) {
  try {
    // Get recent projects (last 3)
    const recentProjects = await db.project.findMany({
      take: 3,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        createdAt: true,
      },
    });

    // Get recent messages (last 3)
    const recentMessages = await db.contactMessage.findMany({
      take: 3,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        subject: true,
        createdAt: true,
      },
    });

    // Get recent profile updates (last 1)
    const recentProfileUpdate = await db.profile.findFirst({
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        fullName: true,
        updatedAt: true,
      },
    });

    // Combine and sort all activities by timestamp
    const activities: RecentActivity[] = [];

    // Add projects
    recentProjects.forEach((project) => {
      activities.push({
        id: `project-${project.id}`,
        type: "project",
        title: "New project added",
        description: `${project.title} - ${getTimeAgo(project.createdAt)}`,
        timestamp: project.createdAt.toISOString(),
        icon: "Code",
      });
    });

    // Add messages
    recentMessages.forEach((message) => {
      activities.push({
        id: `message-${message.id}`,
        type: "message",
        title: "New message received",
        description: `${message.name}${
          message.subject ? ` - ${message.subject}` : ""
        } - ${getTimeAgo(message.createdAt)}`,
        timestamp: message.createdAt.toISOString(),
        icon: "MessageSquare",
      });
    });

    // Add profile update if exists
    if (recentProfileUpdate) {
      activities.push({
        id: `profile-${recentProfileUpdate.id}`,
        type: "profile",
        title: "Profile updated",
        description: `${recentProfileUpdate.fullName} - ${getTimeAgo(
          recentProfileUpdate.updatedAt
        )}`,
        timestamp: recentProfileUpdate.updatedAt.toISOString(),
        icon: "Users",
      });
    }

    // Sort by timestamp (most recent first) and take top 5
    activities.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    const topActivities = activities.slice(0, 5);

    return NextResponse.json(topActivities);
  } catch (error) {
    console.error("Error fetching recent activities:", error);
    return NextResponse.json(
      { error: "Failed to fetch recent activities" },
      { status: 500 }
    );
  }
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInHours < 1) {
    return "Just now";
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  } else {
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  }
}
