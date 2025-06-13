import type { FormattedError } from "@stage-locker/api-client";

import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import type { PostSignupRequestBodyType, PostSignupResponseSuccessType } from "@/web/types/auth";

import { QUERY_KEYS } from "@/web/api/auth/query-keys";
import { signupRequest } from "@/web/api/auth/signup/signup";

type RequestParams = {
  body: PostSignupRequestBodyType;
};

export function useSignup() {
  const { i18n } = useTranslation();

  const language = i18n.language;

  const mutation = useMutation<PostSignupResponseSuccessType, FormattedError, RequestParams>({
    mutationFn: ({ body }) => signupRequest({ body, headers: { "Accept-Language": language } }),
    mutationKey: [QUERY_KEYS.SIGNUP()],
  });

  return { ...mutation, signup: mutation.mutate };
}
