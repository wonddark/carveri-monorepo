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

export { generateReportTitle };
