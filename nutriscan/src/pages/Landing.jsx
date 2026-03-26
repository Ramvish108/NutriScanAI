import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import FadeSection from '../components/FadeSection';
import styles from './Landing.module.css';

/* ══════════════════════════════════════════
   TYPING EFFECT HOOK
══════════════════════════════════════════ */
function useTyping(phrases, speed = 60, pause = 1800) {
  const [displayed, setDisplayed] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];
    let timeout;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setPhraseIdx(i => (i + 1) % phrases.length);
    }

    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, phraseIdx, phrases, speed, pause]);

  return displayed;
}

/* ══════════════════════════════════════════
   HERO AURORA CANVAS
══════════════════════════════════════════ */
function AuroraBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let t = 0;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const orbs = [
      { ox: 0.18, oy: 0.30, r: 0.52, c: '74,222,128', s: 0.00038 },
      { ox: 0.72, oy: 0.22, r: 0.46, c: '45,212,191', s: 0.00055 },
      { ox: 0.50, oy: 0.75, r: 0.58, c: '37,99,235',  s: 0.00028 },
      { ox: 0.85, oy: 0.55, r: 0.38, c: '74,222,128', s: 0.00048 },
    ];

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#0F172A';
      ctx.fillRect(0, 0, W, H);

      orbs.forEach((orb, i) => {
        const x = (Math.sin(t * orb.s * 1000 + i * 1.4) * 0.1 + orb.ox) * W;
        const y = (Math.cos(t * orb.s * 1000 + i * 0.9) * 0.09 + orb.oy) * H;
        const radius = orb.r * Math.min(W, H);
        const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
        g.addColorStop(0,   `rgba(${orb.c},0.2)`);
        g.addColorStop(0.5, `rgba(${orb.c},0.07)`);
        g.addColorStop(1,   `rgba(${orb.c},0)`);
        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.ellipse(x, y, radius * 1.5, radius, Math.sin(t * 0.00018 + i) * 0.45, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalCompositeOperation = 'source-over';
      t += 16;
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return <canvas ref={canvasRef} className={styles.auroraCanvas} />;
}

/* ══════════════════════════════════════════
   HERO SCAN CARD
══════════════════════════════════════════ */
const BARS = [
  { label: 'Iron (Fe)',   pct: 38, color: '#FACC15' },
  { label: 'Vitamin B12', pct: 27, color: '#60A5FA' },
  { label: 'Vitamin C',   pct: 81, color: '#4ADE80' },
  { label: 'Zinc',        pct: 55, color: '#2DD4BF' },
  { label: 'Biotin',      pct: 63, color: '#A78BFA' },
];

function ScanCard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className={styles.scanCard}
      initial={{ opacity: 0, x: 40, rotate: 3 }}
      animate={{ opacity: 1, x: 0, rotate: 0 }}
      transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className={styles.cardHeader}>
          <div className={styles.cardAvatar}>🧬</div>
          <div>
            <div className={styles.cardTitle}>Live Analysis Report</div>
            <div className={styles.cardSub}>CNN · MobileNetV3</div>
          </div>
          <div className={styles.liveChip}>
            <span className={styles.liveDot} /> LIVE
          </div>
        </div>

        {BARS.map((b) => (
          <div key={b.label} className={styles.barRow}>
            <div className={styles.barMeta}>
              <span className={styles.barLabel}>{b.label}</span>
              <span style={{ color: b.color, fontWeight: 700, fontSize: '0.78rem' }}>{b.pct}%</span>
            </div>
            <div className={styles.barTrack}>
              <motion.div
                className={styles.barFill}
                style={{ background: b.color }}
                initial={{ width: 0 }}
                animate={inView ? { width: `${b.pct}%` } : {}}
                transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
              />
            </div>
          </div>
        ))}

        <div className={styles.cardFooter}>
          <span className={styles.footerStatus}>✓ Screening Complete</span>
          <span className={styles.footerAcc}>Accuracy: 91.4%</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   HOW IT WORKS CARD
══════════════════════════════════════════ */
function StepCard({ icon, step, title, desc, color, delay }) {
  return (
    <FadeSection delay={delay}>
      <motion.div
        className={styles.stepCard}
        style={{ '--accent': color }}
        whileHover={{ y: -8, boxShadow: `0 24px 56px rgba(0,0,0,0.45), 0 0 0 1px ${color}33` }}
        transition={{ duration: 0.3 }}
      >
        <div className={styles.stepNum} style={{ background: `${color}18`, color }}>{step}</div>
        <div className={styles.stepIcon}>{icon}</div>
        <h3 className={styles.stepTitle}>{title}</h3>
        <p className={styles.stepDesc}>{desc}</p>
        <div className={styles.stepAccent} style={{ background: color }} />
      </motion.div>
    </FadeSection>
  );
}

/* ══════════════════════════════════════════
   FEATURE CARD
══════════════════════════════════════════ */
function FeatureCard({ icon, title, desc, accent, delay }) {
  return (
    <FadeSection delay={delay}>
      <motion.div
        className={styles.featureCard}
        whileHover={{ y: -6, borderColor: `${accent}44` }}
        transition={{ duration: 0.25 }}
      >
        <div className={styles.featureIcon} style={{ background: `${accent}15` }}>{icon}</div>
        <h4 className={styles.featureTitle}>{title}</h4>
        <p className={styles.featureDesc}>{desc}</p>
      </motion.div>
    </FadeSection>
  );
}

/* ══════════════════════════════════════════
   TECH BADGE
══════════════════════════════════════════ */
function TechBadge({ emoji, name, role, delay }) {
  return (
    <FadeSection delay={delay}>
      <motion.div
        className={styles.techBadge}
        whileHover={{ y: -5, borderColor: 'rgba(74,222,128,0.35)' }}
        transition={{ duration: 0.25 }}
      >
        <span className={styles.techEmoji}>{emoji}</span>
        <div className={styles.techName}>{name}</div>
        <div className={styles.techRole}>{role}</div>
      </motion.div>
    </FadeSection>
  );
}

/* ══════════════════════════════════════════
   MAIN LANDING
══════════════════════════════════════════ */
const TYPING_PHRASES = [
  'Detect Iron Deficiency Early.',
  'Screen for Vitamin B12 Levels.',
  'Identify Zinc Deficiency.',
  'Monitor Biotin & Vitamin C.',
  'AI Health Screening at Home.',
];

const FEATURES = [
  { icon: '🖼️', title: 'CNN Image Analysis',       desc: 'MobileNetV3 analyses skin, nail & tongue photos for deficiency markers with 91%+ accuracy.',            accent: '#4ADE80' },
  { icon: '💬', title: 'Text-Based Interaction',    desc: 'Describe symptoms in English or Hindi. The AI asks intelligent follow-ups to build your profile.',     accent: '#2DD4BF' },
  { icon: '🎤', title: 'Voice Interaction',         desc: 'Speak naturally. AI listens, transcribes, and responds with on-screen subtitles in your language.',    accent: '#2563EB' },
  { icon: '🌐', title: 'Multilingual Support',      desc: 'Full English and Hindi interface with extensible i18n — built for India\'s linguistic diversity.',     accent: '#4ADE80' },
  { icon: '📱', title: 'Low-End Device Ready',      desc: 'TensorFlow Lite keeps inference smooth on 2GB RAM phones. No premium hardware required.',              accent: '#FACC15' },
  { icon: '📊', title: 'Risk Visualization',        desc: 'Clear charts, percentage breakdowns, and pie graphs — generated instantly for easy understanding.',    accent: '#2DD4BF' },
  { icon: '💊', title: 'Doctor-Style Guidance',     desc: 'Medicines, dosage patterns, home remedies & dietary advice tailored to your deficiency profile.',      accent: '#2563EB' },
  { icon: '🔒', title: 'Privacy First',             desc: 'Offline mode via TensorFlow Lite. No health data stored without explicit consent. Transparent AI.',   accent: '#4ADE80' },
];

const TECH = [
  { emoji: '🧠', name: 'TensorFlow / Keras', role: 'Deep Learning Framework' },
  { emoji: '📱', name: 'MobileNetV3',         role: 'Lightweight CNN Model'  },
  { emoji: '⚡', name: 'FastAPI',             role: 'Backend REST API'       },
  { emoji: '🗄️', name: 'MySQL',              role: 'Relational Database'    },
  { emoji: '🎤', name: 'Speech APIs',         role: 'Voice Processing'       },
  { emoji: '🐍', name: 'Python',              role: 'Core Language'          },
  { emoji: '🎨', name: 'React Native',        role: 'Mobile Frontend'        },
  { emoji: '📊', name: 'Chart Libraries',     role: 'Visualization Layer'    },
];

export default function Landing() {
  const navigate = useNavigate();
  const typed = useTyping(TYPING_PHRASES, 55, 2000);

  return (
    <div className={styles.page}>
      <Navbar />

      {/* ─── HERO ─── */}
      <section className={styles.hero} id="hero">
        <AuroraBackground />

        {/* Grid overlay */}
        <div className={styles.heroGrid} />

        <div className={`${styles.heroInner} container`}>
          {/* Left */}
          <div className={styles.heroLeft}>
            <motion.div
              className={styles.heroBadge}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className={styles.badgeDot} />
              BCA Final Year Project · 2024–25
            </motion.div>

            <motion.h1
              className={styles.heroHeadline}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              AI-Powered<br />
              <span className={styles.gradientText}>Micronutrient</span><br />
              Screening
            </motion.h1>

            <motion.div
              className={styles.typingWrap}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <span className={styles.typingText}>{typed}</span>
              <span className={styles.cursor}>|</span>
            </motion.div>

            <motion.p
              className={styles.heroPara}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              NutriScan AI detects Iron, B12, Zinc, Vitamin C & Biotin deficiencies
              through non-invasive analysis of skin, nails & tongue — via text, voice,
              or photo on any smartphone. Available in English & Hindi.
            </motion.p>

            <motion.div
              className={styles.heroCtas}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              <motion.button
                className={styles.ctaPrimary}
                onClick={() => navigate('/dashboard')}
                whileHover={{ scale: 1.04, boxShadow: '0 0 48px rgba(74,222,128,0.45)' }}
                whileTap={{ scale: 0.97 }}
              >
                🔬 Start Screening
              </motion.button>
              <motion.button
                className={styles.ctaSecondary}
                onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ borderColor: '#2DD4BF', color: '#2DD4BF', background: 'rgba(45,212,191,0.07)' }}
                whileTap={{ scale: 0.97 }}
              >
                Learn More ↓
              </motion.button>
            </motion.div>

            {/* Trust stats */}
            <motion.div
              className={styles.trustRow}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {[['91.4%','CNN Accuracy'],['5+','Nutrients Tracked'],['3','Input Modes'],['2','Languages']].map(([v,l]) => (
                <div key={l} className={styles.trustStat}>
                  <span className={styles.trustVal}>{v}</span>
                  <span className={styles.trustLbl}>{l}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — scan card */}
          <div className={styles.heroRight}>
            <ScanCard />
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className={styles.scrollIndicator}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          onClick={() => document.getElementById('problem').scrollIntoView({ behavior: 'smooth' })}
        >
          <span className={styles.scrollText}>SCROLL</span>
          <div className={styles.scrollBox}>
            <motion.div
              className={styles.scrollBead}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </section>

      {/* ─── PROBLEM ─── */}
      <section className={styles.problem} id="problem">
        <div className="container">
          <FadeSection>
            <p className="section-tag">The Problem</p>
          </FadeSection>

          <FadeSection delay={0.1}>
            <h2 className={styles.problemHeadline}>
              Millions of Indians suffer in silence.<br />
              <span className={styles.gradientText}>Hidden deficiencies. Zero early warnings.</span>
            </h2>
          </FadeSection>

          <div className={styles.problemGrid}>
            {[
              { stat: '600M+', label: 'Indians with nutritional deficiency',    color: '#4ADE80' },
              { stat: '40%',   label: 'Cases undetected for 2+ years',          color: '#FACC15' },
              { stat: '₹800+', label: 'Average cost of a blood test panel',     color: '#2DD4BF' },
              { stat: '0',     label: 'Invasive procedures needed with us',     color: '#2563EB' },
            ].map((s, i) => (
              <FadeSection key={s.stat} delay={i * 0.1}>
                <div className={styles.problemCard}>
                  <div className={styles.problemStat} style={{ color: s.color }}>{s.stat}</div>
                  <div className={styles.problemLabel}>{s.label}</div>
                </div>
              </FadeSection>
            ))}
          </div>

          <FadeSection delay={0.4}>
            <p className={styles.problemBody}>
              Conventional tests are invasive, costly, and unreachable for rural India.
              Most AI solutions demand premium devices and strong digital literacy —
              leaving out the population that needs them most.{' '}
              <strong style={{ color: '#2DD4BF' }}>NutriScan AI is built differently.</strong>
            </p>
          </FadeSection>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className={styles.howSection} id="how-it-works">
        <div className="container">
          <FadeSection style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
            <p className="section-tag">Process</p>
          </FadeSection>
          <FadeSection delay={0.1} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 className={styles.sectionTitle}>How NutriScan AI Works</h2>
            <p className={styles.sectionSub}>
              Three flexible interaction modes. One unified intelligence.
            </p>
          </FadeSection>

          <div className={styles.stepsGrid}>
            <StepCard
              step="01" icon="📤" color="#4ADE80" delay={0}
              title="Describe or Upload"
              desc="Type symptoms in English or Hindi, speak to the AI, or upload photos of skin, nails, or tongue. The system meets you where you are."
            />
            <StepCard
              step="02" icon="🧠" color="#2DD4BF" delay={0.12}
              title="AI Deep Analysis"
              desc="MobileNetV3 CNN processes images while our NLP engine maps spoken or written symptoms to a comprehensive micronutrient profile."
            />
            <StepCard
              step="03" icon="📋" color="#2563EB" delay={0.24}
              title="Get Risk Report & Guidance"
              desc="Receive a visual deficiency report with percentage scores, charts, doctor-style medicine recommendations, dosage, and home remedies."
            />
          </div>

          {/* 3 mode cards */}
          <div className={styles.modeGrid}>
            {[
              { icon: '💬', mode: 'Text Mode',  col: '#4ADE80', desc: 'Type symptoms in English or Hindi. AI asks follow-ups.' },
              { icon: '📷', mode: 'Image Mode', col: '#2DD4BF', desc: 'Upload skin, nail, or tongue photo. CNN analyses in seconds.' },
              { icon: '🎤', mode: 'Voice Mode', col: '#2563EB', desc: 'Speak naturally. AI transcribes and responds with subtitles.' },
            ].map((m, i) => (
              <FadeSection key={m.mode} delay={i * 0.1}>
                <div className={styles.modeCard} style={{ borderTopColor: m.col }}>
                  <span className={styles.modeIcon}>{m.icon}</span>
                  <h4 className={styles.modeTitle} style={{ color: m.col }}>{m.mode}</h4>
                  <p className={styles.modeDesc}>{m.desc}</p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className={styles.featuresSection} id="features">
        <div className="container">
          <FadeSection style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
            <p className="section-tag">Capabilities</p>
          </FadeSection>
          <FadeSection delay={0.1} style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className={styles.sectionTitle}>Built for Inclusivity & Accuracy</h2>
            <p className={styles.sectionSub}>
              Every feature designed for real Indian users — across devices, languages, and literacy levels.
            </p>
          </FadeSection>

          <div className={styles.featuresGrid}>
            {FEATURES.map((f, i) => (
              <FeatureCard key={f.title} {...f} delay={i * 0.07} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── TECHNOLOGY ─── */}
      <section className={styles.techSection} id="technology">
        <div className="container">
          <FadeSection style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
            <p className="section-tag">Technology Stack</p>
          </FadeSection>
          <FadeSection delay={0.1} style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <h2 className={styles.sectionTitle}>Open-Source. Production-Grade.</h2>
          </FadeSection>
          <FadeSection delay={0.15} style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p className={styles.sectionSub}>
              Every tool chosen for lightweight performance, zero licensing cost,
              and suitability for Indian deployment constraints.
            </p>
          </FadeSection>

          <div className={styles.techGrid}>
            {TECH.map((t, i) => (
              <TechBadge key={t.name} {...t} delay={i * 0.07} />
            ))}
          </div>

          {/* Architecture diagram row */}
          <FadeSection delay={0.3}>
            <div className={styles.archRow}>
              {['User Input','Preprocessing','CNN / NLP','Risk Engine','Report & Guidance'].map((node, i, arr) => (
                <div key={node} className={styles.archWrap}>
                  <div className={styles.archNode}>{node}</div>
                  {i < arr.length - 1 && <div className={styles.archArrow}>→</div>}
                </div>
              ))}
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className={styles.ctaSection} id="cta">
        {/* Glow blobs */}
        <div className={styles.ctaGlow1} />
        <div className={styles.ctaGlow2} />

        <div className="container">
          <FadeSection style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <div className={styles.ctaEmoji}>🌿</div>
            <h2 className={styles.ctaHeadline}>
              Begin Your AI Health<br />
              <span className={styles.gradientText}>Screening Today</span>
            </h2>
            <p className={styles.ctaBody}>
              No blood tests. No expensive equipment. No specialist required.<br />
              Just your phone — and NutriScan AI.
            </p>

            <motion.button
              className={styles.ctaBig}
              onClick={() => navigate('/dashboard')}
              whileHover={{ scale: 1.05, boxShadow: '0 0 64px rgba(74,222,128,0.5)' }}
              whileTap={{ scale: 0.97 }}
            >
              🔬 Start Now
            </motion.button>

            <p className={styles.disclaimer}>
              ⚠ NutriScan AI is a screening aid for educational purposes and does not
              constitute medical advice. Always consult a registered healthcare professional
              for diagnosis and treatment.
            </p>
          </FadeSection>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerInner}>
            <div className={styles.footerLogo}>
              <span className={styles.fGreen}>Nutri</span>
              <span className={styles.fTeal}>Scan</span>
              <span className={styles.fAi}> AI</span>
            </div>
            <p className={styles.footerTagline}>
              Non-invasive AI health screening for every Indian · BCA Final Year Project 2024–25
            </p>
            <div className={styles.footerLinks}>
              {[['#how-it-works','How It Works'],['#features','Features'],['#technology','Technology']].map(([href, label]) => (
                <button key={label} className={styles.footerLink}
                  onClick={() => document.querySelector(href).scrollIntoView({ behavior: 'smooth' })}>
                  {label}
                </button>
              ))}
            </div>
            <p className={styles.footerNote}>
              Built with ❤ for India using open-source technologies.
              This project is for academic and research purposes only.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
