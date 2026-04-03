import { useRouteLoaderData } from "react-router";
import type { TransformedReport } from "@carveri/shared/lib/transforms.ts";
import AuctionPhotosSubtab from "@carveri/shared/components/history/AuctionPhotosSubtab";

export default function AuctionPhotosSection() {
  const report = useRouteLoaderData("report") as TransformedReport;
  return <AuctionPhotosSubtab photos={report.historyTab.auctionPhotos} />;
}
