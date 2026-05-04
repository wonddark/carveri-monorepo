import VinForm from "@carveri/shared/components/dashboard/VINForm.tsx";
import AvailableReports from "@carveri/shared/components/dashboard/AvailableReports.tsx";
import DashboardStats from "@carveri/shared/components/dashboard/DashboardStats.tsx";
import RecentReports from "@carveri/shared/components/dashboard/RecentReports.tsx";
import Promotion from "@carveri/shared/components/dashboard/Promotion.tsx";

type DashboardHomeProps = Record<string, never>;

function DashboardHome(props: Readonly<DashboardHomeProps>) {
  const {} = props;

  return (
    <div className="space-y-4 px-4 py-5">
      <VinForm />
      <AvailableReports />
      <DashboardStats />
      <RecentReports />
      <Promotion />
    </div>
  );
}

export default DashboardHome;
