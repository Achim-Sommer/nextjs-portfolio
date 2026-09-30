---
title: 'Portainer installieren: Docker im Browser verwalten'
description: 'Portainer auf Debian und Ubuntu installieren und Container, Images und Volumes bequem im Browser verwalten. Mit Firewall-Regeln und Tipps zur Absicherung.'
date: '2024-11-27'
lastModified: '2026-09-30'
tags: ['Docker', 'Linux', 'Self-Hosting']
featured: false
---

> **TL;DR**: Portainer ist ein leistungsstarkes, webbasiertes Management-Tool für Docker-Container. Diese Anleitung zeigt dir Schritt für Schritt, wie du Portainer auf einem Linux-Server installierst und für professionelles Container-Management nutzt.

## Was ist Portainer?

Portainer ist eine benutzerfreundliche, webbasierte Verwaltungsoberfläche für Docker-Umgebungen. Es ermöglicht Entwicklern und Systemadministratoren eine einfache Verwaltung von:

- 🐳 Docker-Containern
- 🖼️ Docker-Images
- 🌐 Netzwerken
- 💾 Volumes
- 🔧 Stacks und Compose-Dateien

Mit Portainer kannst du deine gesamte Container-Infrastruktur zentral und intuitiv verwalten, ohne komplexe Kommandozeilen-Befehle lernen zu müssen.

