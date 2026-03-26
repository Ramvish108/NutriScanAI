import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features',     href: '#features' },
  { label: 'Technology',   href: '#technology' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className={styles.inner}>
        {/* Logo */}
        <div className={styles.logo} onClick={() => navigate('/landing')}>
          <div className={styles.logoIcon}>🍎</div>
          <span>
            <span className={styles.green}>Nutri</span>
            <span className={styles.teal}>Scan</span>
            <span className={styles.ai}> AI</span>
          </span>
        </div>

        {/* Desktop links */}
        <ul className={styles.links}>
          {NAV_LINKS.map(link => (
            <li key={link.label}>
              <button onClick={() => scrollTo(link.href)} className={styles.link}>
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <motion.button
          className={styles.cta}
          onClick={() => navigate('/dashboard')}
          whileHover={{ scale: 1.04, boxShadow: '0 0 28px rgba(74,222,128,0.4)' }}
          whileTap={{ scale: 0.97 }}
        >
          Start Screening
        </motion.button>

        {/* Mobile hamburger */}
        <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span className={`${styles.bar} ${menuOpen ? styles.barTop : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barHide : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barBot : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {NAV_LINKS.map(link => (
              <button key={link.label} onClick={() => scrollTo(link.href)} className={styles.mobileLink}>
                {link.label}
              </button>
            ))}
            <button className={styles.mobileCta} onClick={() => navigate('/dashboard')}>
              Start Screening
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
