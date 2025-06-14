import type { FormattedError } from "@stage-locker/api-client";

import { apiClient, isFormattedError, throwValidationError } from "@stage-locker/api-client";

import type { Headers, RequestParams } from "@/web/types/api";
import type { PostVerifyEmailRequestQueryType, PostVerifyEmailResponseSuccessType } from "@/web/types/auth";

import { env } from "@/web/env";
import {
  PostVerifyEmailRequestQuerySchema,
  PostVerifyEmailResponseError400Schema,
  PostVerifyEmailResponseError401Schema,
  PostVerifyEmailResponseError404Schema,
  PostVerifyEmailResponseError500Schema,
  PostVerifyEmailResponseSuccessSchema,
} from "@/web/types/auth";

export async function verifyEmailRequest({ query, headers }: RequestParams<null, Headers, PostVerifyEmailRequestQueryType>): Promise<PostVerifyEmailResponseSuccessType> {
  try {
    const parsed = PostVerifyEmailRequestQuerySchema.safeParse(query);

    if (!parsed.success) {
      throw parsed.error;
    }

    const [data, error] = await apiClient<PostVerifyEmailResponseSuccessType>(`${env.VITE_API_PATH}/auth/verify-email?${new URLSearchParams(query)}`, {
      method: "GET",
      headers: {
        ...headers,
      },
    }, PostVerifyEmailResponseSuccessSchema, {
      400: PostVerifyEmailResponseError400Schema,
      401: PostVerifyEmailResponseError401Schema,
      404: PostVerifyEmailResponseError404Schema,
      500: PostVerifyEmailResponseError500Schema,
    });

    console.log("🚀 ~ const[data,error]=awaitapiClient<PostVerifyEmailResponseSuccessType> ~ data:", data);
    console.log("🚀 ~ const[data,error]=awaitapiClient<PostVerifyEmailResponseSuccessType> ~ error:", error);
    if (error) {
      throw error;
    }

    return data as PostVerifyEmailResponseSuccessType;
  }
  catch (error: FormattedError | unknown) {
    if (isFormattedError(error)) {
      throw error;
    }
    throw throwValidationError(error);
  }
}
