import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import i18n, { i18nInitPromise } from "@/web/i18n";
import { generatePageMeta } from "@/web/lib/pageMeta";

export const Route = createFileRoute("/_authenticated/profile")({
  component: Profile,
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
      crumb: i18n.t("page.profile.title"),
      meta: {
        title: i18n.t("page.profile.title"),
        description: i18n.t("page.profile.description"),
      },
    };
  },
});

function Profile() {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className="text-3xl font-bold">{t("page.profile.title")}</h1>
      <p>{t("page.profile.description")}</p>
    </div>
  );
}
