---
title: 'Coolify im Betrieb: Erfahrungen und Stolperfallen'
description: 'Erfahrungen aus dem Betrieb von Coolify: übersprungene Builds, Fehler im Domain-Feld, Build-Variablen in Next.js sowie Backups, Updates und Sicherheit.'
date: '2026-09-30'
lastModified: '2026-09-30'
tags: ['Self-Hosting', 'Docker', 'Next.js']
featured: false
---

Im Artikel [Coolify auf einem Linux-Server installieren](/blog/coolify-installation) ging es um die Einrichtung. Hier geht es um den laufenden Betrieb. Zuerst beschreibe ich drei Fehler, die mir beim Deployment meiner eigenen Portfolio-Seite passiert sind, danach folgen die Themen, die du für einen stabilen Betrieb im Blick haben solltest.

## Drei Stolperfallen aus meinem eigenen Deployment

Meine Portfolio-Seite ist eine Next.js-16-App, die Coolify aus einem GitHub-Repository baut. Alle drei Fehler sind banal, die Symptome führen aber leicht in die Irre.

### Build übersprungen, alte Version online

Nach einem Deploy zeigte die Seite weiterhin die alte Version. Der Deploy lief ohne Fehler durch, im Log stand aber „Build step skipped“. Coolify hatte festgestellt, dass für diesen Commit bereits ein Image existierte, und dieses einfach wieder gestartet.

Die eigentliche Ursache: Meine Änderungen lagen noch gar nicht auf dem Branch `main`, von dem Coolify baut. Coolify hat also korrekt den alten Stand von `main` ausgeliefert.

Was ich daraus mitnehme:

- Im Deploy-Log steht, welchen Commit Coolify verwendet. Vergleiche den Hash mit dem Commit, den du erwartest.
- Prüfe, welcher Branch in der Ressource eingetragen ist und ob deine Änderungen dort angekommen sind, zum Beispiel ob der Pull Request schon gemergt ist.
- „Build step skipped“ ist kein Fehler, sondern heißt: Für diesen Commit gibt es nichts Neues zu bauen.

```bash
git fetch origin
git log origin/main --oneline -1
```

Für einen bewussten Neubau desselben Commits bietet Coolify eine Deploy-Option ohne Cache an.

### Tippfehler im Domain-Feld

Die Seite war ohne www erreichbar, mit www aber nicht. Die Ursache war ein Tippfehler im Domain-Feld von Coolify. Dort stand, hier mit Beispieldomain, `https//www.example.com`: Nach dem Protokoll fehlte der Doppelpunkt. Damit war der Eintrag keine gültige Adresse, und die www-Variante lief ins Leere.

Mehrere Domains trägst du vollständig mit Protokoll und durch Komma getrennt ein:

```text
https://example.com,https://www.example.com
```

Funktioniert eine Domain nicht, prüfe der Reihe nach:

- die Schreibweise im Domain-Feld: Protokoll, Doppelpunkt, keine Leerzeichen, Komma als Trenner
- die DNS-Einträge: Beide Namen müssen auf den Server zeigen (etwa mit `dig +short www.example.com`)
- ob nach der Änderung neu deployt wurde, damit der Proxy die neue Konfiguration übernimmt
- die Logs von Deploy und Proxy auf Zertifikatsfehler

### `NEXT_PUBLIC_`-Variablen fehlen beim Build

Eine Variable mit dem Präfix `NEXT_PUBLIC_` war in Coolify nur als Runtime-Variable gesetzt. Im Ergebnis stand an ihrer Stelle „undefined“.

Der Grund liegt in Next.js: Variablen mit diesem Präfix werden beim `next build` durch ihren Wert ersetzt und fest in das JavaScript für den Browser und in vorgerenderte HTML-Seiten geschrieben. Fehlt die Variable beim Build, landet `undefined` im Ergebnis, und daran ändert auch eine später gesetzte Runtime-Variable nichts.

