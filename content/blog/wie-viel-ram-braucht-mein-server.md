---
title: 'Wie viel RAM braucht mein Server? Mit Rechner'
description: 'Wie viel RAM braucht dein Gameserver oder vServer? Richtwerte für Minecraft, FiveM, Palworld, Docker, Coolify und Co. plus RAM-Rechner mit Empfehlung.'
date: '2026-09-30'
lastModified: '2026-10-02'
tags: ['Server-Hosting', 'Gameserver', 'Self-Hosting']
featured: false
---

Zu wenig Arbeitsspeicher ist der häufigste Grund, warum ein Server ruckelt, abstürzt oder Dienste plötzlich beendet werden. Zu viel RAM kostet dagegen jeden Monat Geld, ohne etwas zu bringen. Hier findest du Richtwerte für typische Gameserver und Anwendungen und einen Rechner, der dir aus Spiel, Spielerzahl oder deinen Diensten eine konkrete Empfehlung macht.

## Der RAM-Rechner

Wähle im Rechner aus, ob du einen Gameserver oder einen vServer mit eigenen Diensten planst. Der Rechner addiert die Richtwerte, schlägt 25 Prozent Puffer auf und rundet auf die nächste übliche Paketgröße.

<RamRechner />

Die Werte sind bewusst eher großzügig angesetzt. Sie ersetzen keine Messung auf deinem eigenen Server, geben dir aber einen soliden Startpunkt. Wie du den tatsächlichen Verbrauch misst, steht weiter unten. Den Rechner gibt es auch als [eigene Seite](/server-ram-rechner), falls du ihn als Lesezeichen speichern willst.

## Warum der Arbeitsspeicher so wichtig ist

Anders als bei der CPU gibt es beim RAM keine sanfte Überlastung. Ist die CPU ausgelastet, wird alles langsamer. Ist der Speicher voll, beginnt Linux auszulagern (Swap), und wenn auch das nicht reicht, beendet der OOM-Killer einen Prozess. Oft trifft es genau den größten Prozess, also deinen Gameserver oder deine Datenbank.

Typische Anzeichen für zu wenig RAM:

- Der Gameserver stürzt nach einigen Stunden ohne klare Fehlermeldung ab.
- Spieler berichten von Lags, obwohl die CPU-Last niedrig ist.
- Docker-Container starten neu, im Log steht "OOMKilled".
- Builds (zum Beispiel von Next.js-Apps) brechen mit "JavaScript heap out of memory" ab.

## Richtwerte für Gameserver

Die Empfehlung gilt für die angegebene Spielerzahl inklusive Puffer. Mods, Plugins, große Welten und lange Laufzeiten erhöhen den Bedarf.

<RamTabelle type="games" />

### Worauf es bei Gameservern ankommt

- **Mods und Plugins:** Ein Minecraft-Server mit großem Modpack braucht schnell das Dreifache eines Vanilla-Servers. Plane bei Mods immer eine Stufe mehr ein.
- **Weltgröße und Laufzeit:** Viele Spiele halten erkundete Bereiche im Speicher. Ein Server, der wochenlang ohne Neustart läuft, braucht mehr als einer, der täglich neu startet.
- **Gleichzeitige Spieler zählen, nicht die Gesamtzahl:** Entscheidend ist, wie viele Spieler zur selben Zeit online sind, nicht wie viele es insgesamt gibt.
- **CPU nicht vergessen:** Viele Gameserver nutzen für die Spiellogik nur wenige Kerne. Eine hohe Taktrate ist dort oft wichtiger als viele Kerne.

Für die Gameserver aus der Tabelle habe ich eigene Anleitungen, zum Beispiel für den [Palworld Server](/blog/palworld-server-mieten) und den [Hytale Server](/blog/hytale-server-mieten).

## Richtwerte für Anwendungen auf dem vServer

Auf einem vServer laufen meist mehrere Dienste nebeneinander. Hier addieren sich die Werte, dazu kommen etwa 500 MB für das Betriebssystem.

<RamTabelle type="apps" />

### Drei typische Beispiele

| Szenario | Dienste | Empfehlung |
| --- | --- | --- |
| Kleines Monitoring | Docker, Uptime Kuma | 1 bis 2 GB |
| Eigene Website | Docker, WordPress mit MariaDB | 2 GB |
| Self-Hosting-Plattform | Coolify, zwei Next.js-Apps, PostgreSQL, Umami | 8 GB |

<Figure src="/img/blog/wie-viel-ram-braucht-mein-server/ram-berechnung.webp" alt="RAM-Berechnung in drei Schritten am Beispiel einer Self-Hosting-Plattform: Betriebssystem 0,5 GB, Coolify 2 GB, zwei Next.js-Apps 1 GB, PostgreSQL 1 GB und Umami 0,5 GB ergeben 5 GB, plus 25 Prozent Puffer sind 6,25 GB, aufgerundet auf die Paketgröße 8 GB" width={1600} height={900} caption="Der Rechner addiert die Richtwerte, schlägt 25 Prozent Puffer auf und rundet auf die nächste übliche Paketgröße." />

