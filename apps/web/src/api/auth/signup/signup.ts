import type { FormattedError } from "@stage-locker/api-client";

import { apiClient, isFormattedError, throwValidationError } from "@stage-locker/api-client";
import { sanitizeAndTrimObject } from "@stage-locker/utils";

import type { RequestParams } from "@/web/types/api";
import type { SignupRequestBodyType, SignupResponseSuccessType } from "@/web/types/auth";

import { env } from "@/web/env";
import { SignupRequestBodySchema, SignupResponseError400Schema, SignupResponseError422Schema, SignupResponseError500Schema, SignupResponseSuccessSchema } from "@/web/schemas/auth";

export async function signupRequest({ body }: RequestParams<SignupRequestBodyType>): Promise<SignupResponseSuccessType> {
  try {
    const parsed = SignupRequestBodySchema.safeParse(sanitizeAndTrimObject(body));

    if (!parsed.success) {
      throw parsed.error;
    }

    const [data, error] = await apiClient<SignupResponseSuccessType>(`${env.VITE_API_PATH}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsed.data),
    }, SignupResponseSuccessSchema, {
      400: SignupResponseError400Schema,
      422: SignupResponseError422Schema,
      500: SignupResponseError500Schema,
    });

    if (error) {
      throw error;
    }

    if (!data) {
      throw new Error("Registration failed");
    }

    return data;
  }
  catch (error: FormattedError | unknown) {
    if (isFormattedError(error)) {
      throw error;
    }
    throw throwValidationError(error);
  }
}
