import { OverviewCards } from "@/components/dashboard/overview-cards";
import { FundsTracking } from "@/components/dashboard/funds-tracking";
import { CommunicationPortal } from "@/components/dashboard/communication-portal";

export default function DashboardPage() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <OverviewCards />
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <FundsTracking />
        </div>
        <div>
          <CommunicationPortal />
        </div>
      </div>
    </>
  );
}
