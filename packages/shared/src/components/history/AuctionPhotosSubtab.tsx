import { useTranslation } from "react-i18next";
import SubTabHeader from "@carveri/shared/components/SubTabHeader.tsx";

interface Props {
  photos: string[];
}

export default function AuctionPhotosSubtab({ photos }: Readonly<Props>) {
  const { t } = useTranslation("history");

  return (
    <>
      <SubTabHeader title={t("auctionPhotos.heading")} subtitle="" />

      <div className="space-y-1.5">
        <p className="text-muted-foreground text-xs">
          {t("auctionPhotos.countSuffix", { count: photos.length })}
        </p>

        <div className="columns-2 gap-2">
          {photos.map((src, i) => (
            <button key={src} className="overflow-hidden rounded-lg">
              <img
                src={src}
                alt={`Thumbnail ${i + 1}`}
                className="h-auto w-full"
              />
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
