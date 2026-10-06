import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { User } from "@supabase/supabase-js";

export interface UpdateSessionResult {
  response: NextResponse;
  user: User | null;
  isConfigured: boolean;
}

/**
 * Updates the Supabase session cookies on the incoming request and outgoing response.
 * Uses getUser() to securely validate the user's JWT with the Supabase Auth service.
 */
export async function updateSession(
  request: NextRequest
): Promise<UpdateSessionResult> {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return { response, user: null, isConfigured: false };
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        response = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  // IMPORTANT: Use getUser() instead of getSession() for server-side verification
  // to ensure the JWT has not been revoked or expired.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { response, user, isConfigured: true };
}
