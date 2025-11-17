import { db } from "@/lib/db";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

interface TestResult {
  test: string;
  status: "PASS" | "FAIL" | "SKIP";
  message: string;
  details?: any;
  duration?: number;
}

export async function GET() {
  const results: TestResult[] = [];
  const startTime = Date.now();

  // Helper function to run test
  const runTest = async (
    testName: string,
    testFn: () => Promise<void>
  ): Promise<void> => {
    const testStart = Date.now();
    try {
      await testFn();
      results.push({
        test: testName,
        status: "PASS",
        message: "Test passed successfully",
        duration: Date.now() - testStart,
      });
    } catch (error) {
      results.push({
        test: testName,
        status: "FAIL",
        message: error instanceof Error ? error.message : "Unknown error",
        details: error,
        duration: Date.now() - testStart,
      });
    }
  };

  // 1. Database Connection Test
  await runTest("Database Connection", async () => {
    const result = await db.$queryRaw`SELECT 1 as test`;
    if (!result) throw new Error("Database query failed");
  });

  // 2. Environment Variables Test
  await runTest("Environment Variables", async () => {
    const requiredVars = [
      "DATABASE_URL",
      "ADMIN_SESSION_TOKEN",
      "NODE_ENV",
    ];

    const missing = requiredVars.filter(varName => !process.env[varName]);
    if (missing.length > 0) {
      throw new Error(`Missing environment variables: ${missing.join(", ")}`);
    }
  });

  // 3. Vercel Blob Test
  await runTest("Vercel Blob Configuration", async () => {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      results.push({
        test: "Vercel Blob Configuration",
        status: "SKIP",
        message: "BLOB_READ_WRITE_TOKEN not configured - using local storage fallback",
      });
      return;
    }

    // Test blob upload with a small test file
    const testContent = "test file content";
    const blob = new Blob([testContent], { type: "text/plain" });

    const uploadResult = await put("test-file.txt", blob, {
      access: "public",
    });

    if (!uploadResult.url) {
      throw new Error("Blob upload failed - no URL returned");
    }

    console.log("Blob test successful:", uploadResult.url);
  });

  // 4. Authentication API Test
  await runTest("Authentication API", async () => {
    const testCredentials = {
      email: "test@example.com",
      password: "testpass123",
    };

    const response = await fetch(
      `${process.env.VERCEL_URL || "http://localhost:3000"}/api/admin/auth`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testCredentials),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      // This is expected to fail with wrong credentials, but API should respond
      if (response.status === 400 || response.status === 401) {
        return; // This is expected
      }
      throw new Error(`Auth API error: ${response.status} - ${error}`);
    }
  });

  // 5. Profile CRUD Test
  await runTest("Profile CRUD Operations", async () => {
    // Test GET
    const getResponse = await fetch("/api/admin/profile");
    if (!getResponse.ok) {
      throw new Error(`Profile GET failed: ${getResponse.status}`);
    }

    // Test POST (create/update)
    const testProfile = {
      fullName: "Test User",
      title: "Test Developer",
      bio: "Test bio for testing purposes",
      email: "test@example.com",
    };

    const postResponse = await fetch("/api/admin/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testProfile),
    });

    if (!postResponse.ok) {
      const error = await postResponse.text();
      throw new Error(`Profile PUT failed: ${postResponse.status} - ${error}`);
    }
  });

  // 6. Projects CRUD Test
  await runTest("Projects CRUD Operations", async () => {
    // Test GET
    const getResponse = await fetch("/api/admin/projects");
    if (!getResponse.ok) {
      throw new Error(`Projects GET failed: ${getResponse.status}`);
    }

    // Test POST (create)
    const testProject = {
      title: "Test Project",
      description: "Test project description",
      techStack: '["React", "Next.js"]',
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      featured: false,
    };

    const postResponse = await fetch("/api/admin/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testProject),
    });

    if (!postResponse.ok) {
      const error = await postResponse.text();
      throw new Error(`Projects POST failed: ${postResponse.status} - ${error}`);
    }

    const createdProject = await postResponse.json();

    // Test PUT (update)
    const updateData = { ...testProject, id: createdProject.id, title: "Updated Test Project" };
    const putResponse = await fetch("/api/admin/projects", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    });

    if (!putResponse.ok) {
      const error = await putResponse.text();
      throw new Error(`Projects PUT failed: ${putResponse.status} - ${error}`);
    }

    // Test DELETE
    const deleteResponse = await fetch(`/api/admin/projects?id=${createdProject.id}`, {
      method: "DELETE",
    });

    if (!deleteResponse.ok) {
      const error = await deleteResponse.text();
      throw new Error(`Projects DELETE failed: ${deleteResponse.status} - ${error}`);
    }
  });

  // 7. Skills CRUD Test
  await runTest("Skills CRUD Operations", async () => {
    // Test GET
    const getResponse = await fetch("/api/admin/skills");
    if (!getResponse.ok) {
      throw new Error(`Skills GET failed: ${getResponse.status}`);
    }

    // Test POST
    const testSkill = {
      name: "Test Skill",
      category: "Frontend",
      level: 80,
    };

    const postResponse = await fetch("/api/admin/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testSkill),
    });

    if (!postResponse.ok) {
      const error = await postResponse.text();
      throw new Error(`Skills POST failed: ${postResponse.status} - ${error}`);
    }

    const createdSkill = await postResponse.json();

    // Test PUT
    const updateData = { ...testSkill, id: createdSkill.id, name: "Updated Test Skill" };
    const putResponse = await fetch("/api/admin/skills", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    });

    if (!putResponse.ok) {
      const error = await putResponse.text();
      throw new Error(`Skills PUT failed: ${putResponse.status} - ${error}`);
    }

    // Test DELETE
    const deleteResponse = await fetch(`/api/admin/skills?id=${createdSkill.id}`, {
      method: "DELETE",
    });

    if (!deleteResponse.ok) {
      const error = await deleteResponse.text();
      throw new Error(`Skills DELETE failed: ${deleteResponse.status} - ${error}`);
    }
  });

  // 8. Education CRUD Test
  await runTest("Education CRUD Operations", async () => {
    // Test GET
    const getResponse = await fetch("/api/admin/education");
    if (!getResponse.ok) {
      throw new Error(`Education GET failed: ${getResponse.status}`);
    }

    // Test POST
    const testEducation = {
      institution: "Test University",
      degree: "Test Degree",
      startDate: "2020-01-01",
      endDate: "2024-01-01",
      description: "Test education description",
    };

    const postResponse = await fetch("/api/admin/education", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testEducation),
    });

    if (!postResponse.ok) {
      const error = await postResponse.text();
      throw new Error(`Education POST failed: ${postResponse.status} - ${error}`);
    }

    const createdEducation = await postResponse.json();

    // Test PUT
    const updateData = { ...testEducation, id: createdEducation.id, institution: "Updated University" };
    const putResponse = await fetch("/api/admin/education", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    });

    if (!putResponse.ok) {
      const error = await putResponse.text();
      throw new Error(`Education PUT failed: ${putResponse.status} - ${error}`);
    }

    // Test DELETE
    const deleteResponse = await fetch(`/api/admin/education?id=${createdEducation.id}`, {
      method: "DELETE",
    });

    if (!deleteResponse.ok) {
      const error = await deleteResponse.text();
      throw new Error(`Education DELETE failed: ${deleteResponse.status} - ${error}`);
    }
  });

  // 9. Experience CRUD Test
  await runTest("Experience CRUD Operations", async () => {
    // Test GET
    const getResponse = await fetch("/api/admin/experience");
    if (!getResponse.ok) {
      throw new Error(`Experience GET failed: ${getResponse.status}`);
    }

    // Test POST
    const testExperience = {
      company: "Test Company",
      role: "Test Role",
      description: "Test experience description",
      startDate: "2020-01-01",
      endDate: "2024-01-01",
    };

    const postResponse = await fetch("/api/admin/experience", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testExperience),
    });

    if (!postResponse.ok) {
      const error = await postResponse.text();
      throw new Error(`Experience POST failed: ${postResponse.status} - ${error}`);
    }

    const createdExperience = await postResponse.json();

    // Test PUT
    const updateData = { ...testExperience, id: createdExperience.id, company: "Updated Company" };
    const putResponse = await fetch("/api/admin/experience", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    });

    if (!putResponse.ok) {
      const error = await putResponse.text();
      throw new Error(`Experience PUT failed: ${putResponse.status} - ${error}`);
    }

    // Test DELETE
    const deleteResponse = await fetch(`/api/admin/experience?id=${createdExperience.id}`, {
      method: "DELETE",
    });

    if (!deleteResponse.ok) {
      const error = await deleteResponse.text();
      throw new Error(`Experience DELETE failed: ${deleteResponse.status} - ${error}`);
    }
  });

  // 10. Messages API Test
  await runTest("Messages API", async () => {
    // Test GET
    const getResponse = await fetch("/api/admin/messages");
    if (!getResponse.ok) {
      throw new Error(`Messages GET failed: ${getResponse.status}`);
    }

    // Test POST (simulate contact form)
    const testMessage = {
      name: "Test User",
      email: "test@example.com",
      subject: "Test Subject",
      message: "Test message content",
    };

    const postResponse = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testMessage),
    });

    if (!postResponse.ok) {
      const error = await postResponse.text();
      throw new Error(`Contact form failed: ${postResponse.status} - ${error}`);
    }

    // Get messages again to verify creation
    const messagesResponse = await fetch("/api/admin/messages");
    if (!messagesResponse.ok) {
      throw new Error(`Messages GET after creation failed: ${messagesResponse.status}`);
    }

    const messages = await messagesResponse.json();
    const testMessageExists = messages.some((msg: any) =>
      msg.email === "test@example.com" && msg.subject === "Test Subject"
    );

    if (!testMessageExists) {
      throw new Error("Test message was not created successfully");
    }
  });

  // 11. Cache Revalidation Test
  await runTest("Cache Revalidation", async () => {
    try {
      revalidatePath("/");
      revalidatePath("/projects");
      revalidatePath("/admin");
      // If we get here without errors, revalidation works
    } catch (error) {
      throw new Error(`Cache revalidation failed: ${error}`);
    }
  });

  // 12. File Upload Test (if Blob is configured)
  await runTest("File Upload Integration", async () => {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      results.push({
        test: "File Upload Integration",
        status: "SKIP",
        message: "BLOB_READ_WRITE_TOKEN not configured - file uploads will use local storage",
      });
      return;
    }

    // Create a test project with file upload
    const formData = new FormData();
    formData.append("title", "File Upload Test Project");
    formData.append("description", "Testing file upload functionality");
    formData.append("techStack", '["Test"]');

    // Create a small test image
    const testImageContent = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="; // 1x1 transparent PNG
    const testImageBlob = new Blob([Buffer.from(testImageContent, 'base64')], { type: 'image/png' });
    formData.append("imageFile", testImageBlob, "test.png");

    const response = await fetch("/api/admin/projects", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`File upload test failed: ${response.status} - ${error}`);
    }

    const result = await response.json();
    if (!result.imageUrl || !result.imageUrl.includes('vercel-storage.com')) {
      throw new Error("File upload did not use Vercel Blob as expected");
    }
  });

  // Calculate summary
  const totalTests = results.length;
  const passedTests = results.filter(r => r.status === "PASS").length;
  const failedTests = results.filter(r => r.status === "FAIL").length;
  const skippedTests = results.filter(r => r.status === "SKIP").length;

  const summary = {
    timestamp: new Date().toISOString(),
    environment: {
      node_env: process.env.NODE_ENV,
      vercel_env: process.env.VERCEL_ENV,
      vercel_url: process.env.VERCEL_URL,
      has_blob_token: !!process.env.BLOB_READ_WRITE_TOKEN,
      has_database_url: !!process.env.DATABASE_URL,
      has_admin_token: !!process.env.ADMIN_SESSION_TOKEN,
    },
    summary: {
      total: totalTests,
      passed: passedTests,
      failed: failedTests,
      skipped: skippedTests,
      success_rate: `${((passedTests / (totalTests - skippedTests)) * 100).toFixed(1)}%`,
    },
    results,
    total_duration: Date.now() - startTime,
  };

  // Log summary to console for Vercel logs
  console.log("=== ADMIN PANEL TEST SUITE RESULTS ===");
  console.log(JSON.stringify(summary, null, 2));

  return NextResponse.json(summary);
}