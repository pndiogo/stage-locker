import type { FormattedError } from "@stage-locker/api-client";

import { apiClient, isFormattedError, throwValidationError } from "@stage-locker/api-client";
import { sanitizeAndTrimObject } from "@stage-locker/utils";

import type { Headers, RequestParams } from "@/web/types/api";
import type { PostSendVerificationEmailWithEmailRequestBodyType, PostSendVerificationEmailWithEmailResponseSuccessType } from "@/web/types/auth";

import { env } from "@/web/env";
import {
  PostSendVerificationEmailWithEmailRequestBodySchema,
  PostSendVerificationEmailWithEmailResponseError400Schema,
  PostSendVerificationEmailWithEmailResponseError404Schema,
  PostSendVerificationEmailWithEmailResponseError422Schema,
  PostSendVerificationEmailWithEmailResponseError429Schema,
  PostSendVerificationEmailWithEmailResponseError500Schema,
  PostSendVerificationEmailWithEmailResponseSuccessSchema,
} from "@/web/types/auth";

export async function sendVerificationEmailWithEmailRequest({ body, headers }: RequestParams<PostSendVerificationEmailWithEmailRequestBodyType, Headers>): Promise<PostSendVerificationEmailWithEmailResponseSuccessType> {
  try {
    const parsed = PostSendVerificationEmailWithEmailRequestBodySchema.safeParse(sanitizeAndTrimObject(body));

    if (!parsed.success) {
      throw parsed.error;
    }

    const [data, error] = await apiClient<PostSendVerificationEmailWithEmailResponseSuccessType>(`${env.VITE_API_PATH}/auth/send-verification-email-with-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(parsed.data),
    }, PostSendVerificationEmailWithEmailResponseSuccessSchema, {
      400: PostSendVerificationEmailWithEmailResponseError400Schema,
      404: PostSendVerificationEmailWithEmailResponseError404Schema,
      422: PostSendVerificationEmailWithEmailResponseError422Schema,
      429: PostSendVerificationEmailWithEmailResponseError429Schema,
      500: PostSendVerificationEmailWithEmailResponseError500Schema,
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
