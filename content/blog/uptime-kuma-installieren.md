---
title: 'Uptime Kuma installieren: Monitoring mit Docker'
description: 'Uptime Kuma per Docker Compose installieren, hinter einem Reverse Proxy mit HTTPS betreiben und Websites, Ports und Cronjobs zuverlässig überwachen.'
date: '2026-09-30'
lastModified: '2026-10-02'
tags: ['Self-Hosting', 'Docker', 'IT-Administration']
featured: false
---

Wer eigene Dienste betreibt, will wissen, wann etwas ausfällt, und zwar bevor Kunden oder Kollegen anrufen. Uptime Kuma ist dafür ein schlankes, selbst gehostetes Werkzeug. In dieser Anleitung installierst du es per Docker Compose, veröffentlichst es sicher hinter einem Reverse Proxy mit HTTPS und richtest die ersten Monitore, Benachrichtigungen und eine Statusseite ein.

## Was ist Uptime Kuma?

Uptime Kuma ist ein Open-Source-Monitoring-Tool, das du auf deinem eigenen Server betreibst. Die Bedienung läuft komplett über eine Weboberfläche, Konfigurationsdateien musst du dafür nicht pflegen. Das Tool prüft in festen Abständen, ob deine Dienste erreichbar sind, speichert den Verlauf und meldet sich, wenn sich der Zustand ändert.

Überwachen kannst du unter anderem:

- **Websites und APIs** per HTTP(s), optional mit Prüfung auf ein bestimmtes Keyword im Antworttext
- **TCP-Ports**, etwa für einen Mailserver, eine Datenbank oder einen Game-Server
- **Ping** für Hosts und Netzwerkgeräte
- **DNS-Einträge**, um zu prüfen, ob ein Name korrekt aufgelöst wird
- **Docker-Container** auf einem angebundenen Docker-Host
- **Ablauf von SSL-Zertifikaten** bei HTTPS-Monitoren
- **Push-Monitore**, bei denen nicht Uptime Kuma prüft, sondern ein Job sich regelmäßig selbst meldet, zum Beispiel ein Cronjob oder ein Backup-Skript

## Wo läuft Uptime Kuma?

Die wichtigste Entscheidung triffst du vor der Installation: Uptime Kuma gehört nicht auf den Server, den es überwachen soll. Fällt dieser Server aus, fällt sonst auch das Monitoring aus, und die Benachrichtigung, auf die du dich verlässt, wird nie verschickt. Ein separater Server, idealerweise bei einem anderen Anbieter oder zumindest in einem anderen Rechenzentrum, sieht deine Dienste so, wie sie auch deine Nutzer sehen: von außen.

<Figure src="/img/blog/uptime-kuma-installieren/uptime-kuma-aufbau.webp" alt="Aufbau von Uptime Kuma auf einem separaten Server: Caddy nimmt HTTPS-Anfragen für status.example.de an und leitet sie an den Container auf 127.0.0.1:3001 weiter. Uptime Kuma prüft Websites per HTTP(s) mit Keyword und Dienste per TCP-Port, Backup-Skripte melden sich per Push, bei Ausfall gehen Benachrichtigungen raus" width={1600} height={900} caption="Uptime Kuma läuft getrennt von den überwachten Diensten, prüft sie von außen und erreicht dich bei einem Ausfall über mehrere Kanäle." />

