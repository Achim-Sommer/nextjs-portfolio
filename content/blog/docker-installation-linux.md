---
title: 'Docker auf Linux installieren: Debian und Ubuntu'
description: 'Docker Engine und Docker Compose auf Debian und Ubuntu installieren: offizielle Paketquelle, erste Container und wichtige Sicherheitstipps.'
date: '2024-11-27'
lastModified: '2026-09-30'
tags: ['Docker', 'Linux']
featured: false
---

> **TL;DR**: Docker ist eine leistungsstarke Plattform zur Containerisierung von Anwendungen. Diese Anleitung zeigt dir Schritt für Schritt, wie du Docker auf einem Linux-System (Debian/Ubuntu) aus der offiziellen Paketquelle installierst und deine ersten Container startest.

## Voraussetzungen

- Ein Linux-Server mit Debian oder Ubuntu
- Root-Zugriff
- Mindestens 2 GB RAM
- Aktive Internetverbindung
- SSH-Client ([Termius](https://termius.com) empfohlen)

### Server-Tipp: Lifetime-Server von ZAP-Hosting

Für Docker-Projekte empfehle ich die [Lifetime-Server von ZAP-Hosting](https://zap-hosting.com/vserverhomepage). Mit einer einmaligen Zahlung erhältst du einen Server ohne monatliche Kosten. Mehr Details findest du in meinem Artikel über [Lifetime-Server: kaufen statt mieten](/blog/zap-hosting-lifetime).

## Was ist Docker?

Docker ist eine Open-Source-Plattform, die:
- Anwendungen in isolierte Container verpackt
- Konsistente Entwicklungs- und Produktionsumgebungen ermöglicht
- Ressourcen effizient nutzt und eine schnelle Bereitstellung erlaubt

### Vorteile von Docker

- Schnelle Bereitstellung von Anwendungen
- Konsistente Umgebungen
- Einfache Versionierung
- Geringe Ressourcennutzung
- Einfache Skalierung

<Figure src="/img/blog/docker-installation-linux/docker-architektur.webp" alt="Docker-Architektur: CLI und Compose steuern über /var/run/docker.sock den Daemon dockerd, der per containerd und runc Container startet" width={1600} height={900} caption="So arbeiten Docker CLI, Docker Daemon, containerd, runc und die Registry beim Start eines Containers zusammen." />

## Installationsschritte

Die folgenden Befehle folgen der offiziellen Installationsanleitung von Docker und nutzen die Paketquelle von Docker selbst. Die Pakete aus den Distributionsquellen (etwa `docker.io`) hinken der aktuellen Docker-Version oft hinterher.

### 1. System aktualisieren

```bash
apt update
apt upgrade -y
```

### 2. Alte oder konkurrierende Pakete entfernen

Falls auf dem Server schon inoffizielle Docker-Pakete installiert sind, entferne sie vorher. Ist keines davon vorhanden, meldet apt das nur und du kannst weitermachen:

```bash
for pkg in docker.io docker-doc docker-compose podman-docker containerd runc; do apt remove -y $pkg; done
```

### 3. Benötigte Pakete installieren

```bash
apt install ca-certificates curl -y
```

### 4. Docker GPG-Schlüssel hinzufügen

```bash
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
chmod a+r /etc/apt/keyrings/docker.asc
```

### 5. Docker Repository einrichten

```bash
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  tee /etc/apt/sources.list.d/docker.list > /dev/null
```

**Hinweis für Ubuntu:** Ersetze in Schritt 4 und Schritt 5 jeweils `linux/debian` durch `linux/ubuntu`. Der Rest der Anleitung ist identisch.

### 6. Docker Engine installieren

```bash
apt update
apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y
```

### 7. Docker-Dienst starten und aktivieren

Unter Debian und Ubuntu startet der Dienst nach der Installation in der Regel automatisch. Mit diesem Befehl stellst du sicher, dass er läuft und auch nach einem Neustart wieder startet:

```bash
systemctl enable --now docker
```

### 8. Installation überprüfen

```bash
docker --version
docker compose version
docker run hello-world
```

## Erste Schritte mit Docker

### Docker-Container erstellen

```bash
# Nginx-Container starten
docker run -d -p 80:80 nginx

# MySQL-Container mit Passwort
docker run -d --name mysql-server -e MYSQL_ROOT_PASSWORD=meinSicheresPasswort mysql
```

### Docker Compose

Docker Compose ist mit dem Paket `docker-compose-plugin` bereits installiert und wird als `docker compose` (mit Leerzeichen) aufgerufen. Das frühere eigenständige Programm `docker-compose` brauchst du nicht mehr.

Erstelle eine `docker-compose.yml`:

```yaml
services:
  web:
    image: nginx
    ports:
      - "80:80"
  database:
    image: mysql
    environment:
      MYSQL_ROOT_PASSWORD: meinSicheresPasswort
```

Die früher übliche Zeile `version: '3'` am Anfang der Datei ist veraltet und wird von aktuellen Compose-Versionen ignoriert.

Starten mit:
```bash
docker compose up -d
```

Wenn du deine Container lieber im Browser statt auf der Kommandozeile verwaltest, lohnt sich ein Blick auf meine Anleitung zu [Portainer als Weboberfläche für Docker](/blog/portainer-installation-linux-docker-management).

## Sicherheitshinweise

Bevor Docker produktiv läuft, sollte der Server selbst abgesichert sein. Wie das geht, zeige ich in [Linux vServer absichern](/blog/linux-vserver-absichern). Wichtig: Veröffentlichte Docker-Ports umgehen die UFW-Firewall.

- Verwende immer offizielle Images
- Halte Docker und Images aktuell
- Nutze einen normalen Benutzer statt root für die tägliche Arbeit
- Beschränke Netzwerkzugriff
- Scanne Images auf Sicherheitslücken

## Troubleshooting

### Häufige Probleme

1. **Permission denied**
   Lösung: Füge deinen Benutzer zur Docker-Gruppe hinzu (ersetze `deinbenutzer` durch deinen Benutzernamen) und melde dich danach einmal ab und wieder an:
   ```bash
   usermod -aG docker deinbenutzer
   ```
   Beachte: Mitglieder der Gruppe `docker` haben faktisch Root-Rechte auf dem System. Nimm dort also nur Benutzer auf, denen du entsprechend vertraust.

2. **Docker-Dienst startet nicht**
   Überprüfe Systemlogs:
   ```bash
   journalctl -u docker.service
   ```

## Fazit

Mit dieser Anleitung hast du Docker aus der offiziellen Paketquelle auf deinem Linux-System installiert und erste Container gestartet. Docker ist die Grundlage für viele Self-Hosting-Projekte: Wenn du deine Anwendungen komfortabel per Git-Push deployen möchtest, zeigt dir meine Anleitung, wie du [Coolify als eigene Deployment-Plattform installierst](/blog/coolify-installation). Was im laufenden Betrieb zu beachten ist, habe ich in [Coolify im Betrieb: Erfahrungen und Stolperfallen](/blog/coolify-erfahrungen-im-betrieb) zusammengefasst.
