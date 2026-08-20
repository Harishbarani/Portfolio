import { motion, useInView, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useRef } from 'react';

interface CountUpStatProps {
  value: number;
  suffix?: string;
  label: string;
  delay?: number;
}

export function CountUpStat({ value, suffix = '', label, delay = 0 }: CountUpStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2000 });
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        motionValue.set(value);
      }, delay);
    }
  }, [isInView, value, motionValue, delay]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toString() + suffix;
      }
    });
    return () => unsubscribe();
  }, [springValue, suffix]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="relative p-6 lg:p-8 rounded-2xl border border-foreground/10 bg-foreground/[0.02] hover:border-foreground/20 hover:bg-foreground/[0.05] transition-all duration-300"
    >
      <div className="text-3xl lg:text-4xl font-semibold text-foreground mb-2">0{suffix}</div>
      <div className="text-xs lg:text-sm text-muted-foreground">{label}</div>
    </motion.div>
  );
}
