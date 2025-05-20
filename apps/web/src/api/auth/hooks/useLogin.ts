import type { postLogin_BodyType, postLogin_ResponseType } from "@stage-locker/types";

import { useMutation } from "@tanstack/react-query";

import { keys } from "@/web/api/auth/keys";
import { loginRequest } from "@/web/api/auth/login";

export function useLogin() {
  const mutation = useMutation<postLogin_ResponseType, Error, { body: postLogin_BodyType }>({
    mutationFn: loginRequest,
    mutationKey: [keys.login()],
  });

  return { ...mutation, login: mutation.mutate };
}
