import { apiClient, throwValidationError } from "@stage-locker/api-client";
import { sanitizeAndTrimObject } from "@stage-locker/utils";

import type { RequestParams } from "@/web/types/api";
import type { RegisterRequestBody, RegisterResponseSuccess } from "@/web/types/auth";

import { env } from "@/web/env";
import { RegisterRequestBodySchema, RegisterResponseSuccessSchema } from "@/web/schemas/auth";

export async function registerRequest({ body }: RequestParams<RegisterRequestBody>): Promise<RegisterResponseSuccess> {
  const parsed = RegisterRequestBodySchema.safeParse(sanitizeAndTrimObject(body));

  if (!parsed.success) {
    throwValidationError(parsed.error);
  }

  try {
    const [data, error] = await apiClient<RegisterResponseSuccess>(`${env.VITE_API_PATH}/auth/register`, {
      method: "POST",
      body: JSON.stringify(parsed.data),
    }, RegisterResponseSuccessSchema);

    if (error) {
      throw throwValidationError(error);
    }

    if (!data) {
      throw new Error("Registration failed");
    }

    return data;
  }
  catch (error) {
    throw throwValidationError(error);
  }
}
