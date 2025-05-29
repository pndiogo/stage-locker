import type { FormattedError } from "@stage-locker/api-client";

import { useQuery } from "@tanstack/react-query";

import type { VerifyEmailRequestQueryType, VerifyEmailResponseSuccessType } from "@/web/types/auth";

import { keys } from "@/web/api/auth/keys";
import { verifyEmailRequest } from "@/web/api/auth/verify-email/verify-email";

export function useVerifyEmail(queryParams: VerifyEmailRequestQueryType) {
  const query = useQuery<VerifyEmailResponseSuccessType, FormattedError>({
    queryKey: [keys.verifyEmail(), queryParams],
    queryFn: () => verifyEmailRequest({
      body: null,
      query: queryParams,
    }),
    enabled: !!queryParams.token,
    retry: false,
  });

  return { ...query, verifyEmail: query.refetch };
}
