import { getApiBaseUrl } from "@/lib/config";
import { createClient } from "@/lib/supabase/client";
import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  ApiFailure,
  ApiResult,
  CreateEventRequest,
  CreateEventSuccess,
  HealthSuccess,
  QueryRequest,
  QuerySuccess,
} from "@/lib/api/types";

/**
 * Retrieves the current Supabase session JWT in the browser and formats
 * the Authorization header. Prepared for authenticated requests to FastAPI.
 */
export async function getAuthHeaders(
  client?: SupabaseClient,
): Promise<Record<string, string>> {
  if (typeof window === "undefined" && !client) {
    return {};
  }
  try {
    const supabase = client ?? createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const token = session?.access_token?.trim();
    if (token && token !== "undefined" && token !== "null") {
      return { Authorization: `Bearer ${token}` };
    }
  } catch {
    // Graceful fallback when unconfigured or client unavailable
  }
  return {};
}

const CONNECTIVITY_MESSAGE =
  "Unable to connect to the business service. Please try again.";

const CONFIG_MESSAGE =
  "Backend URL is not configured. Set NEXT_PUBLIC_API_URL and restart the app.";

const AUTH_REQUIRED_MESSAGE =
  "Authentication required. Please sign in to continue.";

type ErrorPayload = {
  success?: boolean;
  status?: string;
  message?: string;
  detail?: string;
  missing_fields?: unknown;
  error?: {
    code?: string;
    message?: string;
  };
};

function asStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) {
    return undefined;
  }
  const fields = value.filter((item): item is string => typeof item === "string");
  return fields.length > 0 ? fields : undefined;
}

function failureFromPayload(
  payload: ErrorPayload | null,
  httpStatus: number,
): ApiFailure {
  const missing = asStringArray(payload?.missing_fields);
  const code =
    payload?.error?.code ?? (httpStatus === 401 ? "UNAUTHORIZED" : undefined);
  const isClarification =
    payload?.status === "needs_clarification" ||
    code === "NEEDS_CLARIFICATION" ||
    Boolean(missing?.length);

  const message =
    payload?.message ||
    payload?.error?.message ||
    payload?.detail ||
    "The business service could not complete this request.";

  return {
    ok: false,
    kind: isClarification ? "clarification" : "error",
    message,
    code,
    missing_fields: missing,
    status: httpStatus,
  };
}

async function readJson(response: Response): Promise<unknown | null> {
  const text = await response.text();
  if (!text) {
    return null;
  }
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return null;
  }
}

interface RequestOptions {
  requiresAuth?: boolean;
}

function extractHeader(headers: HeadersInit | undefined, name: string): string | null {
  if (!headers) return null;
  if (typeof Headers !== "undefined" && headers instanceof Headers) {
    return headers.get(name);
  }
  if (Array.isArray(headers)) {
    const entry = headers.find(([k]) => k.toLowerCase() === name.toLowerCase());
    return entry ? entry[1] : null;
  }
  const rec = headers as Record<string, string>;
  for (const k of Object.keys(rec)) {
    if (k.toLowerCase() === name.toLowerCase()) {
      return rec[k];
    }
  }
  return null;
}

