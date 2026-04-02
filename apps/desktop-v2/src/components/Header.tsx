import type { AppReport } from "@/types/app-report";

interface Props {
  report: AppReport;
}

export default function Header({ report: _report }: Props) {
  return (
    <header className="fixed top-0 right-0 left-0 z-20 flex h-12 items-center border-b border-gray-200 bg-white px-5">
      <span className="font-black text-gray-900">CarVeri</span>
    </header>
  );
}
