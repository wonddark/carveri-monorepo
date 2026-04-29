import SettingsHeader from "@carveri/shared/components/dashboard/SettingsHeader.tsx";
import PersonalInfo from "@carveri/shared/components/dashboard/PersonalInfo.tsx";
import AuthenticationInfo from "@carveri/shared/components/dashboard/AuthenticationInfo.tsx";
import DashboardSignOut from "@carveri/shared/components/dashboard/DashboardSignOut.tsx";

function Settings() {
  return (
    <main
      data-loc="client/src/components/DashboardLayout.tsx:248"
      className="flex-1 p-6"
    >
      <div
        data-loc="client/src/pages/Settings.tsx:47"
        className="max-w-3xl space-y-4 lg:space-y-6"
      >
        <SettingsHeader />
        <PersonalInfo />
        <AuthenticationInfo />
        <DashboardSignOut />
      </div>
    </main>
  );
}

export default Settings;
