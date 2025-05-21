import type { ZodSchema } from "zod";

export type ApiError = {
  status: number;
  message: string;
  details?: unknown;
};

type RequestInfo = string | Request;

export async function apiClient<T>(
  input: RequestInfo,
  init: RequestInit | undefined,
  schema?: ZodSchema<T>,
): Promise<[T | null, ApiError | null]> {
  try {
    const res = await fetch(input, init);

    if (!res.ok) {
      let details: unknown;
      try {
        details = await res.json();
      }
      catch { }
      return [
        null,
        {
          status: res.status,
          message:
            typeof details === "object"
            && details !== null
            && "message" in details
            && typeof (details as any).message === "string"
              ? (details as any).message
              : res.statusText || "Unknown error",
          details,
        },
      ];
    }

    const json = await res.json();

    if (schema) {
      const parsed = schema.safeParse(json);
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
