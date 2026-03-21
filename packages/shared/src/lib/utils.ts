import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function getPercentile({
  min,
  max,
  value,
}: {
  min: number;
  max: number;
  value: number;
}) {
  return ((value - min) / (max - min)) * 100;
}

export { cn, getPercentile };
