export type ThumbnailsRef = {
  visible: boolean;
  show: () => void;
  hide: () => void;
};

export type ZoomRef = {
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
