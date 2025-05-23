import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { Separator } from "@/web/components/ui/separator";
import { Routes } from "@/web/types/router";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="mt-auto">
      <Separator className="my-4" />
      <div>
        <ul>
          <li>
            <Link to={Routes.LOGIN}>{t("common.login")}</Link>
          </li>
          <li>
            <Link to={Routes.REGISTER}>{t("common.register")}</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export { Footer };
