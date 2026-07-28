import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { projects, categoryColors, languageIcons, projectCategories, type ProjectCategory } from '../../data/profile';

export default function Projects() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className={`py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${isDark ? 'bg-d-bg' : 'bg-parchment'}`}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-8">
          <h2 className={`font-display text-4xl sm:text-5xl font-semibold mb-4 ${isDark ? 'text-d-text' : 'text-navy'}`}>Notable Works</h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-gold/0 to-gold" />
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-gold flex-shrink-0"><path d="M12 2l2.09 6.26L21 9.27l-5 4.87L17.18 21 12 17.27 6.82 21 8 14.14l-5-4.87 6.91-1.01L12 2z" fill="currentColor" /></svg>
            <div className="h-px w-16 bg-gradient-to-l from-gold/0 to-gold" />
          </div>
          <p className={`font-body mt-4 max-w-xl mx-auto ${isDark ? 'text-d-text-muted' : 'text-ink-light'}`}>Selected projects showcasing expertise across multiple domains and technologies.</p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {projectCategories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-lg font-body text-xs sm:text-sm font-medium border transition-all duration-300 ${
                activeCategory === cat.key
                  ? isDark
                    ? 'bg-gold/20 border-gold/40 text-gold'
                    : 'bg-burgundy/10 border-burgundy/30 text-burgundy'
                  : isDark
                    ? 'bg-transparent border-d-border text-d-text-muted hover:border-gold/30 hover:text-gold'
                    : 'bg-transparent border-gold/20 text-ink-light hover:border-gold/40 hover:text-navy'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {filteredProjects.map((project, index) => {
              const langIcon = languageIcons[project.language] ?? '📄';
              const categoryStyle = categoryColors[project.category] ?? (isDark ? 'bg-d-surface-3 text-d-text border-d-border' : 'bg-parchment-dark text-ink border-gold/20');
              return (
                <motion.a
                  key={project.name}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group block p-6 border rounded-xl relative overflow-hidden transition-colors duration-300 ${isDark ? 'bg-d-surface-2 border-d-border hover:border-gold/30' : 'bg-cream border-gold/30'}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {project.featured && (
                    <motion.div className="absolute top-3 left-3 text-gold" title="Featured" initial={{ rotate: -20, scale: 0 }} whileInView={{ rotate: 0, scale: 1 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 200, delay: 0.3 + index * 0.08 }}>
                      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12 2l2.09 6.26L21 9.27l-5 4.87L17.18 21 12 17.27 6.82 21 8 14.14l-5-4.87 6.91-1.01L12 2z" /></svg>
                    </motion.div>
                  )}

                  <div className={`absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-body border ${categoryStyle}`}>
                    <span aria-hidden="true">{langIcon}</span>
                    <span>{project.language}</span>
                  </div>

                  <h3 className={`font-display text-xl font-semibold pr-20 mb-2 relative z-10 group-hover:text-burgundy transition-colors duration-300 ${project.featured ? 'pl-8' : ''} ${isDark ? 'text-d-text' : 'text-navy'}`}>
                    {project.name}
                  </h3>

                  <p className={`font-body text-sm leading-relaxed mb-4 relative z-10 ${isDark ? 'text-d-text-muted' : 'text-ink-light'}`}>
                    {project.description}
                  </p>

                  {project.techStack && (
                    <div className="flex flex-wrap gap-1.5 mb-4 relative z-10">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className={`font-body text-[10px] px-2 py-0.5 rounded-md border ${
                            isDark
                              ? 'bg-d-surface-3/50 text-d-text-muted border-d-border/50'
                              : 'bg-parchment-dark/50 text-ink-light border-gold/10'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-4 mb-4 relative z-10">
                    {(project.stars ?? 0) > 0 && (
                      <span className={`inline-flex items-center gap-1 font-body text-xs ${isDark ? 'text-d-text-muted' : 'text-ink-light'}`}>
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-gold" fill="currentColor"><path d="M12 2l2.09 6.26L21 9.27l-5 4.87L17.18 21 12 17.27 6.82 21 8 14.14l-5-4.87 6.91-1.01L12 2z" /></svg>
                        {project.stars}
                      </span>
                    )}
                    {(project.forks ?? 0) > 0 && (
                      <span className={`inline-flex items-center gap-1 font-body text-xs ${isDark ? 'text-d-text-muted' : 'text-ink-light'}`}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                          <circle cx="12" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><circle cx="18" cy="6" r="3" /><path d="M18 9v6M6 9v6M12 12v3" />
                        </svg>
                        {project.forks}
                      </span>
                    )}
                  </div>

                  <span className="inline-flex items-center gap-1 font-body text-sm font-medium text-burgundy group-hover:text-burgundy-dark transition-colors duration-300 relative z-10">
                    View Project
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </span>
                </motion.a>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <p className={`text-center font-body text-sm py-12 ${isDark ? 'text-d-text-muted' : 'text-ink-light'}`}>
            No projects in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}
