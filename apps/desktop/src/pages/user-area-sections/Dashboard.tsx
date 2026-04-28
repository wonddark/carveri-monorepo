import VinForm from "@carveri/shared/components/dashboard/VINForm.tsx";
import AvailableReports from "@carveri/shared/components/dashboard/AvailableReports.tsx";
import DashboardStats from "@carveri/shared/components/dashboard/DashboardStats.tsx";
import RecentReports from "@carveri/shared/components/dashboard/RecentReports.tsx";

function Dashboard() {
  return (
    <main className="flex-1 p-6">
      <div className="space-y-4 lg:space-y-5">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
          <VinForm />
          <AvailableReports />
        </div>
        <DashboardStats />
        <RecentReports />
      </div>
    </main>
  );
}

export default Dashboard;
