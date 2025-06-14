import type { FormattedError } from "@stage-locker/api-client";

import { apiClient, isFormattedError, throwValidationError } from "@stage-locker/api-client";
import { sanitizeAndTrimObject } from "@stage-locker/utils";

import type { Headers, RequestParams } from "@/web/types/api";
import type { PostSendPasswordResetEmailRequestBodyType, PostSendPasswordResetEmailResponseSuccessType } from "@/web/types/auth";

import { env } from "@/web/env";
import {
  PostSendPasswordResetEmailRequestBodySchema,
  PostSendPasswordResetEmailResponseError403Schema,
  PostSendPasswordResetEmailResponseError422Schema,
  PostSendPasswordResetEmailResponseError429Schema,
  PostSendPasswordResetEmailResponseError500Schema,
  PostSendPasswordResetEmailResponseSuccessSchema,
} from "@/web/types/auth";

export async function sendPasswordResetEmailRequest({ body, headers }: RequestParams<PostSendPasswordResetEmailRequestBodyType, Headers>): Promise<PostSendPasswordResetEmailResponseSuccessType> {
  try {
    const parsed = PostSendPasswordResetEmailRequestBodySchema.safeParse(sanitizeAndTrimObject(body));

    if (!parsed.success) {
      throw parsed.error;
    }
    const [data, error] = await apiClient<PostSendPasswordResetEmailResponseSuccessType>(`${env.VITE_API_PATH}/auth/send-password-reset-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(parsed.data),
    }, PostSendPasswordResetEmailResponseSuccessSchema, {
      403: PostSendPasswordResetEmailResponseError403Schema,
      422: PostSendPasswordResetEmailResponseError422Schema,
      429: PostSendPasswordResetEmailResponseError429Schema,
      500: PostSendPasswordResetEmailResponseError500Schema,
    });

    if (error) {
      throw error;
    }

    return data as undefined;
  }
  catch (error: FormattedError | unknown) {
    if (isFormattedError(error)) {
      throw error;
    }
    throw throwValidationError(error);
  }
}
