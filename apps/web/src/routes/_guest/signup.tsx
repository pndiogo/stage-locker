import { createFileRoute } from "@tanstack/react-router";

import { SignupForm } from "@/web/components/authentication/SignupForm";
import i18n, { i18nInitPromise } from "@/web/i18n";
import { generatePageMeta } from "@/web/lib/pageMeta";

export const Route = createFileRoute("/_guest/signup")({
  component: Signup,
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
      crumb: i18n.t("page.signup.title"),
      meta: {
        title: i18n.t("page.signup.title"),
        description: i18n.t("page.signup.description"),
      },
    };
  },
});

function Signup() {
  return (
    <SignupForm />
  );
}
