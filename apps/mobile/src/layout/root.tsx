import { Link, NavLink, Outlet } from "react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@carveri/shared/components/ui/navigation-menu.tsx";
import { Button } from "@carveri/shared/components/ui/button.tsx";
import { Toaster } from "@carveri/shared/components/ui/sonner.tsx";
import { useTranslation } from "react-i18next";

function RootLayout() {
  const { t } = useTranslation("common");
  return (
    <div className="flex min-h-screen flex-col">
      <div className="sticky top-0 z-50 hidden w-full border-b border-gray-100 bg-white/95 shadow-sm shadow-gray-100/50 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-380 items-center justify-between px-4 py-2 lg:px-16">
          <Link
            to="/"
            className="font-display text-2xl font-bold text-blue-600"
          >
            CarVeri
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem className="hidden md:inline">
                <NavigationMenuLink asChild>
                  <NavLink to="/login">{t("nav.signIn")}</NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <NavLink to="/register">{t("nav.register")}</NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem className="hidden md:inline">
                <Button asChild>
                  <NavLink to="/">{t("nav.freeReport")}</NavLink>
                </Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      <Outlet />
      <Toaster />
    </div>
  );
}

export default RootLayout;
