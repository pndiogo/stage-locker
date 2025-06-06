import type { FormattedError } from "@stage-locker/api-client";

import { useMutation } from "@tanstack/react-query";

import type { PostSendVerificationEmailRequestBodyType, PostSendVerificationEmailResponseSuccessType } from "@/web/types/auth";

import { QUERY_KEYS } from "@/web/api/auth/query-keys";
import { sendVerificationEmailRequest } from "@/web/api/auth/send-verification-email/send-verification-email";

export function useSendVerificationEmail() {
  const mutation = useMutation<PostSendVerificationEmailResponseSuccessType, FormattedError, { body: PostSendVerificationEmailRequestBodyType }>({
    mutationFn: sendVerificationEmailRequest,
    mutationKey: [QUERY_KEYS.SEND_VERIFICATION_EMAIL()],
  });

  return { ...mutation, sendVerificationEmail: mutation.mutate };
}
