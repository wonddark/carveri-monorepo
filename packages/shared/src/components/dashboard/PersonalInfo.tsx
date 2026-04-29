import {
  CalendarIcon,
  FileTextIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  SaveIcon,
  UserIcon,
} from "lucide-react";
import { useState } from "react";

function PersonalInfo() {
  const [enableEdit, setEnableEdit] = useState(false);
  return (
    <div>
      <div
        data-slot="card"
        className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-gray-200 py-6 shadow-sm"
      >
        <div
          data-slot="card-header"
          className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 pb-3 has-data-[slot=card-action]:grid-cols-[1fr_auto] lg:pb-4 [.border-b]:pb-6"
        >
          <div
            data-slot="card-title"
            className="font-heading text-base font-semibold text-gray-900"
          >
            Personal Information
          </div>
        </div>
        <div data-slot="card-content" className="space-y-4 px-6 lg:space-y-6">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center lg:gap-5">
            <span
              data-slot="avatar"
              className="relative flex size-8 h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-blue-100 bg-blue-50 lg:h-18 lg:w-18"
            >
              <span
                data-slot="avatar-fallback"
                className="font-heading flex size-full items-center justify-center rounded-full bg-transparent text-xl font-bold text-blue-600 lg:text-2xl"
              >
                OH
              </span>
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-heading text-base font-bold text-gray-900 lg:text-lg">
                Osniel Hernandez
              </p>
              <p className="truncate text-xs text-gray-500 lg:text-sm">
                osniel@carveri.com
              </p>
              <div className="mt-1.5 flex flex-wrap items-center gap-2">
                <span className="flex items-center gap-1 text-[10px] text-gray-400 lg:text-xs">
                  <CalendarIcon className="size-3" />
                  Member since Jan 2026
                </span>
                <span
                  data-slot="badge"
                  className="[&amp;&gt;svg]:size-3 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive [a&amp;]:hover:bg-secondary/90 flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-md border-0 border-transparent bg-blue-50 px-2 py-0.5 text-[10px] font-semibold tracking-wider whitespace-nowrap text-blue-700 uppercase transition-[color,box-shadow] focus-visible:ring-[3px]"
                >
                  <FileTextIcon className="size-3" />2 reports left
                </span>
              </div>
            </div>
            <button
              onClick={() => setEnableEdit(!enableEdit)}
              className="[&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 [&amp;_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:border-input dark:hover:bg-input/50 has-[&gt;svg]:px-2.5 inline-flex h-8 shrink-0 items-center justify-center gap-1.5 self-start rounded-md border border-gray-200 bg-transparent px-3 text-sm font-semibold whitespace-nowrap text-gray-700 shadow-xs transition-all outline-none hover:bg-gray-50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 sm:self-auto dark:bg-transparent"
            >
              {enableEdit ? <SaveIcon /> : null}
              {enableEdit ? "Save Changes" : "Edit Profile"}
            </button>
          </div>
          <div
            data-orientation="horizontal"
            role="none"
            data-slot="separator"
            className="shrink-0 bg-gray-200 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px"
          ></div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5">
            <div className="space-y-1.5">
              <label
                data-slot="label"
                className="flex items-center gap-1.5 text-[10px] font-medium text-gray-500 select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 lg:text-xs"
              >
                <UserIcon className="size-3" />
                Full Name
              </label>
              <input
                data-slot="input"
                className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-10 w-full min-w-0 rounded-md border border-gray-200 bg-gray-50 px-3 py-1 text-sm text-gray-700 shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                disabled={!enableEdit}
                value="Osniel Hernandez"
              />
            </div>
            <div className="space-y-1.5">
              <label
                data-slot="label"
                className="flex items-center gap-1.5 text-[10px] font-medium text-gray-500 select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 lg:text-xs"
              >
                <MailIcon className="size-3" />
                Email Address
              </label>
              <input
                data-slot="input"
                className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-10 w-full min-w-0 rounded-md border border-gray-200 bg-gray-50 px-3 py-1 text-sm text-gray-700 shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                disabled={!enableEdit}
                value="osniel@carveri.com"
              />
            </div>
            <div className="space-y-1.5">
              <label
                data-slot="label"
                className="flex items-center gap-1.5 text-[10px] font-medium text-gray-500 select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 lg:text-xs"
              >
                <PhoneIcon className="size-3" />
                Phone Number
              </label>
              <input
                data-slot="input"
                className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-10 w-full min-w-0 rounded-md border border-gray-200 bg-gray-50 px-3 py-1 text-sm text-gray-700 shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                disabled={!enableEdit}
                value="(305) 555-0142"
              />
            </div>
            <div className="space-y-1.5">
              <label
                data-slot="label"
                className="flex items-center gap-1.5 text-[10px] font-medium text-gray-500 select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 lg:text-xs"
              >
                <MapPinIcon className="size-3" />
                ZIP Code
              </label>
              <input
                data-slot="input"
                className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-10 w-full min-w-0 rounded-md border border-gray-200 bg-gray-50 px-3 py-1 text-sm text-gray-700 shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                disabled={!enableEdit}
                value="33166"
              />
            </div>
          </div>
          <p className="flex items-center gap-1 text-[10px] text-gray-400 lg:text-[11px]">
            <MapPinIcon className="size-3" />
            Your ZIP code helps us find comparable vehicles near you.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo;
