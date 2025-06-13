import type { FormattedError } from "@stage-locker/api-client";

import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import type { PostResetPasswordRequestBodyType, PostResetPasswordResponseSuccessType } from "@/web/types/auth";

import { QUERY_KEYS } from "@/web/api/auth/query-keys";
import { resetPasswordRequest } from "@/web/api/auth/reset-password/reset-password";

type RequestParams = {
  body: PostResetPasswordRequestBodyType;
};

export function useResetPassword() {
  const { i18n } = useTranslation();

  const language = i18n.language;

  const mutation = useMutation<PostResetPasswordResponseSuccessType, FormattedError, RequestParams>({
    mutationFn: ({ body }) => resetPasswordRequest({ body, headers: { "Accept-Language": language } }),
    mutationKey: [QUERY_KEYS.RESET_PASSWORD()],
  });

  return { ...mutation, resetPassword: mutation.mutate };
}
