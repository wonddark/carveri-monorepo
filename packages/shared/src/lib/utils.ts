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
  const percent = ((value - min) / (max - min)) * 100;
  return Math.min(Math.max(percent, 0), 100);
}

async function getFingerprint() {
  const raw = [
    navigator.userAgent,
    navigator.language,
    screen.width,
    screen.height,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    screen.colorDepth,
    navigator.platform,
  ].join("|");

  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(raw),
  );

  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export { cn, getPercentile, getFingerprint };
