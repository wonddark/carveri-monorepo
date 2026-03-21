function generateReportTitle({ year, make, model }: { year: number, make: string, model: string}) {
  return `${year} ${make} ${model}`
}

export { generateReportTitle }