Was hilft:

- Die Variable in Coolify so anlegen, dass sie beim Build verfügbar ist. Die Option heißt je nach Version etwas anders, sinngemäß „Build-Variable“ oder „zur Build-Zeit verfügbar“.
- Danach neu bauen und im Log prüfen, dass der Build nicht übersprungen wurde. Steht dort wieder „Build step skipped“, ist die Variable nicht im Ergebnis angekommen.
- Bei einem eigenen Dockerfile die Variable zusätzlich als `ARG` deklarieren, sonst steht sie im Build nicht zur Verfügung.
- Im Code einen Rückfallwert setzen.

```ts
// lib/site.ts
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';
```

Next.js ersetzt nur direkte Zugriffe wie `process.env.NEXT_PUBLIC_SITE_URL`, keine dynamischen Zugriffe oder Destrukturierung. Für Werte, ohne die die Seite nicht funktionieren kann, ist ein bewusster Abbruch des Builds oft besser als ein stiller Rückfallwert.

<Tip title="PRAXIS-TIPP">
Zeigt ein Deploy nicht das erwartete Ergebnis, prüfe zuerst drei Dinge: den Commit-Hash im Deploy-Log, die Schreibweise der Domains und ob alle `NEXT_PUBLIC_`-Variablen beim Build verfügbar waren.
</Tip>

## Automatische Deploys per GitHub App oder Webhook

Für private GitHub-Repositories ist die GitHub App der bequemste Weg. Coolify legt sie in deinem GitHub-Konto oder deiner Organisation an, du gibst ihr Zugriff auf ausgewählte Repositories, und jeder Push auf den eingetragenen Branch löst einen Deploy aus. Zusätzlich sind damit Preview-Deployments für Pull Requests möglich.

Alternativ bindest du ein Repository per Deploy Key an und richtest einen Webhook ein; URL und Secret findest du in den Einstellungen der Ressource. Das funktioniert auch mit GitLab, Gitea oder Bitbucket. Eine dritte Variante: Deine CI-Pipeline testet zuerst und stößt den Deploy danach über die API von Coolify an.

In jedem Fall gilt: Automatisch deployt wird nur der Branch, der in der Ressource eingetragen ist. Genau daran hing mein erster Fehler.

## Healthchecks

Ohne Healthcheck gilt ein Container als gesund, sobald er läuft, auch wenn die Anwendung darin hängt. Mit Healthcheck erkennt Coolify beim Deploy, ob die neue Version wirklich antwortet. Schlägt der Check fehl, übernimmt Coolify die neue Version nicht, und die bisherige bleibt in der Regel online.

Für Next.js mit App Router reicht ein schlanker Endpunkt:

```ts
// app/api/health/route.ts
export function GET() {
  return Response.json({ status: 'ok' });
}
```

In Coolify trägst du Pfad und Port ein (bei Next.js standardmäßig 3000) und passt Intervall und Wartezeit beim Start an. Der Check läuft innerhalb des Containers und braucht dort ein Werkzeug wie `curl` oder `wget`. Fehlt beides im Image, schlägt er fehl, obwohl die Anwendung läuft.

## Ressourcen-Limits und Build-Last

Ohne Limits darf jeder Container so viel CPU und Arbeitsspeicher nutzen, wie der Server hergibt; ein Speicherleck trifft dann alle Dienste. In den Einstellungen der Ressource kannst du Limits für CPU und Arbeitsspeicher setzen; technisch sind das die normalen Docker-Limits.

Mehr Last erzeugt oft der Build: Ein `next build` braucht deutlich mehr Arbeitsspeicher als die fertige Anwendung und läuft standardmäßig auf demselben Server. Auf kleinen Servern hilft Swap als Puffer. Bei mehreren Anwendungen lohnt es sich, Builds auf einen eigenen Build-Server oder in eine CI-Pipeline auszulagern.

