---
title: 'Cockpit auf Debian und Ubuntu installieren'
description: 'Cockpit installieren und Linux-Server bequem im Browser verwalten: Schritt für Schritt für Debian und Ubuntu, mit Firewall und Sicherheitstipps.'
date: '2024-11-21'
lastModified: '2026-09-30'
tags: ['Linux', 'IT-Administration', 'Self-Hosting']
featured: false
---

> **TL;DR**: Cockpit ist ein modernes, webbasiertes Administrationstool für Linux-Server. Diese Schritt-für-Schritt Anleitung zeigt dir, wie du Cockpit auf einem Linux Server (Debian/Ubuntu) installierst und für die professionelle Verwaltung deines Servers nutzt. Perfekt für Systemadministratoren und DevOps-Engineers.

In diesem ausführlichen Tutorial zeige ich dir **Schritt für Schritt**, wie du Cockpit auf einem Linux Server (VServer, Rootserver oder Dedicated Server) installierst und konfigurierst. Cockpit ist ein leistungsfähiges Werkzeug zur Serververwaltung, das dir eine moderne Weboberfläche für alle wichtigen Administrationsaufgaben bietet.

**Inhaltsverzeichnis:**
- [Voraussetzungen](#voraussetzungen)
- [Was ist Cockpit?](#was-ist-cockpit)
- [Installation auf Debian](#2-installation-auf-debian)
- [Installation auf Ubuntu](#3-installation-auf-ubuntu)
- [Konfiguration & Zugriff](#4-dienst-aktivieren-und-starten)
- [Sicherheit](#sicherheitshinweise)
- [Fehlerbehebung](#fehlerbehebung)

## Was ist Cockpit?

Cockpit ist ein modernes, webbasiertes Administrationstool für Linux-Server, das folgende Hauptfunktionen bietet:

- Echtzeit-Monitoring von System-Ressourcen
- Verwaltung von Systemdiensten
- Live Log-Überwachung
- Storage-Management
- Benutzerverwaltung
- Netzwerkkonfiguration
- Container-Management (Podman, über das Zusatzmodul cockpit-podman)
- Terminal-Zugriff direkt im Browser

Mit Cockpit wird die Linux-Serververwaltung auch für Einsteiger zugänglich, ohne dabei auf professionelle Features zu verzichten.

Docker-Container verwaltest du mit Cockpit übrigens nicht: Das frühere Docker-Modul wird nicht mehr weiterentwickelt, das aktuelle Container-Modul arbeitet mit Podman. Setzt du auf Docker, ist [Portainer als Weboberfläche für Docker](/blog/portainer-installation-linux-docker-management) die passende Ergänzung zu Cockpit.

<Figure src="/img/blog/cockpit-installation/cockpit-aufbau.webp" alt="Cockpit-Aufbau: Browser verbindet sich per HTTPS auf Port 9090 mit cockpit-ws, das Dienste, Logs, Netzwerk, Speicher und Terminal bietet" width={1600} height={900} caption="Cockpit bündelt die wichtigsten Verwaltungsaufgaben des Servers in einer Weboberfläche, angemeldet wird mit normalen Linux-Konten." />

## Voraussetzungen

- Ein Linux Server mit Debian oder Ubuntu
  - **Tipp**: [ZAP-Hosting](https://zap-hosting.com/achim) bietet hochwertige Linux Server auch als [Lifetime-Option](/blog/zap-hosting-lifetime) an
- Root-Zugriff auf den Server
- SSH-Client (zum Beispiel [Termius](https://termius.com), ein moderner, benutzerfreundlicher SSH-Client)
- Webbrowser (Firefox, Chrome, Edge oder Safari)
- Mindestens 1GB RAM
- 100MB freier Speicherplatz

## Detaillierte Schritt-für-Schritt Anleitung

### 1. System aktualisieren

Bevor wir mit der Installation beginnen, sollten wir sicherstellen, dass das System auf dem neuesten Stand ist:

```bash
apt update
apt upgrade -y
```

### 2. Installation auf Debian

Für Debian-Systeme fügen wir zunächst das Backports-Repository hinzu, um die neueste Version von Cockpit zu erhalten:

```bash
. /etc/os-release
echo "deb http://deb.debian.org/debian ${VERSION_CODENAME}-backports main" > \
    /etc/apt/sources.list.d/backports.list
apt update
```

Anschließend installieren wir Cockpit aus den Backports:

```bash
apt install -t ${VERSION_CODENAME}-backports cockpit
```

### 3. Installation auf Ubuntu

Auf Ubuntu-Systemen ist die Installation noch einfacher:

```bash
. /etc/os-release
apt install -t ${VERSION_CODENAME}-backports cockpit
```

### 4. Dienst aktivieren und starten

Nach der Installation müssen wir den Cockpit-Dienst aktivieren und starten:

```bash
systemctl enable --now cockpit.socket
```

### 5. Firewall konfigurieren

Falls du eine Firewall verwendest, musst du den Port 9090 für Cockpit freigeben:

```bash
# Für UFW (Ubuntu)
ufw allow 9090/tcp

# Für FirewallD (falls installiert)
firewall-cmd --add-service=cockpit --permanent
firewall-cmd --reload
```

## Zugriff auf Cockpit

Nach erfolgreicher Installation kannst du über deinen Webbrowser auf Cockpit zugreifen:

1. Öffne deinen Browser
2. Navigiere zu: `https://deine-server-ip:9090`
3. Bestätige die SSL-Warnung (beim ersten Zugriff)
4. Melde dich mit deinen Linux-Systemzugangsdaten an

## Sicherheitshinweise

- Ändere das Root-Passwort, falls du es noch nicht getan hast
- Verwende starke Passwörter für alle Benutzerkonten
- Aktiviere die Zwei-Faktor-Authentifizierung, wenn möglich
- Beschränke den Zugriff auf Port 9090 auf vertrauenswürdige IP-Adressen
- Sichere wichtige Daten regelmäßig. Wie du dabei vorgehst, beschreibe ich in meinem Artikel zur [Backup-Strategie](/blog/backup-strategie-mittelstand)

## Unterstützte Browser

Cockpit funktioniert am besten mit:
- Mozilla Firefox (Version 82+)
- Google Chrome (Version 88+)
- Microsoft Edge (Version 88+)
- Apple Safari (Version 14.5+)

Aus Sicherheitsgründen solltest du immer die neueste Version deines Browsers verwenden.

## Fehlerbehebung

### SSL-Zertifikatsfehler
Bei der ersten Anmeldung siehst du eine SSL-Warnung. Das ist normal, da Cockpit ein selbstsigniertes Zertifikat verwendet. Du kannst:
- Die Warnung für diese Seite ignorieren
- Ein eigenes SSL-Zertifikat installieren (empfohlen für Produktivumgebungen)

### Zugriffsprobleme
Wenn du dich nicht anmelden kannst:
1. Überprüfe, ob der Dienst läuft: `systemctl status cockpit.socket`
2. Kontrolliere die Firewall-Einstellungen
3. Prüfe die Systemlogs: `journalctl -u cockpit.socket`

## Fazit

Cockpit ist ein leistungsfähiges Werkzeug zur Serververwaltung, das die Administration erheblich vereinfacht. Mit der webbasierten Oberfläche hast du alle wichtigen Funktionen im Blick und kannst deinen Server effizient verwalten. Bei Fragen oder Problemen hilft dir die [offizielle Dokumentation](https://cockpit-project.org/documentation.html) oder die Community weiter.
