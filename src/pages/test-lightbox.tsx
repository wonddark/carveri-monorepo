import { useRef, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import {
  Counter,
  Inline,
  Thumbnails,
  Zoom
} from "yet-another-react-lightbox/plugins";

type ThumbnailsRef = {
  visible: boolean;
  show: () => void;
  hide: () => void;
};

type ZoomRef = {
  zoomIn: () => void;
  zoomOut: () => void;
  zoom: number;
  minZoom: number;
  maxZoom: number;
  offsetX: number;
  offsetY: number;
  disabled: boolean;
  changeZoom: (
    targetZoom: number,
    rapid?: boolean,
    dx?: number,
    dy?: number,
  ) => void;
};

function TestLightbox() {
  const [open, setOpen] = useState(false);
  const thumbnailRef = useRef<ThumbnailsRef>(null);
  const zoomRef = useRef<ZoomRef>(null);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-3xl">Test LightBox</h1>
      <div className="aspect-video w-full max-w-160">
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={[
            {
              src: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
            {
              src: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
            {
              src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
            {
              src: "https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
          ]}
          plugins={[Counter, Thumbnails, Zoom, ...(open ? [] : [Inline])]}
          counter={{ container: { style: { top: "unset", bottom: 0 } } }}
          thumbnails={{ ref: thumbnailRef }}
          on={{
            click: () => setOpen((prevState) => !prevState),
          }}
          zoom={{ ref: zoomRef }}
        />
      </div>
    </div>
  );
}

export default TestLightbox;
