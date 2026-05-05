import { useRouteLoaderData } from "react-router";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import AuctionHistorySubtab from "@carveri/shared/components/history/AuctionHistorySubtab";

export default function AuctionHistorySection() {
  const report = useRouteLoaderData("report-details") as TransformedReport;
  return (
    <AuctionHistorySubtab
      auctionSales={report.auctionSales}
      auctionPhotos={report.historyTab.auctionPhotos}
    />
  );
}