async function request(
  path: string,
  init: RequestInit,
  options: RequestOptions = {},
): Promise<{ response: Response; body: unknown | null } | ApiFailure> {
  const baseUrl = getApiBaseUrl();
  if (!baseUrl) {
    return { ok: false, kind: "config", message: CONFIG_MESSAGE };
  }

  let authHeaders: Record<string, string> = {};
  if (options.requiresAuth) {
    const explicitAuth = extractHeader(init.headers, "Authorization");
    const validExplicitAuth = Boolean(
      explicitAuth &&
        explicitAuth.trim().length > 0 &&
        explicitAuth !== "Bearer undefined" &&
        explicitAuth !== "Bearer null",
    );

    if (validExplicitAuth) {
      authHeaders = {};
    } else {
      authHeaders = await getAuthHeaders();
      const tokenHeader = authHeaders.Authorization;
      if (
        !tokenHeader ||
        !tokenHeader.trim() ||
        tokenHeader === "Bearer undefined" ||
        tokenHeader === "Bearer null"
      ) {
        return {
          ok: false,
          kind: "error",
          message: AUTH_REQUIRED_MESSAGE,
          status: 401,
          code: "UNAUTHORIZED",
        };
      }
    }
  }

  try {
    const requestHeaders = new Headers(init.headers);
    if (!requestHeaders.has("Accept")) {
      requestHeaders.set("Accept", "application/json");
    }
    if (init.body && !requestHeaders.has("Content-Type")) {
      requestHeaders.set("Content-Type", "application/json");
    }
    if (authHeaders.Authorization && !requestHeaders.has("Authorization")) {
      requestHeaders.set("Authorization", authHeaders.Authorization);
    }

    const response = await fetch(`${baseUrl}${path}`, {
      ...init,
      headers: requestHeaders,
    });
    const body = await readJson(response);
    return { response, body };
  } catch {
    return { ok: false, kind: "network", message: CONNECTIVITY_MESSAGE };
  }
}

export async function healthCheck(): Promise<ApiResult<HealthSuccess>> {
  const result = await request("/api/v1/health", { method: "GET" });
  if ("ok" in result) {
    return result;
  }

  const { response, body } = result;
  if (!response.ok) {
    return failureFromPayload(
      (body ?? {}) as ErrorPayload,
      response.status,
    );
  }

  const payload = body as HealthSuccess | null;
  if (!payload || typeof payload.status !== "string") {
    return {
      ok: false,
      kind: "error",
      message: "The business service returned an unexpected health response.",
      status: response.status,
    };
  }

  return { ok: true, data: payload, status: response.status };
}

export async function createEvent(
  payload: CreateEventRequest,
  initHeaders?: HeadersInit,
): Promise<ApiResult<CreateEventSuccess>> {
  const result = await request(
    "/api/v1/events",
    {
      method: "POST",
      body: JSON.stringify(payload),
      headers: initHeaders,
    },
    { requiresAuth: true },
  );
  if ("ok" in result) {
    return result;
  }

  const { response, body } = result;
  const parsed = (body ?? {}) as ErrorPayload & {
    event?: CreateEventSuccess["event"];
    message?: string;
  };

  if (!response.ok || parsed.success === false) {
    return failureFromPayload(parsed, response.status);
  }

  if (parsed.success !== true || !parsed.event || !parsed.message) {
    return {
      ok: false,
      kind: "error",
      message: "The business service returned an unexpected event response.",
      status: response.status,
    };
  }

  return {
    ok: true,
    data: {
      success: true,
      event: parsed.event,
      message: parsed.message,
    },
    status: response.status,
  };
}

export async function queryBusiness(
  payload: QueryRequest,
  initHeaders?: HeadersInit,
): Promise<ApiResult<QuerySuccess>> {
  const result = await request(
    "/api/v1/query",
    {
      method: "POST",
      body: JSON.stringify(payload),
      headers: initHeaders,
    },
    { requiresAuth: true },
  );
  if ("ok" in result) {
    return result;
  }

  const { response, body } = result;
  const parsed = (body ?? {}) as ErrorPayload & {
    query_type?: string;
    result?: unknown;
  };

  if (!response.ok || parsed.success === false) {
    return failureFromPayload(parsed, response.status);
  }

  if (parsed.success !== true || typeof parsed.message !== "string") {
    return {
      ok: false,
      kind: "error",
      message: "The business service returned an unexpected query response.",
      status: response.status,
    };
  }

  return {
    ok: true,
    data: {
      success: true,
      query_type: parsed.query_type,
      result: parsed.result,
      message: parsed.message,
    },
    status: response.status,
  };
}
