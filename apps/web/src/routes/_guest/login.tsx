import { createFileRoute } from "@tanstack/react-router";

import { LoginForm } from "@/web/components/authentication/LoginForm";
import i18n, { i18nInitPromise } from "@/web/i18n";
import { generatePageMeta } from "@/web/lib/pageMeta";

export const Route = createFileRoute("/_guest/login")({
  component: Login,
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
      crumb: i18n.t("page.login.title"),
      meta: {
        title: i18n.t("page.login.title"),
        description: i18n.t("page.login.description"),
      },
    };
  },
});

function Login() {
  return (
    <LoginForm />
  );
}
