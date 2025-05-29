import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { Routes } from "@/web/types/router";

import { LanguageSwitcher } from "./LanguageSwitcher";

function Header() {
  const { t } = useTranslation();
  return (
    <header className="pb-2 flex gap-2 justify-between items-center">
      <nav className="flex flex-row items-center justify-between w-full">
        <div className="font-bold">
          <Link to={Routes.ROOT}>
            <div className="shrink-0 text-2xl font-black uppercase">
              {t("common.appName")}
            </div>
          </Link>
        </div>
        <div>
          <LanguageSwitcher />
        </div>
      </nav>
    </header>
  );
}

export { Header };
