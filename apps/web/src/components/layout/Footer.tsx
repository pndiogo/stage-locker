import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { Separator } from "@/web/components/ui/separator";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="mt-auto">
      <Separator className="my-4" />
      <div>
        <ul>
          <li>
            <Link to="/login">{t("common.login")}</Link>
          </li>
          <li>
            <Link to="/signup">{t("common.register")}</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export { Footer };
