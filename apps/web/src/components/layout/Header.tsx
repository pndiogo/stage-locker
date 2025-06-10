import { Link, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { Button } from "@/web/components/ui/button";
import { Separator } from "@/web/components/ui/separator";
import { useAuthStore } from "@/web/store/authStore";
import { Routes } from "@/web/types/router";

function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isUserLoggedIn = useAuthStore(state => state.isUserLoggedIn());

  const logout = () => {
    useAuthStore.setState({ user: null });
    navigate({ to: Routes.ROOT });
  };

  const renderLoggedInLinks = () => {
    return (
      <>
        <Button asChild variant="link">
          <Link to={Routes.DASHBOARD}>{t("page.dashboard.title")}</Link>
        </Button>
        <Button asChild variant="link">
          <Link to={Routes.PROFILE}>{t("page.profile.title")}</Link>
        </Button>
        <Button variant="link" onClick={logout}>
          {t("common.logout")}
        </Button>
      </>
    );
  };

  const renderLoggedOutLinks = () => {
    return (
      <>
        <Button asChild variant="link">
          <Link to={Routes.SIGNUP}>{t("page.signup.title")}</Link>
        </Button>
        <Button asChild variant="link">
          <Link to={Routes.LOGIN}>{t("page.login.title")}</Link>
        </Button>
      </>
    );
  };

  return (
    <>
      <header className="flex gap-2 justify-between items-center">
        <nav className="flex flex-row items-center justify-between w-full">
          <div className="font-bold">
            <Link to={Routes.ROOT}>
              <div className="shrink-0 text-2xl font-black uppercase">
                {t("common.appName")}
              </div>
            </Link>
          </div>
          <div className="flex items-center">
            {isUserLoggedIn ? renderLoggedInLinks() : renderLoggedOutLinks()}
          </div>
        </nav>
      </header>
      <Separator className="my-4" />
    </>
  );
}

export { Header };
