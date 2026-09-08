# 🚀 Emircan Can — Personal Portfolio Website

A modern, production-ready, mission-control/HUD-inspired personal portfolio website built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

Designed for **recruiters, engineering leaders, internship employers, and hackathon juries**.

---

## ⚡ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with custom HUD & cyber-grid utilities
- **Icons:** [lucide-react](https://lucide.dev/)
- **Motion:** [Framer Motion](https://www.framer.com/motion/)
- **i18n:** Built-in React Context supporting **English (default)** and **Turkish (TR)**
- **Theme:** Dark HUD (default) with toggleable high-contrast Light mode
- **SEO & Schema:** JSON-LD `Person` schema, Open Graph metadata, dynamic sitemap & robots

---

## 📁 Project Architecture

```
emircan.com/
├── public/
│   └── cv.pdf                   # Resume PDF (wired to the "Download CV" CTA)
├── src/
│   ├── app/
│   │   ├── globals.css          # Mission-control scanlines, HUD corner brackets, glassmorphism
│   │   ├── layout.tsx           # Root layout with fonts, SEO metadata & JSON-LD schema
│   │   ├── page.tsx             # Single-page layout assembling all sections
│   │   ├── robots.ts            # Dynamic robots configuration
│   │   └── sitemap.ts           # Dynamic sitemap configuration
│   ├── components/
│   │   ├── AboutSection.tsx     # Education, technical domains, telemetry stats strip
│   │   ├── AchievementsSection.tsx # Malatya Hackathon 2nd Place & Inufest showcase
│   │   ├── ContactSection.tsx   # Direct email, social channels, and client-side mail composer
│   │   ├── ExperienceSection.tsx# Vertical timeline (Codenorm & AIHexa)
│   │   ├── Footer.tsx           # Status indicators, tech stack attribution, back-to-top
│   │   ├── Header.tsx           # Sticky nav, EC monogram, TR/EN toggle, theme toggle, mobile drawer
│   │   ├── HeroSection.tsx      # Typewriter cycling roles, status chips, CTA actions
│   │   ├── HudBackground.tsx    # Cyber-grid, scanlines, and radial gradient glows
│   │   ├── ProjectModal.tsx     # Deep architectural modal for flagship projects
│   │   ├── ProjectsSection.tsx  # Filterable grid (Web, Mobile, AI & Data, Security) + lab experiments
│   │   └── SkillsSection.tsx    # Categorized skill badges (Languages, Frameworks, Tools, ML/CV)
│   ├── context/
│   │   ├── LanguageContext.tsx  # TR/EN bilingual state with localStorage persistence
│   │   └── ThemeContext.tsx     # Dark/Light HUD theme manager
│   ├── data/
│   │   └── content.ts           # Unified typed data for all sections in EN and TR
│   └── types/
│       └── index.ts             # TypeScript definitions for projects, experience, skills, translations
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🛠️ Quick Start (Local Development)

### 1. Prerequisites
Ensure you have **Node.js 18+** installed:
```bash
node -v
npm -v
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the live portfolio.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

---

## 🐙 Deploy to GitHub Pages (Adım Adım / Step-by-Step)

Bu proje **GitHub Pages** için statik çıktı (`output: 'export'`), `.nojekyll` desteği ve otomatik GitHub Actions CI/CD iş akışı ile tamamen hazırlandı.

### 1. GitHub'da Yeni Depo Oluşturun (Create GitHub Repo)
GitHub hesabınızda (`https://github.com/emir-canswe`) yeni bir repository açın (örneğin `portfolio` veya `emircan.github.io`).

### 2. Projenizi GitHub'a Gönderin (Push to GitHub)
Terminalde bu proje dizinindeyken:
```bash
git init
git add .
git commit -m "feat: initial commit for Emircan Can portfolio"
git branch -M main
git remote add origin https://github.com/emir-canswe/<repo-adiniz>.git
git push -u origin main
```

### 3. GitHub Pages Ayarını Aktifleştirin (Enable GitHub Pages)
1. GitHub reponuzda **Settings** (Ayarlar) sekmesine gidin.
2. Sol menüden **Pages** seçeneğine tıklayın.
3. **Build and deployment > Source** kısmını **"GitHub Actions"** olarak seçin!
4. `main` dalına push yaptığınızda `.github/workflows/deploy.yml` dosyası otomatik olarak:
   - Node.js ortamını kurar
   - `npm install` ve `next build` komutlarını çalıştırır
   - Çıkan `./out` klasörünü GitHub Pages'e canlıya alır!
5. Birkaç dakika içinde siteniz `https://emir-canswe.github.io/<repo-adiniz>/` (veya custom domaininiz) üzerinde yayında olacaktır!

---

## 🌐 Deploy to Vercel (Alternatif)

### Method A: One-Click Vercel Git Integration (Recommended)
1. Push this project to your GitHub account:
   ```bash
   git push -u origin main
   ```
2. Log into [Vercel](https://vercel.com).
3. Click **"Add New..."** -> **"Project"**.
4. Import your repository.
5. Next.js is automatically detected — click **"Deploy"**.

### Method B: Vercel CLI
```bash
npm i -g vercel
vercel
```

---

## ✏️ How to Customize Your Content

All portfolio information, links, and translations are located in **one single file**:
👉 [`src/data/content.ts`](src/data/content.ts)

- **Add or edit projects:** Update the `projects` array in `src/data/content.ts`.
- **Add or edit work experience:** Update the `experiences` array.
- **Update social links:** Edit the `socialLinks` object.
- **Replace CV:** Simply drop your PDF resume into [`public/cv.pdf`](public/cv.pdf).

---

## 📄 License
MIT © [Emircan Can](https://github.com/emir-canswe).
