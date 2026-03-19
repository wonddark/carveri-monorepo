import React from "react";
import { useTranslation } from "react-i18next";
import {
  IconChevronRight,
  IconFileText,
  IconInfoCircle,
  IconShare,
  IconShieldCheck,
} from "@tabler/icons-react";
import { Card, CardContent, CardHeader, CardTitle } from "@carveri/shared/components/ui/card";
import { vehicleData } from "@carveri/shared/data/mockData";

export const DocumentsTab: React.FC = () => {
  const { t } = useTranslation("vehicle-details");
  return (
    <div className="tab-content pt-3 lg:px-0">
      <div className="section-header font-display mb-3 text-lg font-bold">
        {t('documents.title')}
      </div>

      <div className="space-y-2">
        <DocRow
          icon={<IconFileText className="text-[#042CD7]" />}
          name={t('documents.fullReport')}
          detail={t('documents.fullReportDesc')}
          bgColor="bg-[#042CD7]/5"
        />
        <DocRow
          icon={<IconShieldCheck className="text-[#22C55E]" />}
          name={t('documents.carfaxSummary')}
          detail={t('documents.carfaxDesc')}
          bgColor="bg-[#22C55E]/5"
        />
        <DocRow
          icon={<IconShare className="text-[#042CD7]" />}
          name={t('documents.shareReport')}
          detail={t('documents.shareDesc')}
          bgColor="bg-[#042CD7]/5"
        />
      </div>

      <Card className="mt-4 rounded-2xl border-[#e8e8ea]">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="flex items-center gap-1.5 text-[15px] font-bold">
            <IconInfoCircle className="h-4 w-4 text-[#042CD7]" /> {t('documents.reportInfo')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 p-4 pt-2">
          <InfoRow
            label="VIN"
            value={vehicleData.vin}
            valueStyle={{
              fontFamily: "var(--font-display)",
              letterSpacing: "0.5px",
            }}
          />
          <InfoRow label={t('documents.generationDate')} value="Feb 25, 2026" />
          <InfoRow
            label={t('documents.sourcesConsulted')}
            value="Carfax, MMR, KBB, JDP, BB, MarketCheck, Google"
          />
          <InfoRow label={t('documents.reportType')} value="CarVeri Pro" />
        </CardContent>
      </Card>

      <div className="mt-4 rounded-xl bg-[#f8f8fa] p-4 text-[11px] leading-relaxed text-[#aaa]">
        <strong>{t('documents.legalDisclaimer')}</strong> {t('documents.legalDisclaimerText')}
      </div>
    </div>
  );
};

const DocRow: React.FC<{
  icon: React.ReactElement<SVGSVGElement, "svg">;
  name: string;
  detail: string;
  bgColor: string;
}> = ({ icon, name, detail, bgColor }) => (
  <div className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#e8e8ea] bg-white p-3.5 transition-colors hover:border-[#ccc]">
    <div
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${bgColor}`}
    >
      {React.cloneElement(icon, {
        className: "h-[18px] w-[18px]",
      })}
    </div>
    <div className="flex-1">
      <div className="text-sm font-semibold">{name}</div>
      <div className="text-[11px] text-[#888]">{detail}</div>
    </div>
    <IconChevronRight className="h-4 w-4 text-[#ccc]" />
  </div>
);

const InfoRow: React.FC<{
  label: string;
  value: string;
  valueStyle?: React.CSSProperties;
}> = ({ label, value, valueStyle }) => (
  <div className="flex justify-between border-b border-[#f3f3f5] py-2.5 text-[13px] last:border-none">
    <span className="text-[#888]">{label}</span>
    <span className="text-right font-semibold" style={valueStyle}>
      {value}
    </span>
  </div>
);
