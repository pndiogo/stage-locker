import type { FC } from "react";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronDown, ChevronRight, LogOut, Menu } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/web/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/web/components/ui/collapsible";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/web/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/web/components/ui/sheet";
import { useMediaQuery } from "@/web/hooks/useMediaQuery";
import { cn } from "@/web/lib/utils";
import { useAuthStore } from "@/web/store/authStore";
import { Routes } from "@/web/types/router";

type MenuItem = {
  title: string;
  to?: string;
  submenu?: MenuItem[];
};

const MenuItemComponent: FC<{ item: MenuItem; depth?: number; onClick?: () => void }> = ({ item, depth = 0, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (item.submenu) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <button
            className={cn(
              "flex w-full items-center justify-between font-medium transition-colors hover:text-primary",
              depth > 0 && "pl-4",
            )}
          >
            {item.title}
            {isOpen
              ? (
                  <ChevronDown className="h-4 w-4" />
                )
              : (
                  <ChevronRight className="h-4 w-4" />
                )}
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <nav className="flex flex-col gap-2 pt-2">
            {item.submenu.map(subItem => (
              <MenuItemComponent key={subItem.title} item={subItem} depth={depth + 1} onClick={onClick} />
            ))}
          </nav>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <Link
      to={item.to}
      className={cn(
        "font-medium transition-colors hover:text-primary",
        depth > 0 && "pl-4",
        item.to === "/" && "text-primary",
      )}
      onClick={onClick}
    >
      {item.title}
    </Link>
  );
};

const RenderDesktopMenu: FC<{ menuItems: MenuItem[]; showLogoutButton: boolean; onLogout: () => void }> = ({ menuItems, showLogoutButton, onLogout }) => {
  const { t } = useTranslation();

  return (
    <nav className="flex gap-1 items-center">
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          {menuItems.map(item => {
            if (item.submenu) {
              return (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink asChild><Link className="font-medium text-[1rem]" to={item.to}>{item.title}</Link></NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              );
            }

            return (
              <NavigationMenuItem key={item.title}>
                  <NavigationMenuLink asChild><Link className="font-medium text-[1rem]" to={item.to}>{item.title}</Link></NavigationMenuLink>
              </NavigationMenuItem>
            );
          })}

        </NavigationMenuList>
      </NavigationMenu>
      {showLogoutButton && (
        <Button
          variant="ghost"
          onClick={() => {
            onLogout();
          }}
        >
          <LogOut />
          <span className="font-medium text-[1rem]">{t("common.logout")}</span>
        </Button>
      )}
    </nav>
  );
};

const RenderMobileMenu: FC<{ menuItems: MenuItem[]; showLogoutButton: boolean; onLogout: () => void }> = ({ menuItems, showLogoutButton, onLogout }) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <VisuallyHidden>
        <SheetHeader>
          <SheetTitle>Nav Menu</SheetTitle>
          <SheetDescription>Navigation menu</SheetDescription>
        </SheetHeader>
      </VisuallyHidden>
      <SheetContent side="left" className="w-[240px] sm:w-[300px] p-6">
        <nav className="flex flex-col gap-2">
          {menuItems.map(item => (
            <MenuItemComponent key={item.title} item={item} onClick={() => setOpen(false)} />
          ))}
        </nav>
        <SheetFooter className="px-0">
          {showLogoutButton && (
            <Button
              className="justify-start"
              variant="ghost"
              size="sm"
              onClick={() => {
                onLogout();
                setOpen(false);
              }}
            >
              <LogOut />
              <span className="font-medium text-[1rem]">{t("common.logout")}</span>
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default function NavMenu() {
  const isUserLoggedIn = useAuthStore(state => state.isUserLoggedIn());
  const { t } = useTranslation();
  const { isMediumDeviceUp } = useMediaQuery();

  const navigate = useNavigate();

  const logout = () => {
    useAuthStore.setState({ user: null });
    navigate({ to: Routes.ROOT });
  };

  const loggedOutMenuItems: MenuItem[] = useMemo(() => [
    { title: t("page.signup.title"), to: Routes.SIGNUP },
    { title: t("page.login.title"), to: Routes.LOGIN },
  ], [t]);

  const loggedInMenuItems: MenuItem[] = useMemo(() => [
    { title: t("page.dashboard.title"), to: Routes.DASHBOARD },
    { title: t("page.profile.title"), to: Routes.PROFILE }
  ], [t]);

  const menuItems = isUserLoggedIn ? loggedInMenuItems : loggedOutMenuItems;

  return (
    <>
      {isMediumDeviceUp
        ? <RenderDesktopMenu menuItems={menuItems} showLogoutButton={isUserLoggedIn} onLogout={logout} />
        : <RenderMobileMenu menuItems={menuItems} showLogoutButton={isUserLoggedIn} onLogout={logout} />}
    </>
  );
}
