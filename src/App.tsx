import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Education from './components/sections/Education';
import Testimonials from './components/sections/Testimonials';
import Blog from './components/sections/Blog';
import GitHubCalendar from './components/sections/GitHubCalendar';
import Contact from './components/sections/Contact';
import ScrollProgress from './components/ui/ScrollProgress';
import BackToTop from './components/ui/BackToTop';
import { useTheme } from './context/ThemeContext';

function App() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-d-bg' : 'bg-parchment'}`}>
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <About />
        <div className="section-divider" />
        <Projects />
        <div className="section-divider" />
        <Skills />
        <div className="section-divider" />
        <Experience />
        <Education />
        <div className="section-divider" />
        <GitHubCalendar />
        <Testimonials />
        <Blog />
        <div className="section-divider" />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
