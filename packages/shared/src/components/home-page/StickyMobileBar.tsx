import { Button } from "@carveri/shared/components/ui/button.tsx";

type Props = {
  scrollToVinForm: () => void;
};

function StickyMobileBar(props: Readonly<Props>) {
  const { scrollToVinForm } = props;

  return (
    <div className="safe-area-bottom fixed right-0 bottom-0 left-0 z-40 border-t border-gray-200 bg-white/95 p-3 backdrop-blur-xl sm:hidden">
      <Button
        onClick={scrollToVinForm}
        className="h-12 w-full rounded-xl bg-linear-to-r from-green-500 to-emerald-600 font-[Outfit] text-[15px] font-bold text-white hover:from-green-600 hover:to-emerald-700 active:scale-[0.97]"
      >
        OBTENER MI REPORTE GRATIS
      </Button>
    </div>
  );
}

export default StickyMobileBar;
