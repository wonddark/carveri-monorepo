import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ─── Animation helpers ─── */
function FadeUp({
                  children,
                  delay = 0,
                  className = "",
                }: Readonly<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
}>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FadeIn({
                  children,
                  delay = 0,
                  className = "",
                }: Readonly<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
}>) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Counter animation ─── */
function AnimatedCounter({
                           end,
                           suffix = "",
                         }: Readonly<{ end: number; suffix?: string }>) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export {FadeUp, FadeIn, AnimatedCounter}