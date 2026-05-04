import BuyReportsHeader from "@carveri/shared/components/dashboard/BuyReportsHeader.tsx";
import BuyReportsOffer from "@carveri/shared/components/dashboard/BuyReportsOffer.tsx";
import ReportPackagesPrice from "@carveri/shared/components/dashboard/ReportPackagesPrice.tsx";
import BuyReportsLearnMore from "@carveri/shared/components/dashboard/BuyReportsLearnMore.tsx";

type DashboardBuyReportsProps = Record<string, never>;

function DashboardBuyReports(props: Readonly<DashboardBuyReportsProps>) {
  const {} = props;

  return (
    <div className="space-y-5 px-4 py-5">
      <BuyReportsHeader />
      <BuyReportsOffer />
      <ReportPackagesPrice />
      <BuyReportsLearnMore />
    </div>
  );
}

export default DashboardBuyReports;
