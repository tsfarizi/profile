import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { testimonials } from '../../data/profile';

export default function Testimonials() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((p) => (p + 1) % testimonials.length);
  const prev = () => setActiveIndex((p) => (p - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className={`py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${isDark ? 'bg-d-surface' : 'bg-parchment-dark'}`}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className={`font-display text-4xl sm:text-5xl font-semibold mb-4 ${isDark ? 'text-d-text' : 'text-navy'}`}>
            What People Say
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-gold/0 to-gold" />
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-gold flex-shrink-0" aria-hidden="true">
              <path d="M12 2l2.09 6.26L21 9.27l-5 4.87L17.18 21 12 17.27 6.82 21 8 14.14l-5-4.87 6.91-1.01L12 2z" fill="currentColor" />
            </svg>
            <div className="h-px w-16 bg-gradient-to-l from-gold/0 to-gold" />
          </div>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className={`rounded-2xl border p-8 md:p-10 text-center ${isDark ? 'bg-d-surface-2 border-d-border' : 'bg-cream border-gold/20'}`}
            >
              <div className="text-4xl mb-4" aria-hidden="true">{testimonials[activeIndex].avatar}</div>

              <svg viewBox="0 0 24 24" className="w-8 h-8 text-gold/30 mx-auto mb-4" fill="currentColor">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <p className={`font-body text-base md:text-lg leading-relaxed mb-6 ${isDark ? 'text-d-text' : 'text-ink'}`}>
                {testimonials[activeIndex].text}
              </p>

              <div>
                <p className={`font-display text-lg font-semibold ${isDark ? 'text-gold' : 'text-burgundy'}`}>
                  {testimonials[activeIndex].name}
                </p>
                <p className={`font-body text-sm ${isDark ? 'text-d-text-muted' : 'text-ink-light'}`}>
                  {testimonials[activeIndex].role} · {testimonials[activeIndex].relationship}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-6">
            <motion.button
              type="button"
              onClick={prev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`flex items-center justify-center w-10 h-10 rounded-full border transition-colors duration-300 ${
                isDark ? 'border-d-border text-d-text-muted hover:border-gold hover:text-gold' : 'border-gold/30 text-ink-light hover:border-burgundy hover:text-burgundy'
              }`}
              aria-label="Previous testimonial"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M15 19l-7-7 7-7" /></svg>
            </motion.button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === activeIndex ? 'bg-gold w-6' : isDark ? 'bg-d-border hover:bg-gold/50' : 'bg-gold/30 hover:bg-gold/50'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <motion.button
              type="button"
              onClick={next}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`flex items-center justify-center w-10 h-10 rounded-full border transition-colors duration-300 ${
                isDark ? 'border-d-border text-d-text-muted hover:border-gold hover:text-gold' : 'border-gold/30 text-ink-light hover:border-burgundy hover:text-burgundy'
              }`}
              aria-label="Next testimonial"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M9 5l7 7-7 7" /></svg>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
