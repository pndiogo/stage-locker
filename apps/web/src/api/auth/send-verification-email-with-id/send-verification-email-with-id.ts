import type { FormattedError } from "@stage-locker/api-client";

import { apiClient, isFormattedError, throwValidationError } from "@stage-locker/api-client";
import { sanitizeAndTrimObject } from "@stage-locker/utils";

import type { Headers, RequestParams } from "@/web/types/api";
import type { PostSendVerificationEmailWithIdRequestBodyType, PostSendVerificationEmailWithIdResponseSuccessType } from "@/web/types/auth";

import { env } from "@/web/env";
import {
  PostSendVerificationEmailWithIdRequestBodySchema,
  PostSendVerificationEmailWithIdResponseError400Schema,
  PostSendVerificationEmailWithIdResponseError404Schema,
  PostSendVerificationEmailWithIdResponseError422Schema,
  PostSendVerificationEmailWithIdResponseError429Schema,
  PostSendVerificationEmailWithIdResponseError500Schema,
  PostSendVerificationEmailWithIdResponseSuccessSchema,
} from "@/web/types/auth";

export async function sendVerificationEmailWithIdRequest({ body, headers }: RequestParams<PostSendVerificationEmailWithIdRequestBodyType, Headers>): Promise<PostSendVerificationEmailWithIdResponseSuccessType> {
  try {
    const parsed = PostSendVerificationEmailWithIdRequestBodySchema.safeParse(sanitizeAndTrimObject(body));

    if (!parsed.success) {
      throw parsed.error;
    }

    const [data, error] = await apiClient<PostSendVerificationEmailWithIdResponseSuccessType>(`${env.VITE_API_PATH}/auth/send-verification-email-with-id`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(parsed.data),
    }, PostSendVerificationEmailWithIdResponseSuccessSchema, {
      400: PostSendVerificationEmailWithIdResponseError400Schema,
      404: PostSendVerificationEmailWithIdResponseError404Schema,
      422: PostSendVerificationEmailWithIdResponseError422Schema,
      429: PostSendVerificationEmailWithIdResponseError429Schema,
      500: PostSendVerificationEmailWithIdResponseError500Schema,
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
