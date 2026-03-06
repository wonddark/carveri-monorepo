import { Link, Outlet } from "react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu.tsx";
import { Activity } from "react";
import { Toaster } from "@/components/ui/sonner.tsx";

function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto w-full max-w-380 px-4 lg:px-16">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/reports">Vehicle Detail</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <Activity mode={import.meta.env.DEV ? "visible" : "hidden"}>
              <>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/test-router">Test router</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/test-form">Test form</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/test-lightbox">Test Lightbox</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </>
            </Activity>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="mx-auto w-full max-w-380 px-4 lg:px-16">
        <Outlet />
      </div>
      <Toaster />
    </div>
  );
}

export default RootLayout;
