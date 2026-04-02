import type { AppReport } from "@/types/app-report";

interface Props {
  report: AppReport;
}

export default function Header({ report }: Props) {
  return (
    <header className="fixed top-0 right-0 left-0 z-20 flex h-12 items-center justify-between border-b border-gray-200 bg-white px-5">
      <div className="flex items-center gap-3">
        <span className="text-base font-black tracking-tight text-gray-900">
          CarVeri
        </span>
        <span className="text-sm text-gray-500">
          {report.year} {report.make} {report.model} {report.trim} ·{" "}
          <span className="font-mono text-xs">{report.vin}</span>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
          ES
        </span>
        <button
          type="button"
          className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
        >
          Compartir PDF
        </button>
      </div>
    </header>
  );
}
