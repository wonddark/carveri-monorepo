import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  images: string[];
}

export default function ImageCarousel({ images }: Readonly<Props>) {
  const [index, setIndex] = useState(0);

  const goTo = (next: number) => {
    setIndex(Math.max(0, Math.min(next, images.length - 1)));
  };

  const handleDragEnd = (
    _: unknown,
    info: { velocity: { x: number }; offset: { x: number } },
  ) => {
    if (info.velocity.x < -200 || info.offset.x < -50) goTo(index + 1);
    else if (info.velocity.x > 200 || info.offset.x > 50) goTo(index - 1);
  };

  return (
    <div className="relative h-52 w-full overflow-hidden bg-slate-900">
      <motion.img
        key={index}
        src={images[index]}
        alt={`Vehicle photo ${index + 1}`}
        className="h-full w-full object-cover select-none"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
      />

      {/* Counter */}
      <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-[10px] font-semibold text-white">
        <Camera size={10} />
        {index + 1}/{images.length}
      </div>

      {/* Arrows */}
      {index > 0 && (
        <button
          onClick={() => goTo(index - 1)}
          className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-black/40 p-1.5 text-white"
        >
          <ChevronLeft size={16} />
        </button>
      )}
      {index < images.length - 1 && (
        <button
          onClick={() => goTo(index + 1)}
          className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-black/40 p-1.5 text-white"
        >
          <ChevronRight size={16} />
        </button>
      )}

      {/* Dot indicators */}
      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all ${i === index ? "w-3 bg-white" : "w-1.5 bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
}
