import type { FormattedError } from "@stage-locker/api-client";

import { useMutation } from "@tanstack/react-query";

import type { PostLoginRequestBodyType, PostLoginResponseSuccessType } from "@/web/types/auth";

import { loginRequest } from "@/web/api/auth/login/login";
import { QUERY_KEYS } from "@/web/api/auth/query-keys";

export function useLogin() {
  const mutation = useMutation<PostLoginResponseSuccessType, FormattedError, { body: PostLoginRequestBodyType }>({
    mutationFn: loginRequest,
    mutationKey: [QUERY_KEYS.LOGIN()],
  });

  return { ...mutation, login: mutation.mutate };
}
