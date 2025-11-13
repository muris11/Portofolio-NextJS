import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Force logout even if API fails
      router.push("/admin/login");
    }
  };

  return {
    handleLogout,
  };
}
