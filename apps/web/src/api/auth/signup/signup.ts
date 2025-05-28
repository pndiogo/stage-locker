import { apiClient, throwValidationError } from "@stage-locker/api-client";
import { sanitizeAndTrimObject } from "@stage-locker/utils";

import type { RequestParams } from "@/web/types/api";
import type { SignupRequestBodyType, SignupResponseSuccessType } from "@/web/types/auth";

import { env } from "@/web/env";
import { SignupRequestBodySchema, SignupResponseSuccessSchema } from "@/web/schemas/auth";

export async function signupRequest({ body }: RequestParams<SignupRequestBodyType>): Promise<SignupResponseSuccessType> {
  const parsed = SignupRequestBodySchema.safeParse(sanitizeAndTrimObject(body));

  if (!parsed.success) {
    throwValidationError(parsed.error);
  }

  try {
    const [data, error] = await apiClient<SignupResponseSuccessType>(`${env.VITE_API_PATH}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsed.data),
    }, SignupResponseSuccessSchema);

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
