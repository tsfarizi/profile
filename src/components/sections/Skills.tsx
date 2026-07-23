import { motion } from 'framer-motion';
import { skills } from '../../data/profile';
import { useTheme } from '../../context/ThemeContext';

export default function Skills() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const skillGroups = [
    { key: 'frontend' as const, label: 'Frontend', items: skills.frontend, gridClass: 'sm:row-span-2' },
    { key: 'languages' as const, label: 'Languages', items: skills.languages, gridClass: 'sm:col-span-2' },
    { key: 'ml' as const, label: 'ML/AI & Data', items: skills.ml, gridClass: '' },
    { key: 'unreal' as const, label: 'Unreal Engine', items: skills.unreal, gridClass: '' },
    { key: 'backend' as const, label: 'Backend', items: skills.backend, gridClass: 'sm:col-span-2' },
    { key: 'devops' as const, label: 'DevOps', items: skills.devops, gridClass: '' },
    { key: 'patterns' as const, label: 'Design Pattern & Paradigm', items: skills.patterns, gridClass: 'sm:col-span-3' },
  ];

  return (
    <section id="skills" className={`py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${isDark ? 'bg-d-bg' : 'bg-parchment'}`}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={`font-display text-4xl md:text-5xl mb-4 ${isDark ? 'text-gold' : 'text-burgundy'}`}>
            Arsenal & Craft
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-linear-to-r from-gold/0 to-gold" />
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gold">
              <path d="M12 2L14.5 9H22L16 13.5L18.5 21L12 16.5L5.5 21L8 13.5L2 9H9.5L12 2Z" fill="currentColor" />
            </svg>
            <div className="h-px w-16 bg-linear-to-l from-gold/0 to-gold" />
          </div>
          <p className={`font-body mt-4 max-w-xl mx-auto ${isDark ? 'text-d-text-muted' : 'text-ink-light'}`}>
            A collection of tools and technologies mastered through dedication and relentless pursuit of craft.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.key}
              className={`relative rounded-2xl p-4 sm:p-5 border overflow-hidden transition-colors duration-300 min-h-[160px] ${group.gridClass} ${isDark ? 'bg-d-surface-2 border-d-border' : 'bg-cream border-gold/20'}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <h3 className={`font-display text-sm sm:text-base font-semibold mb-3 ${isDark ? 'text-gold' : 'text-burgundy'}`}>
                {group.label}
              </h3>

              <div className="flex flex-wrap gap-2">
                {group.items.map((skill, j) => (
                  <motion.span
                    key={skill.name}
                    className={`font-body text-xs sm:text-sm px-3 py-1.5 rounded-lg font-medium transition-colors border ${isDark ? 'bg-gold/10 text-gold border-gold/30 hover:bg-gold/20' : 'bg-burgundy/10 text-burgundy border-burgundy/20 hover:bg-burgundy/20'}`}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 + j * 0.04 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
