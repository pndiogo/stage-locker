import { createFileRoute } from "@tanstack/react-router";

import { ForgotPasswordForm } from "@/web/components/authentication/ForgotPasswordForm";
import i18n, { i18nInitPromise } from "@/web/i18n";
import { generatePageMeta } from "@/web/lib/pageMeta";

export const Route = createFileRoute("/_guest/forgot-password")({
  component: ForgotPassword,
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
      crumb: i18n.t("page.forgotPassword.title"),
      meta: {
        title: i18n.t("page.forgotPassword.title"),
        description: i18n.t("page.forgotPassword.description"),
      },
    };
  },
});

function ForgotPassword() {
  return (
    <ForgotPasswordForm />
  );
}
