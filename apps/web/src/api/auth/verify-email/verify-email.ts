import type { FormattedError } from "@stage-locker/api-client";

import { apiClient, isFormattedError, throwValidationError } from "@stage-locker/api-client";

import type { Headers, RequestParams } from "@/web/types/api";
import type { GetVerifyEmailRequestQueryType, GetVerifyEmailResponseSuccessType } from "@/web/types/auth";

import { env } from "@/web/env";
import {
  GetVerifyEmailRequestQuerySchema,
  GetVerifyEmailResponseError400Schema,
  GetVerifyEmailResponseError401Schema,
  GetVerifyEmailResponseError404Schema,
  GetVerifyEmailResponseError500Schema,
  GetVerifyEmailResponseSuccessSchema,
} from "@/web/types/auth";

export async function verifyEmailRequest({ query, headers }: RequestParams<null, Headers, GetVerifyEmailRequestQueryType>): Promise<GetVerifyEmailResponseSuccessType> {
  try {
    const parsed = GetVerifyEmailRequestQuerySchema.safeParse(query);

    if (!parsed.success) {
      throw parsed.error;
    }

    const [data, error] = await apiClient<GetVerifyEmailResponseSuccessType>(`${env.VITE_API_PATH}/auth/verify-email?${new URLSearchParams(query)}`, {
      method: "GET",
      headers: {
        ...headers,
      },
    }, GetVerifyEmailResponseSuccessSchema, {
      400: GetVerifyEmailResponseError400Schema,
      401: GetVerifyEmailResponseError401Schema,
      404: GetVerifyEmailResponseError404Schema,
      500: GetVerifyEmailResponseError500Schema,
    });

    if (error) {
      throw error;
    }

    return data as GetVerifyEmailResponseSuccessType;
  }
  catch (error: FormattedError | unknown) {
    if (isFormattedError(error)) {
      throw error;
    }
    throw throwValidationError(error);
  }
}
