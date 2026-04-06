import {
  IconCar,
  IconChartHistogram,
  IconTrendingDown,
} from "@tabler/icons-react";

const marketSubtabs = (t: (key: string) => string) => [
  {
    id: "analysis",
    label: t("tabs.analysis"),
    icon: <IconChartHistogram />,
  },
  {
    id: "price-dynamics",
    label: t("tabs.price_dynamics"),
    icon: <IconTrendingDown />,
  },
  {
    id: "comparables",
    label: t("tabs.comparables"),
    icon: <IconCar />,
  },
];

export { marketSubtabs };
