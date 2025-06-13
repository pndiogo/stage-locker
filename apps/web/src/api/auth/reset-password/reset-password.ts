import type { FormattedError } from "@stage-locker/api-client";

import { apiClient, isFormattedError, throwValidationError } from "@stage-locker/api-client";
import { sanitizeAndTrimObject } from "@stage-locker/utils";

import type { Headers, RequestParams } from "@/web/types/api";
import type { PostResetPasswordRequestBodyType, PostResetPasswordResponseSuccessType } from "@/web/types/auth";

import { env } from "@/web/env";
import {
  PostResetPasswordRequestBodySchema,
  PostResetPasswordResponseError401Schema,
  PostResetPasswordResponseError404Schema,
  PostResetPasswordResponseError422Schema,
  PostResetPasswordResponseError500Schema,
  PostResetPasswordResponseSuccessSchema,
} from "@/web/types/auth";

export async function resetPasswordRequest({ body, headers }: RequestParams<PostResetPasswordRequestBodyType, Headers>): Promise<PostResetPasswordResponseSuccessType> {
  try {
    const parsed = PostResetPasswordRequestBodySchema.safeParse(sanitizeAndTrimObject(body));

    if (!parsed.success) {
      throw parsed.error;
    }
    const [data, error] = await apiClient<PostResetPasswordResponseSuccessType>(`${env.VITE_API_PATH}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(parsed.data),
    }, PostResetPasswordResponseSuccessSchema, {
      401: PostResetPasswordResponseError401Schema,
      404: PostResetPasswordResponseError404Schema,
      422: PostResetPasswordResponseError422Schema,
      500: PostResetPasswordResponseError500Schema,
    });

    if (error) {
      throw error;
    }

    if (!data) {
      throw new Error("Reset password failed");
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
