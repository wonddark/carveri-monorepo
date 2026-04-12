import { Button } from "@carveri/shared/components/ui/button.tsx";
import { useTranslation } from "react-i18next";

type Props = {
  scrollToPricing: () => void;
};

function StickyMobileBar(props: Readonly<Props>) {
  const { t } = useTranslation("homepage");
  const { scrollToPricing } = props;

  return (
    <div className="safe-area-bottom border-border bg-card/95 fixed right-0 bottom-0 left-0 z-40 border-t p-3 backdrop-blur-xl sm:hidden">
      <Button
        onClick={scrollToPricing}
        className="h-12 w-full bg-linear-to-r from-green-500 to-emerald-600 font-[Outfit] text-[15px] font-bold text-white uppercase hover:from-green-600 hover:to-emerald-700 active:scale-[0.97]"
      >
        {t("hero.cta_secondary")}
      </Button>
    </div>
  );
}

export default StickyMobileBar;
