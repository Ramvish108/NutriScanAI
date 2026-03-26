import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Dashboard.module.css';

/* ── Mini scan bar ── */
function MiniBar({ label, pct, color, delay }) {
  return (
    <motion.div
      className={styles.miniBar}
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
    >
      <div className={styles.miniBarMeta}>
        <span className={styles.miniBarLabel}>{label}</span>
        <span style={{ color, fontSize: '0.78rem', fontWeight: 700 }}>{pct}%</span>
      </div>
      <div className={styles.miniBarTrack}>
        <motion.div
          className={styles.miniBarFill}
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, delay: delay + 0.2, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}

const TABS = ['Overview', 'Scan Now', 'History', 'Settings'];

const NUTRIENTS = [
  { label: 'Iron (Fe)', pct: 38, color: '#FACC15', status: 'Low', tip: 'Include leafy greens, lentils & dates. Consider Ferrous Sulphate 200mg.' },
  { label: 'Vitamin B12', pct: 27, color: '#60A5FA', status: 'Low', tip: 'Eat more dairy, eggs & paneer. Consider Cyanocobalamin 500mcg daily.' },
  { label: 'Vitamin C', pct: 81, color: '#4ADE80', status: 'Normal', tip: 'Levels are healthy. Maintain citrus fruits, amla in your diet.' },
  { label: 'Zinc', pct: 55, color: '#2DD4BF', status: 'Moderate', tip: 'Include pumpkin seeds & chickpeas. Consider Zincovit supplement.' },
  { label: 'Biotin', pct: 63, color: '#A78BFA', status: 'Normal', tip: 'Adequate levels. Continue with nuts & whole grains.' },
];

const SCAN_MODES = [
  { icon: '💬', label: 'Text Chat', desc: 'Describe symptoms in English or Hindi', color: '#4ADE80', bg: 'rgba(74,222,128,0.1)' },
  { icon: '📷', label: 'Image Scan', desc: 'Upload skin, nail or tongue photo', color: '#2DD4BF', bg: 'rgba(45,212,191,0.1)' },
  { icon: '🎤', label: 'Voice Input', desc: 'Speak naturally, AI listens & responds', color: '#2563EB', bg: 'rgba(37,99,235,0.1)' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedNutrient, setSelectedNutrient] = useState(null);
  const [scanMode, setScanMode] = useState(null);

  return (
    <div className={styles.dash}>
      {/* ── Sidebar ── */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo} onClick={() => navigate('/landing')}>
          <div className={styles.logoIcon}>🍎</div>
          <span>
            <span className={styles.green}>Nutri</span>
            <span className={styles.teal}>Scan</span>
          </span>
        </div>

        <nav className={styles.sideNav}>
          {TABS.map(tab => (
            <button
              key={tab}
              className={`${styles.sideTab} ${activeTab === tab ? styles.sideTabActive : ''}`}
              onClick={() => { setActiveTab(tab); setScanMode(null); setSelectedNutrient(null); }}
            >
              <span className={styles.sideTabIcon}>
                {tab === 'Overview' ? '🏠' : tab === 'Scan Now' ? '🔬' : tab === 'History' ? '📋' : '⚙️'}
              </span>
              {tab}
            </button>
          ))}
        </nav>

        <div className={styles.sideFooter}>
          <div className={styles.userChip}>
            <div className={styles.userAvatar}>U</div>
            <div>
              <div className={styles.userName}>Demo User</div>
              <div className={styles.userStatus}>Free Plan</div>
            </div>
          </div>
          <button className={styles.backBtn} onClick={() => navigate('/landing')}>← Back to Home</button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main className={styles.main}>
        {/* Top bar */}
        <div className={styles.topbar}>
          <div>
            <h1 className={styles.topTitle}>{activeTab}</h1>
            <p className={styles.topSub}>
              {activeTab === 'Overview' && 'Your latest micronutrient screening report'}
              {activeTab === 'Scan Now' && 'Start a new AI screening session'}
              {activeTab === 'History' && 'Your past screening records'}
              {activeTab === 'Settings' && 'Manage your preferences'}
            </p>
          </div>
          <motion.button
            className={styles.newScanBtn}
            onClick={() => setActiveTab('Scan Now')}
            whileHover={{ scale: 1.04, boxShadow: '0 0 28px rgba(74,222,128,0.4)' }}
            whileTap={{ scale: 0.97 }}
          >
            + New Scan
          </motion.button>
        </div>

        <div className={styles.content}>
          <AnimatePresence mode="wait">

            {/* ── OVERVIEW TAB ── */}
            {activeTab === 'Overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
              >
                {/* Summary cards */}
                <div className={styles.summaryGrid}>
                  {[
                    { label: 'Overall Score', value: '61%', sub: 'Moderate Risk', color: '#FACC15', icon: '🧬' },
                    { label: 'Deficiencies', value: '2', sub: 'Iron & B12 Low', color: '#F87171', icon: '⚠️' },
                    { label: 'Normal Range', value: '3/5', sub: 'Nutrients OK', color: '#4ADE80', icon: '✅' },
                    { label: 'Last Scan', value: 'Today', sub: '12:34 PM', color: '#2DD4BF', icon: '🕐' },
                  ].map((c, i) => (
                    <motion.div
                      key={c.label}
                      className={styles.summaryCard}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <div className={styles.sumIcon}>{c.icon}</div>
                      <div className={styles.sumVal} style={{ color: c.color }}>{c.value}</div>
                      <div className={styles.sumLabel}>{c.label}</div>
                      <div className={styles.sumSub}>{c.sub}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Nutrient bars */}
                <div className={styles.panelRow}>
                  <div className={styles.panel}>
                    <div className={styles.panelTitle}>Nutrient Levels</div>
                    <div className={styles.barList}>
                      {NUTRIENTS.map((n, i) => (
                        <div
                          key={n.label}
                          className={`${styles.barItem} ${selectedNutrient?.label === n.label ? styles.barItemActive : ''}`}
                          onClick={() => setSelectedNutrient(n)}
                        >
                          <MiniBar {...n} delay={i * 0.08} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Detail panel */}
                  <div className={styles.panel}>
                    <div className={styles.panelTitle}>Recommendations</div>
                    <AnimatePresence mode="wait">
                      {selectedNutrient ? (
                        <motion.div
                          key={selectedNutrient.label}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className={styles.detailCard}
                        >
                          <div className={styles.detailHeader}>
                            <div className={styles.detailName}>{selectedNutrient.label}</div>
                            <span
                              className={styles.statusPill}
                              style={{
                                background: selectedNutrient.status === 'Normal' ? 'rgba(74,222,128,0.15)' : selectedNutrient.status === 'Low' ? 'rgba(248,113,113,0.15)' : 'rgba(250,204,21,0.15)',
                                color: selectedNutrient.status === 'Normal' ? '#4ADE80' : selectedNutrient.status === 'Low' ? '#F87171' : '#FACC15',
                                borderColor: selectedNutrient.status === 'Normal' ? 'rgba(74,222,128,0.3)' : selectedNutrient.status === 'Low' ? 'rgba(248,113,113,0.3)' : 'rgba(250,204,21,0.3)',
                              }}
                            >
                              {selectedNutrient.status}
                            </span>
                          </div>
                          <div className={styles.detailPct} style={{ color: selectedNutrient.color }}>
                            {selectedNutrient.pct}% of optimal level
                          </div>
                          <div className={styles.detailTip}>
                            <span className={styles.tipIcon}>💊</span>
                            {selectedNutrient.tip}
                          </div>
                          <div className={styles.detailNote}>
                            ⚠ This is an AI screening result. Consult a registered physician for diagnosis.
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="placeholder"
                          className={styles.detailPlaceholder}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <span className={styles.placeholderIcon}>👆</span>
                          <p>Select a nutrient on the left to see recommendations</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── SCAN NOW TAB ── */}
            {activeTab === 'Scan Now' && (
              <motion.div
                key="scan"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
              >
                <AnimatePresence mode="wait">
                  {!scanMode ? (
                    <motion.div key="mode-select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <p className={styles.scanPrompt}>Choose how you'd like to interact with NutriScan AI:</p>
                      <div className={styles.modeGrid}>
                        {SCAN_MODES.map((m, i) => (
                          <motion.button
                            key={m.label}
                            className={styles.modeCard}
                            style={{ '--accent': m.color, '--accBg': m.bg }}
                            onClick={() => setScanMode(m.label)}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -6, boxShadow: `0 20px 48px rgba(0,0,0,0.4), 0 0 0 1px ${m.color}33` }}
                            whileTap={{ scale: 0.97 }}
                          >
                            <span className={styles.modeIcon}>{m.icon}</span>
                            <span className={styles.modeLabel}>{m.label}</span>
                            <span className={styles.modeDesc}>{m.desc}</span>
                            <span className={styles.modeArrow} style={{ color: m.color }}>→</span>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key="scan-active" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                      <button className={styles.backLink} onClick={() => setScanMode(null)}>← Back to modes</button>
                      <ScanInterface mode={scanMode} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* ── HISTORY TAB ── */}
            {activeTab === 'History' && (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
              >
                <div className={styles.historyList}>
                  {[
                    { date: 'Today, 12:34 PM', score: 61, mode: '💬 Text', status: 'Low Iron & B12' },
                    { date: 'Yesterday, 9:10 AM', score: 74, mode: '📷 Image', status: 'Mild Zinc deficiency' },
                    { date: '15 Feb 2025, 3:22 PM', score: 58, mode: '🎤 Voice', status: 'Low Iron' },
                  ].map((h, i) => (
                    <motion.div
                      key={h.date}
                      className={styles.historyCard}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ borderColor: 'rgba(45,212,191,0.3)' }}
                    >
                      <div className={styles.histLeft}>
                        <div className={styles.histDate}>{h.date}</div>
                        <div className={styles.histStatus}>{h.status}</div>
                        <div className={styles.histMode}>{h.mode}</div>
                      </div>
                      <div className={styles.histScore} style={{ color: h.score > 70 ? '#4ADE80' : h.score > 55 ? '#FACC15' : '#F87171' }}>
                        {h.score}%
                        <div className={styles.histScoreLbl}>Score</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── SETTINGS TAB ── */}
            {activeTab === 'Settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
                className={styles.settingsGrid}
              >
                {[
                  { label: 'Language', value: 'English', options: ['English', 'Hindi'] },
                  { label: 'Theme', value: 'Dark', options: ['Dark', 'Light'] },
                  { label: 'Alerts', value: 'Enabled', options: ['Enabled', 'Off'] },
                  { label: 'Privacy Mode', value: 'Off', options: ['On', 'Off'] },
                ].map((s, i) => (
                  <motion.div
                    key={s.label}
                    className={styles.settingCard}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <div className={styles.settingLabel}>{s.label}</div>
                    <div className={styles.settingOptions}>
                      {s.options.map(opt => (
                        <button key={opt} className={`${styles.settingOpt} ${s.value === opt ? styles.settingOptActive : ''}`}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

/* ─────────────────────────────── */
/* Inline Scan Interface component */
/* ─────────────────────────────── */
const AI_RESPONSES = [
  'Namaste 🙏 I\'m NutriScan AI. How long have you experienced these symptoms?',
  'Have you noticed any changes in your nail colour or skin texture?',
  'Are you experiencing fatigue or hair loss? These are common signs of Iron or B12 deficiency.',
  'Based on your inputs, I\'m detecting possible Iron & B12 deficiency. Check the Overview tab for your full report.',
];

function ScanInterface({ mode }) {
  const [messages, setMessages] = useState([
    { from: 'ai', text: AI_RESPONSES[0] }
  ]);
  const [input, setInput] = useState('');
  const [respIdx, setRespIdx] = useState(1);
  const [recording, setRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const endRef = useRef(null);
  const fileInputRef = useRef(null);

  const send = () => {
    if (!input.trim()) return;
    setMessages(m => [...m, { from: 'user', text: input.trim() }]);
    setInput('');
    const next = AI_RESPONSES[respIdx % AI_RESPONSES.length];
    setRespIdx(i => i + 1);
    setTimeout(() => setMessages(m => [...m, { from: 'ai', text: next }]), 900);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setMessages(m => [...m, { from: 'user', text: `Uploaded image: ${file.name}` }]);
    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.status === 'success') {
        const responseText = `I analyzed the image. Detected: **${data.detected_deficiency}** (Confidence: ${data.confidence}). 
        
Description: ${data.description}
        
Recommended actions:
${data.home_remedies && data.home_remedies.length > 0 ? "• " + data.home_remedies[0] : ""}
${data.medicines && data.medicines.length > 0 ? "• " + data.medicines[0] : ""}`;

        setMessages(m => [...m, { from: 'ai', text: responseText }]);
      } else {
        setMessages(m => [...m, { from: 'ai', text: `Error: ${data.message || 'Failed to analyze.'}` }]);
      }
    } catch (err) {
      console.error(err);
      setMessages(m => [...m, { from: 'ai', text: 'Sorry, there was an error connecting to the AI Server.' }]);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  return (
    <div className={styles.scanInterface}>
      <div className={styles.chatHeader}>
        <div className={styles.chatAvatar}>🧬</div>
        <div>
          <div className={styles.chatTitle}>NutriScan AI · {mode}</div>
          <div className={styles.chatOnline}><span />Online</div>
        </div>
      </div>

      <div className={styles.chatWindow}>
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            className={`${styles.bubble} ${msg.from === 'ai' ? styles.aiBubble : styles.userBubble}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {msg.from === 'ai' && <span className={styles.bubbleTag}>NutriScan AI</span>}
            {msg.from === 'user' && <span className={styles.bubbleTag}>You</span>}
            <div style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</div>
          </motion.div>
        ))}
        {isUploading && (
          <motion.div className={`${styles.bubble} ${styles.aiBubble}`}>
            <span className={styles.bubbleTag}>NutriScan AI</span>
            Analyzing image... ⏳
          </motion.div>
        )}
        <div ref={endRef} />
      </div>

      {mode === 'Image Scan' ? (
        <div
          className={styles.uploadZone}
          onClick={() => fileInputRef.current?.click()}
          style={{ cursor: 'pointer' }}
        >
          <span>📁</span>
          <div className={styles.uploadTitle}>Drop image here or click to browse</div>
          <div className={styles.uploadHint}>Skin · Nails · Tongue · JPG/PNG</div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/jpeg, image/png"
            style={{ display: 'none' }}
          />
        </div>
      ) : mode === 'Voice Input' ? (
        <div className={styles.voicePanel}>
          <motion.button
            className={`${styles.micBtn} ${recording ? styles.micActive : ''}`}
            onClick={() => setRecording(r => !r)}
            animate={recording ? { boxShadow: ['0 0 0 0 rgba(74,222,128,0.4)', '0 0 0 20px rgba(74,222,128,0)'] } : {}}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            🎤
          </motion.button>
          <p className={styles.voiceHint}>{recording ? 'Listening… tap to stop' : 'Tap to start speaking'}</p>
        </div>
      ) : (
        <div className={styles.chatInputRow}>
          <input
            className={styles.chatInput}
            placeholder="Type symptoms in English or Hindi…"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
          />
          <motion.button
            className={styles.sendBtn}
            onClick={send}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >→</motion.button>
        </div>
      )}
    </div>
  );
}
