import type { FormattedError } from "@stage-locker/api-client";

import { apiClient, isFormattedError, throwValidationError } from "@stage-locker/api-client";

import type { RequestParams } from "@/web/types/api";
import type { VerifyEmailRequestQueryType, VerifyEmailResponseSuccessType } from "@/web/types/auth";

import { env } from "@/web/env";
import { VerifyEmailRequestQuerySchema, VerifyEmailResponseError400Schema, VerifyEmailResponseError401Schema, VerifyEmailResponseError404Schema, VerifyEmailResponseError500Schema, VerifyEmailResponseSuccessSchema } from "@/web/schemas/auth";

export async function verifyEmailRequest({ query }: RequestParams<null, VerifyEmailRequestQueryType>): Promise<VerifyEmailResponseSuccessType> {
  try {
    const parsed = VerifyEmailRequestQuerySchema.safeParse(query);

    if (!parsed.success) {
      throw parsed.error;
    }

    const [data, error] = await apiClient<VerifyEmailResponseSuccessType>(`${env.VITE_API_PATH}/auth/verify-email?${new URLSearchParams(query)}`, {
      method: "GET",
    }, VerifyEmailResponseSuccessSchema, {
      400: VerifyEmailResponseError400Schema,
      401: VerifyEmailResponseError401Schema,
      404: VerifyEmailResponseError404Schema,
      500: VerifyEmailResponseError500Schema,
    });

    if (error) {
      throw error;
    }

    return data as VerifyEmailResponseSuccessType;
  }
  catch (error: FormattedError | unknown) {
    if (isFormattedError(error)) {
      throw error;
    }
    throw throwValidationError(error);
  }
}
