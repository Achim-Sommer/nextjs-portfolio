---
title: 'PWA mit Next.js erstellen: Schritt für Schritt'
description: 'So machst du aus einer Next.js-App eine Progressive Web App: Manifest, Service Worker, Offline-Fähigkeit und Installation Schritt für Schritt erklärt.'
date: '2024-12-28'
lastModified: '2026-10-02'
tags: ['Next.js', 'Webentwicklung']
featured: false
---

## Einleitung

Progressive Web Apps (PWAs) kombinieren die besten Eigenschaften von Web- und nativen Apps. Sie bieten eine schnelle, zuverlässige und ansprechende Benutzererfahrung, die auf allen Geräten funktioniert. Mit Next.js kannst du eine PWA erstellen, die nicht nur leistungsstark, sondern auch SEO-freundlich ist.

### Warum PWAs mit Next.js?

- **Schnelle Ladezeiten**: Dank Server-Side Rendering (SSR) und Static Site Generation (SSG).
- **Offline-Fähigkeit**: PWAs funktionieren auch ohne Internetverbindung.
- **Installierbar**: Nutzer können PWAs auf ihrem Startbildschirm installieren.
- **SEO-freundlich**: Next.js bietet integrierte SEO-Optimierungen.

Falls du noch abwägst, ob Next.js überhaupt das richtige Werkzeug für dein Projekt ist, hilft dir mein Vergleich [Next.js vs. React](/blog/nextjs-vs-react).

## Voraussetzungen

- Node.js in einer aktuellen LTS-Version (Next.js 16 setzt mindestens Node.js 20.9 voraus)
- Ein Next.js-Projekt mit App Router (falls noch nicht vorhanden, erstelle eines mit `npx create-next-app@latest`)
- Grundkenntnisse in React und Next.js

## Schritt 1: Next.js-Projekt erstellen

Falls du noch kein Next.js-Projekt hast, erstelle eines mit dem folgenden Befehl:

```bash
npx create-next-app@latest meine-pwa
cd meine-pwa
```

Dieser Befehl erstellt ein neues Next.js-Projekt mit allen notwendigen Abhängigkeiten. Wähle während der Installation die gewünschten Optionen (TypeScript, App Router etc.) entsprechend deinen Anforderungen. Die folgenden Beispiele gehen von TypeScript und dem App Router aus.

## Schritt 2: PWA-Pakete installieren

