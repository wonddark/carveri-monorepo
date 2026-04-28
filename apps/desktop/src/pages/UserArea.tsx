import UserAreaSidebar from "@/components/UserAreaSidebar.tsx";
import {
  BellIcon,
  FileCheckIcon,
  GlobeIcon,
  PanelLeftIcon,
} from "lucide-react";
import { Outlet } from "react-router";

function UserArea() {
  return (
    <div
      data-slot="sidebar-wrapper"
      style={{ "--sidebar-width": "16rem", "--sidebar-width-icon": "3rem" }}
      className="group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full"
    >
      <UserAreaSidebar />
      <main
        data-slot="sidebar-inset"
        className="bg-background relative flex w-full flex-1 flex-col md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2"
      >
        <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/90 backdrop-blur-md">
          <div className="flex h-14 items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <button
                data-slot="sidebar-trigger"
                className="[&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 [&amp;_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent dark:hover:bg-accent/50 inline-flex size-7 shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap text-gray-400 transition-all outline-none hover:text-gray-600 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50"
                data-sidebar="trigger"
              >
                <PanelLeftIcon />
                <span className="sr-only">Toggle Sidebar</span>
              </button>
              <div
                data-orientation="vertical"
                role="none"
                data-slot="separator"
                className="h-5 shrink-0 bg-gray-200 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px"
              ></div>
              <h2 className="font-heading text-sm font-semibold text-gray-900">
                Dashboard
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
                title="Cambiar a Español"
              >
                <GlobeIcon className="size-4" />
                <span className="text-xs font-semibold uppercase">en</span>
              </button>
              <button className="relative rounded-lg p-2 transition-colors hover:bg-gray-100">
                <BellIcon className="size-4.5 text-gray-400" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              <div className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-1.5">
                <FileCheckIcon className="size-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-700">2</span>
                <span className="text-xs text-gray-500">reports left</span>
              </div>
            </div>
          </div>
        </header>
        <Outlet />
      </main>
    </div>
  );
}

export default UserArea;
