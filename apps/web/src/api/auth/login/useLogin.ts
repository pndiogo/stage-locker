import type { FormattedError } from "@stage-locker/api-client";

import { useMutation } from "@tanstack/react-query";

import type { LoginRequestBodyType, LoginResponseSuccessType } from "@/web/types/auth";

import { keys } from "@/web/api/auth/keys";
import { loginRequest } from "@/web/api/auth/login/login";

export function useLogin() {
  const mutation = useMutation<LoginResponseSuccessType, FormattedError, { body: LoginRequestBodyType }>({
    mutationFn: loginRequest,
    mutationKey: [keys.login()],
  });

  return { ...mutation, login: mutation.mutate };
}
