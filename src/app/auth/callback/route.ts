import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function isSafeRelativePath(path: string | null): boolean {
  if (!path) return false;
  return path.startsWith("/") && !path.startsWith("//") && !path.includes("\\");
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next");

  if (code) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        const destination = isSafeRelativePath(next) ? next! : "/assistant";
        return NextResponse.redirect(new URL(destination, origin));
      }
    } catch {
      // Fall through to error redirect
    }
  }

  return NextResponse.redirect(new URL("/login?error=auth_callback_failed", origin));
}
