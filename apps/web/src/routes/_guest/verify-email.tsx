import { tokenSchema } from "@stage-locker/types";
import { decodeJwt } from "@stage-locker/utils";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CircleAlert, CircleCheck, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import type { RequestState } from "@/web/types/api";

import { useSendVerificationEmailWithId } from "@/web/api/auth/send-verification-email-with-id/useSendVerificationEmailWithId";
import { useVerifyEmail } from "@/web/api/auth/verify-email/useVerifyEmail";
import { Alert, AlertDescription } from "@/web/components/ui/alert";
import { Button } from "@/web/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/web/components/ui/card";
import { CardActionSuccess } from "@/web/components/ui/card-action-success";
import i18n, { i18nInitPromise } from "@/web/i18n";
import { generatePageMeta } from "@/web/lib/pageMeta";
import { GetVerifyEmailRequestQuerySchema } from "@/web/types/auth";
import { Routes } from "@/web/types/router";

const verifyEmailSearchSchema = GetVerifyEmailRequestQuerySchema.extend({
  token: tokenSchema().optional(),
});

export const Route = createFileRoute("/_guest/verify-email")({
  component: VerifyEmail,
  validateSearch: verifyEmailSearchSchema,
  head: (ctx) => {
    const { loaderData } = ctx;
    const { meta } = loaderData || {};
    return {
      meta: generatePageMeta(meta),
    };
  },
  loader: async () => {
    await i18nInitPromise;
    return {
      crumb: i18n.t("page.verifyEmail.title"),
      meta: {
        title: i18n.t("page.verifyEmail.title"),
        description: i18n.t("page.verifyEmail.description"),
      },
    };
  },
});

function VerifyEmail() {
  const { token } = Route.useSearch();
  const { t } = useTranslation();
  const [verificationState, setVerificationState] = useState<RequestState>("loading");
  const [sendVerificationEmailState, setSendVerificationEmailState] = useState<RequestState>("idle");
  const isSendVerificationEmailFlow = (verificationState === "error" || verificationState === "invalid") && sendVerificationEmailState !== "idle";
  const { isError, error, status } = useVerifyEmail({ token });
  const { sendVerificationEmailWithId, isPending: sendVerificationEmailWithIdIsPending } = useSendVerificationEmailWithId();

  useEffect(() => {
    if (status === "success") {
      setVerificationState("success");
    }
    else if (!token || (isError && error?.status === 401)) {
      setVerificationState("invalid");
    }
    else {
      setVerificationState("error");
    }
  }, [isError, error?.status, status, token]);

  const handleRequestNewVerification = () => {
    const { sub } = decodeJwt(token);

    if (!sub) {
      setVerificationState("error");
      return;
    }

    setSendVerificationEmailState("loading");

    sendVerificationEmailWithId({ body: { id: sub as string } }, {
      onSuccess: () => {
        setSendVerificationEmailState("success");
      },
      onError: () => {
        setSendVerificationEmailState("error");
      },
    });
  };

  const renderErrorAlert = () => {
    if (!isSendVerificationEmailFlow) {
      if (verificationState === "invalid") {
        return (
          <Alert variant="destructive">
            <AlertDescription>
              {t("page.verifyEmail.error.invalidMessage")}
            </AlertDescription>
          </Alert>
        );
      }
      else {
        return (
          <Alert variant="destructive">
            <AlertDescription>
              {t("page.verifyEmail.error.genericMessage")}
            </AlertDescription>
          </Alert>
        );
      }
    }

    if (sendVerificationEmailState === "success") {
      return (
        <Alert variant="default">
          <AlertDescription>
            {t("page.verifyEmail.sendVerificationEmail.success.message")}
          </AlertDescription>
        </Alert>
      );
    }

    if (sendVerificationEmailState === "error") {
      return (
        <Alert variant="destructive">
          <AlertDescription>
            {t("page.verifyEmail.sendVerificationEmail.error.message")}
          </AlertDescription>
        </Alert>
      );
    }

    return null;
  };

  const renderErrorIcon = () => {
    if (!isSendVerificationEmailFlow) {
      return (
        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <CircleAlert className="w-8 h-8 text-red-600" />
        </div>
      );
    }

    if (sendVerificationEmailState === "success") {
      return (
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CircleCheck className="w-8 h-8 text-green-600" />
        </div>
      );
    }

    if (sendVerificationEmailState === "error") {
      return (
        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <CircleAlert className="w-8 h-8 text-red-600" />
        </div>
      );
    }

    return null;
  };

  const renderErrorTitle = () => {
    if (!isSendVerificationEmailFlow) {
      return t("page.verifyEmail.error.title");
    }

    if (sendVerificationEmailState === "success") {
      return t("page.verifyEmail.sendVerificationEmail.success.title");
    }

    if (sendVerificationEmailState === "error") {
      return t("page.verifyEmail.sendVerificationEmail.error.title");
    }

    return null;
  };

  const renderErrorDescription = () => {
    if (!isSendVerificationEmailFlow) {
      if (verificationState === "invalid") {
        return t("page.verifyEmail.error.invalidDescription");
      }
      else {
        return t("page.verifyEmail.error.genericDescription");
      }
    }

    if (sendVerificationEmailState === "success") {
      return t("page.verifyEmail.sendVerificationEmail.success.description");
    }

    if (sendVerificationEmailState === "error") {
      return t("page.verifyEmail.sendVerificationEmail.error.description");
    }

    return null;
  };

  if (verificationState === "loading" || sendVerificationEmailState === "loading") {
    return (
      <div className="flex items-center justify-center md:my-20">
        <Card className="w-full max-w-md">
          <CardContent>
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">{t("page.verifyEmail.loading.title")}</h2>
                <p className="text-gray-600 mt-2">{t("page.verifyEmail.loading.description")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (verificationState === "success") {
    return (
      <CardActionSuccess
        title={t("page.verifyEmail.success.title")}
        description={t("page.verifyEmail.success.description")}
        link={Routes.LOGIN}
        linkText={t("page.login.title")}
      />
    );
  }

  return (
    <div className="flex items-center justify-center md:my-20">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          {
            renderErrorIcon()
          }
          <CardTitle className="text-2xl">
            {
              renderErrorTitle()
            }
          </CardTitle>
          <CardDescription>
            {
              renderErrorDescription()
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderErrorAlert()}
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <Button onClick={handleRequestNewVerification} disabled={sendVerificationEmailWithIdIsPending}>
            {t("page.verifyEmail.linkRequestNew")}
          </Button>
          <div className="text-sm">
            <Link to={Routes.ROOT} className="underline">
              {t("page.verifyEmail.linkHome")}
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
