import { Link, useRouteError } from "react-router";

export default function ReportError() {
  const error = useRouteError() as { status?: number };
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3 text-center">
      <p className="text-5xl font-black text-slate-200">
        {error?.status ?? "?"}
      </p>
      <p className="text-base font-semibold text-slate-700">
        {error?.status === 404 ? "Report not found" : "Something went wrong"}
      </p>
      <Link to="/" className="text-sm text-blue-600 underline">
        Go home
      </Link>
    </div>
  );
}
