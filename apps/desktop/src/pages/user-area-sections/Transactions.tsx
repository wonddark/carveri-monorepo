import TransactionsHeader from "@carveri/shared/components/dashboard/TransactionsHeader.tsx";
import TransactionsOverview from "@carveri/shared/components/dashboard/TransactionsOverview.tsx";
import TransactionsSearch from "@carveri/shared/components/dashboard/TransactionsSearch.tsx";
import TransactionsHistoryDesktop from "@carveri/shared/components/dashboard/TransactionsHistoryDesktop.tsx";
import { Card, CardContent } from "@carveri/shared/components/ui/card.tsx";

function Transactions() {
  return (
    <main className="flex-1 p-6">
      <div className="space-y-4 lg:space-y-6">
        <TransactionsHeader />
        <TransactionsOverview />
        <TransactionsSearch />
        <Card className="py-6">
          <CardContent className="p-0">
            <TransactionsHistoryDesktop />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

export default Transactions;
