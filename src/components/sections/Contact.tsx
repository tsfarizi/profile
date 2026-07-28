import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { profile } from '../../data/profile';

export default function Contact() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.open(`mailto:${profile.email}?subject=${subject}&body=${body}`, '_self');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', message: '' });
  };

  const inputClasses = `w-full px-4 py-3 rounded-lg font-body text-sm border transition-colors duration-300 outline-none ${
    isDark
      ? 'bg-d-surface-2 border-d-border text-d-text placeholder:text-d-text-muted/50 focus:border-gold'
      : 'bg-cream border-gold/20 text-navy placeholder:text-ink-light/50 focus:border-burgundy'
  }`;

  return (
    <section id="contact" className={`py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${isDark ? 'bg-d-surface' : 'bg-parchment-dark'}`}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className={`font-display text-4xl sm:text-5xl font-semibold mb-4 ${isDark ? 'text-d-text' : 'text-navy'}`}>
            Get in Touch
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-gold/0 to-gold" />
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-gold flex-shrink-0" aria-hidden="true">
              <path d="M12 2l2.09 6.26L21 9.27l-5 4.87L17.18 21 12 17.27 6.82 21 8 14.14l-5-4.87 6.91-1.01L12 2z" fill="currentColor" />
            </svg>
            <div className="h-px w-16 bg-gradient-to-l from-gold/0 to-gold" />
          </div>
          <p className={`font-body mt-4 max-w-xl mx-auto ${isDark ? 'text-d-text-muted' : 'text-ink-light'}`}>
            Have a project in mind or want to collaborate? Drop me a message.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <motion.div
            className="md:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className={`rounded-xl border p-5 ${isDark ? 'bg-d-surface-2 border-d-border' : 'bg-cream border-gold/20'}`}>
              <h3 className={`font-display text-base font-semibold mb-3 ${isDark ? 'text-gold' : 'text-burgundy'}`}>
                Contact Info
              </h3>
              <div className="space-y-3">
                <a
                  href={`mailto:${profile.email}`}
                  className={`flex items-center gap-3 font-body text-sm transition-colors duration-300 ${isDark ? 'text-d-text-muted hover:text-gold' : 'text-ink-light hover:text-burgundy'}`}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 flex-shrink-0 text-gold">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M22 4L12 13 2 4" />
                  </svg>
                  {profile.email}
                </a>
                <a
                  href={profile.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 font-body text-sm transition-colors duration-300 ${isDark ? 'text-d-text-muted hover:text-gold' : 'text-ink-light hover:text-burgundy'}`}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0 text-gold">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  github.com/tsfarizi
                </a>
                <a
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 font-body text-sm transition-colors duration-300 ${isDark ? 'text-d-text-muted hover:text-gold' : 'text-ink-light hover:text-burgundy'}`}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0 text-gold">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn Profile
                </a>
              </div>
            </div>

            <div className={`rounded-xl border p-5 ${isDark ? 'bg-d-surface-2 border-d-border' : 'bg-cream border-gold/20'}`}>
              <h3 className={`font-display text-base font-semibold mb-2 ${isDark ? 'text-gold' : 'text-burgundy'}`}>
                Response Time
              </h3>
              <p className={`font-body text-sm ${isDark ? 'text-d-text-muted' : 'text-ink-light'}`}>
                I typically respond within 24-48 hours. For urgent matters, reach out via LinkedIn.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className={`rounded-xl border p-6 space-y-4 ${isDark ? 'bg-d-surface-2 border-d-border' : 'bg-cream border-gold/20'}`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className={`block font-body text-xs font-medium mb-1.5 ${isDark ? 'text-d-text-muted' : 'text-ink-light'}`}>
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    className={inputClasses}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className={`block font-body text-xs font-medium mb-1.5 ${isDark ? 'text-d-text-muted' : 'text-ink-light'}`}>
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    className={inputClasses}
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className={`block font-body text-xs font-medium mb-1.5 ${isDark ? 'text-d-text-muted' : 'text-ink-light'}`}>
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                  className={`${inputClasses} resize-none`}
                  placeholder="Tell me about your project or idea..."
                />
              </div>

              {submitted && (
                <p className="font-body text-sm text-sage">Opening your email client... If it didn't open, email me directly at {profile.email}</p>
              )}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 rounded-lg font-body text-sm font-medium transition-colors duration-300 ${
                  isDark
                    ? 'bg-gold text-d-bg hover:bg-gold-light'
                    : 'bg-burgundy text-cream hover:bg-burgundy-light'
                }`}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