Alte Images und Build-Cache räumt die automatische Bereinigung in den Servereinstellungen auf; einen Überblick liefert `docker system df`.

## Logs im Blick behalten

Bei Problemen schaust du zuerst ins Deploy-Log (Commit, Build-Schritte, Healthcheck) und danach in die Container-Logs, entweder in Coolify oder auf dem Server mit `docker logs --tail 100 -f CONTAINERNAME`.

Damit Container-Logs nicht unbegrenzt wachsen, prüfe in `/etc/docker/daemon.json`, ob eine Log-Rotation konfiguriert ist:

```json
{
  "log-driver": "json-file",
  "log-opts": { "max-size": "10m", "max-file": "3" }
}
```

Nach einer Änderung muss der Docker-Dienst neu starten, und die Einstellung gilt nur für neu erstellte Container. Grundlagen zu Docker findest du in [Docker unter Linux installieren](/blog/docker-installation-linux).

## Backups: Datenbanken, Volumes und Coolify selbst

Coolify kann Datenbanken, die du als Ressource angelegt hast, etwa PostgreSQL, MySQL, MariaDB oder MongoDB, zeitgesteuert sichern. Sinnvoll ist das nur, wenn die Sicherung den Server verlässt: Hinterlege dafür einen S3-kompatiblen Speicher und wähle ihn in den Backup-Einstellungen der Datenbank aus. Teste die Wiederherstellung, bevor du dich darauf verlässt.

Darüber hinaus brauchst du:

- **Sicherung der Volumes:** Hochgeladene Dateien und andere persistente Daten sicherst du separat, zum Beispiel mit restic oder BorgBackup.
- **Sicherung von Coolify selbst:** Projekte, Umgebungsvariablen und Zugangsdaten liegen in der eigenen Datenbank von Coolify. Auch dafür bietet Coolify eine Sicherung an; prüfe, ob sie aktiv ist und auf externen Speicher schreibt.
- **Den Schlüssel dazu:** Die Datei `/data/coolify/source/.env` enthält den `APP_KEY`, mit dem Coolify Geheimnisse verschlüsselt. Ohne ihn nützt dir eine wiederhergestellte Datenbank wenig. Sichere diese Datei und die SSH-Schlüssel unter `/data/coolify/ssh` getrennt, etwa in deinem Passwortmanager.

Wie das in eine vollständige Strategie passt, steht in [Backup-Strategie für den Mittelstand](/blog/backup-strategie-mittelstand).

## Coolify aktualisieren

Neue Versionen von Coolify bringen auch Sicherheitskorrekturen. Automatische Updates lassen sich in den Einstellungen aktivieren, das ist für Testserver bequem. Für produktive Server ist ein kontrollierter Ablauf sinnvoll:

1. Release Notes lesen und auf inkompatible Änderungen achten.
2. Prüfen, ob die Sicherung der Coolify-Datenbank und der `.env` aktuell ist.
3. Update über die Oberfläche starten (laut Dokumentation geht es auch per erneutem Aufruf des Installationsskripts).
4. Danach Dashboard, Proxy und die wichtigsten Anwendungen prüfen.

## Reverse Proxy und SSL-Zertifikate

Coolify setzt standardmäßig Traefik als Reverse Proxy ein, alternativ Caddy. Der Proxy leitet Anfragen anhand der Domain an den richtigen Container weiter und holt Zertifikate von Let's Encrypt, sobald eine Domain mit `https://` eingetragen ist. Damit das zuverlässig klappt:

