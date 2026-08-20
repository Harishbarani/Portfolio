import { motion, HTMLMotionProps } from 'motion/react';
import React from 'react';

interface PrimaryButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export function PrimaryButton({ children, icon, className = '', ...props }: PrimaryButtonProps) {
  return (
    <motion.button
      whileHover="hover"
      whileTap="tap"
      variants={{
        hover: { scale: 1.02 },
        tap: { scale: 0.98 }
      }}
      className={`relative group px-8 py-3.5 rounded-full text-sm font-medium flex items-center justify-center gap-2 transition-all duration-300 isolate ${className}`}
      {...props}
    >
      {/* Default Background */}
      <div className="absolute inset-0 rounded-full bg-foreground transition-opacity duration-300 group-hover:opacity-0 -z-10" />
      
      {/* Hover Gradient Background */}
      <motion.div 
        variants={{
          hover: { 
            opacity: 1,
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }
        }}
        initial={{ opacity: 0, backgroundSize: "200% 200%" }}
        transition={{ 
          opacity: { duration: 0.3 },
          backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" }
        }}
        className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--neon-blue)] via-[var(--neon-pink)] to-[var(--neon-blue)] -z-10"
      />

      {/* Hover Glow Effect */}
      <motion.div 
        variants={{
          hover: { 
            opacity: 0.5,
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }
        }}
        initial={{ opacity: 0, backgroundSize: "200% 200%" }}
        transition={{ 
          opacity: { duration: 0.5 },
          backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" }
        }}
        className="absolute -inset-1 rounded-full bg-gradient-to-r from-[var(--neon-blue)] via-[var(--neon-pink)] to-[var(--neon-blue)] blur-lg -z-20"
      />

      <span className="relative text-background group-hover:text-white transition-colors duration-300">{children}</span>
      {icon && (
        <span className="relative text-background group-hover:text-white group-hover:translate-x-1 transition-all duration-300 flex items-center">
          {icon}
        </span>
      )}
    </motion.button>
  );
}