"use client";

import React, { Suspense, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MeriLogo } from "@/components/landing/meri-logo";
import { ThemeToggle } from "@/components/theme-toggle";

function isSafeRedirectPath(path: string | null): boolean {
  if (!path) return false;
  return path.startsWith("/") && !path.startsWith("//") && !path.includes("\\");
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const rawNext = searchParams.get("next");
  const destination = isSafeRedirectPath(rawNext) ? rawNext! : "/assistant";

  const isConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    if (!isConfigured) {
      setErrorMessage(
        "Supabase credentials are not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local."
      );
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setErrorMessage(error.message);
        setIsLoading(false);
        return;
      }

      if (data.user) {
        // Force refresh server components and navigate to protected destination
        router.refresh();
        router.push(destination);
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred during sign-in. Please try again.";
      setErrorMessage(message);
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-[420px] bg-surface p-6 sm:p-8 border border-border rounded-2xl shadow-lg">
      <div className="mb-6 text-center">
        <h1 className="font-space text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-muted">
          Sign in to your Meri business assistant
        </p>
      </div>

      {!isConfigured && (
        <div className="mb-6 rounded-xl border border-warning/30 bg-warning/10 p-3.5 text-xs text-warning">
          <p className="font-semibold">Setup Required</p>
          <p className="mt-1">
            Supabase environment variables are missing. Configure{" "}
            <code className="rounded bg-background/50 px-1 py-0.5 font-mono">
              NEXT_PUBLIC_SUPABASE_URL
            </code>{" "}
            and{" "}
            <code className="rounded bg-background/50 px-1 py-0.5 font-mono">
              NEXT_PUBLIC_SUPABASE_ANON_KEY
            </code>{" "}
            in your <code className="font-mono">.env.local</code>.
          </p>
        </div>
      )}

      {errorMessage && (
        <div
          role="alert"
          className="mb-5 rounded-xl border border-error/30 bg-error/10 p-3.5 text-sm text-error"
        >
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-xs font-medium text-foreground"
          >
            Email address
          </label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@business.com"
            disabled={isLoading}
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-1.5 block text-xs font-medium text-foreground"
          >
            Password
          </label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            disabled={isLoading}
          />
        </div>

        <Button
          type="submit"
          variant="accent"
          disabled={isLoading}
          className="mt-2 w-full font-semibold cursor-pointer"
        >
          {isLoading ? "Signing in…" : "Sign In"}
        </Button>
      </form>

      <div className="mt-6 border-t border-border pt-5 text-center text-xs text-muted">
        Don&apos;t have an account?{" "}
        <Link
          href={`/signup${rawNext ? `?next=${encodeURIComponent(rawNext)}` : ""}`}
          className="font-medium text-foreground underline underline-offset-4 hover:text-accent transition-colors"
        >
          Create one now
        </Link>
      </div>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-200">
      <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-border bg-background px-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2">
          <MeriLogo />
        </Link>
        <ThemeToggle />
      </header>

      <main className="flex flex-1 items-center justify-center p-4 sm:p-8">
        <Suspense
          fallback={
            <Card className="w-full max-w-[420px] p-8 text-center text-sm text-muted">
              Loading sign in form…
            </Card>
          }
        >
          <LoginForm />
        </Suspense>
      </main>
    </div>
  );
}