- Der DNS-Eintrag sollte auf den Server zeigen, bevor du die Domain einträgst.
- Port 80 muss von außen erreichbar sein, weil die Standard-Validierung darüber läuft.
- Gibt es einen AAAA-Eintrag, muss auch die IPv6-Adresse stimmen. Let's Encrypt versucht es zuerst über IPv6, ein veralteter AAAA-Eintrag kann die Validierung scheitern lassen.
- Let's Encrypt begrenzt fehlgeschlagene Versuche, ständiges Neu-Deployen bei falschem DNS bringt also nichts.
- Sitzt ein Dienst wie Cloudflare als Proxy davor, müssen dessen SSL-Einstellung und die Zertifikate auf dem Server zusammenpassen, sonst drohen Weiterleitungsschleifen.

## Server-Monitoring

Coolify ersetzt kein Monitoring des Servers darunter. Behalte vor allem Speicherplatz, Arbeitsspeicher und Last im Blick: Ein voller Datenträger durch Images, Build-Cache oder Logs ist eine typische Ursache für fehlschlagende Deploys. Eine schlanke Weboberfläche dafür ist Cockpit, die Einrichtung beschreibt der Artikel [Cockpit auf einem Linux-Server installieren](/blog/cockpit-installation).

Richte außerdem Benachrichtigungen in Coolify ein, etwa per E-Mail, Discord oder Telegram, damit du von fehlgeschlagenen Deploys und Backups erfährst. Ein externer Uptime-Check, zum Beispiel mit Uptime Kuma auf einem anderen System, prüft von außen, ob deine Seiten erreichbar sind.

## Sicherheit des Servers

Auf dem Server läuft mit Coolify ein Werkzeug mit Root-Zugriff. Entsprechend sorgfältig solltest du ihn absichern:

- **SSH nur mit Schlüsseln:** Setze `PasswordAuthentication no`. Coolify verbindet sich selbst per SSH mit dem Server, standardmäßig als root. Nutze deshalb `PermitRootLogin prohibit-password` statt `no`, sonst sperrst du Coolify aus.
- **Firewall:** Von außen brauchst du in der Regel nur SSH sowie Port 80 und 443. Welche Ports das Dashboard zusätzlich nutzt, steht in der Dokumentation.
- **Docker und UFW:** Docker schreibt eigene iptables-Regeln für veröffentlichte Ports und umgeht damit UFW. Gib Datenbanken deshalb nicht öffentlich frei und nutze zusätzlich die Firewall deines Hosters.
- **Updates:** Spiele Sicherheitsupdates des Betriebssystems automatisch ein, unter Debian und Ubuntu zum Beispiel mit `unattended-upgrades`.
- **Coolify-Konto:** Nutze ein starkes Passwort, aktiviere die Zwei-Faktor-Authentifizierung und prüfe, dass keine offene Registrierung aktiv ist.

## Häufige Fragen

### Warum zeigt Coolify nach dem Deploy noch die alte Version?

Meist hat Coolify einen Commit gebaut, der deine Änderungen nicht enthält. Prüfe im Deploy-Log den Commit-Hash und ob deine Änderungen auf dem eingetragenen Branch liegen. Steht dort „Build step skipped“, gab es für diesen Commit schon ein Image.

### Warum steht bei meiner `NEXT_PUBLIC_`-Variable „undefined“?

Weil sie beim Build nicht verfügbar war. Next.js schreibt solche Werte beim Build fest ins Ergebnis. Stelle die Variable in Coolify als Build-Variable bereit, baue neu und setze im Code einen Rückfallwert.

### Sichert Coolify automatisch alles?

Nein. Coolify sichert auf Wunsch Datenbanken, die als Ressource angelegt sind, und die eigene Instanz. Volumes deiner Anwendungen, die `.env` mit dem `APP_KEY` und den Server selbst musst du zusätzlich sichern.

## Fazit

Coolify nimmt dir viel Arbeit ab. Die typischen Fehler entstehen an den Übergängen: zwischen Git-Branch und Deploy, zwischen Domain-Feld und DNS, zwischen Build und Laufzeit. Wenn du diese Übergänge kennst und Backups, Updates und die Absicherung des Servers ernst nimmst, ist Coolify eine solide Grundlage für eigene Web-Apps.