Die Anforderungen sind gering. Für Uptime Kuma reicht schon ein kleiner vServer mit 1 bis 2 GB RAM, ich nutze dafür einen vServer von [ZAP-Hosting](https://zap-hosting.com/vserverhomepage). Wie viel Leistung du wirklich brauchst, hängt vor allem von der Zahl der Monitore und den Prüfintervallen ab.

### Voraussetzungen

- Ein Linux-Server mit Debian oder Ubuntu in einer aktuellen, unterstützten Version
- Root- oder Sudo-Zugriff per SSH
- Docker und das Docker-Compose-Plugin, siehe [Docker auf Linux installieren](/blog/docker-installation-linux)
- Eine Domain oder Subdomain, deren DNS-Eintrag auf den Server zeigt, zum Beispiel status.example.de
- Ein grundlegend abgesicherter Server mit Firewall und SSH-Schlüsseln, siehe [Linux-vServer absichern](/blog/linux-vserver-absichern)

<ZapHostingCta href="https://zap-hosting.com/vserverhomepage" title="Kleiner vServer für dein Monitoring" description="Ein separater vServer bei ZAP-Hosting reicht für Uptime Kuma völlig aus und bleibt erreichbar, wenn dein Hauptserver ausfällt." buttonText="vServer ansehen" couponCode="GERMANGAMING" imageSrc="" />

## Installation per Docker Compose

Lege zuerst ein Verzeichnis für Uptime Kuma an und wechsle hinein:

```bash
sudo mkdir -p /opt/uptime-kuma
cd /opt/uptime-kuma
```

Erstelle dort eine Datei `compose.yaml` mit folgendem Inhalt:

```yaml
services:
  uptime-kuma:
    image: louislam/uptime-kuma:2
    container_name: uptime-kuma
    restart: unless-stopped
    volumes:
      - ./data:/app/data
    ports:
      - "127.0.0.1:3001:3001"
```

Die wichtigsten Punkte:

- **Image**: Das Tag `2` sorgt dafür, dass du Updates innerhalb der Hauptversion 2 bekommst, aber nicht versehentlich auf eine neue Hauptversion springst.
- **Volume**: Unter /app/data speichert Uptime Kuma seine Datenbank, Einstellungen und den Verlauf. Durch das Bind Mount liegen diese Daten im Ordner data neben der Compose-Datei und überstehen jedes Neuerstellen des Containers.
- **Port**: Uptime Kuma lauscht auf Port 3001. Durch das vorangestellte 127.0.0.1 ist der Port nur lokal auf dem Server erreichbar, nicht aus dem Internet.

Starte den Container:

```bash
sudo docker compose up -d
sudo docker compose logs -f
```

Mit Strg+C verlässt du die Log-Ansicht, der Container läuft weiter.

### Warum der Port nur an 127.0.0.1 gebunden wird

Veröffentlichte Docker-Ports umgehen die UFW-Firewall. Docker schreibt eigene iptables-Regeln, die vor den Regeln von UFW greifen. Ein einfaches "3001:3001" würde die Oberfläche also unverschlüsselt ins Internet stellen, auch wenn UFW den Port eigentlich blockiert. Die Bindung an 127.0.0.1 verhindert das zuverlässig. Von außen erreichbar wird Uptime Kuma erst über den Reverse Proxy, und zwar ausschließlich per HTTPS.

## Reverse Proxy mit HTTPS

### Beispiel mit Caddy

Caddy eignet sich gut, weil es TLS-Zertifikate von Let's Encrypt automatisch holt und erneuert. Installiere Caddy aus dem offiziellen Paket-Repository nach der Anleitung auf caddyserver.com und öffne in UFW die Ports 80 und 443:

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

Passe dann die Datei /etc/caddy/Caddyfile an:

```caddyfile
status.example.de {
    reverse_proxy 127.0.0.1:3001
}
```

Anschließend lädst du die Konfiguration neu:

```bash
sudo systemctl reload caddy
```

Sobald der DNS-Eintrag auf den Server zeigt, holt Caddy das Zertifikat selbstständig. Uptime Kuma nutzt für die Live-Aktualisierung der Oberfläche WebSockets, die Caddy ohne zusätzliche Konfiguration durchreicht.

### Alternative: Coolify

Wenn du bereits Coolify verwendest oder mehrere Dienste auf dem Monitoring-Server betreiben willst, kannst du Uptime Kuma auch darüber bereitstellen. Coolify übernimmt Reverse Proxy und Zertifikate dann für dich. Wie du Coolify einrichtest, zeige ich in der [Coolify-Installation](/blog/coolify-installation).

## Ersteinrichtung

### Admin-Konto sofort anlegen

Rufe direkt nach dem Start https://status.example.de im Browser auf. Beim ersten Aufruf fragt Uptime Kuma nach den Zugangsdaten für das Admin-Konto. Erledige das sofort: Solange kein Konto existiert, kann jeder, der die Adresse aufruft, die Einrichtung übernehmen. Je nach Version fragt der Assistent vorher, welche Datenbank verwendet werden soll. Für eine überschaubare Zahl von Monitoren ist die eingebaute SQLite-Variante ausreichend.

### Zwei-Faktor-Authentifizierung aktivieren

Aktiviere danach in den Einstellungen unter Sicherheit die Zwei-Faktor-Authentifizierung. Du scannst dort einen QR-Code mit einer Authenticator-App und bestätigst mit einem Code. Die Oberfläche ist öffentlich erreichbar und kennt deine gesamte Infrastruktur, ein Passwort allein ist dafür zu wenig.

## Monitore anlegen

Über "Neuen Monitor hinzufügen" legst du Prüfungen an. Die folgenden drei Beispiele decken die meisten Fälle ab.

### HTTP(s) mit Keyword

Ein einfacher HTTP(s)-Monitor prüft nur, ob ein Server antwortet. Das reicht oft nicht: Eine Website kann einen Statuscode 200 liefern und trotzdem nur eine Fehlerseite anzeigen. Mit dem Typ HTTP(s) mit Keyword prüft Uptime Kuma zusätzlich, ob ein bestimmter Text in der Antwort vorkommt. Wähle dafür etwas, das nur auf einer funktionierenden Seite steht, zum Beispiel einen Text aus dem Footer oder den Namen eines Menüpunkts.

Bei HTTPS-Monitoren kannst du außerdem eine Benachrichtigung vor dem Ablauf des Zertifikats aktivieren. Das ist auch dann sinnvoll, wenn die Erneuerung automatisch läuft, denn genau diese Automatik kann still und leise fehlschlagen.

### TCP-Port

Für Dienste ohne Weboberfläche nutzt du den Typ TCP-Port. Du gibst Hostname und Port an, etwa Port 25 für einen Mailserver oder den Port eines Game-Servers. Uptime Kuma prüft dann, ob eine Verbindung aufgebaut werden kann.

### Push-Monitor für Backup-Jobs

Push-Monitore drehen das Prinzip um. Uptime Kuma erzeugt eine URL, die dein Job nach erfolgreichem Lauf aufruft. Bleibt der Aufruf innerhalb des eingestellten Intervalls aus, meldet Uptime Kuma den Monitor als ausgefallen. Damit erkennst du nicht nur abgestürzte, sondern auch gar nicht erst gestartete Jobs.

Ein nächtliches Backup-Skript könnte am Ende so aussehen:

```bash
#!/bin/bash
set -e

/usr/local/bin/backup.sh

curl -fsS -m 10 --retry 3 "https://status.example.de/api/push/DEIN_TOKEN?status=up&msg=OK" > /dev/null
```

Die genaue URL inklusive Token zeigt dir Uptime Kuma beim Anlegen des Monitors an. Durch set -e wird curl nur erreicht, wenn das Backup ohne Fehler durchgelaufen ist. Für ein tägliches Backup stellst du das Intervall etwas großzügiger ein als 24 Stunden, damit ein Lauf, der länger dauert, keinen Alarm auslöst. Wie du Backups grundsätzlich planst, beschreibe ich in der [Backup-Strategie für den Mittelstand](/blog/backup-strategie-mittelstand).

### Intervalle und Wiederholungen

Ein Intervall von 60 Sekunden ist für die meisten Websites ein guter Standard.

Wichtiger gegen Fehlalarme sind die Wiederholungen. Ein einzelner Timeout durch eine kurze Netzwerkstörung sollte dich nicht nachts wecken. Stellst du zwei oder drei Wiederholungen ein, gilt ein Monitor erst als ausgefallen, wenn mehrere Prüfungen hintereinander scheitern. Das separate Wiederholungsintervall kannst du dabei kürzer wählen als das normale Intervall, damit ein echter Ausfall trotzdem zügig erkannt wird.

<Tip title="PRAXIS-TIPP">
Überwache auch den Monitoring-Server selbst von außen. Ein kostenloser externer Check oder ein Push-Monitor auf einer zweiten Instanz genügt, damit dir ein Ausfall von Uptime Kuma nicht verborgen bleibt.
</Tip>

### Docker-Container überwachen

Der Monitortyp für Docker-Container benötigt Zugriff auf einen Docker-Host. Da Uptime Kuma bei diesem Aufbau auf einem eigenen Server läuft, sieht es über den lokalen Docker-Socket nur die eigenen Container. Für Container auf deinem Hauptserver ist ein HTTP(s)- oder TCP-Monitor auf den veröffentlichten Dienst meist die einfachere und sicherere Wahl, weil du dafür keinen Docker-Zugriff nach außen freigeben musst.

## Benachrichtigungen

Ein Monitor ohne Benachrichtigung hilft nur, wenn du zufällig auf das Dashboard schaust. Unter den Einstellungen legst du Benachrichtigungskanäle an und weist sie anschließend den Monitoren zu. Uptime Kuma unterstützt eine lange Liste von Diensten, darunter:

- E-Mail per SMTP
- Telegram
- Discord
- Microsoft Teams
- ntfy
- Slack, Signal, Matrix, Gotify und allgemeine Webhooks

Jeder Kanal lässt sich direkt in der Oberfläche testen. Nutze das, bevor du dich auf ihn verlässt. Für kritische Dienste empfehle ich zwei unabhängige Wege, zum Beispiel E-Mail und eine Push-Benachrichtigung aufs Smartphone. Fällt der Mailserver aus, den du gleichzeitig überwachst, erreicht dich die Warnung sonst nicht.

## Statusseiten

Mit Statusseiten zeigst du Kunden, Kollegen oder deiner Community, ob deine Dienste laufen. Du legst eine Seite an, wählst die Monitore aus, die dort erscheinen sollen, und gruppierst sie sinnvoll, etwa nach Website, E-Mail und internen Systemen. Die Seite ist öffentlich lesbar, die Verwaltung bleibt hinter dem Login.

Überlege genau, welche Monitore du dort zeigst. Interne Hostnamen, IP-Adressen oder Dienste, die niemand außerhalb der IT kennen muss, gehören nicht auf eine öffentliche Statusseite.

## Wartungsfenster

Geplante Arbeiten sollen keine Alarme auslösen. Dafür gibt es Wartungsfenster: Du legst einen Zeitraum fest, einmalig oder wiederkehrend, und wählst die betroffenen Monitore oder Statusseiten aus. Während der Wartung werden keine Ausfallbenachrichtigungen verschickt, und auf der Statusseite erscheint ein Hinweis auf die Wartung.

## Updates und Backup

### Updates einspielen

Da das Image auf die Hauptversion 2 festgelegt ist, holst du Updates mit zwei Befehlen:

```bash
cd /opt/uptime-kuma
sudo docker compose pull && sudo docker compose up -d
```

Docker lädt das neue Image und erstellt den Container neu, die Daten im Volume bleiben erhalten. Lies vor größeren Updates die Release Notes auf GitHub und lege vorher ein Backup an. Aufgeräumt werden alte Images mit sudo docker image prune.

### Datenverzeichnis sichern

Alles, was Uptime Kuma ausmacht, liegt im Ordner /opt/uptime-kuma/data. Für ein konsistentes Backup stoppst du den Container kurz und archivierst das Verzeichnis:

```bash
cd /opt/uptime-kuma
sudo docker compose stop
sudo tar -czf /root/uptime-kuma-backup-$(date +%F).tar.gz data
sudo docker compose start
```

Kopiere das Archiv anschließend auf ein anderes System. Ein Backup, das nur auf dem Monitoring-Server liegt, hilft dir nicht, wenn genau dieser Server verloren geht.

## Häufige Fragen

### Kann ich Uptime Kuma auch ohne Docker installieren?

Ja, Uptime Kuma lässt sich auch direkt mit Node.js betreiben. Docker ist aber einfacher zu aktualisieren und sauber vom restlichen System getrennt, deshalb empfehle ich für die meisten Fälle die Container-Variante.

### Kann ich Server im internen Netzwerk überwachen?

Ja, sofern der Monitoring-Server sie erreichen kann, etwa über ein VPN wie WireGuard. Ein Server im Internet sieht interne Adressen ohne eine solche Verbindung nicht. Alternativ nutzt du Push-Monitore: Dann meldet sich das interne System von selbst, und du brauchst keine eingehende Verbindung.

### Ersetzt Uptime Kuma ein vollständiges Server-Monitoring?

Nein. Uptime Kuma prüft Erreichbarkeit und Antwortzeiten. Auslastung von CPU, RAM oder Festplatten erfasst es nicht. Dafür eignen sich andere Werkzeuge, für einen schnellen Blick auf einzelne Server zum Beispiel [Cockpit](/blog/cockpit-installation).

### Wie viele Monitore verträgt ein kleiner vServer?

Das hängt stark von Intervallen und Monitortypen ab. Für eine überschaubare Anzahl von Websites, Ports und Push-Monitoren reicht ein kleiner vServer in der Regel aus. Behalte nach dem Einrichten einfach die Auslastung im Blick und passe bei Bedarf die Intervalle an.

## Fazit

Uptime Kuma ist schnell installiert und deckt die typischen Anforderungen kleiner und mittlerer Umgebungen ab: Websites, Ports, Zertifikate und Cronjobs lassen sich an einer Stelle überwachen. Entscheidend ist der Aufbau drumherum. Betreibe das Monitoring auf einem separaten Server, veröffentliche die Oberfläche nur per HTTPS hinter einem Reverse Proxy, sichere das Admin-Konto mit Zwei-Faktor-Authentifizierung und teste deine Benachrichtigungskanäle. Mit sinnvollen Wiederholungen, Wartungsfenstern und einem regelmäßigen Backup des Datenverzeichnisses hast du dann ein Monitoring, auf das du dich auch im Ernstfall verlassen kannst.
