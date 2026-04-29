import BuyReportsHeader from "@carveri/shared/components/dashboard/BuyReportsHeader.tsx";
import BuyReportsOffer from "@carveri/shared/components/dashboard/BuyReportsOffer.tsx";
import ReportPackagesPrice from "@carveri/shared/components/dashboard/ReportPackagesPrice.tsx";
import BuyReportsLearnMore from "@carveri/shared/components/dashboard/BuyReportsLearnMore.tsx";

function BuyReports() {
  return (
    <main className="flex-1 p-6">
      <div className="space-y-5 lg:space-y-8">
        <BuyReportsHeader />
        <BuyReportsOffer />
        <ReportPackagesPrice />
        <BuyReportsLearnMore />
      </div>
    </main>
  );
}

export default BuyReports;
