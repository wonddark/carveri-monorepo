import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Zoom } from "yet-another-react-lightbox/plugins";
import Lightbox from "yet-another-react-lightbox";
import { AnimatePresence, motion } from "framer-motion";
import SubTabHeader from "@carveri/shared/components/SubTabHeader.tsx";
import { cn } from "@carveri/shared/lib/utils.ts";
import { Button } from "@carveri/shared/components/ui/button.tsx";
import {
  IconColumns1,
  IconLayoutDashboardFilled,
  IconLayoutGridFilled,
} from "@tabler/icons-react";

const Layouts = { Grid: "Grid", List: "List", Columns: "Columns" } as const;
type Layout = (typeof Layouts)[keyof typeof Layouts];

interface Props {
  photos: string[];
}

export default function AuctionPhotosSubtab({ photos }: Readonly<Props>) {
  const { t } = useTranslation("history");
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [layout, setLayout] = useState<Layout>(Layouts.Grid);

  const slides = photos.map((src) => ({ src }));

  return (
    <>
      <SubTabHeader title={t("auctionPhotos.heading")} subtitle="" />

      <div className="flex items-center justify-end gap-2">
        <Button
          onClick={() => setLayout(Layouts.Grid)}
          variant="ghost"
          size="icon"
        >
          <IconLayoutGridFilled className="size-4 lg:size-6" />
        </Button>
        <Button
          onClick={() => setLayout(Layouts.Columns)}
          variant="ghost"
          size="icon"
        >
          <IconLayoutDashboardFilled className="size-4 lg:size-6" />
        </Button>
        <Button
          onClick={() => setLayout(Layouts.List)}
          variant="ghost"
          size="icon"
        >
          <IconColumns1 className="size-4 lg:size-6" />
        </Button>
      </div>

      <div className="space-y-1.5">
        <p className="text-muted-foreground text-xs">
          {t("auctionPhotos.countSuffix", { count: photos.length })}
        </p>

        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={layout}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className={cn("gap-3", {
              "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4":
                layout === Layouts.Grid,
              "columns-2": layout === Layouts.Columns,
              "flex flex-col": layout === Layouts.List,
            })}
          >
            {photos.map((src, i) => (
              <button
                key={src}
                aria-label={t("auctionPhotos.openPhoto", { index: i + 1 })}
                className={cn("w-full overflow-hidden rounded-xl", {
                  "aspect-video": layout !== Layouts.Columns,
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
                    "size-full": layout !== Layouts.Columns,
                    "h-auto": layout === Layouts.Columns,
                  })}
                />
              </button>
            ))}
          </motion.div>
        </AnimatePresence>
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
