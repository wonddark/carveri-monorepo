import type { ReactNode } from "react";
import PreviewCta from "@carveri/shared/components/preview/PreviewCta.tsx";

type BlurredPreviewOverlayProps = { children: ReactNode };

export default function BlurredPreviewOverlay(props: Readonly<BlurredPreviewOverlayProps>) {
  const { children } = props;

  return (
    <div className="relative overflow-hidden rounded-[1.5rem] border border-slate-200 dark:border-border">
      <div className="pointer-events-none select-none blur-sm">{children}</div>
      <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-b from-transparent from-30% to-white/98 pb-8 dark:to-background/98">
        <div className="w-full max-w-xs px-4">
          <PreviewCta />
        </div>
      </div>
    </div>
  );
}
