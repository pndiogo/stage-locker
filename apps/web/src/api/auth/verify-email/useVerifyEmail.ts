import type { FormattedError } from "@stage-locker/api-client";

import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import type { GetVerifyEmailRequestQueryType, GetVerifyEmailResponseSuccessType } from "@/web/types/auth";

import { QUERY_KEYS } from "@/web/api/auth/query-keys";
import { verifyEmailRequest } from "@/web/api/auth/verify-email/verify-email";

export function useVerifyEmail(queryParams: GetVerifyEmailRequestQueryType) {
  const { i18n } = useTranslation();

  const language = i18n.language;

  const query = useQuery<GetVerifyEmailResponseSuccessType, FormattedError>({
    queryKey: [QUERY_KEYS.VERIFY_EMAIL(), queryParams],
    queryFn: () => verifyEmailRequest({
      body: null,
      headers: { "Accept-Language": language },
      query: queryParams,
    }),
    enabled: !!queryParams.token,
    retry: false,
  });

  return { ...query, verifyEmail: query.refetch };
}
