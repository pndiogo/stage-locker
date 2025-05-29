import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { Separator } from "@/web/components/ui/separator";
import { Routes } from "@/web/types/router";

function Footer() {
  const { t } = useTranslation();

  return (
    <>
      <Separator className="mb-4" />
      <footer className="mt-auto">
        <div>
          <ul>
            <li>
              <Link to={Routes.LOGIN}>{t("page.login.title")}</Link>
            </li>
            <li>
              <Link to={Routes.SIGNUP}>{t("page.signup.title")}</Link>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}

export { Footer };
