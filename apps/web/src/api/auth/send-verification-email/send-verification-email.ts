import type { FormattedError } from "@stage-locker/api-client";

import { apiClient, isFormattedError, throwValidationError } from "@stage-locker/api-client";
import { sanitizeAndTrimObject } from "@stage-locker/utils";

import type { RequestParams } from "@/web/types/api";
import type { PostSendVerificationEmailRequestBodyType, PostSendVerificationEmailResponseSuccessType } from "@/web/types/auth";

import { env } from "@/web/env";
import {
  PostSendVerificationEmailRequestBodySchema,
  PostSendVerificationEmailResponseError400Schema,
  PostSendVerificationEmailResponseError404Schema,
  PostSendVerificationEmailResponseError422Schema,
  PostSendVerificationEmailResponseError429Schema,
  PostSendVerificationEmailResponseError500Schema,
  PostSendVerificationEmailResponseSuccessSchema,
} from "@/web/types/auth";

export async function sendVerificationEmailRequest({ body }: RequestParams<PostSendVerificationEmailRequestBodyType>): Promise<PostSendVerificationEmailResponseSuccessType> {
  try {
    const parsed = PostSendVerificationEmailRequestBodySchema.safeParse(sanitizeAndTrimObject(body));

    if (!parsed.success) {
      throw parsed.error;
    }

    const [data, error] = await apiClient<PostSendVerificationEmailResponseSuccessType>(`${env.VITE_API_PATH}/auth/send-verification-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsed.data),
    }, PostSendVerificationEmailResponseSuccessSchema, {
      400: PostSendVerificationEmailResponseError400Schema,
      404: PostSendVerificationEmailResponseError404Schema,
      422: PostSendVerificationEmailResponseError422Schema,
      429: PostSendVerificationEmailResponseError429Schema,
      500: PostSendVerificationEmailResponseError500Schema,
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
