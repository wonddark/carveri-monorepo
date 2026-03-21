import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ArgumentCard from "./ArgumentCard";
import type { NegotiateArgument } from "@carveri/shared/data/report";
import SubTabHeader from "@carveri/shared/components/SubTabHeader.tsx";

interface Props {
  args: NegotiateArgument[];
}

export default function ArgumentsSubtab({ args }: Readonly<Props>) {
  const { t } = useTranslation("negotiate");
  return (
    <>
      <SubTabHeader title={t("arguments.heading")} subtitle="" />

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
