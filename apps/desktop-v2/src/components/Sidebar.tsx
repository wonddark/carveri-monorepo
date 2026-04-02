import type { AppReport, SectionId } from "@/types/app-report";

interface Props {
  report: AppReport;
  activeSection: SectionId;
  onNavigate: (s: SectionId) => void;
}

export default function Sidebar({ report: _report, activeSection: _activeSection, onNavigate: _onNavigate }: Props) {
  return (
    <aside className="flex w-60 min-w-60 flex-col border-r border-gray-200 bg-gray-50">
      <p className="p-4 text-xs text-gray-400">Sidebar</p>
    </aside>
  );
}
