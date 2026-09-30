---
title: 'Coolify installieren: Anleitung für Debian und Ubuntu'
description: 'Coolify auf dem eigenen Server installieren: Voraussetzungen, Installation und erste Schritte. Die Self-Hosting-Alternative zu Heroku und Vercel.'
date: '2024-11-21'
lastModified: '2026-09-30'
tags: ['Self-Hosting', 'Docker', 'Linux']
featured: false
---

> **TL;DR**: Coolify ist eine kostenlose, self-hosted Alternative zu Heroku. Diese Anleitung zeigt dir, wie du Coolify auf einem Linux Server installierst und deine erste Anwendung deployst. Perfekt für Entwickler, die eine eigene Deployment-Plattform suchen.

In diesem ausführlichen Tutorial zeige ich dir **Schritt für Schritt**, wie du Coolify auf einem Linux Server (VServer, Rootserver oder Dedicated Server) installierst. Coolify ist eine moderne, selbst-gehostete Alternative zu Plattformen wie Heroku, Netlify, Vercel oder DigitalOcean und ermöglicht es dir, deine Webanwendungen, Datenbanken und Services einfach zu deployen und zu verwalten.

**Inhaltsverzeichnis:**
- [Voraussetzungen](#voraussetzungen)
- [Server Beschaffung](#1-server-beschaffung-und-vorbereitung)
- [Installation](#2-installation-von-coolify)
- [Erste Schritte](#3-erste-schritte-in-coolify)
- [Sicherheit](#4-sicherheitshinweise)
- [FAQ](#häufig-gestellte-fragen-faq)

**Was du in diesem Tutorial lernst:**
- Wie du einen geeigneten Server auswählst und vorbereitest
- Wie du Coolify schnell und sicher installierst
- Wie du die wichtigsten Sicherheitseinstellungen vornimmst
- Tipps und Tricks für die optimale Nutzung von Coolify

<Figure src="/img/blog/coolify-installation/coolify-deploy-ablauf.webp" alt="Coolify-Ablauf: Git-Push zu GitHub, Webhook an Coolify, Build per Nixpacks oder Dockerfile, Container hinter Traefik mit Let's Encrypt" width={1600} height={900} caption="Vom Git-Push bis zur erreichbaren Domain läuft bei Coolify alles automatisch auf dem eigenen Server ab." />

## Voraussetzungen

> **Wichtig**: Bevor du mit der Installation beginnst, stelle sicher, dass dein Server alle Mindestanforderungen erfüllt. Dies spart dir später viel Zeit und Ärger.

### Hardware Anforderungen (Systemvoraussetzungen)
- Mindestens 2 CPU-Kerne (empfohlen: 4 Kerne für bessere Performance)
- Mindestens 2 GB RAM (empfohlen: 8 GB für mehrere Anwendungen)
- Mindestens 30 GB Speicherplatz (empfohlen: 50 GB oder mehr auf einer SSD für schnellere Builds)
- Eine 64-bit Architektur (AMD64 oder ARM64)

Die Mindestwerte entsprechen den offiziellen Angaben von Coolify. Beachte, dass deine Anwendungen und deren Builds auf demselben Server laufen und zusätzlich Ressourcen brauchen.

### Software Voraussetzungen
- Ein unterstütztes Linux-Betriebssystem in einer aktuellen, noch mit Updates versorgten Version:
  - Debian
  - Ubuntu
  - RHEL-basierte Systeme wie Rocky Linux oder AlmaLinux
- SSH Zugang zum Server
- Root-Rechte für die Installation

## 1. Server Beschaffung und Vorbereitung

### Server Provider
Für die Installation von Coolify empfehle ich einen Server von [ZAP-Hosting](https://zap-hosting.com/achim). ZAP-Hosting bietet zuverlässige VServer und Rootserver zu fairen Preisen an und hat einen exzellenten deutschsprachigen Support. Ein besonderes Highlight von ZAP-Hosting ist die Möglichkeit, Server als [Lifetime Option](/blog/zap-hosting-lifetime) zu erwerben. Das bedeutet, du zahlst einmalig und kannst den Server dann unbegrenzt nutzen, ohne monatliche Gebühren.

> **💰 Spar-Tipp**: Mit der Lifetime-Option von ZAP-Hosting sparst du langfristig Kosten, da keine monatlichen Gebühren anfallen.

<Tip>
Für Coolify eignet sich besonders ein VPS (Virtual Private Server) mit der aktuellen LTS-Version von Ubuntu oder der aktuellen stabilen Debian-Version. Diese Systeme bieten:
- Lange Support-Zeiträume (bis zu 5 Jahre)
- Regelmäßige Sicherheitsupdates
- Hohe Stabilität
- Beste Kompatibilität mit Coolify
</Tip>

Bei der Serverauswahl solltest du auf folgende Mindestanforderungen achten:
- Linux Betriebssystem (am besten Debian oder Ubuntu)
- Mindestens 2 CPU Kerne
- Mindestens 2 GB RAM
- Mindestens 30 GB Speicherplatz

### SSH-Verbindung einrichten

#### 1. SSH-Client installieren
Für die Verbindung zum Server brauchst du einen SSH-Client. Ich empfehle [Termius](https://termius.com/), da er benutzerfreundlich ist und für alle Betriebssysteme zur Verfügung steht. Alternativen sind:
- Windows: [Termius](https://termius.com/) oder der integrierte OpenSSH-Client in PowerShell
- macOS/Linux: Terminal (vorinstalliert)

#### 2. Zugangsdaten vorbereiten
Von deinem Provider erhältst du folgende Zugangsdaten:
- IP-Adresse des Servers
- Root-Benutzername (meist "root")
- Root-Passwort

#### 3. Mit dem Server verbinden

1. Öffne Termius oder deinen bevorzugten SSH-Client
2. Erstelle eine neue Verbindung mit folgenden Daten:
   - Host: Deine Server-IP
   - Benutzername: root
   - Passwort: Dein Root-Passwort
   - Port: 22 (Standard SSH-Port)

3. Verbinde dich mit dem Server. Bei der ersten Verbindung wirst du gefragt, ob du dem Server-Fingerprint vertrauen möchtest. Bestätige dies mit "yes".

#### 4. Erste Sicherheitsmaßnahmen

Führe dann ein System-Update durch:
```bash
apt update && apt upgrade -y
```

## 2. Installation von Coolify

### Schnellinstallation (Empfohlen)

Die einfachste Methode Coolify zu installieren ist über das offizielle Installationsskript:

```bash
apt-get install curl
```

```bash
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
```

Das Skript führt automatisch folgende Schritte aus:
1. Installation der benötigten Werkzeuge (curl, wget, git, jq, openssl)
2. Installation und Konfiguration von Docker Engine
3. Erstellung der Verzeichnisstruktur
4. Einrichtung der SSH-Schlüssel
5. Installation und Start von Coolify

### Nach der Installation

Nach erfolgreicher Installation kannst du auf Coolify über folgende URL zugreifen:
```
http://DEINE-SERVER-IP:8000
```

**Wichtig:** Lege dein Admin-Konto sofort nach der Installation an. Solange noch kein Konto existiert, kann sich jeder, der die Adresse aufruft, als Erster registrieren und hätte damit die volle Kontrolle über deine Instanz.

## 3. Erste Schritte in Coolify

Nach dem ersten Zugriff auf die Oberfläche musst du:
1. Einen Admin-Account erstellen
2. Deine erste Umgebung konfigurieren
3. Optional: SSL/TLS mit einem kostenlosen Let's Encrypt Zertifikat einrichten

Wie sich Coolify nach der Einrichtung im Alltag schlägt und auf welche Stolperfallen du achten solltest, habe ich in meinem Artikel über [Coolify im Betrieb](/blog/coolify-erfahrungen-im-betrieb) zusammengefasst.

## 4. Sicherheitshinweise

- Hinterlege in den Einstellungen eine eigene Domain für das Dashboard, damit du Coolify per HTTPS statt über Port 8000 erreichst
- Aktiviere die Zwei-Faktor-Authentifizierung
- Halte Coolify und Docker regelmäßig aktualisiert
- Sichere den Server selbst ab (SSH-Schlüssel, Firewall, Fail2ban), siehe [Linux vServer absichern](/blog/linux-vserver-absichern)
- Überwache deine Apps von außen, zum Beispiel mit [Uptime Kuma](/blog/uptime-kuma-installieren)
- Sichere deine Daten regelmäßig

## Häufig gestellte Fragen (FAQ)

### Ist Coolify kostenlos?
Ja, Coolify ist eine kostenlose, Open-Source-Software. Du zahlst nur für deinen Server und die Ressourcen, die du nutzt.

### Kann ich von Heroku zu Coolify wechseln?
Ja, Coolify ist eine ausgezeichnete Alternative zu Heroku. Die Benutzeroberfläche ist ähnlich aufgebaut, und viele Funktionen sind vergleichbar.

### Welches Betriebssystem ist am besten für Coolify?
Die aktuelle LTS-Version von Ubuntu oder die aktuelle stabile Debian-Version sind die besten Optionen für Coolify, da sie stabil sind und lange Support-Zeiträume bieten.

### Brauche ich Docker-Kenntnisse für Coolify?
Nein, Coolify abstrahiert die Docker-Komplexität. Grundlegende Linux-Kenntnisse sind jedoch hilfreich.

## Troubleshooting

> **Hinweis**: Hier findest du Lösungen für die häufigsten Probleme bei der Installation und Nutzung von Coolify.

### Häufige Fehlermeldungen

1. **Docker nicht installiert**
   ```bash
   Command 'docker' not found
   ```
   Lösung: Führe das Docker-Installations-Skript erneut aus:
   ```bash
   curl -fsSL https://get.docker.com | sh
   ```
   Alternativ installierst du Docker manuell über die offizielle Paketquelle, wie in meiner Anleitung [Docker auf Linux installieren](/blog/docker-installation-linux) beschrieben.

2. **Port 8000 nicht erreichbar**
   Prüfe, ob der Port in deiner Firewall freigegeben ist:
   ```bash
   ufw allow 8000/tcp
   ```

### Performance-Optimierung

Für bessere Performance empfehle ich:
- Aktivierung von SSH-Key Authentication
- Einrichtung eines Swap-Speichers
- Regelmäßige Docker-Cleanup-Routinen

## Weiterführende Ressourcen

- [Offizielle Coolify Dokumentation](https://coolify.io/docs)
- [Docker Best Practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
- [Linux Server Sicherheit](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-22-04)

## Fazit

Mit dieser Anleitung kannst du Coolify erfolgreich auf deinem Linux-Server installieren und als selbst-gehostete Deployment-Plattform nutzen. Die Installation ist dank des Installationsskripts sehr einfach, und du kannst direkt mit dem Deployment deiner ersten Anwendung beginnen. Für den Überblick über den Server selbst, also Auslastung, Dienste und Updates, ergänzt sich Coolify gut mit [Cockpit als Weboberfläche für Linux-Server](/blog/cockpit-installation).

**Vorteile von Coolify auf einen Blick:**
- Kostenlose, Self-Hosted Alternative zu Heroku und Netlify
- Einfache Installation und Bedienung
- Volle Kontrolle über deine Daten und Infrastruktur
- Perfekt für Entwickler und kleine Teams

Bei Fragen oder Problemen kannst du gerne einen Kommentar hinterlassen oder mich direkt kontaktieren. Viel Erfolg mit deiner Coolify-Installation!
