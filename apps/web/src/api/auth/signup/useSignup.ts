import type { FormattedError } from "@stage-locker/api-client";

import { useMutation } from "@tanstack/react-query";

import type { PostSignupRequestBodyType, PostSignupResponseSuccessType } from "@/web/types/auth";

import { QUERY_KEYS } from "@/web/api/auth/query-keys";
import { signupRequest } from "@/web/api/auth/signup/signup";

export function useSignup() {
  const mutation = useMutation<PostSignupResponseSuccessType, FormattedError, { body: PostSignupRequestBodyType }>({
    mutationFn: signupRequest,
    mutationKey: [QUERY_KEYS.SIGNUP()],
  });

  return { ...mutation, signup: mutation.mutate };
}
