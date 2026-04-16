import type { TransformedReport } from "../../lib/transforms.ts";
import MmrBookDetails from "@carveri/shared/components/home/MMRBookDetails.tsx";
import KBBBookDetails from "@carveri/shared/components/home/KBBBookDetails.tsx";
import JDPBookDetails from "@carveri/shared/components/home/JDPBookDetails.tsx";
import BBBookDetails from "@carveri/shared/components/home/BBBookDetails.tsx";

interface Props {
  bookValues: TransformedReport["priceEval"]["bookValues"];
}

export default function BookValues({ bookValues }: Readonly<Props>) {
  const mmr = bookValues.find((bv) => bv.source === "MMR");
  const kbb = bookValues.find((bv) => bv.source === "KBB");
  const jdp = bookValues.find((bv) => bv.source === "JDP");
  const bb = bookValues.find((bv) => bv.source === "BB");

  return (
    <div className="mt-3 grid grid-cols-2 gap-3">
      {mmr ? <MmrBookDetails book={mmr!} /> : null}
      {kbb ? <KBBBookDetails book={kbb!} /> : null}
      {jdp ? <JDPBookDetails book={jdp!} /> : null}
      {bb ? <BBBookDetails book={bb!} /> : null}
    </div>
  );
}
