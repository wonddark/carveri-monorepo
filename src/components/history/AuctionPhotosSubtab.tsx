import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronRight, Home } from "lucide-react";

interface Props {
  photos: string[];
}

export default function AuctionPhotosSubtab({ photos }: Readonly<Props>) {
  const { t } = useTranslation('history');
  const [activePhoto, setActivePhoto] = useState(0);

  return (
    <>
      <div className="flex items-center gap-1 text-[10px] text-slate-400">
        <Home size={10} />
        <ChevronRight size={10} />
        <span>History</span>
        <ChevronRight size={10} />
        <span>Auction Photos</span>
      </div>

      <h2 className="text-xl font-black text-slate-900">{t('auctionPhotos.heading')}</h2>
      <p className="-mt-2 text-xs text-slate-400">
        {t('auctionPhotos.countSuffix', { count: photos.length })}
      </p>

      <img
        src={photos[activePhoto]}
        alt="Auction"
        className="w-full rounded-2xl object-cover"
        style={{ height: 200 }}
      />

      <div
        className="mt-2 flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {photos.map((src, i) => (
          <button
            key={i}
            onClick={() => setActivePhoto(i)}
            className="shrink-0"
          >
            <img
              src={src}
              alt={`Thumbnail ${i + 1}`}
              className={`h-12 w-16 rounded-lg object-cover ${i === activePhoto ? "ring-2 ring-indigo-600 ring-offset-1" : "opacity-60 hover:opacity-100"}`}
            />
          </button>
        ))}
      </div>
    </>
  );
}
