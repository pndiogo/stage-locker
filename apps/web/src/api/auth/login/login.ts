import { apiClient, throwValidationError } from "@stage-locker/api-client";
import { sanitizeAndTrimObject } from "@stage-locker/utils";

import type { RequestParams } from "@/web/types/api";
import type { LoginRequestBody, LoginResponseSuccess } from "@/web/types/auth";

import { env } from "@/web/env";
import { LoginRequestBodySchema, LoginResponseError400Schema, LoginResponseError401Schema, LoginResponseError403Schema, LoginResponseError404Schema, LoginResponseError422Schema, LoginResponseError500Schema, LoginResponseSuccessSchema } from "@/web/schemas/auth";

export async function loginRequest({ body }: RequestParams<LoginRequestBody>): Promise<LoginResponseSuccess> {
  const parsed = LoginRequestBodySchema.safeParse(sanitizeAndTrimObject(body));

  if (!parsed.success) {
    throwValidationError(parsed.error);
  }

  const [data, error] = await apiClient<LoginResponseSuccess>(`${env.VITE_API_PATH}/auth/login`, {
    method: "POST",
    body: JSON.stringify(parsed.data),
  }, LoginResponseSuccessSchema, {
    400: LoginResponseError400Schema,
    401: LoginResponseError401Schema,
    403: LoginResponseError403Schema,
    404: LoginResponseError404Schema,
    422: LoginResponseError422Schema,
    500: LoginResponseError500Schema,
  });

  if (error) {
    throw throwValidationError(error);
  }

  if (!data) {
    throw new Error("Login failed");
  }

  return data;
}
