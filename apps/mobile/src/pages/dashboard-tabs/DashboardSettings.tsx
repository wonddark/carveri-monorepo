import SettingsHeader from "@carveri/shared/components/dashboard/SettingsHeader.tsx";
import PersonalInfo from "@carveri/shared/components/dashboard/PersonalInfo.tsx";
import AuthenticationInfo from "@carveri/shared/components/dashboard/AuthenticationInfo.tsx";
import DashboardSignOut from "@carveri/shared/components/dashboard/DashboardSignOut.tsx";

type DashboardSettingsProps = Record<string, never>;

function DashboardSettings(props: Readonly<DashboardSettingsProps>) {
  const {} = props;

  return (
    <div className="space-y-4 px-4 py-5">
      <SettingsHeader />
      <PersonalInfo />
      <AuthenticationInfo />
      <DashboardSignOut />
    </div>
  );
}

export default DashboardSettings;
