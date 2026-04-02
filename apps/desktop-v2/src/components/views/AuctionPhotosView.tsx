import { useState } from "react";

interface Props {
  photos: string[];
}

export default function AuctionPhotosView({ photos }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="max-w-3xl space-y-4">
      <div className="text-xs text-gray-400">🕒 Historial / Fotos Subasta</div>
      <h2 className="text-xl font-bold text-gray-900">Fotos Subasta</h2>

      {photos.length === 0 ? (
        <p className="text-sm text-gray-400">No hay fotos de subasta.</p>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-3">
            {photos.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelected(src)}
                className="aspect-video overflow-hidden rounded-lg border border-gray-200 bg-gray-100 hover:opacity-90"
              >
                <img
                  src={src}
                  alt={`Auction photo ${i + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>

          {selected && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
              onClick={() => setSelected(null)}
            >
              <img
                src={selected}
                alt="Auction photo full"
                className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 text-2xl text-white hover:opacity-70"
              >
                ✕
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
