import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { blogPosts } from '../../data/profile';

export default function Blog() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section id="blog" className={`py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${isDark ? 'bg-d-bg' : 'bg-parchment'}`}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className={`font-display text-4xl sm:text-5xl font-semibold mb-4 ${isDark ? 'text-d-text' : 'text-navy'}`}>
            Writing & Research
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-gold/0 to-gold" />
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-gold flex-shrink-0" aria-hidden="true">
              <path d="M12 2l2.09 6.26L21 9.27l-5 4.87L17.18 21 12 17.27 6.82 21 8 14.14l-5-4.87 6.91-1.01L12 2z" fill="currentColor" />
            </svg>
            <div className="h-px w-16 bg-gradient-to-l from-gold/0 to-gold" />
          </div>
          <p className={`font-body mt-4 max-w-xl mx-auto ${isDark ? 'text-d-text-muted' : 'text-ink-light'}`}>
            Technical articles and research notes from my exploration of software engineering and AI.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <motion.a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group block p-6 border rounded-xl relative overflow-hidden transition-colors duration-300 ${
                isDark ? 'bg-d-surface-2 border-d-border hover:border-gold/30' : 'bg-cream border-gold/30'
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-body font-medium border ${
                    post.category === 'research'
                      ? isDark ? 'bg-navy-light/20 text-navy-light border-navy-light/30' : 'bg-navy/10 text-navy border-navy/20'
                      : isDark ? 'bg-gold/10 text-gold border-gold/20' : 'bg-burgundy/10 text-burgundy border-burgundy/20'
                  }`}>
                    {post.category === 'research' ? 'Research' : 'Technical'}
                  </span>
                  <span className={`font-body text-[10px] ${isDark ? 'text-d-text-muted' : 'text-ink-light'}`}>
                    {post.readTime}
                  </span>
                </div>

                <h3 className={`font-display text-lg font-semibold mb-2 group-hover:text-burgundy transition-colors duration-300 ${
                  isDark ? 'text-d-text' : 'text-navy'
                }`}>
                  {post.title}
                </h3>

                <p className={`font-body text-sm leading-relaxed mb-4 ${isDark ? 'text-d-text-muted' : 'text-ink-light'}`}>
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`font-body text-[10px] px-2 py-0.5 rounded-md border ${
                        isDark ? 'bg-d-surface-3/50 text-d-text-muted border-d-border/50' : 'bg-parchment-dark/50 text-ink-light border-gold/10'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className={`font-body text-xs ${isDark ? 'text-d-text-muted' : 'text-ink-light'}`}>
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="inline-flex items-center gap-1 font-body text-sm font-medium text-burgundy group-hover:text-burgundy-dark transition-colors duration-300">
                    Read
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
