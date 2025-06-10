import type { FormattedError } from "@stage-locker/api-client";

import { apiClient, isFormattedError, throwValidationError } from "@stage-locker/api-client";
import { sanitizeAndTrimObject } from "@stage-locker/utils";

import type { RequestParams } from "@/web/types/api";
import type { PostLoginRequestBodyType, PostLoginResponseSuccessType } from "@/web/types/auth";

import { env } from "@/web/env";
import {
  PostLoginRequestBodySchema,
  PostLoginResponseError400Schema,
  PostLoginResponseError401Schema,
  PostLoginResponseError403Schema,
  PostLoginResponseError404Schema,
  PostLoginResponseError422Schema,
  PostLoginResponseError500Schema,
  PostLoginResponseSuccessSchema,
} from "@/web/types/auth";

export async function loginRequest({ body }: RequestParams<PostLoginRequestBodyType>): Promise<PostLoginResponseSuccessType> {
  try {
    const parsed = PostLoginRequestBodySchema.safeParse(sanitizeAndTrimObject(body));

    if (!parsed.success) {
      throw parsed.error;
    }
    const [data, error] = await apiClient<PostLoginResponseSuccessType>(`${env.VITE_API_PATH}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsed.data),
    }, PostLoginResponseSuccessSchema, {
      400: PostLoginResponseError400Schema,
      401: PostLoginResponseError401Schema,
      403: PostLoginResponseError403Schema,
      404: PostLoginResponseError404Schema,
      422: PostLoginResponseError422Schema,
      500: PostLoginResponseError500Schema,
    });

    if (error) {
      throw error;
    }

    if (!data) {
      throw new Error("Login failed");
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
