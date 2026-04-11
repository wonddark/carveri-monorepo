import i18next from "./i18n";

function generateReportTitle({
  year,
  make,
  model,
  trim,
}: {
  year: number;
  make: string;
  model: string;
  trim?: string;
}) {
  return `${year} ${make} ${model}` + (trim ? ` ${trim}` : "");
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat(i18next.language, {
    style: "currency",
    currency: "USD",
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export { generateReportTitle, formatCurrency };
