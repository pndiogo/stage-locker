import type { FormattedError } from "@stage-locker/api-client";

import { useMutation } from "@tanstack/react-query";

import type { PostResetPasswordRequestBodyType, PostResetPasswordResponseSuccessType } from "@/web/types/auth";

import { QUERY_KEYS } from "@/web/api/auth/query-keys";
import { resetPasswordRequest } from "@/web/api/auth/reset-password/reset-password";

export function useResetPassword() {
  const mutation = useMutation<PostResetPasswordResponseSuccessType, FormattedError, { body: PostResetPasswordRequestBodyType }>({
    mutationFn: resetPasswordRequest,
    mutationKey: [QUERY_KEYS.RESET_PASSWORD()],
  });

  return { ...mutation, resetPassword: mutation.mutate };
}
