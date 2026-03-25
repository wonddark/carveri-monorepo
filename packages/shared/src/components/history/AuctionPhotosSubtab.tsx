import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Zoom } from "yet-another-react-lightbox/plugins";
import Lightbox from "yet-another-react-lightbox";
import SubTabHeader from "@carveri/shared/components/SubTabHeader.tsx";
import { cn } from "@carveri/shared/lib/utils.ts";
import { Button } from "@carveri/shared/components/ui/button.tsx";
import {
  IconColumns1,
  IconLayoutDashboardFilled,
  IconLayoutGridFilled,
} from "@tabler/icons-react";

enum Layouts {
  Grid,
  List,
  Colums,
}

interface Props {
  photos: string[];
}

export default function AuctionPhotosSubtab({ photos }: Readonly<Props>) {
  const { t } = useTranslation("history");
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [layout, setLayout] = useState<Layouts>(Layouts.Grid);

  const slides = photos.map((src) => ({ src }));

  return (
    <>
      <SubTabHeader title={t("auctionPhotos.heading")} subtitle="" />

      <div className="flex items-center justify-end gap-2">
        <Button onClick={() => setLayout(Layouts.Grid)} variant="ghost">
          <IconLayoutGridFilled className="size-4 lg:size-6" />
        </Button>
        <Button onClick={() => setLayout(Layouts.Colums)} variant="ghost">
          <IconLayoutDashboardFilled className="size-4 lg:size-6" />
        </Button>
        <Button onClick={() => setLayout(Layouts.List)} variant="ghost">
          <IconColumns1 className="size-4 lg:size-6" />
        </Button>
      </div>

      <div className="space-y-1.5">
        <p className="text-muted-foreground text-xs">
          {t("auctionPhotos.countSuffix", { count: photos.length })}
        </p>

        <div
          className={cn("gap-3", {
            "grid grid-cols-[repeat(auto-fill,minmax(0,max(140px,25%)))]":
              layout === Layouts.Grid,
            "columns-2": layout === Layouts.Colums,
            "flex flex-col": layout === Layouts.List,
          })}
        >
          {photos.map((src, i) => (
            <button
              key={src}
              aria-label={t("auctionPhotos.openPhoto", { index: i + 1 })}
              className={cn("w-full overflow-hidden rounded-xl", {
                "aspect-video": layout !== Layouts.Colums,
              })}
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
            >
              <img
                src={src}
                alt={`Thumbnail ${i + 1}`}
                className={cn("w-full object-cover", {
                  "size-full": layout !== Layouts.Colums,
                  "h-auto": layout === Layouts.Colums,
                })}
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
        zoom={{ scrollToZoom: true }}
      />
    </>
  );
}
