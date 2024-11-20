# Next.js Portfolio 🚀

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC)](https://tailwindcss.com/)

Ein modernes, performantes Portfolio entwickelt mit Next.js und TypeScript. Live Demo: [https://achimsommer.com](https://achimsommer.com)

![Portfolio Preview](public/img/website.png)

## ✨ Features

### 🎨 Design & UI
- Responsives Design für alle Geräte
- Dark/Light Mode mit System-Präferenz
- Smooth Scroll & Animationen
- Moderne UI/UX mit Tailwind CSS
- Interaktive 3D Komponenten
- Particle Effekte & Animationen

### 🛠 Technische Features
- Server-Side Rendering (SSR)
- API Routes für GitHub & WakaTime Integration
- TypeScript für type-safety
- Optimierte Performance (100/100 Lighthouse Score)
- SEO optimiert mit Next.js Metadata
- Progressive Web App (PWA) fähig
- Datenschutzfreundliche Analytics mit Umami

### 📱 Komponenten
- Interaktive Projekt-Showcase
- Skill-Visualisierung
- GitHub Repository Integration
- WakaTime Statistiken
- Kontaktformular
- Social Media Integration
- Floating Navigation
- 3D Tech Stack Visualisierung

## 🛠 Technologie-Stack

### Frontend
- **Framework:** Next.js 14
- **Sprache:** TypeScript
- **Styling:** Tailwind CSS
- **Animationen:** Framer Motion
- **3D Effekte:** Custom 3D Komponenten
- **Icons:** Tabler Icons, React Icons

### Backend & APIs
- **API Routes:** Next.js API Routes
- **Externe APIs:** 
  - GitHub API (Repositories)
  - WakaTime API (Coding Stats)
  - Umami Analytics (Selbst-gehostet)

### Deployment & Hosting
- **Primäre Option:** [Zap-Hosting](https://zap-hosting.com/) mit [Coolify](https://coolify.io/)
  - Selbst-gehostete Alternative zu Vercel
  - Volle Kontrolle über die Infrastruktur
  - Einfaches Deployment via Git
  - Automatische SSL-Zertifikate
  - Integriertes Monitoring

- **Alternative:** Vercel
  - Automatisches Deployment
  - Edge Network
  - Analytik & Monitoring

### 🔍 SEO-Konfiguration

Das Portfolio ist mit einer dynamischen XML-Sitemap und robots.txt für optimale Suchmaschinenindexierung ausgestattet.

#### Sitemap
- Automatisch generierte XML-Sitemap unter `/sitemap.xml`
- Dynamische Aktualisierung der Seiten
- Automatische `lastmod` Daten

#### robots.txt
- Suchmaschinen-Crawler Konfiguration
- Sitemap-Referenz für bessere Indexierung

#### Domain-Konfiguration
Um die SEO-Funktionen für deine Domain zu aktivieren:

1. In `public/robots.txt` die Sitemap-URL anpassen:
```txt
Sitemap: https://deine-domain.com/sitemap.xml
```

2. In `pages/sitemap.xml.tsx` die Domain-Konstante aktualisieren:
```typescript
const EXTERNAL_DATA_URL = 'https://deine-domain.com'
```

Diese SEO-Optimierungen verbessern die Sichtbarkeit deiner Portfolio-Website in Suchmaschinen.

## 🚀 Schnellstart

### Voraussetzungen
- Node.js 18+ installiert
- Git installiert
- GitHub Account
- WakaTime Account (optional)

### Installation

1. Repository klonen
```bash
git clone https://github.com/yourusername/nextjs-portfolio.git
```

2. In das Projektverzeichnis wechseln
```bash
cd nextjs-portfolio
```

3. Abhängigkeiten installieren
```bash
npm install
```

4. Umgebungsvariablen konfigurieren
```bash
cp .env.example .env.local
```
Fülle die Variablen in `.env.local` aus:
```env
GITHUB_TOKEN=dein_github_token
WAKATIME_API_KEY=dein_wakatime_api_key
NEXT_PUBLIC_UMAMI_WEBSITE_ID=dein_umami_website_api_key
NEXT_PUBLIC_UMAMI_URL=https://ihre-umami-domain.com/script.js
```

5. Entwicklungsserver starten
```bash
npm run dev
```

6. Browser öffnen
```
http://localhost:3000
```

## 📁 Projektstruktur

```
├── public/              # Statische Assets
│   ├── img/            # Bilder & Icons
│   └── ...
├── src/
│   ├── app/            # App Router Pages
│   │   ├── api/        # API Routes
│   │   └── ...
│   ├── components/     # React Komponenten
│   │   ├── 3d/        # 3D Komponenten
│   │   ├── tabs/      # Tab Komponenten
│   │   └── ui/        # UI Komponenten
│   ├── context/       # React Context
│   ├── lib/           # Hilfsfunktionen
│   └── utils/         # Utility Funktionen
```

## 🌐 Deployment mit Zap-Hosting & Coolify

1. Server bei [Zap-Hosting](https://zap-hosting.com/) mieten
2. Coolify auf dem Server installieren
```bash
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
```
3. Coolify einrichten:
   - Repository verbinden
   - Umgebungsvariablen setzen
   - Build-Einstellungen konfigurieren
4. Deployment starten

### Deployment Konfiguration
```yaml
Build Command: npm run build
Start Command: npm start
Node Version: 18
Port: 3000
```

## 💻 Development

### Best Practices
- Komponenten modular halten
- TypeScript strict mode nutzen
- Tailwind Klassen mit @apply organisieren
- Images optimieren
- Lazy Loading für große Komponenten
- regelmäßige Dependency Updates

### Code Style
- ESLint für konsistenten Code
- Prettier für Formatierung
- TypeScript für Type Safety

## 🔨 Scripts

- `npm run dev` - Entwicklungsserver starten
- `npm run build` - Produktions-Build erstellen
- `npm run start` - Produktionsserver starten
- `npm run lint` - Code-Linting durchführen
- `npm run format` - Code formatieren

## 📝 Lizenz

Dieses Projekt ist unter der [MIT Lizenz](LICENSE.md) lizenziert.

## 🤝 Beitragen

Beiträge sind willkommen! Bitte beachte:
1. Fork das Projekt
2. Erstelle einen Feature Branch
3. Committe deine Änderungen
4. Push zu dem Branch
5. Öffne einen Pull Request

## 📧 Kontakt

Bei Fragen oder Anregungen kannst du:
- Ein Issue erstellen
- Einen Pull Request öffnen
- Mich direkt kontaktieren

## 🙏 Danksagung

Besonderer Dank geht an:
- Next.js Team für das großartige Framework
- Zap-Hosting für zuverlässiges Hosting
- Coolify für die Self-Hosting Lösung
