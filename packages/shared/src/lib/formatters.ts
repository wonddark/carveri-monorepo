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
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export { generateReportTitle, formatCurrency };
