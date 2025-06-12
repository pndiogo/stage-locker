import type { FormattedError } from "@stage-locker/api-client";

import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import type { PostLoginRequestBodyType, PostLoginResponseSuccessType } from "@/web/types/auth";

import { loginRequest } from "@/web/api/auth/login/login";
import { QUERY_KEYS } from "@/web/api/auth/query-keys";

type RequestParams = {
  body: PostLoginRequestBodyType;
};

export function useLogin() {
  const { i18n } = useTranslation();

  const language = i18n.language;

  const mutation = useMutation<PostLoginResponseSuccessType, FormattedError, RequestParams>({
    mutationFn: ({ body }) => loginRequest({ body, headers: { "Accept-Language": language } }),
    mutationKey: [QUERY_KEYS.LOGIN()],

  });

  return { ...mutation, login: mutation.mutate };
}
