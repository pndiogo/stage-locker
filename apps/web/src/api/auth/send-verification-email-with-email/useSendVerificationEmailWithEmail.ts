import type { FormattedError } from "@stage-locker/api-client";

import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import type { PostSendVerificationEmailWithEmailRequestBodyType, PostSendVerificationEmailWithEmailResponseSuccessType } from "@/web/types/auth";

import { QUERY_KEYS } from "@/web/api/auth/query-keys";
import { sendVerificationEmailWithEmailRequest } from "@/web/api/auth/send-verification-email-with-email/send-verification-email-with-email";

type RequestParams = {
  body: PostSendVerificationEmailWithEmailRequestBodyType;
};

export function useSendVerificationEmailWithEmail() {
  const { i18n } = useTranslation();
  const language = i18n.language;

  const mutation = useMutation<PostSendVerificationEmailWithEmailResponseSuccessType, FormattedError, RequestParams>({
    mutationFn: ({ body }) => sendVerificationEmailWithEmailRequest({ body, headers: { "Accept-Language": language } }),
    mutationKey: [QUERY_KEYS.SEND_VERIFICATION_EMAIL_WITH_EMAIL()],
  });

  return { ...mutation, sendVerificationEmailWithEmail: mutation.mutate };
}
