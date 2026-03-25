import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Zoom } from "yet-another-react-lightbox/plugins";
import Lightbox from "yet-another-react-lightbox";
import SubTabHeader from "@carveri/shared/components/SubTabHeader.tsx";

interface Props {
  photos: string[];
}

export default function AuctionPhotosSubtab({ photos }: Readonly<Props>) {
  const { t } = useTranslation("history");
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const slides = photos.map((src) => ({ src }));

  return (
    <>
      <SubTabHeader title={t("auctionPhotos.heading")} subtitle="" />

      <div className="space-y-1.5">
        <p className="text-muted-foreground text-xs">
          {t("auctionPhotos.countSuffix", { count: photos.length })}
        </p>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,320px))] gap-3">
          {photos.map((src, i) => (
            <button
              key={src}
              aria-label={t("auctionPhotos.openPhoto", { index: i + 1 })}
              className="aspect-video w-full overflow-hidden rounded-xl"
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
            >
              <img
                src={src}
                alt={`Thumbnail ${i + 1}`}
                className="size-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        plugins={[Zoom]}
      />
    </>
  );
}
