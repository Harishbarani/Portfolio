import { motion } from 'motion/react';
import { MousePointer2, Move, Crosshair } from 'lucide-react';
import { PrimaryButton } from './PrimaryButton';

export function CTASection() {
  return (
    <section className="relative py-40 overflow-hidden bg-background isolate">
      {/* 1. Subtle Dotted Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.15] dark:opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, var(--foreground) 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* 2. Floating UI/UX Design Elements in the background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top Left: Bounding Box Pattern */}
        <motion.div 
          animate={{ y: [0, -10, 0], rotate: [0, 1, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-[10%] w-32 h-32 border border-foreground/10 rounded-lg hidden lg:flex items-center justify-center"
        >
          {/* Handles */}
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-background border border-[var(--neon-blue)] rounded-sm" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-background border border-[var(--neon-blue)] rounded-sm" />
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-background border border-[var(--neon-blue)] rounded-sm" />
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-background border border-[var(--neon-blue)] rounded-sm" />
          <div className="w-16 h-16 border border-foreground/5 rounded-md flex items-center justify-center">
            <Move className="w-4 h-4 text-foreground/20" />
          </div>
        </motion.div>

        {/* Bottom Left: Wireframe Layout Block */}
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-20 left-[12%] hidden lg:flex flex-col gap-2 p-3 border border-foreground/10 rounded-xl bg-background/50 backdrop-blur-sm"
        >
          <div className="w-24 h-3 bg-foreground/10 rounded-sm" />
          <div className="w-32 h-3 bg-foreground/10 rounded-sm" />
          <div className="w-16 h-3 bg-[var(--neon-blue)]/30 rounded-sm mt-2" />
        </motion.div>

        {/* Bottom Right: Measurements */}
        <motion.div
          animate={{ y: [0, 15, 0], x: [0, -5, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-32 right-[15%] hidden lg:flex flex-col items-center gap-2"
        >
          <div className="text-[10px] font-mono text-[var(--neon-pink)]/80 tracking-widest uppercase">840px</div>
          <div className="flex items-center w-40">
            <div className="w-px h-3 bg-[var(--neon-pink)]/60" />
            <div className="flex-1 h-px bg-[var(--neon-pink)]/40" />
            <div className="w-px h-3 bg-[var(--neon-pink)]/60" />
          </div>
        </motion.div>

        {/* Top Right: Cursor & Crosshair */}
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, 15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-40 right-[20%] hidden lg:block"
        >
          <Crosshair className="w-8 h-8 text-foreground/10 absolute -top-4 -left-4" />
          <MousePointer2 className="w-6 h-6 text-[var(--neon-blue)]/80 -rotate-12" />
        </motion.div>
      </div>

      {/* 3. Title Content (Below the Overlay Glow) */}
      <div className="relative max-w-4xl mx-auto px-8 text-center space-y-10 z-30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative inline-block"
        >
          {/* Base Dim Text */}
          <h2 className="text-5xl lg:text-6xl xl:text-[6rem] font-bold leading-[1.05] tracking-tight text-foreground/20 dark:text-foreground/20">
            Let's build reliable
            <br />
            delivery systems
          </h2>

          {/* Animated Gradient Overlay Text */}
          <motion.h2 
            className="absolute inset-0 text-5xl lg:text-6xl xl:text-[6rem] font-bold leading-[1.05] tracking-tight bg-clip-text text-transparent pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(110deg, transparent 0%, var(--neon-blue) 40%, var(--neon-pink) 60%, transparent 100%)',
              backgroundSize: '200% 200%',
            }}
            animate={{
              backgroundPosition: ['200% 200%', '-100% -100%', '200% 200%']
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            Let's build reliable
            <br />
            delivery systems
          </motion.h2>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-4 justify-center pt-8 relative z-30"
        >
          <PrimaryButton
            onClick={() => {
              const el = document.getElementById('contact');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Let's Talk
          </PrimaryButton>
        </motion.div>
      </div>

      {/* 4. Moving Glow Overlay (Passes OVER the title, under the buttons) */}
      <div className="absolute inset-0 pointer-events-none z-20 mix-blend-color-dodge dark:mix-blend-screen flex items-center justify-center overflow-hidden">
        <motion.div
          animate={{
            x: ['-40vw', '40vw', '-40vw'],
            y: ['0vh', '-15vh', '0vh'],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-[800px] h-[800px] rounded-full bg-[var(--neon-blue)] opacity-[0.15] dark:opacity-[0.25] blur-[120px]"
        />
        <motion.div
          animate={{
            x: ['40vw', '-40vw', '40vw'],
            y: ['15vh', '-5vh', '15vh'],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-[600px] h-[600px] rounded-full bg-[var(--neon-pink)] opacity-[0.15] dark:opacity-[0.25] blur-[120px]"
        />
      </div>
    </section>
  );
}