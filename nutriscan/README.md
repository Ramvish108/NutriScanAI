# 🍎 NutriScan AI — Frontend

> Non-invasive AI-powered micronutrient deficiency screening for Indian users.
> Built with React + Vite + Framer Motion.

---

## 📁 Folder Structure

```
nutriscan-ai/
├── index.html
├── vite.config.js
├── package.json
├── README.md
└── src/
    ├── main.jsx                  # React entry point
    ├── App.jsx                   # Router setup (/, /landing, /dashboard)
    │
    ├── styles/
    │   └── index.css             # Global CSS variables, reset, utilities
    │
    ├── components/
    │   ├── Navbar.jsx            # Sticky nav with mobile hamburger menu
    │   ├── Navbar.module.css
    │   └── FadeSection.jsx       # Reusable scroll-reveal wrapper (Framer Motion)
    │
    └── pages/
        ├── Splash.jsx            # Animated splash screen (auto-redirects to /landing)
        ├── Splash.module.css
        ├── Landing.jsx           # Full multi-section landing page
        ├── Landing.module.css
        ├── Dashboard.jsx         # Dashboard with tabs: Overview, Scan, History, Settings
        └── Dashboard.module.css
```

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser at
http://localhost:5173
```

---

## 🗺 Routes

| Route        | Page       | Description                              |
|--------------|------------|------------------------------------------|
| `/`          | Splash     | Animated logo + aurora → auto-redirects to /landing after 2.8s |
| `/landing`   | Landing    | Full multi-section marketing landing page |
| `/dashboard` | Dashboard  | 4-tab dashboard: Overview, Scan Now, History, Settings |

---

## 🎨 Brand Colors

```css
--eco-green:  #4ADE80   /* Highlights, freshness accents  */
--teal-pulse: #2DD4BF   /* Gradient mid-tones             */
--deep-blue:  #2563EB   /* Tech accents                   */
--midnight:   #0F172A   /* Primary background             */
--soft-slate: #F8FAFC   /* Light text / backgrounds       */
```

---

## 📄 Landing Page Sections

1. **Hero** — Aurora canvas bg · Typing effect subtitle · Floating scan card · CTA buttons
2. **Problem** — India's nutrition crisis · 4 impact stats
3. **How It Works** — 3 step cards + 3 interaction mode cards (Text / Image / Voice)
4. **Features** — 8 feature cards (CNN, Voice, Multilingual, Low-end device, etc.)
5. **Technology** — 8 tech badges (TF, MobileNetV3, FastAPI, MySQL…) + architecture pipeline
6. **CTA Banner** — Full-width call to action
7. **Footer**

---

## 📦 Dependencies

| Package          | Purpose                    |
|------------------|----------------------------|
| react            | UI framework               |
| react-dom        | DOM renderer               |
| react-router-dom | Client-side routing        |
| framer-motion    | Animations & transitions   |
| vite             | Build tool & dev server    |

---

## 📱 Responsive Breakpoints

- **Mobile first**: base styles
- **Tablet**: `min-width: 640px`
- **Desktop**: `min-width: 900px`
- **Wide**: `min-width: 1100px`

---

## ⚠ Disclaimer

NutriScan AI is a screening aid for educational/research purposes only.
It does not constitute medical advice. Always consult a registered healthcare
professional for diagnosis and treatment.
