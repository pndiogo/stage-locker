import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import i18n, { i18nInitPromise } from "@/web/i18n";
import { generatePageMeta } from "@/web/lib/pageMeta";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
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
      crumb: i18n.t("page.dashboard.title"),
      meta: {
        title: i18n.t("page.dashboard.title"),
        description: i18n.t("page.dashboard.description"),
      },
    };
  },
});

function Dashboard() {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className="text-3xl font-bold">{t("page.dashboard.title")}</h1>
      <p>{t("page.dashboard.description")}</p>
    </div>
  );
}
