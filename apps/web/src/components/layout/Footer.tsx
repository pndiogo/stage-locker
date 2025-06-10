import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { LanguageSwitcher } from "@/web/components/layout/LanguageSwitcher";
import { Button } from "@/web/components/ui/button";
import { Separator } from "@/web/components/ui/separator";
import { useAuthStore } from "@/web/store/authStore";
import { Routes } from "@/web/types/router";

function Footer() {
  const { t } = useTranslation();
  const isUserLoggedIn = useAuthStore(state => state.isUserLoggedIn());

  const renderLoggedInLinks = () => {
    return (
      <li>
        <Button asChild variant="link">
          <Link to={Routes.PROFILE}>{t("page.profile.title")}</Link>
        </Button>
      </li>
    );
  };

  const renderLoggedOutLinks = () => {
    return (
      <>
        <li>
          <Button asChild variant="link">
            <Link to={Routes.SIGNUP}>{t("page.signup.title")}</Link>
          </Button>
        </li>
        <li>
          <Button asChild variant="link">
            <Link to={Routes.LOGIN}>{t("page.login.title")}</Link>
          </Button>
        </li>
      </>
    );
  };

  return (
    <>
      <Separator className="mb-4" />
      <footer className="mt-auto">
        <div className="flex gap-2 justify-between items-center">
          <ul className="flex">
            {isUserLoggedIn ? renderLoggedInLinks() : renderLoggedOutLinks()}
          </ul>
          <LanguageSwitcher />
        </div>
      </footer>
    </>
  );
}

export { Footer };