Bei [Coolify](/blog/coolify-installation) lohnt sich großzügiges Planen besonders: Coolify baut deine Apps direkt auf dem Server, und Builds brauchen kurzzeitig oft 1 bis 2 GB zusätzlich.

## Den tatsächlichen Verbrauch messen

Richtwerte sind ein Startpunkt. Sobald dein Server läuft, solltest du nachsehen, wie viel Speicher wirklich belegt ist.

```bash
# Gesamtübersicht: wichtig ist die Spalte "available"
free -h

# Prozesse nach Speicherverbrauch sortiert
ps aux --sort=-%mem | head -n 10

# Speicherverbrauch aller Docker-Container
docker stats --no-stream
```

Linux nutzt freien Speicher als Cache für Dateien. Ein hoher Wert bei "used" ist deshalb kein Problem, solange unter "available" genug übrig bleibt. Kritisch wird es, wenn "available" dauerhaft unter etwa 10 Prozent fällt oder der Swap stark wächst.

Für einen dauerhaften Überblick eignet sich eine Weboberfläche wie [Cockpit](/blog/cockpit-installation). Ob deine Dienste erreichbar bleiben, überwachst du mit [Uptime Kuma](/blog/uptime-kuma-installieren).

## Swap: Notreserve, kein Ersatz

Eine Swap-Datei verhindert, dass bei kurzen Spitzen sofort ein Prozess beendet wird. Auf einem vServer ohne Swap kannst du so eine anlegen:

```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

Swap liegt auf der SSD und ist um ein Vielfaches langsamer als RAM. Für Gameserver ist ständiges Auslagern gleichbedeutend mit Lags. Swap fängt Spitzen ab, dauerhaft zu wenig RAM ersetzt er nicht.

## Gameserver mieten oder vServer selbst verwalten?

Beim gemieteten Gameserver wählst du Spiel und Paket, Installation, Updates und Backups übernimmt der Anbieter. Ein vServer ist flexibler: Du kannst mehrere Dienste gleichzeitig betreiben, musst dich aber selbst um Updates und Sicherheit kümmern. Wie du einen neuen vServer sauber absicherst, zeige ich in [Linux vServer absichern](/blog/linux-vserver-absichern). Die Unterschiede zwischen den Server-Arten erkläre ich in [vServer oder Dedicated Server](/blog/vserver-vs-dedicated-server).

Ich nutze für Gameserver und vServer [ZAP-Hosting](https://zap-hosting.com/achim). Dort kannst du den RAM bei vielen Paketen später erhöhen, wenn der Bedarf wächst. Das ist praktisch, weil du nicht von Anfang an zu groß planen musst.

<ZapHostingCta href="https://zap-hosting.com/achim" title="Gameserver und vServer bei ZAP-Hosting" description="Pakete mit passendem RAM für dein Spiel oder deine Dienste, auf Wunsch auch als Lifetime-Variante zum einmaligen Preis." buttonText="Pakete ansehen" couponCode="GERMANGAMING" imageSrc="" />

## Häufige Fragen

### Reichen 2 GB RAM für einen vServer?

Für einzelne, sparsame Dienste wie Uptime Kuma, Vaultwarden oder eine kleine Website ja. Sobald Coolify, mehrere Container oder eine Datenbank mit mehr Last dazukommen, sind 4 GB die sinnvolle Untergrenze.

### Wie viel RAM braucht ein Minecraft Server?

Für einen Vanilla- oder Paper-Server mit bis zu zehn Spielern reichen 4 GB. Modpacks brauchen 8 bis 12 GB, große Modpacks mit vielen Spielern auch mehr. Tabellen nach Spielerzahl findest du im RAM-Rechner für [Minecraft](/server-ram-rechner/minecraft) und für [Modpacks](/server-ram-rechner/minecraft-modpack).

### Kann ich den RAM später erhöhen?

Bei den meisten Anbietern ja, oft ohne Neuinstallation. Deshalb ist es sinnvoll, mit einer passenden Größe zu starten und nach einigen Tagen Messung nachzulegen, statt von Beginn an das größte Paket zu nehmen.

### Warum zeigt mein Server fast keinen freien RAM an?

Linux nutzt ungenutzten Speicher als Datei-Cache und gibt ihn bei Bedarf sofort frei. Entscheidend ist der Wert "available" bei `free -h`, nicht "free".

## Fazit

Plane RAM nach gleichzeitigen Spielern oder nach der Summe deiner Dienste, schlage einen Puffer auf und miss nach dem Start nach. Der Rechner oben liefert dir einen guten Startwert. Mit einem Anbieter, bei dem du später aufstocken kannst, gehst du kein Risiko ein.
