import type { FormattedError } from "@stage-locker/api-client";

import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import type { PostSendVerificationEmailWithIdRequestBodyType, PostSendVerificationEmailWithIdResponseSuccessType } from "@/web/types/auth";

import { QUERY_KEYS } from "@/web/api/auth/query-keys";
import { sendVerificationEmailWithIdRequest } from "@/web/api/auth/send-verification-email-with-id/send-verification-email-with-id";

type RequestParams = {
  body: PostSendVerificationEmailWithIdRequestBodyType;
};

export function useSendVerificationEmailWithId() {
  const { i18n } = useTranslation();
  const language = i18n.language;

  const mutation = useMutation<PostSendVerificationEmailWithIdResponseSuccessType, FormattedError, RequestParams>({
    mutationFn: ({ body }) => sendVerificationEmailWithIdRequest({ body, headers: { "Accept-Language": language } }),
    mutationKey: [QUERY_KEYS.SEND_VERIFICATION_EMAIL_WITH_ID()],
  });

  return { ...mutation, sendVerificationEmailWithId: mutation.mutate };
}
