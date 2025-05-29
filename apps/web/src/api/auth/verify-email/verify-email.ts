import { apiClient, throwValidationError } from "@stage-locker/api-client";

import type { RequestParams } from "@/web/types/api";
import type { VerifyEmailRequestQueryType, VerifyEmailResponseSuccessType } from "@/web/types/auth";

import { env } from "@/web/env";
import { VerifyEmailRequestQuerySchema, VerifyEmailResponseError400Schema, VerifyEmailResponseError401Schema, VerifyEmailResponseError404Schema, VerifyEmailResponseError500Schema, VerifyEmailResponseSuccessSchema } from "@/web/schemas/auth";

export async function verifyEmailRequest({ query }: RequestParams<null, VerifyEmailRequestQueryType>): Promise<VerifyEmailResponseSuccessType> {
  const parsed = VerifyEmailRequestQuerySchema.safeParse((query));

  if (!parsed.success) {
    throwValidationError(parsed.error);
  }

  try {
    const [data, error] = await apiClient<VerifyEmailResponseSuccessType>(`${env.VITE_API_PATH}/auth/verify-email?${new URLSearchParams(query)}`, {
      method: "GET",
    }, VerifyEmailResponseSuccessSchema, {
      400: VerifyEmailResponseError400Schema,
      401: VerifyEmailResponseError401Schema,
      404: VerifyEmailResponseError404Schema,
      500: VerifyEmailResponseError500Schema,
    });

    if (error) {
      throw throwValidationError(error);
    }

    if (!data) {
      throw new Error("Email verification failed");
    }

    return data;
  }
  catch (error) {
    throw throwValidationError(error);
  }
}
