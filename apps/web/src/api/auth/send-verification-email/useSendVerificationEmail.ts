import type { FormattedError } from "@stage-locker/api-client";

import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import type { PostSendVerificationEmailRequestBodyType, PostSendVerificationEmailResponseSuccessType } from "@/web/types/auth";

import { QUERY_KEYS } from "@/web/api/auth/query-keys";
import { sendVerificationEmailRequest } from "@/web/api/auth/send-verification-email/send-verification-email";

type RequestParams = {
  body: PostSendVerificationEmailRequestBodyType;
};

export function useSendVerificationEmail() {
  const { i18n } = useTranslation();
  const language = i18n.language;

  const mutation = useMutation<PostSendVerificationEmailResponseSuccessType, FormattedError, RequestParams>({
    mutationFn: ({ body }) => sendVerificationEmailRequest({ body, headers: { "Accept-Language": language } }),
    mutationKey: [QUERY_KEYS.SEND_VERIFICATION_EMAIL()],
  });

  return { ...mutation, sendVerificationEmail: mutation.mutate };
}
