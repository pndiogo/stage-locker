import type { FormattedError } from "@stage-locker/api-client";

import { useMutation } from "@tanstack/react-query";

import type { PostSendPasswordResetEmailRequestBodyType, PostSendPasswordResetEmailResponseSuccessType } from "@/web/types/auth";

import { QUERY_KEYS } from "@/web/api/auth/query-keys";
import { sendPasswordResetEmailRequest } from "@/web/api/auth/send-password-reset-email/send-password-reset-email";

export function useSendPasswordResetEmail() {
  const mutation = useMutation<PostSendPasswordResetEmailResponseSuccessType, FormattedError, { body: PostSendPasswordResetEmailRequestBodyType }>({
    mutationFn: sendPasswordResetEmailRequest,
    mutationKey: [QUERY_KEYS.SEND_PASSWORD_RESET_EMAIL()],
  });

  return { ...mutation, sendPasswordResetEmail: mutation.mutate };
}
