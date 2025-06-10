import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className="text-3xl font-bold">{t("page.home.title")}</h1>
      <p>{t("page.home.description")}</p>
    </div>
  );
}
