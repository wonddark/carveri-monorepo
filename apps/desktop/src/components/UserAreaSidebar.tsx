import LogoFullHorizontal from "@carveri/shared/components/logos/LogoFullHorizontal.tsx";
import { Link, useLocation, useNavigate } from "react-router";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@carveri/shared/components/ui/tooltip.tsx";
import {
  FileTextIcon,
  InfoIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  ReceiptIcon,
  ShoppingBagIcon,
  UserIcon,
} from "lucide-react";
import { auth } from "@carveri/shared/lib/auth.ts";

function UserAreaSidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const onSignOut = () => {
    auth.clearToken();
    navigate("/");
  };
  return (
    <div
      className="group peer text-sidebar-foreground hidden md:block"
      data-state="expanded"
      data-collapsible=""
      data-variant="sidebar"
      data-side="left"
      data-slot="sidebar"
    >
      <div
        data-slot="sidebar-gap"
        className="relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[collapsible=offcanvas]:w-0 group-data-[side=right]:rotate-180"
      ></div>
      <div
        data-slot="sidebar-container"
        className="fixed inset-y-0 left-0 z-10 hidden h-svh w-(--sidebar-width) border-r border-gray-200 transition-[left,right,width] duration-200 ease-linear group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] group-data-[side=left]:border-r group-data-[side=right]:border-l md:flex"
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm"
        >
          <div
            data-slot="sidebar-header"
            data-sidebar="header"
            className="flex flex-col gap-2 p-5 pb-3"
          >
            <Link to="/">
              <LogoFullHorizontal className="h-auto w-[85%]" />
            </Link>
          </div>
          <div className="px-4">
            <div
              data-orientation="horizontal"
              role="none"
              data-slot="separator"
              className="shrink-0 bg-gray-200 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px"
            ></div>
          </div>
          <div className="px-4 py-3 group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:py-2">
            <div className="rounded-lg bg-blue-50/70 p-3 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-2">
              <div className="group-data-[collapsible=icon]:hidden">
                <div className="mb-1.5 flex items-center justify-between">
                  <p className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
                    Reports Available
                  </p>
                  <Tooltip>
                    <TooltipTrigger className="text-gray-300 transition-colors hover:text-gray-500">
                      <InfoIcon className="size-3" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <strong className="mb-4 font-bold">
                        Each report includes:
                      </strong>

                      <ul className="ml-3 list-disc">
                        <li>Full Vehicle History</li>
                        <li>Trust Score</li>
                        <li>5 Market Comparables</li>
                        <li>PDF Download</li>
                      </ul>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-heading text-2xl font-bold text-blue-700">
                    2
                  </span>
                  <span className="text-xs text-gray-400">/ 3</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                    style={{ width: "67%" }}
                  ></div>
                </div>
                <p className="mt-1.5 text-[10px] text-gray-400">
                  of 3 purchased
                </p>
              </div>
            </div>
          </div>
          <div
            data-slot="sidebar-content"
            data-sidebar="content"
            className="flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden"
          >
            <div
              data-slot="sidebar-group"
              data-sidebar="group"
              className="relative flex w-full min-w-0 flex-col p-2"
            >
              <div
                data-slot="sidebar-group-label"
                data-sidebar="group-label"
                className="ring-sidebar-ring [&amp;&gt;svg]:size-4 [&amp;&gt;svg]:shrink-0 flex h-8 shrink-0 items-center rounded-md px-2 text-[10px] font-semibold tracking-widest text-gray-400 uppercase outline-hidden transition-[margin,opacity] duration-200 ease-linear group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 focus-visible:ring-2"
              >
                Menu
              </div>
              <div
                data-slot="sidebar-group-content"
                data-sidebar="group-content"
                className="w-full text-sm"
              >
                <ul
                  data-slot="sidebar-menu"
                  data-sidebar="menu"
                  className="flex w-full min-w-0 flex-col gap-1"
                >
                  <li
                    data-slot="sidebar-menu-item"
                    data-sidebar="menu-item"
                    className="group/menu-item relative"
                  >
                    <Link
                      data-slot="sidebar-menu-button"
                      data-sidebar="menu-button"
                      data-size="default"
                      data-active={pathname === "/dashboard"}
                      data-state="closed"
                      to="/dashboard"
                      className="ring-sidebar-ring active:bg-sidebar-accent active:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground [&amp;&gt;span:last-child]:truncate [&amp;&gt;svg]:size-4 [&amp;&gt;svg]:shrink-0 hover:text-sidebar-accent-foreground flex h-8 w-full items-center gap-2 overflow-hidden rounded-lg p-2 text-left text-sm text-gray-600 outline-hidden transition-colors group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! hover:bg-gray-50 focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-blue-50 data-[active=true]:font-semibold data-[active=true]:text-blue-700"
                    >
                      <LayoutDashboardIcon className="size-4" />
                      <span>Dashboard</span>
                    </Link>
                  </li>
                  <li
                    data-slot="sidebar-menu-item"
                    data-sidebar="menu-item"
                    className="group/menu-item relative"
                  >
                    <Link
                      data-slot="sidebar-menu-button"
                      data-sidebar="menu-button"
                      data-size="default"
                      data-active={pathname === "/dashboard/reports"}
                      data-state="closed"
                      to="/dashboard/reports"
                      className="peer/menu-button ring-sidebar-ring active:bg-sidebar-accent active:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground [&amp;&gt;span:last-child]:truncate [&amp;&gt;svg]:size-4 [&amp;&gt;svg]:shrink-0 hover:text-sidebar-accent-foreground flex h-8 w-full items-center gap-2 overflow-hidden rounded-lg p-2 text-left text-sm text-gray-600 outline-hidden transition-colors group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! hover:bg-gray-50 focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-blue-50 data-[active=true]:font-semibold data-[active=true]:text-blue-700"
                    >
                      <FileTextIcon className="size-4" />
                      <span>My Reports</span>
                    </Link>
                  </li>
                  <li
                    data-slot="sidebar-menu-item"
                    data-sidebar="menu-item"
                    className="group/menu-item relative"
                  >
                    <Link
                      data-slot="sidebar-menu-button"
                      data-sidebar="menu-button"
                      data-size="default"
                      data-active={pathname === "/dashboard/buy-credits"}
                      data-state="closed"
                      to="/dashboard/buy-credits"
                      className="peer/menu-button ring-sidebar-ring active:bg-sidebar-accent active:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground [&amp;&gt;span:last-child]:truncate [&amp;&gt;svg]:size-4 [&amp;&gt;svg]:shrink-0 hover:text-sidebar-accent-foreground flex h-8 w-full items-center gap-2 overflow-hidden rounded-lg p-2 text-left text-sm text-gray-600 outline-hidden transition-colors group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! hover:bg-gray-50 focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-blue-50 data-[active=true]:font-semibold data-[active=true]:text-blue-700"
                    >
                      <ShoppingBagIcon className="size-4" />
                      <span>Buy Reports</span>
                    </Link>
                  </li>
                  <li
                    data-slot="sidebar-menu-item"
                    data-sidebar="menu-item"
                    className="group/menu-item relative"
                  >
                    <Link
                      data-slot="sidebar-menu-button"
                      data-sidebar="menu-button"
                      data-size="default"
                      data-active={pathname === "/dashboard/transactions"}
                      data-state="closed"
                      to="/dashboard/transactions"
                      className="peer/menu-button ring-sidebar-ring active:bg-sidebar-accent active:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground [&amp;&gt;span:last-child]:truncate [&amp;&gt;svg]:size-4 [&amp;&gt;svg]:shrink-0 hover:text-sidebar-accent-foreground flex h-8 w-full items-center gap-2 overflow-hidden rounded-lg p-2 text-left text-sm text-gray-600 outline-hidden transition-colors group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! hover:bg-gray-50 focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-blue-50 data-[active=true]:font-semibold data-[active=true]:text-blue-700"
                    >
                      <ReceiptIcon className="size-4" />
                      <span>Transactions</span>
                    </Link>
                  </li>
                  <li
                    data-slot="sidebar-menu-item"
                    data-sidebar="menu-item"
                    className="group/menu-item relative"
                  >
                    <Link
                      data-slot="sidebar-menu-button"
                      data-sidebar="menu-button"
                      data-size="default"
                      data-active={pathname === "/dashboard/settings"}
                      data-state="closed"
                      to="/dashboard/settings"
                      className="peer/menu-button ring-sidebar-ring active:bg-sidebar-accent active:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground [&amp;&gt;span:last-child]:truncate [&amp;&gt;svg]:size-4 [&amp;&gt;svg]:shrink-0 hover:text-sidebar-accent-foreground flex h-8 w-full items-center gap-2 overflow-hidden rounded-lg p-2 text-left text-sm text-gray-600 outline-hidden transition-colors group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! hover:bg-gray-50 focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-blue-50 data-[active=true]:font-semibold data-[active=true]:text-blue-700"
                    >
                      <UserIcon className="size-4" />
                      <span>My Profile</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            data-slot="sidebar-footer"
            data-sidebar="footer"
            className="flex flex-col gap-2 p-3"
          >
            <div
              data-orientation="horizontal"
              role="none"
              data-slot="separator"
              className="mb-3 shrink-0 bg-gray-200 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px"
            ></div>
            <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
              <span
                data-slot="avatar"
                className="relative flex size-8 h-9 w-9 shrink-0 overflow-hidden rounded-full border border-blue-200 bg-blue-100"
              >
                <span
                  data-slot="avatar-fallback"
                  className="font-heading flex size-full items-center justify-center rounded-full bg-transparent text-sm font-bold text-blue-700"
                >
                  OH
                </span>
              </span>
              <div className="flex-1 overflow-hidden group-data-[collapsible=icon]:hidden">
                <p className="truncate text-sm font-semibold text-gray-900">
                  Osniel Hernandez
                </p>
                <p className="truncate text-[11px] text-gray-400">
                  osniel@carveri.com
                </p>
              </div>
              <button
                onClick={onSignOut}
                className="text-gray-400 transition-colors group-data-[collapsible=icon]:hidden hover:text-gray-600"
              >
                <LogOutIcon className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserAreaSidebar;
