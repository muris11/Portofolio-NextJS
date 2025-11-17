"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, CheckCircle, Clock, SkipForward } from "lucide-react";
import { useState } from "react";

interface TestResult {
  test: string;
  status: "PASS" | "FAIL" | "SKIP";
  message: string;
  details?: unknown;
  duration?: number;
}

interface TestSummary {
  timestamp: string;
  environment: {
    node_env: string;
    vercel_env?: string;
    vercel_url?: string;
    has_blob_token: boolean;
    has_database_url: boolean;
    has_admin_token: boolean;
  };
  summary: {
    total: number;
    passed: number;
    failed: number;
    skipped: number;
    success_rate: string;
  };
  results: TestResult[];
  total_duration: number;
}

export default function TestPage() {
  const [results, setResults] = useState<TestSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runTests = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/test");
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PASS":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "FAIL":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "SKIP":
        return <SkipForward className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PASS":
        return (
          <Badge variant="default" className="bg-green-500">
            PASS
          </Badge>
        );
      case "FAIL":
        return <Badge variant="destructive">FAIL</Badge>;
      case "SKIP":
        return <Badge variant="secondary">SKIP</Badge>;
      default:
        return <Badge variant="outline">UNKNOWN</Badge>;
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Panel Test Suite</h1>
        <p className="text-muted-foreground">
          Comprehensive testing suite untuk memverifikasi semua fungsionalitas
          admin panel
        </p>
      </div>

      <div className="mb-6">
        <Button onClick={runTests} disabled={loading} size="lg">
          {loading ? "Running Tests..." : "Run All Tests"}
        </Button>
      </div>

      {error && (
        <Card className="mb-6 border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Test Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      )}

      {results && (
        <>
          {/* Summary Card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Test Summary</CardTitle>
              <CardDescription>
                Executed at {new Date(results.timestamp).toLocaleString()}
                {" • "}
                Total duration: {(results.total_duration / 1000).toFixed(2)}s
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {results.summary.total}
                  </div>
                  <div className="text-sm text-muted-foreground">Total</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {results.summary.passed}
                  </div>
                  <div className="text-sm text-muted-foreground">Passed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {results.summary.failed}
                  </div>
                  <div className="text-sm text-muted-foreground">Failed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {results.summary.skipped}
                  </div>
                  <div className="text-sm text-muted-foreground">Skipped</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {results.summary.success_rate}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Success Rate
                  </div>
                </div>
              </div>

              {/* Environment Info */}
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Environment</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                  <div>NODE_ENV: {results.environment.node_env}</div>
                  <div>
                    Vercel ENV: {results.environment.vercel_env || "N/A"}
                  </div>
                  <div>
                    Database:{" "}
                    {results.environment.has_database_url ? "✅" : "❌"}
                  </div>
                  <div>
                    Blob Token:{" "}
                    {results.environment.has_blob_token ? "✅" : "❌"}
                  </div>
                  <div>
                    Admin Token:{" "}
                    {results.environment.has_admin_token ? "✅" : "❌"}
                  </div>
                  <div>
                    Vercel URL: {results.environment.vercel_url || "N/A"}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Results */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Detailed Results</h2>
            {results.results.map((result, index) => (
              <Card
                key={index}
                className={`${
                  result.status === "FAIL"
                    ? "border-red-200"
                    : result.status === "PASS"
                    ? "border-green-200"
                    : "border-yellow-200"
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {getStatusIcon(result.status)}
                      {result.test}
                    </CardTitle>
                    {getStatusBadge(result.status)}
                  </div>
                  {result.duration && (
                    <CardDescription>
                      Duration: {result.duration}ms
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <p
                    className={`${
                      result.status === "FAIL"
                        ? "text-red-600"
                        : result.status === "PASS"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {result.message}
                  </p>
                  {result.details != null && (
                    <details className="mt-2">
                      <summary className="cursor-pointer text-sm font-medium">
                        Show Details
                      </summary>
                      <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-auto">
                        {typeof result.details === "string"
                          ? result.details
                          : JSON.stringify(result.details, null, 2)}
                      </pre>
                    </details>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {!results && !loading && !error && (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Click &quot;Run All Tests&quot; to start the comprehensive test
              suite
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
