import type { FormattedError } from "@stage-locker/api-client";

import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import type { PostSendPasswordResetEmailRequestBodyType, PostSendPasswordResetEmailResponseSuccessType } from "@/web/types/auth";

import { QUERY_KEYS } from "@/web/api/auth/query-keys";
import { sendPasswordResetEmailRequest } from "@/web/api/auth/send-password-reset-email/send-password-reset-email";

type RequestParams = {
  body: PostSendPasswordResetEmailRequestBodyType;
};

export function useSendPasswordResetEmail() {
  const { i18n } = useTranslation();

  const language = i18n.language;

  const mutation = useMutation<PostSendPasswordResetEmailResponseSuccessType, FormattedError, RequestParams>({
    mutationFn: ({ body }) => sendPasswordResetEmailRequest({ body, headers: { "Accept-Language": language } }),
    mutationKey: [QUERY_KEYS.SEND_PASSWORD_RESET_EMAIL()],
  });

  return { ...mutation, sendPasswordResetEmail: mutation.mutate };
}
