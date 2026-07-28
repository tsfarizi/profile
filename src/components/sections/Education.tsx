import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { education } from '../../data/profile';

export default function Education() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section id="education" className={`py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${isDark ? 'bg-d-bg' : 'bg-parchment'}`}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className={`font-display text-4xl sm:text-5xl font-semibold mb-4 ${isDark ? 'text-d-text' : 'text-navy'}`}>
            Education
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-gold/0 to-gold" />
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-gold flex-shrink-0" aria-hidden="true">
              <path d="M12 2l2.09 6.26L21 9.27l-5 4.87L17.18 21 12 17.27 6.82 21 8 14.14l-5-4.87 6.91-1.01L12 2z" fill="currentColor" />
            </svg>
            <div className="h-px w-16 bg-gradient-to-l from-gold/0 to-gold" />
          </div>
        </motion.div>

        <div className="space-y-6">
          {education.map((item, i) => (
            <EducationCard key={item.id} item={item} index={i} isDark={isDark} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EducationCard({
  item,
  index,
  isDark,
}: {
  item: (typeof education)[number];
  index: number;
  isDark: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <div className={`group relative border rounded-xl p-6 shadow-subtle hover:shadow-elevated transition-shadow duration-300 ${
        isDark ? 'bg-d-surface-2 border-d-border' : 'bg-cream border-gold/30'
      }`}>
        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-xl">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-gold/10 to-transparent transform rotate-45 translate-x-8 -translate-y-8" />
        </div>

        <div className="flex items-start gap-4">
          <motion.div
            className={`flex items-center justify-center w-12 h-12 rounded-full border-2 border-gold flex-shrink-0 ${
              isDark ? 'bg-d-surface' : 'bg-parchment'
            }`}
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <span className="text-xl" role="img" aria-label={item.degree}>{item.icon}</span>
          </motion.div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-body font-medium border ${
                isDark ? 'bg-gold/10 text-gold border-gold/20' : 'bg-burgundy/10 text-burgundy border-burgundy/20'
              }`}>
                {item.period}
              </span>
            </div>

            <h3 className={`font-display text-xl md:text-2xl mb-1 group-hover:text-burgundy transition-colors duration-300 ${
              isDark ? 'text-d-text' : 'text-navy'
            }`}>
              {item.degree}
            </h3>
            <p className={`font-body text-sm font-medium mb-1 ${isDark ? 'text-gold' : 'text-gold-dark'}`}>
              {item.field} — {item.institution}
            </p>

            <p className={`font-body text-sm leading-relaxed mb-4 ${isDark ? 'text-d-text-muted' : 'text-ink-light'}`}>
              {item.description}
            </p>

            {item.highlights.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {item.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-body border border-gold/10 ${
                      isDark ? 'bg-d-surface-3 text-d-text-muted' : 'bg-parchment-dark/50 text-ink-light'
                    }`}
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
