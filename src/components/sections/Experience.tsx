import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { experience } from '../../data/profile';
import { useTheme } from '../../context/ThemeContext';

function TimelineItem({
  item,
  index,
  isLast,
  isDark,
}: {
  item: (typeof experience)[number];
  index: number;
  isLast: boolean;
  isDark: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="relative flex gap-6 md:gap-8"
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
    >
      <div className="flex flex-col items-center">
        <motion.div
          className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 border-gold shadow-medium ${
            isDark ? 'bg-d-surface-2' : 'bg-cream'
          }`}
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.3, type: 'spring', stiffness: 200 }}
        >
          <span className="text-xl" role="img" aria-label={item.role}>
            {item.icon}
          </span>
          {!isLast && (
            <motion.span
              className="absolute inset-0 rounded-full border-2 border-gold/30"
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </motion.div>
        {!isLast && (
          <motion.div
            className="w-0.5 flex-1 bg-gradient-to-b from-gold to-gold/20 mt-2"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{ transformOrigin: 'top' }}
          />
        )}
      </div>

      <motion.div
        className="flex-1 pb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className={`group relative border rounded-xl p-6 shadow-subtle hover:shadow-elevated transition-shadow duration-300 ${
          isDark ? 'bg-d-surface-2 border-d-border' : 'bg-cream border-gold/30'
        }`}>
          <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-xl">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-gold/10 to-transparent transform rotate-45 translate-x-8 -translate-y-8" />
          </div>

          <div className="flex items-center gap-3 mb-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-body font-medium border ${
              isDark
                ? 'bg-gold/10 text-gold border-gold/20'
                : 'bg-burgundy/10 text-burgundy border-burgundy/20'
            }`}>
              {item.period}
            </span>
            <span className={`text-xs font-body ${isDark ? 'text-d-text-muted' : 'text-ink-light'}`}>
              {item.duration}
            </span>
          </div>

          <h3 className={`font-display text-xl md:text-2xl mb-1 group-hover:text-burgundy transition-colors duration-300 ${
            isDark ? 'text-d-text' : 'text-navy'
          }`}>
            {item.role}
          </h3>
          <p className={`font-body text-sm font-medium mb-3 ${isDark ? 'text-gold' : 'text-gold-dark'}`}>
            {item.organization}
          </p>

          <p className={`font-body text-sm leading-relaxed mb-4 ${isDark ? 'text-d-text-muted' : 'text-ink-light'}`}>
            {item.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-body border border-gold/10 ${
                  isDark
                    ? 'bg-d-surface-3 text-d-text-muted'
                    : 'bg-parchment-dark/50 text-ink-light'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Experience() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section id="experience" className={`py-20 px-4 sm:px-6 lg:px-8 ${isDark ? 'bg-d-bg' : 'bg-parchment'}`}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className={`font-display text-4xl sm:text-5xl font-semibold mb-4 ${isDark ? 'text-d-text' : 'text-navy'}`}>
            Journey & Impact
          </h2>

          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold" />
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 text-gold flex-shrink-0"
              aria-hidden="true"
            >
              <path
                d="M12 2l2.09 6.26L21 9.27l-5 4.87L17.18 21 12 17.27 6.82 21 8 14.14l-5-4.87 6.91-1.01L12 2z"
                fill="currentColor"
              />
            </svg>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold" />
          </div>

          <p className={`font-body mt-4 max-w-xl mx-auto ${isDark ? 'text-d-text-muted' : 'text-ink-light'}`}>
            A timeline of professional growth, mentorship, and technical contributions.
          </p>
        </motion.div>

        <div className="relative">
          {experience.map((item, index) => (
            <TimelineItem
              key={item.id}
              item={item}
              index={index}
              isLast={index === experience.length - 1}
              isDark={isDark}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
