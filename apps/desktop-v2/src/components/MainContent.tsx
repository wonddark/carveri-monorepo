import type { AppReport, SectionId } from "@/types/app-report";

interface Props {
  report: AppReport;
  activeSection: SectionId;
}

export default function MainContent({ activeSection }: Props) {
  return (
    <div className="p-4">
      <p className="text-sm text-gray-500">Section: {activeSection}</p>
    </div>
  );
}
