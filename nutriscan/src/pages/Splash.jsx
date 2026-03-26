import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './Splash.module.css';

/* ── Orb data for aurora background ── */
const ORBS = [
  { w: '60vw', h: '60vw', top: '-10%', left: '-15%',  color: 'rgba(74,222,128,0.18)',  delay: 0   },
  { w: '50vw', h: '50vw', top: '20%',  right: '-10%', color: 'rgba(45,212,191,0.15)',  delay: 0.4 },
  { w: '45vw', h: '45vw', bottom: '-5%',left: '30%',  color: 'rgba(37,99,235,0.15)',   delay: 0.8 },
];

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/landing'), 2800);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={styles.splash}>
      {/* Aurora orbs */}
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className={styles.orb}
          style={{
            width: orb.w, height: orb.h,
            top: orb.top, left: orb.left, right: orb.right, bottom: orb.bottom,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, delay: orb.delay, ease: 'easeOut' }}
        />
      ))}

      {/* Grid overlay */}
      <div className={styles.grid} />

      {/* Center content */}
      <div className={styles.center}>

        {/* Logo icon */}
        <motion.div
          className={styles.logoIcon}
          initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <span className={styles.logoEmoji}>🍎</span>
          <svg className={styles.logoRing} viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="45" stroke="url(#ringGrad)" strokeWidth="1.5" strokeDasharray="6 4" />
            <defs>
              <linearGradient id="ringGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#4ADE80" />
                <stop offset="50%" stopColor="#2DD4BF" />
                <stop offset="100%" stopColor="#2563EB" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Wordmark */}
        <motion.div
          className={styles.wordmark}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
        >
          <span className={styles.wordGreen}>Nutri</span>
          <span className={styles.wordTeal}>Scan</span>
          <span className={styles.wordWhite}> AI</span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className={styles.tagline}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85, ease: 'easeOut' }}
        >
          Non-invasive AI health screening for every Indian
        </motion.p>

        {/* Loading dots */}
        <motion.div
          className={styles.dots}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              className={styles.dot}
              animate={{ y: [0, -8, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1, delay: i * 0.18, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
