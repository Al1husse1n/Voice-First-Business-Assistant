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

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [needsEmailConfirmation, setNeedsEmailConfirmation] = useState(false);

  const rawNext = searchParams.get("next");
  const destination = isSafeRedirectPath(rawNext) ? rawNext! : "/assistant";

  const isConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const cleanEmail = email.trim();

    if (!cleanEmail || !password) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
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
      const callbackOrigin =
        typeof window !== "undefined" ? window.location.origin : "";

      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          emailRedirectTo: `${callbackOrigin}/auth/callback?next=${encodeURIComponent(
            destination
          )}`,
        },
      });

      if (error) {
        setErrorMessage(error.message);
        setIsLoading(false);
        return;
      }

      // Check whether Supabase established an immediate session or requires confirmation
      if (data.session) {
        // Immediate session: email confirmation is disabled in Supabase project
        router.refresh();
        router.push(destination);
      } else if (data.user) {
        // No session returned: Supabase requires email verification
        setNeedsEmailConfirmation(true);
        setIsLoading(false);
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred during sign-up. Please try again.";
      setErrorMessage(message);
      setIsLoading(false);
    }
  }

  if (needsEmailConfirmation) {
    return (
      <Card className="w-full max-w-[420px] bg-surface p-6 sm:p-8 border border-border rounded-2xl shadow-lg text-center">
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-accent/10 text-accent">
          <svg
            className="size-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h1 className="font-space text-2xl font-bold tracking-tight text-foreground">
          Check your email
        </h1>
        <p className="mt-2 text-sm text-muted">
          We sent a verification link to{" "}
          <strong className="text-foreground">{email}</strong>. Please check
          your inbox and follow the link to activate your account.
        </p>
        <div className="mt-6">
          <Link href={`/login${rawNext ? `?next=${encodeURIComponent(rawNext)}` : ""}`}>
            <Button variant="secondary" className="w-full">
              Back to Sign In
            </Button>
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-[420px] bg-surface p-6 sm:p-8 border border-border rounded-2xl shadow-lg">
      <div className="mb-6 text-center">
        <h1 className="font-space text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Create your account
        </h1>
        <p className="mt-2 text-sm text-muted">
          Start running your business by voice with Meri
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
            htmlFor="signup-email"
            className="mb-1.5 block text-xs font-medium text-foreground"
          >
            Email address
          </label>
          <Input
            id="signup-email"
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
            htmlFor="signup-password"
            className="mb-1.5 block text-xs font-medium text-foreground"
          >
            Password
          </label>
          <Input
            id="signup-password"
            type="password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            disabled={isLoading}
          />
        </div>

        <div>
          <label
            htmlFor="signup-confirm-password"
            className="mb-1.5 block text-xs font-medium text-foreground"
          >
            Confirm password
          </label>
          <Input
            id="signup-confirm-password"
            type="password"
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter password"
            disabled={isLoading}
          />
        </div>

        <Button
          type="submit"
          variant="accent"
          disabled={isLoading}
          className="mt-2 w-full font-semibold cursor-pointer"
        >
          {isLoading ? "Creating account…" : "Create Account"}
        </Button>
      </form>

      <div className="mt-6 border-t border-border pt-5 text-center text-xs text-muted">
        Already have an account?{" "}
        <Link
          href={`/login${rawNext ? `?next=${encodeURIComponent(rawNext)}` : ""}`}
          className="font-medium text-foreground underline underline-offset-4 hover:text-accent transition-colors"
        >
          Sign in
        </Link>
      </div>
    </Card>
  );
}

export default function SignupPage() {
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
              Loading sign up form…
            </Card>
          }
        >
          <SignupForm />
        </Suspense>
      </main>
    </div>
  );
}
