import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';

interface ExperienceItem {
  title: string;
  company: string;
  duration: string;
  summary: string;
  bullets: (string | React.ReactNode)[];
}

interface ExperienceAccordionProps {
  experiences: ExperienceItem[];
}

export function ExperienceAccordion({ experiences }: ExperienceAccordionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="space-y-6">
      {experiences.map((experience, index) => {
        const isActive = expandedIndex === index;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`group relative rounded-3xl border transition-all duration-500 overflow-hidden backdrop-blur-md ${
              isActive 
                ? 'border-[var(--neon-blue)]/50 bg-white dark:bg-white/[0.05] shadow-[0_24px_48px_-12px_var(--neon-blue-glow)]' 
                : 'border-black/[0.08] dark:border-white/10 bg-white/70 dark:bg-white/[0.02] shadow-[0_8px_24px_-4px_rgba(0,0,0,0.03)] dark:shadow-none hover:bg-white dark:hover:bg-white/[0.05] hover:border-[var(--neon-blue)]/50'
            }`}
          >
            {/* Subtle background gradient on active state */}
            <div 
              className={`absolute inset-0 bg-gradient-to-br from-[var(--neon-blue)]/5 to-[var(--neon-pink)]/5 transition-opacity duration-500 pointer-events-none ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`} 
            />

            <button
              onClick={() => toggleAccordion(index)}
              className="relative w-full p-6 lg:p-8 text-left z-10 flex items-start sm:items-center justify-between gap-6 outline-none"
            >
              <div>
                <h3 className={`text-xl lg:text-2xl font-semibold tracking-tight transition-colors duration-300 ${isActive ? 'text-foreground' : 'text-foreground/80 group-hover:text-foreground'}`}>
                  {experience.title}
                </h3>
                <div className="flex flex-wrap items-center gap-2 lg:gap-3 mt-2 lg:mt-3">
                  <span className="text-sm lg:text-base font-medium text-[var(--neon-blue)]">
                    {experience.company}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-foreground/20 hidden sm:block" />
                  <span className="text-sm lg:text-base font-medium text-muted-foreground">
                    {experience.duration}
                  </span>
                </div>
              </div>
              
              <motion.div
                animate={{ rotate: isActive ? 135 : 0 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
                className={`flex-shrink-0 w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center transition-all duration-300 border ${
                  isActive 
                    ? 'bg-[var(--neon-blue)] border-transparent text-white shadow-[0_8px_16px_-4px_var(--neon-blue-glow)]' 
                    : 'bg-black/[0.03] dark:bg-white/5 border-black/10 dark:border-white/10 text-foreground/80 shadow-sm group-hover:bg-[var(--neon-blue)]/10 group-hover:text-[var(--neon-blue)] group-hover:border-[var(--neon-blue)]/30 group-hover:shadow-[0_4px_12px_-2px_var(--neon-blue-glow)]'
                }`}
              >
                <Plus className="w-5 h-5" />
              </motion.div>
            </button>

            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                  className="relative z-10 overflow-hidden"
                >
                  <div className="px-6 lg:px-8 pb-6 lg:pb-8 pt-0">
                    <p className="text-base lg:text-lg text-foreground/90 leading-relaxed font-medium mb-8">
                      {experience.summary}
                    </p>
                    
                    <ul className="space-y-6 border-l-2 border-foreground/10 pl-6 lg:pl-8 ml-2 lg:ml-3">
                      {experience.bullets.map((bullet, bulletIndex) => (
                        <motion.li
                          key={bulletIndex}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: bulletIndex * 0.08 + 0.1 }}
                          className="relative text-sm lg:text-base text-muted-foreground leading-relaxed"
                        >
                          {/* Timeline dot indicator */}
                          <div className="absolute -left-[29px] lg:-left-[37px] top-[6px] w-2.5 h-2.5 rounded-full bg-[var(--neon-pink)] shadow-[0_4px_12px_var(--neon-pink-glow)] ring-4 ring-background" />
                          <span className="block">{bullet}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}