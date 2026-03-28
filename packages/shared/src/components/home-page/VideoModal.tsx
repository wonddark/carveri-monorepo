import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@carveri/shared/components/ui/dialog.tsx";

type Props = {
  open: boolean;
  onOpenChange: (show: boolean) => void;
};

function VideoModal(props: Readonly<Props>) {
  const { open, onOpenChange } = props;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-200 overflow-hidden rounded-2xl border-gray-800 bg-gray-900 p-0"
        showCloseButton={true}
      >
        <DialogTitle className="sr-only">
          Video explicativo de CarVeri
        </DialogTitle>
        <div className="flex aspect-video items-center justify-center text-sm font-medium text-white/40">
          Video próximamente — espacio reservado para el video explicativo de
          CarVeri
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default VideoModal;
