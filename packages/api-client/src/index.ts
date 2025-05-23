import type { ZodSchema } from "zod";

import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";

type ApiError = {
  status: number;
  message: string;
  details?: unknown;
};

type RequestInfo = string | Request;

export async function apiClient<T>(
  input: RequestInfo,
  init: RequestInit | undefined,
  responseSuccessSchema?: ZodSchema<T>,
  responseErrorSchemas?: Record<number, ZodSchema<any>>,
): Promise<[T | null, ApiError | null]> {
  try {
    const res = await fetch(input, init);

    if (!res.ok) {
      let details: unknown;
      try {
        details = await res.json();

        if (responseErrorSchemas && responseErrorSchemas[res.status]) {
          const parsed = responseErrorSchemas[res.status].safeParse(details);
          if (parsed.success) {
            details = parsed.data;
          }
        }
      }
      catch { }
      return [
        null,
        {
          status: res.status,
          message:
            // Prefer Zod validation error messages if present
            typeof details === "object"
              && details !== null
              && "error" in details
              && details.error
              && Array.isArray((details.error as any).issues)
              ? (details.error as any).issues.map(
                (issue: any) =>
                  `${issue.path?.join(".") ?? ""}: ${issue.message ?? "Validation error"}`,
              ).join("; ")
              // Otherwise, use a plain message if present
              : typeof details === "object"
                && details !== null
                && "message" in details
                && typeof (details as any).message === "string"
                ? (details as any).message
                // Fallback to status text or generic
                : res.statusText || "Unknown error",
          details,
        },
      ];
    }

    const json = await res.json();

    if (responseSuccessSchema) {
      const parsed = responseSuccessSchema.safeParse(json);
      if (!parsed.success) {
        return [
          null,
          {
            status: 0,
            message: "Response validation failed",
            details: parsed.error.flatten(),
          },
        ];
      }
      return [parsed.data, null];
    }

    return [json as T, null];
  }
  catch (e) {
    return [
      null,
      {
        status: 0,
        message: e instanceof Error ? e.message : "Network error",
      },
    ];
  }
}

function formatApiErrorDetails(apiError: ApiError): string {
  // Handle Zod validation error format
  if (
    apiError.details
    && typeof apiError.details === "object"
    && "error" in apiError.details
    && apiError.details.error
    && Array.isArray((apiError.details.error as any).issues)
  ) {
    const issues = (apiError.details.error as any).issues as Array<{ path: string[]; message?: string }>;
    return issues
      .map(
        issue =>
          `${issue.path.join(".")}: ${issue.message || "Validation error"}`,
      )
      .join("; ");
  }

  // Handle simple message
  if (
    apiError.details
    && typeof apiError.details === "object"
    && "message" in apiError.details
    && typeof (apiError.details as any).message === "string"
  ) {
    return (apiError.details as any).message;
  }

  // Fallback to apiError.message or generic
  if (apiError.message) {
    return apiError.message;
  }

  if (apiError.status === 0) {
    return "Network error. Please check your connection.";
  }

  return "No additional error details available.";
}

export function mapApiError(error: ApiError): string {
  switch (error.status) {
    case HttpStatusCodes.BAD_REQUEST:
      return `${HttpStatusPhrases.BAD_REQUEST}. Details: ${formatApiErrorDetails(error)}`;
    case HttpStatusCodes.UNAUTHORIZED:
      return `${HttpStatusPhrases.UNAUTHORIZED}. Details: ${formatApiErrorDetails(error)}`;
    case HttpStatusCodes.FORBIDDEN:
      return `${HttpStatusPhrases.FORBIDDEN}. Details: ${formatApiErrorDetails(error)}`;
    case HttpStatusCodes.NOT_FOUND:
      return `${HttpStatusPhrases.NOT_FOUND}. Details: ${formatApiErrorDetails(error)}`;
    case HttpStatusCodes.CONFLICT:
      return `${HttpStatusPhrases.CONFLICT}. Details: ${formatApiErrorDetails(error)}`;
    case HttpStatusCodes.UNPROCESSABLE_ENTITY:
      return `${HttpStatusPhrases.UNPROCESSABLE_ENTITY}.  Details: ${formatApiErrorDetails(error)}`;
    case HttpStatusCodes.TOO_MANY_REQUESTS:
      return `${HttpStatusPhrases.TOO_MANY_REQUESTS}. Details: ${formatApiErrorDetails(error)}`;
    case HttpStatusCodes.INTERNAL_SERVER_ERROR:
      return `${HttpStatusPhrases.INTERNAL_SERVER_ERROR}. Details: ${formatApiErrorDetails(error)}`;
    default:
      return error.message || "An unknown error occurred.";
  }
}
