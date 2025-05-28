import type { FormattedError } from "@stage-locker/api-client";

import { useMutation } from "@tanstack/react-query";

import type { SignupRequestBodyType, SignupResponseSuccessType } from "@/web/types/auth";

import { keys } from "@/web/api/auth/keys";
import { signupRequest } from "@/web/api/auth/signup/signup";

export function useSignup() {
  const mutation = useMutation<SignupResponseSuccessType, FormattedError, { body: SignupRequestBodyType }>({
    mutationFn: signupRequest,
    mutationKey: [keys.signup()],
  });

  return { ...mutation, signup: mutation.mutate };
}
