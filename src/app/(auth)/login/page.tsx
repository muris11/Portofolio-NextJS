"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Home, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful, redirect to admin
        router.push("/admin");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neo-canvas text-black overflow-x-hidden flex flex-col">
      {/* Back to Home Button */}
      <div className="p-6 flex justify-start z-20">
        <Link
          href="/"
          className="neo-btn-secondary flex items-center gap-2 text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md">
          <div className="neo-card p-8 bg-white">
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-neo-accent border-4 border-black flex items-center justify-center mb-6 shadow-neo-sm">
                <Lock className="h-8 w-8 text-black" />
              </div>
              <h1 className="text-3xl font-black uppercase tracking-tight mb-2">
                Admin Access
              </h1>
              <p className="text-gray-600 font-medium">
                Enter your credentials to access the admin panel
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-bold uppercase flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 bg-white border-4 border-black rounded-none focus:ring-0 focus:shadow-neo transition-all placeholder:text-gray-400 font-medium"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-bold uppercase flex items-center gap-2"
                >
                  <Lock className="h-4 w-4" />
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 bg-white border-4 border-black rounded-none focus:ring-0 focus:shadow-neo transition-all placeholder:text-gray-400 font-medium"
                />
              </div>
              {error && (
                <div className="bg-red-100 border-4 border-black p-4 text-sm font-bold text-red-600 shadow-neo-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    {error}
                  </div>
                </div>
              )}
              <Button
                type="submit"
                className="neo-btn w-full flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    Sign In
                  </>
                )}
              </Button>
            </form>

            {/* Alternative Actions */}
            <div className="mt-8 pt-6 border-t-4 border-black">
              <div className="text-center">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-sm font-bold uppercase hover:underline decoration-2 underline-offset-4"
                >
                  <Home className="h-4 w-4" />
                  Return to Portfolio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
