import { motion } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";
import { useTranslation } from "react-i18next";
import ArgumentCard from "./ArgumentCard";
import type { NegotiateArgument } from "@carveri/shared/data/report";

interface Props {
  args: NegotiateArgument[];
}

export default function ArgumentsSubtab({ args }: Readonly<Props>) {
  const { t } = useTranslation('negotiate');
  return (
    <>
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-[10px] text-slate-400">
        <Home size={10} />
        <ChevronRight size={10} />
        <span>{t('bottomNav.negotiate', { ns: 'common' })}</span>
        <ChevronRight size={10} />
        <span>{t('tabs.arguments')}</span>
      </div>

      <h2 className="text-xl font-black text-slate-900">
        {t('arguments.heading')}
      </h2>

      <div className="space-y-3">
        {args.map((argument, i) => (
          <motion.div
            key={argument.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <ArgumentCard argument={argument} />
          </motion.div>
        ))}
      </div>
    </>
  );
}
