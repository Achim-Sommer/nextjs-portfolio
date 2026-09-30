---
title: 'Umami: Google-Analytics-Alternative ohne Cookies'
description: 'Umami ist eine kostenlose Open-Source-Alternative zu Google Analytics: selbst gehostet, cookielos und datenschutzfreundlich. Funktionen und Installation.'
date: '2024-11-29'
lastModified: '2026-09-30'
tags: ['Self-Hosting', 'Webentwicklung']
featured: false
---

> **TL;DR**: Umami ist eine leistungsstarke, selbst gehostete Open-Source Web Analytics Lösung, die Datenschutz in den Mittelpunkt stellt und eine echte Alternative zu Google Analytics bietet.

## Was ist Umami?

Umami ist eine einfache, benutzerfreundliche Open-Source Web Analytics Plattform, die als Alternative zu Google Analytics entwickelt wurde. Das Hauptziel von Umami ist es, Website-Besitzern eine datenschutzfreundliche Lösung zu bieten, die nur die wirklich wichtigen Metriken sammelt und die Privatsphäre der Nutzer respektiert.

### Kernmerkmale von Umami

- 🔒 Datenschutzorientiert
- 🚫 Keine Cookies
- 🌐 Selbst gehostet
- 📊 Einfache Nutzung
- 🆓 Kostenlos

## Warum Umami besser ist als Google Analytics

### 1. Datenschutz und Privatsphäre

Google Analytics sammelt umfangreiche Nutzerdaten, die weit über das hinausgehen, was für Website-Analysen tatsächlich notwendig ist:

#### Google Analytics Probleme:
- Umfangreiches User-Tracking
- Erstellung detaillierter Nutzungsprofile
- Datensammlung für Werbeprofile
- Speicherung personenbezogener Daten
- Komplexe Einwilligungsprozesse erforderlich

#### Umami Vorteile:
- Minimale Datensammlung
- Keine Erstellung von Nutzerprofilen
- Keine Weitergabe von Daten an Dritte
- Keine Verwendung von Tracking-Cookies
- Deutlich einfacherer DSGVO-konformer Betrieb

### 2. Technische Überlegenheit

#### Performance
- Leichtgewichtige Tracking-Skripte
- Minimaler Overhead für Websitegeschwindigkeit
- Schnellere Seitenladenzeiten
- Geringere Serverbelastung

#### Flexibilität
- Vollständig anpassbar
- Open-Source Architektur
- Erweiterbar durch Community-Plugins
- Keine Vendor Lock-in

### 3. Kostentransparenz

#### Google Analytics Kosten:
- Versteckte Kosten
- Komplexe Preismodelle
- Zusätzliche Gebühren für erweiterte Funktionen
- Abhängigkeit von Google-Ökosystem

#### Umami Vorteile:
- Komplett kostenlos
- Einzige Kosten: Hosting
- Volle Kontrolle über Infrastruktur
- Keine versteckten Gebühren

### 4. Technische Unabhängigkeit

- Keine Abhängigkeit von Google-Diensten
- Volle Kontrolle über Datenhoheit
- Möglichkeit zum Selbst-Hosting
- Keine Einschränkungen durch Plattform-Policies

## Installationsanleitung für Umami

### Voraussetzungen

- Node.js Version 18.18 oder neuer
- PostgreSQL (mindestens v12.14) oder MySQL (mindestens v8.0)
- Ein Server mit Root-Zugriff

### Installationsschritte

#### 1. Yarn installieren

```bash
npm install -g yarn
```

#### 2. Umami Repository klonen

```bash
git clone https://github.com/umami-software/umami.git
cd umami
yarn install
```

#### 3. Datenbank konfigurieren

Erstelle eine `.env`-Datei mit deiner Datenbankverbindung:

```
DATABASE_URL=postgresql://username:mypassword@localhost:5432/mydb
# Oder für MySQL:
# DATABASE_URL=mysql://username:mypassword@localhost:3306/mydb
```

#### 4. Anwendung bauen

```bash
yarn build
```

Bei der ersten Build-Ausführung werden automatisch alle erforderlichen Datenbanktabellen erstellt. Zusätzlich wird ein Administratorkonto mit dem Benutzernamen "admin" und dem Passwort "umami" angelegt. Ändere dieses Standardpasswort direkt nach der ersten Anmeldung.

#### 5. Umami starten

```bash
yarn start
```

Der Server läuft standardmäßig unter `http://localhost:3000`.

### Empfohlene Produktiv-Konfiguration

Für Produktivsysteme empfehle ich die Verwendung eines Prozessmanagers wie PM2:

```bash
yarn global add pm2
pm2 start yarn --name umami -- start
pm2 startup
pm2 save
```

## Docker-Installation

Für Docker-Enthusiasten bietet Umami eine einfache Docker Compose Konfiguration. Falls Docker auf deinem Server noch fehlt, findest du in meiner Anleitung [Docker auf Linux installieren](/blog/docker-installation-linux) alle nötigen Schritte. Die Datei `docker-compose.yml` liegt im geklonten Umami-Repository, den folgenden Befehl führst du also in diesem Verzeichnis aus:

```bash
# Mit PostgreSQL
docker compose up -d

# Alternativ vorgefertigte Images
docker pull docker.umami.is/umami-software/umami:postgresql-latest
# Oder mit MySQL
docker pull docker.umami.is/umami-software/umami:mysql-latest
```

## Funktionen und Berichte

Umami bietet umfangreiche Analysemöglichkeiten:

- 📈 Trichter-Berichte
- 🔄 Retentions-Berichte
- 🎯 Ziel-Tracking
- 📊 UTM-Kampagnen-Analyse
- 🗺️ Benutzer-Reisen

## Sicherheit und Datenschutz

- Keine Verwendung von Cookies
- Keine Sammlung personenbezogener Daten
- Gute Grundlage für einen DSGVO-konformen Betrieb (Datenschutzerklärung und Auftragsverarbeitung musst du trotzdem selbst prüfen)
- Vollständige Transparenz durch Open-Source

## Fazit

Umami ist mehr als nur eine Alternative zu Google Analytics. Es ist eine Lösung für alle, die Wert auf Datenschutz, Transparenz und Kontrolle legen. Mit der Möglichkeit zum Selbst-Hosting und einer aktiven Community ist Umami die perfekte Wahl für datenbewusste Entwickler und Website-Betreiber.

Gerade wenn du deine Website für Suchmaschinen optimierst, hilft dir Umami dabei, die Wirkung deiner Maßnahmen zu messen. Welche Stellschrauben es bei Next.js-Projekten gibt, zeige ich dir in meinem Artikel [SEO für Next.js](/blog/seo-optimierung-nextjs-websites-best-practices-2025).

## Weiterführende Ressourcen

- [Umami GitHub Repository](https://github.com/umami-software/umami)
- [Offizielle Umami Dokumentation](https://umami.is/docs)
- [Docker auf Linux installieren](/blog/docker-installation-linux)
- [Coolify installieren: Umami und andere Dienste per Weboberfläche hosten](/blog/coolify-installation)
