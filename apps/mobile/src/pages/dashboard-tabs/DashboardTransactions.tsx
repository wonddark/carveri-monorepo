import TransactionsHeader from "@carveri/shared/components/dashboard/TransactionsHeader.tsx";
import TransactionsOverview from "@carveri/shared/components/dashboard/TransactionsOverview.tsx";
import TransactionsSearch from "@carveri/shared/components/dashboard/TransactionsSearch.tsx";
import TransactionsHistoryMobile from "@carveri/shared/components/dashboard/TransactionsHistoryMobile.tsx";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";

type DashboardTransactionsProps = Record<string, never>;

function DashboardTransactions(props: Readonly<DashboardTransactionsProps>) {
  const {} = props;

  return (
    <div className="space-y-4 px-4 py-5">
      <TransactionsHeader />
      <TransactionsOverview />
      <TransactionsSearch />
      <Card className="py-0">
        <CardContent className="p-0">
          <TransactionsHistoryMobile />
        </CardContent>
      </Card>
    </div>
  );
}

export default DashboardTransactions;
