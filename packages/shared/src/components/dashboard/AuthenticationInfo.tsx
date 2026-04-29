import {
  CircleCheckBigIcon,
  ShieldCheckIcon,
  SmartphoneIcon,
} from "lucide-react";

function AuthenticationInfo() {
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
            className="font-heading flex items-center gap-2 text-base font-semibold text-gray-900"
          >
            <ShieldCheckIcon className="size-4.5 text-blue-600" />
            Authentication
          </div>
        </div>
        <div data-slot="card-content" className="space-y-3 px-6 lg:space-y-4">
          <div className="flex items-center gap-3 rounded-lg border border-emerald-100 bg-emerald-50/60 p-3 lg:gap-4 lg:p-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 lg:h-10 lg:w-10">
              <SmartphoneIcon className="size-4 text-emerald-600 lg:size-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold text-gray-900">
                  One-Time Password (OTP)
                </p>
                <span
                  data-slot="badge"
                  className="[&amp;&gt;svg]:size-3 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive [a&amp;]:hover:bg-secondary/90 flex w-fit shrink-0 items-center justify-center gap-0.5 overflow-hidden rounded-md border-0 border-transparent bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap text-emerald-700 transition-[color,box-shadow] focus-visible:ring-[3px]"
                >
                  <CircleCheckBigIcon className="size-3" />
                  Active
                </span>
              </div>
              <p className="mt-0.5 truncate text-[10px] text-gray-500 lg:text-xs">
                A verification code is sent to (305) 555-0142 each time you sign
                in.
              </p>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 lg:p-4">
            <div className="flex items-start gap-2.5">
              <ShieldCheckIcon className="mt-0.5 size-4 shrink-0 text-gray-400" />
              <p className="text-[10px] leading-relaxed text-gray-500 lg:text-xs">
                Your account is secured with OTP verification. Every time you
                log in, we send a unique code to your registered phone number.
                No passwords to remember or manage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthenticationInfo;
