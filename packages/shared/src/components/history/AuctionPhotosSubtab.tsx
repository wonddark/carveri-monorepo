import { useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  photos: string[];
}

export default function AuctionPhotosSubtab({ photos }: Readonly<Props>) {
  const { t } = useTranslation("history");
  const [, setActivePhoto] = useState(0);

  return (
    <>
      <h2 className="mb-5 text-lg font-semibold">
        {t("auctionPhotos.heading")}
      </h2>

      <div className="space-y-1.5">
        <p className="text-muted-foreground text-xs">
          {t("auctionPhotos.countSuffix", { count: photos.length })}
        </p>

        <div className="columns-2 gap-2">
          {photos.map((src, i) => (
            <button
              key={src}
              onClick={() => setActivePhoto(i)}
              className="overflow-hidden rounded-lg"
            >
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
