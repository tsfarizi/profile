import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { profile, about } from '../../data/profile';

function AnimatedCounter({ target, duration = 2 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function About() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const stats = [
    { label: 'Repositories', value: profile.stats.repositories },
    { label: 'Stars', value: profile.stats.stars },
    { label: 'Followers', value: profile.stats.followers },
    { label: 'Following', value: profile.stats.following },
  ];

  return (
    <section id="about" className={`py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${isDark ? 'bg-d-bg' : 'bg-parchment'}`}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className={`font-display text-4xl sm:text-5xl font-semibold mb-4 ${isDark ? 'text-d-text' : 'text-navy'}`}>
            {about.title}
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-gold/0 to-gold" />
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-gold flex-shrink-0" aria-hidden="true">
              <path d="M12 2l2.09 6.26L21 9.27l-5 4.87L17.18 21 12 17.27 6.82 21 8 14.14l-5-4.87 6.91-1.01L12 2z" fill="currentColor" />
            </svg>
            <div className="h-px w-16 bg-gradient-to-l from-gold/0 to-gold" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {about.paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className={`font-body text-base leading-relaxed mb-4 ${isDark ? 'text-d-text-muted' : 'text-ink-light'}`}
              >
                {paragraph}
              </p>
            ))}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {about.focusAreas.map((area, i) => (
                <motion.div
                  key={area.label}
                  className={`flex items-start gap-3 p-4 rounded-xl border transition-colors duration-300 ${
                    isDark ? 'bg-d-surface-2 border-d-border hover:border-gold/30' : 'bg-cream border-gold/20 hover:border-gold/40'
                  }`}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <span className="text-2xl flex-shrink-0 mt-0.5" aria-hidden="true">{area.icon}</span>
                  <div>
                    <h4 className={`font-display text-sm font-semibold mb-1 ${isDark ? 'text-gold' : 'text-burgundy'}`}>
                      {area.label}
                    </h4>
                    <p className={`font-body text-xs ${isDark ? 'text-d-text-muted' : 'text-ink-light'}`}>
                      {area.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={`rounded-2xl border p-6 ${isDark ? 'bg-d-surface-2 border-d-border' : 'bg-cream border-gold/20'}`}>
              <h3 className={`font-display text-lg font-semibold mb-4 ${isDark ? 'text-gold' : 'text-burgundy'}`}>
                GitHub Profile
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className={`font-display text-3xl font-bold ${isDark ? 'text-d-text' : 'text-navy'}`}>
                      <AnimatedCounter target={stat.value} />
                    </div>
                    <div className={`font-body text-xs mt-1 ${isDark ? 'text-d-text-muted' : 'text-ink-light'}`}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full text-center py-2.5 rounded-lg font-body text-sm font-medium border transition-colors duration-300 ${
                  isDark
                    ? 'border-gold/30 text-gold hover:bg-gold/10'
                    : 'border-burgundy/30 text-burgundy hover:bg-burgundy/5'
                }`}
              >
                View GitHub Profile →
              </a>
            </div>

            <div className={`mt-4 rounded-2xl border p-6 ${isDark ? 'bg-d-surface-2 border-d-border' : 'bg-cream border-gold/20'}`}>
              <h3 className={`font-display text-lg font-semibold mb-3 ${isDark ? 'text-gold' : 'text-burgundy'}`}>
                Quick Facts
              </h3>
              <ul className="space-y-2">
                <li className={`font-body text-sm flex items-center gap-2 ${isDark ? 'text-d-text-muted' : 'text-ink-light'}`}>
                  <span className="text-gold">▸</span> Location: {profile.location}
                </li>
                <li className={`font-body text-sm flex items-center gap-2 ${isDark ? 'text-d-text-muted' : 'text-ink-light'}`}>
                  <span className="text-gold">▸</span> Focus: Systems + AI Engineering
                </li>
                <li className={`font-body text-sm flex items-center gap-2 ${isDark ? 'text-d-text-muted' : 'text-ink-light'}`}>
                  <span className="text-gold">▸</span> Languages: C++, Rust, Python
                </li>
                <li className={`font-body text-sm flex items-center gap-2 ${isDark ? 'text-d-text-muted' : 'text-ink-light'}`}>
                  <span className="text-gold">▸</span> Available for collaboration
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
