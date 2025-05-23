import { apiClient } from "@stage-locker/api-client";
import { sanitizeAndTrimObject } from "@stage-locker/utils";

import type { RequestParams } from "@/web/types/api";
import type { RegisterRequestBody, RegisterResponseSuccess } from "@/web/types/auth";

import { env } from "@/web/env";
import { RegisterRequestBodySchema, RegisterResponseSuccessSchema } from "@/web/schemas/auth";

export async function registerRequest({ body }: RequestParams<RegisterRequestBody>): Promise<RegisterResponseSuccess> {
  const parsed = RegisterRequestBodySchema.safeParse(sanitizeAndTrimObject(body));

  if (!parsed.success) {
    throw new Error(`Invalid input: ${JSON.stringify(parsed.error.flatten())}`);
  }

  const [data, error] = await apiClient<RegisterResponseSuccess>(`${env.VITE_API_PATH}/auth/register`, {
    method: "POST",
    body: JSON.stringify(parsed.data),
  }, RegisterResponseSuccessSchema);

  if (error) {
    if (error.status === 401) {
      throw new Error(error.message);
    }
    if (error.status === 403) {
      throw new Error("Account is not activated");
    }
    if (error.status === 404) {
      throw new Error("Account is not found");
    }
    if (error.status === 429) {
      throw new Error("Too many requests, please try again later");
    }
    if (error.status === 500) {
      throw new Error("Server error, please try again later");
    }
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("Login failed");
  }

  return data;
}
