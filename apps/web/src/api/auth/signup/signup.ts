import type { FormattedError } from "@stage-locker/api-client";

import { apiClient, isFormattedError, throwValidationError } from "@stage-locker/api-client";
import { sanitizeAndTrimObject } from "@stage-locker/utils";

import type { RequestParams } from "@/web/types/api";
import type { PostSignupRequestBodyType, PostSignupResponseSuccessType } from "@/web/types/auth";

import { env } from "@/web/env";
import {
  PostSignupRequestBodySchema,
  PostSignupResponseError400Schema,
  PostSignupResponseError422Schema,
  PostSignupResponseError500Schema,
  PostSignupResponseSuccessSchema,
} from "@/web/types/auth";

export async function signupRequest({ body }: RequestParams<PostSignupRequestBodyType>): Promise<PostSignupResponseSuccessType> {
  try {
    const parsed = PostSignupRequestBodySchema.safeParse(sanitizeAndTrimObject(body));

    if (!parsed.success) {
      throw parsed.error;
    }

    const [data, error] = await apiClient<PostSignupResponseSuccessType>(`${env.VITE_API_PATH}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsed.data),
    }, PostSignupResponseSuccessSchema, {
      400: PostSignupResponseError400Schema,
      422: PostSignupResponseError422Schema,
      500: PostSignupResponseError500Schema,
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
