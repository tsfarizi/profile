import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const NAV_LINKS = [
  { id: 'hero', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
] as const;

const HEADER_HEIGHT = 64;

function SunIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(NAV_LINKS[0].id);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState();
    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);

  useEffect(() => {
    const updateActiveSection = () => {
      const scrollThreshold = window.scrollY + HEADER_HEIGHT + 80;
      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_LINKS[i].id);
        if (!el) continue;
        if (el.getBoundingClientRect().top + window.scrollY <= scrollThreshold) {
          setActiveSection(NAV_LINKS[i].id);
          return;
        }
      }
      setActiveSection(NAV_LINKS[0].id);
    };
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    updateActiveSection();
    return () => window.removeEventListener('scroll', updateActiveSection);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsMobileMenuOpen(false); };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) setIsMobileMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  const isDark = theme === 'dark';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b-2 border-gold transition-all duration-300 ${
        isScrolled
          ? isDark
            ? 'bg-d-surface/90 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.3)]'
            : 'bg-parchment/90 backdrop-blur-md shadow-medium'
          : isDark
            ? 'bg-d-surface'
            : 'bg-parchment'
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <button
            type="button"
            onClick={scrollToTop}
            className={`font-display text-2xl font-bold tracking-wide transition-colors duration-200 ${
              isDark ? 'text-gold hover:text-gold-light' : 'text-burgundy hover:text-burgundy-light'
            }`}
          >
            Farizi
          </button>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollToSection(link.id)}
                  className="group relative px-4 py-2 font-body text-sm tracking-wide transition-colors duration-200"
                >
                  <span className={
                    isActive
                      ? 'font-semibold text-gold'
                      : isDark
                        ? 'text-d-text hover:text-gold'
                        : 'text-navy hover:text-gold'
                  }>
                    {link.label}
                  </span>
                  <span className={`absolute bottom-0 left-4 right-4 h-0.5 origin-left bg-gold transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <motion.button
              type="button"
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300 ${
                isDark
                  ? 'bg-d-surface-2 text-gold hover:bg-d-surface-3'
                  : 'bg-parchment-dark text-burgundy hover:bg-gold/20'
              }`}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <SunIcon className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <MoonIcon className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              className={`relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden ${
                isDark ? 'text-gold' : 'text-burgundy'
              }`}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              <motion.span className="block h-0.5 w-6 origin-center bg-current" animate={isMobileMenuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }} transition={{ duration: 0.25 }} />
              <motion.span className="block h-0.5 w-6 bg-current" animate={isMobileMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} transition={{ duration: 0.2 }} />
              <motion.span className="block h-0.5 w-6 origin-center bg-current" animate={isMobileMenuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }} transition={{ duration: 0.25 }} />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            ref={mobileMenuRef}
            className={`absolute top-16 left-0 right-0 overflow-hidden border-b-2 border-gold md:hidden ${
              isDark ? 'bg-d-surface shadow-[0_8px_24px_rgba(0,0,0,0.4)]' : 'bg-parchment shadow-elevated'
            }`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {NAV_LINKS.map((link, index) => (
                <motion.button
                  key={link.id}
                  type="button"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.06, duration: 0.25 }}
                  onClick={() => scrollToSection(link.id)}
                  className={`rounded-lg px-4 py-3 text-left font-body text-base transition-colors duration-200 ${
                    activeSection === link.id
                      ? isDark
                        ? 'bg-gold/10 font-semibold text-gold'
                        : 'bg-gold/10 font-semibold text-gold'
                      : isDark
                        ? 'text-d-text hover:bg-gold/5 hover:text-gold'
                        : 'text-navy hover:bg-gold/5 hover:text-gold'
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
