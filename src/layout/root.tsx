import { Outlet } from "react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu.tsx";
import { Toaster } from "@/components/ui/sonner.tsx";

function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto w-full max-w-380 px-4 lg:px-16">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild></NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <Outlet />
      <Toaster />
    </div>
  );
}

export default RootLayout;