**Inhaltsverzeichnis:**
- [Voraussetzungen](#voraussetzungen)
- [Docker Installation](#1-docker-installation)
- [Portainer Installation](#2-portainer-installation)
- [Erstes Setup](#3-erstes-setup-und-konfiguration)
- [Sicherheit](#4-sicherheitshinweise)
- [Troubleshooting](#troubleshooting)
- [FAQ](#häufig-gestellte-fragen-faq)

<Figure src="/img/blog/portainer-installation-linux-docker-management/portainer-aufbau.webp" alt="Portainer-Aufbau: Der Browser greift per HTTPS auf Port 9443 auf den Portainer-Container zu, der über docker.sock die Docker Engine steuert" width={1600} height={900} caption="Portainer läuft selbst als Container und steuert Docker über den Socket, Port 8000 ist nur für Edge Agents nötig." />

## Voraussetzungen

### Hardware-Anforderungen
- Mindestens 1 CPU-Kern
- Mindestens 2 GB RAM
- Mindestens 20 GB Speicherplatz (SSD empfohlen)
- 64-bit Linux-System

### Software-Voraussetzungen
- Linux-Betriebssystem in einer aktuellen, noch unterstützten Version:
  - Debian
  - Ubuntu
  - Rocky Linux oder AlmaLinux
- Root- oder Sudo-Zugriff
- Aktive Internetverbindung
- SSH-Client ([Termius](https://termius.com) empfohlen)

<Tip>
💡 **Server-Tipp**: Für Portainer und Docker-Umgebungen empfehle ich einen Server von [ZAP-Hosting](https://zap-hosting.com/achim). Sie bieten [Lifetime-Server-Optionen](/blog/zap-hosting-lifetime) mit hervorragender Performance.
</Tip>

## 1. Docker Installation

Portainer läuft selbst als Container, deshalb brauchst du zuerst Docker. Ausführliche Erklärungen zu jedem Schritt findest du in meiner Anleitung [Docker auf Linux installieren](/blog/docker-installation-linux). Hier die Kurzfassung über die offizielle Paketquelle von Docker.

### Debian/Ubuntu Installation

```bash
# System aktualisieren
sudo apt update
sudo apt upgrade -y

# Benötigte Pakete installieren
sudo apt install -y ca-certificates curl

# Docker GPG-Schlüssel hinzufügen (unter Ubuntu: linux/ubuntu statt linux/debian)
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Docker Repository einrichten (unter Ubuntu: linux/ubuntu statt linux/debian)
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Docker installieren
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Docker-Dienst starten und aktivieren
sudo systemctl enable --now docker

# Aktuellen Benutzer zur Docker-Gruppe hinzufügen (danach einmal ab- und wieder anmelden)
sudo usermod -aG docker $USER
```

### Rocky Linux/AlmaLinux Installation

```bash
# System aktualisieren
sudo dnf update -y

# Plugin für config-manager installieren und Docker-Repository hinzufügen
sudo dnf install -y dnf-plugins-core
sudo dnf config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

# Docker installieren
sudo dnf install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Docker-Dienst starten und aktivieren
sudo systemctl enable --now docker

# Aktuellen Benutzer zur Docker-Gruppe hinzufügen (danach einmal ab- und wieder anmelden)
sudo usermod -aG docker $USER
```

Beachte: Mitglieder der Gruppe `docker` haben faktisch Root-Rechte auf dem Server. Nimm dort nur Benutzer auf, denen du entsprechend vertraust.

## 2. Portainer Installation

### Docker Volume erstellen

```bash
docker volume create portainer_data
```

### Portainer Container starten

```bash
docker run -d \
  -p 8000:8000 \
  -p 9443:9443 \
  --name portainer \
  --restart=always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v portainer_data:/data \
  portainer/portainer-ce:latest
```

## 3. Erstes Setup und Konfiguration

1. Öffne in deinem Browser: `https://DEINE_SERVER_IP:9443`
2. Bestätige die Warnung zum selbstsignierten Zertifikat
3. Erstelle einen Admin-Benutzer
   - Starkes Passwort verwenden
   - Mindestens 12 Zeichen
   - Kombination aus Groß-/Kleinbuchstaben, Zahlen und Sonderzeichen

**Wichtig:** Lege das Admin-Konto direkt nach dem ersten Start an. Aus Sicherheitsgründen schließt Portainer die Ersteinrichtung nach wenigen Minuten. Ist das passiert, startest du den Container mit `docker restart portainer` neu und rufst die Seite erneut auf.

## 4. Sicherheitshinweise

- 🔒 Aktiviere Zwei-Faktor-Authentifizierung
- 🌐 Beschränke Portainer-Zugriff über Firewall
- 🔑 Verwende SSH-Schlüssel statt Passwörter
- 🕒 Halte Docker und Portainer aktuell

### Firewall-Konfiguration

```bash
# UFW (Ubuntu)
sudo ufw allow 9443/tcp

# FirewallD (CentOS/Rocky)
sudo firewall-cmd --permanent --add-port=9443/tcp
sudo firewall-cmd --reload
```

## Troubleshooting

### Häufige Probleme

1. **Container startet nicht**
   - Docker-Installation überprüfen
   - Systemlogs prüfen: `journalctl -u docker.service`

2. **Keine Verbindung möglich**
   - Firewall-Einstellungen kontrollieren
   - Port-Freigaben überprüfen
   - Docker-Dienst neu starten: `sudo systemctl restart docker`

## Häufig gestellte Fragen (FAQ)

### Ist Portainer kostenlos?
Ja, Portainer Community Edition ist komplett kostenlos und Open Source.

### Welche Docker-Umgebungen unterstützt Portainer?
- Docker Standalone
- Docker Swarm
- Kubernetes (mit Einschränkungen in CE)

### Kann ich mehrere Docker-Hosts verwalten?
Ja, auch mit der kostenlosen Community Edition. Weitere Server bindest du über den Portainer Agent oder den Edge Agent als zusätzliche Umgebung ein. Die kostenpflichtige Business Edition ergänzt vor allem Funktionen für Teams und Unternehmen, etwa eine feinere Rechteverwaltung.

## Zusätzliche Ressourcen

- [Offizielle Portainer Dokumentation](https://docs.portainer.io)
- [Docker Dokumentation](https://docs.docker.com)
- [Container Best Practices](https://cloud.google.com/architecture/best-practices-for-building-containers)

## Fazit

Portainer vereinfacht die Docker-Container-Verwaltung erheblich. Mit dieser Anleitung hast du nun eine leistungsstarke, webbasierte Administrationsoberfläche für deine Container-Infrastruktur. Möchtest du nicht nur Container, sondern den ganzen Server im Browser verwalten, passt [Cockpit für die Linux-Serververwaltung](/blog/cockpit-installation) gut dazu. Und wenn du Anwendungen direkt aus einem Git-Repository deployen willst, schau dir an, wie du [Coolify installierst](/blog/coolify-installation).

**Vorteile auf einen Blick:**
- 🚀 Einfache Installation
- 🖥️ Benutzerfreundliche Weboberfläche
- 🔒 Hohe Sicherheitsstandards
- 💻 Kostenlos für Einzelserver

Viel Erfolg mit deiner Portainer-Installation! Bei Fragen oder Problemen hinterlasse gerne einen Kommentar.
