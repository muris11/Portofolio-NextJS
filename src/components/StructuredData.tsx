interface StructuredDataProps {
  type: "Person" | "WebSite" | "Organization";
  data: Record<string, unknown>;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}

// Helper function to generate person structured data
export function generatePersonStructuredData(
  profile: {
    fullName?: string | null;
    title?: string | null;
    bio?: string | null;
    githubUrl?: string | null;
    linkedinUrl?: string | null;
    instagramUrl?: string | null;
  } | null
) {
  return {
    name: profile?.fullName || "Rifqy",
    jobTitle: profile?.title || "Fullstack Developer",
    description:
      profile?.bio ||
      "A skilled fullstack developer specializing in modern web technologies",
    url: "https://rifqy.dev",
    sameAs: [
      profile?.githubUrl,
      profile?.linkedinUrl,
      profile?.instagramUrl,
    ].filter(Boolean),
    knowsAbout: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Tailwind CSS",
      "Fullstack Development",
    ],
    programmingLanguage: ["JavaScript", "TypeScript", "Python", "SQL"],
  };
}

// Helper function to generate website structured data
export function generateWebsiteStructuredData() {
  return {
    name: "Rifqy.Dev - Fullstack Developer Portfolio",
    description:
      "Professional portfolio showcasing modern web development projects, skills, and experience",
    url: "https://rifqy.dev",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://rifqy.dev/projects?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
}
