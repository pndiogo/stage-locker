import type { ZodError, ZodFormattedError, ZodSchema } from "zod";

type RequestInfo = string | Request;

export type FormattedError = {
  message: string;
  details: {
    fieldErrors?: Record<string, string[] | undefined>;
    formErrors?: string[];
    [key: string]: unknown;
  };
  status?: number;
  isClientValidation?: boolean;
  raw?: unknown;
};

export function formatError(error: unknown): FormattedError {
  // 0. If already a FormattedError, return as is
  if (
    error
    && typeof error === "object"
    && "message" in error
    && "details" in error
  ) {
    return error as FormattedError;
  }

  // 1. ZodError instance (client-side validation)
  if (error && typeof error === "object" && "flatten" in error && typeof (error as any).flatten === "function") {
    const zodError = error as ZodError<any>;
    const flat = zodError.flatten();
    return {
      message: "Invalid input",
      details: {
        fieldErrors: flat.fieldErrors,
        formErrors: flat.formErrors,
      },
      isClientValidation: true,
      raw: error,
    };
  }

  // 2. ZodFormattedError (from API or client)
  if (
    error
    && typeof error === "object"
    && "formErrors" in error
    && "fieldErrors" in error
  ) {
    return {
      message: "Invalid input",
      details: {
        fieldErrors: (error as any).fieldErrors,
        formErrors: (error as any).formErrors,
      },
      raw: error,
    };
  }

  // 3. API error object with .details (ApiError shape)
  if (
    error
    && typeof error === "object"
    && "details" in error
    && (typeof (error as any).details === "object")
  ) {
    const details = (error as any).details;
    if (details && "formErrors" in details && "fieldErrors" in details) {
      return {
        message: (error as any).message || "Invalid input",
        details: {
          fieldErrors: details.fieldErrors,
          formErrors: details.formErrors,
        },
        status: (error as any).status,
        raw: error,
      };
    }
    if (details && "message" in details && typeof details.message === "string") {
      return {
        message: details.message,
        details: {},
        status: (error as any).status,
        raw: error,
      };
    }
  }

  // 4. Plain { message: string } error (API or thrown)
  if (
    error
    && typeof error === "object"
    && "message" in error
    && typeof (error as any).message === "string"
  ) {
    return {
      message: (error as any).message,
      details: {},
      raw: error,
    };
  }

  // 5. Fallback for unexpected errors
  return {
    message: "An unknown error occurred.",
    details: {},
    raw: error,
  };
}

export async function apiClient<T>(
  input: RequestInfo,
  init: RequestInit | undefined,
  responseSuccessSchema?: ZodSchema<T>,
  responseErrorSchemas?: Record<number, ZodSchema<any>>,
): Promise<[T | null, FormattedError | null]> {
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
      return [null, formatError({ ...(typeof details === "object" && details !== null ? details : {}), status: res.status })];
    }

    const json = await res.json();

    if (responseSuccessSchema) {
      const parsed = responseSuccessSchema.safeParse(json);
      if (!parsed.success) {
        return [null, formatError(parsed.error)];
      }
      return [parsed.data, null];
    }

    return [json as T, null];
  }
  catch (e) {
    return [null, formatError(e)];
  }
}

export function throwValidationError(
  error: ZodError<any> | ZodFormattedError<any> | unknown,
): never {
  throw formatError(error);
}

export function getApiErrorDetails(error: unknown) {
  if (
    error
    && typeof error === "object"
    && "details" in error
  ) {
    return (error as any).details;
  }
  return undefined;
}
