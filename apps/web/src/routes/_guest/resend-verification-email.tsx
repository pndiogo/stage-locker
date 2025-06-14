import { createFileRoute } from "@tanstack/react-router";

import { ResendVerificationEmailWithEmailForm } from "@/web/components/authentication/ResendVerificationEmailWithEmailForm";
import i18n, { i18nInitPromise } from "@/web/i18n";
import { generatePageMeta } from "@/web/lib/pageMeta";

export const Route = createFileRoute("/_guest/resend-verification-email")({
  component: ResendVerificationEmail,
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
      crumb: i18n.t("page.resendVerificationEmail.title"),
      meta: {
        title: i18n.t("page.resendVerificationEmail.title"),
        description: i18n.t("page.resendVerificationEmail.description"),
      },
    };
  },
});

function ResendVerificationEmail() {
  return <ResendVerificationEmailWithEmailForm />;
}
