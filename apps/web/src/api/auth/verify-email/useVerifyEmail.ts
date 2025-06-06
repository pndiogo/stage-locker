import type { FormattedError } from "@stage-locker/api-client";

import { useQuery } from "@tanstack/react-query";

import type { PostVerifyEmailRequestQueryType, PostVerifyEmailResponseSuccessType } from "@/web/types/auth";

import { QUERY_KEYS } from "@/web/api/auth/query-keys";
import { verifyEmailRequest } from "@/web/api/auth/verify-email/verify-email";

export function useVerifyEmail(queryParams: PostVerifyEmailRequestQueryType) {
  const query = useQuery<PostVerifyEmailResponseSuccessType, FormattedError>({
    queryKey: [QUERY_KEYS.VERIFY_EMAIL(), queryParams],
    queryFn: () => verifyEmailRequest({
      body: null,
      query: queryParams,
    }),
    enabled: !!queryParams.token,
    retry: false,
  });

  return { ...query, verifyEmail: query.refetch };
}