Für den Service Worker nutzt du [Serwist](https://serwist.pages.dev). Serwist ist der Nachfolger des früher verbreiteten Pakets `next-pwa`, das nicht mehr gepflegt wird und mit aktuellen Next.js-Versionen Probleme macht. Installiere die notwendigen Pakete:

```bash
npm install @serwist/next
npm install -D serwist
```

`@serwist/next` bindet Serwist in den Build von Next.js ein, erzeugt den Service Worker und legt eine Liste der Dateien an, die vorab gecacht werden.

<Figure src="/img/blog/progressive-web-apps-pwa-mit-nextjs-schritt-fuer-schritt-anleitung/pwa-nextjs-aufbau.webp" alt="Aufbau einer PWA mit Next.js und Serwist: app/manifest.ts und app/sw.ts werden mit next build --webpack zu /manifest.webmanifest und public/sw.js, im Browser beantwortet der Service Worker Anfragen per NetworkFirst aus dem Netzwerk oder per CacheFirst aus dem Cache" width={1600} height={900} caption="Beim Build entstehen Manifest und Service Worker, im Browser entscheidet der Service Worker dann, ob eine Anfrage aus dem Netz oder aus dem Cache kommt." />

## Schritt 3: Serwist konfigurieren

Erstelle oder aktualisiere die Datei `next.config.mjs`, um Serwist zu konfigurieren:

```javascript
import withSerwistInit from '@serwist/next';

const withSerwist = withSerwistInit({
  // Quelldatei deines Service Workers
  swSrc: 'app/sw.ts',
  // Hier landet der fertige Service Worker
  swDest: 'public/sw.js',
  // Im Entwicklungsmodus deaktivieren, damit der Cache beim Debuggen nicht stört
  disable: process.env.NODE_ENV === 'development',
});

export default withSerwist({
  // Deine bestehende Next.js Konfiguration
  reactStrictMode: true,
});
```

Diese Konfiguration aktiviert Serwist mit folgenden Features:
- Automatische Service Worker Registrierung
- Precaching der statischen Dateien aus dem Build
- Deaktivierung im Entwicklungsmodus für einfacheres Debugging

**Wichtig:** `@serwist/next` arbeitet als Webpack-Plugin. Seit Next.js 16 ist Turbopack der Standard-Bundler, deshalb baust du dein Projekt mit `next build --webpack`. Passe dazu das Build-Skript in deiner `package.json` an. Alternativ bietet Serwist mit `@serwist/turbopack` eine eigene Variante für Turbopack an, die Serwist selbst als experimentell kennzeichnet.

## Schritt 4: Manifest-Datei erstellen

Das Web App Manifest beschreibt deine App gegenüber dem Browser: Name, Icons, Farben und Startseite. Im App Router legst du es als Datei `app/manifest.ts` an. Next.js erzeugt daraus automatisch die Datei `/manifest.webmanifest` und verlinkt sie im Head jeder Seite:

```typescript
import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Meine Progressive Web App',
    short_name: 'MeinePWA',
    description: 'Eine moderne PWA erstellt mit Next.js',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    theme_color: '#ffffff',
    background_color: '#ffffff',
    icons: [
      { src: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
      {
        src: '/icons/icon-512x512-maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
```

Nutzt du noch den Pages Router, legst du stattdessen eine `manifest.json` mit denselben Feldern im Ordner `public` an und bindest sie selbst im Head ein:

```html
<link rel="manifest" href="/manifest.json" />
```

Stelle sicher, dass du alle benötigten Icons im `public/icons` Verzeichnis hast. Wichtig sind vor allem die Größen 192 × 192 und 512 × 512 Pixel sowie ein Icon mit `purpose: 'maskable'`, das Android in verschiedene Formen zuschneiden kann. Du kannst Tools wie [RealFaviconGenerator](https://realfavicongenerator.net/) verwenden, um alle notwendigen Icon-Größen zu erstellen.

## Schritt 5: Service Worker schreiben

Mit Serwist schreibst du den Service Worker selbst, bekommst aber fertige Bausteine für das Caching. Lege die Datei `app/sw.ts` an:

```typescript
/// <reference lib="webworker" />
import { defaultCache } from '@serwist/next/worker';
import type { PrecacheEntry, SerwistGlobalConfig } from 'serwist';
import { Serwist } from 'serwist';

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    // Wird beim Build durch die Liste der vorab zu cachenden Dateien ersetzt
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  // Sinnvolle Standard-Strategien für Seiten, Bilder, Schriften, Skripte und APIs
  runtimeCaching: defaultCache,
});

serwist.addEventListeners();
```

Hier sind einige wichtige Aspekte:

- **Caching-Strategien**: `defaultCache` bringt passende Strategien mit, zum Beispiel `NetworkFirst` für Seiten und API-Aufrufe und `CacheFirst` für unveränderliche Dateien wie die JavaScript-Bundles von Next.js. Eigene Regeln kannst du ergänzen.
- **Precaching**: Automatisches Caching von statischen Assets während des Build-Prozesses
- **Runtime Caching**: Dynamisches Caching von Netzwerkanfragen während der Laufzeit

Füge außerdem die generierten Dateien (`public/sw.js`, `public/sw.js.map` und `public/swe-worker-*.js`) zu deiner `.gitignore` hinzu, da sie bei jedem Build neu erzeugt werden.

## Schritt 6: PWA testen

Starte deine Anwendung im Produktionsmodus, um die PWA-Funktionalität zu testen:

```bash
npm run build
npm run start
```

Öffne deine Anwendung im Browser und überprüfe folgende PWA-Kriterien:

1. **Installierbarkeit**: Überprüfe, ob der Browser die Installation anbietet (in Chrome über das Installationssymbol in der Adressleiste)
2. **Offline-Fähigkeit**: Deaktiviere das Internet und teste die Anwendung
3. **Manifest und Service Worker**: Prüfe im Tab "Application" der Chrome DevTools, ob das Manifest korrekt geladen wird und der Service Worker aktiv ist
4. **Performance**: Verwende Lighthouse in den Chrome DevTools, um die Performance zu bewerten. Eine eigene PWA-Kategorie gibt es in Lighthouse nicht mehr, die PWA-Prüfung erledigst du deshalb im Tab "Application"

## Schritt 7: PWA optimieren

### Offline-Fähigkeit

Nutze das Caching von Serwist, um deine Anwendung offline-fähig zu machen. Hier sind einige zusätzliche Tipps:

- Cache wichtige API-Endpunkte
- Implementiere einen Offline-Fallback, etwa eine eigene Seite unter `/offline`, die Serwist über die Option `fallbacks` ausliefert, wenn keine Verbindung besteht
- Verwende Background Sync für Daten-Synchronisation

### Performance-Optimierung

Nutze Next.js Funktionen für maximale Performance:

- `next/image` für optimierte Bilder
- Die Metadata API für SEO-Metadaten
- Dynamische Imports für Code-Splitting
- Server Components, damit weniger JavaScript im Browser landet

Welche weiteren Maßnahmen für die Sichtbarkeit in Suchmaschinen zählen, zeige ich dir in meinem Artikel [SEO für Next.js](/blog/nextjs-seo).

### Push-Benachrichtigungen

Integriere Push-Benachrichtigungen, um die Benutzerbindung zu erhöhen:

1. Erweitere deinen Service Worker um einen Handler für Push-Events
2. Implementiere die Push-API
3. Verwende Firebase Cloud Messaging (FCM) für plattformübergreifende Benachrichtigungen
4. Achte auf die Datenschutzbestimmungen (DSGVO)

### Progressive Enhancement

Implementiere zusätzliche PWA-Features:

- Eigene Installationsaufforderung in der App
- Splash Screen
- App Shortcuts
- File System Access API
- Web Share API

### Testing und Monitoring

- Verwende Lighthouse für regelmäßige Performance-Audits
- Implementiere Error Tracking
- Überwache die Service Worker Performance
- Teste auf verschiedenen Geräten und Browsern

## Fazit

Mit Next.js kannst du einfach und effizient eine Progressive Web App erstellen, die nicht nur leistungsstark, sondern auch SEO-freundlich ist. Diese Schritt-für-Schritt Anleitung zeigt dir, wie du deine Next.js-Anwendung mit Manifest und Serwist in eine PWA verwandelst, die auf allen Geräten eine hervorragende Benutzererfahrung bietet.

## Weiterführende Ressourcen

- [Next.js Dokumentation](https://nextjs.org/docs)
- [PWA-Anleitung in der Next.js Dokumentation](https://nextjs.org/docs/app/guides/progressive-web-apps)
- [PWA Dokumentation](https://web.dev/progressive-web-apps/)
- [Serwist Dokumentation](https://serwist.pages.dev)
