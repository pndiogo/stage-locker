import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import { useVerifyEmail } from "@/web/api/auth/verify-email/useVerifyEmail";
import { Alert, AlertDescription } from "@/web/components/ui/alert";
import { Button } from "@/web/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/web/components/ui/card";
import i18n, { i18nInitPromise } from "@/web/i18n";
import { generatePageMeta } from "@/web/lib/pageMeta";
import { VerifyEmailRequestQuerySchema } from "@/web/schemas/auth";

import { Routes } from "../types/router";

const verifyEmailSearchSchema = VerifyEmailRequestQuerySchema.extend({
  token: z.string().optional(),
});

type VerificationState = "loading" | "success" | "error" | "invalid";

export const Route = createFileRoute("/verify-email")({
  component: VerifyEmailPage,
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

function VerifyEmailPage() {
  const { token } = Route.useSearch();
  const { t } = useTranslation();
  const [verificationState, setVerificationState] = useState<VerificationState>("loading");
  const { isError, error, status } = useVerifyEmail({ token });

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

  if (verificationState === "loading") {
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
      <div className="flex items-center justify-center md:my-20">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">{t("page.verifyEmail.success.title")}</CardTitle>
            <CardDescription>
              {t("page.verifyEmail.success.description")}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex flex-col space-y-3">
            <div className="text-center space-y-4">
              <Link to={Routes.LOGIN} className="underline">
                {t("page.login.title")}
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center md:my-20">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl">{t("page.verifyEmail.error.title")}</CardTitle>
          <CardDescription>
            {verificationState === "invalid"
              ? t("page.verifyEmail.error.invalidDescription")
              : t("page.verifyEmail.error.genericDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertDescription>
              {verificationState === "invalid"
                ? t("page.verifyEmail.error.invalidMessage")
                : t("page.verifyEmail.error.genericMessage")}
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <Button asChild>
            <Link to={Routes.ROOT}>
              {t("page.verifyEmail.linkRequestNew")}
            </Link>
          </Button>
          <Link to={Routes.ROOT} className="underline">
            {t("page.verifyEmail.linkHome")}
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
