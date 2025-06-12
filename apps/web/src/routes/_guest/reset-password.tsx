import { createFileRoute } from "@tanstack/react-router";

import { ResetPasswordForm } from "@/web/components/authentication/ResetPasswordForm";
import i18n, { i18nInitPromise } from "@/web/i18n";
import { generatePageMeta } from "@/web/lib/pageMeta";

export const Route = createFileRoute("/_guest/reset-password")({
  component: ResetPassword,
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
      crumb: i18n.t("page.resetPassword.title"),
      meta: {
        title: i18n.t("page.resetPassword.title"),
        description: i18n.t("page.resetPassword.description"),
      },
    };
  },
});

function ResetPassword() {
  const { token } = Route.useSearch();
  return <ResetPasswordForm token={token} />;
}
