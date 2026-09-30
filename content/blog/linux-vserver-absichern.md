---
title: 'Linux vServer absichern: Die Anleitung'
description: 'Linux vServer unter Debian und Ubuntu absichern: SSH-Schlüssel, gehärtetes SSH, UFW, Fail2ban und automatische Updates direkt nach der Bestellung.'
date: '2026-09-30'
lastModified: '2026-09-30'
tags: ['Linux', 'IT-Sicherheit', 'Server-Hosting']
featured: false
---

Ein frisch bestellter vServer hängt ab der ersten Minute mit öffentlicher IP-Adresse im Internet. Automatisierte Scanner finden ihn schnell und probieren Passwörter für root und gängige Benutzernamen durch. Diese Anleitung zeigt dir die Schritte, die ich auf jedem neuen Debian- oder Ubuntu-Server erledige, bevor dort irgendeine Anwendung läuft. Die Reihenfolge ist bewusst gewählt: Du sperrst dich an keiner Stelle selbst aus, solange du sie einhältst.

## Voraussetzungen

- Ein vServer mit aktuellem Debian oder Ubuntu und Root-Zugang
- Die Zugangsdaten aus der Bestellbestätigung (IP-Adresse, root-Passwort oder hinterlegter Schlüssel)
- Ein Rechner mit SSH-Client (unter Linux, macOS und Windows 10/11 bereits enthalten)
- Zugriff auf die Web-Konsole (VNC) deines Anbieters als Notfallzugang

Du brauchst einen vServer mit vollem Root-Zugang, damit du SSH, Firewall und Updates selbst konfigurieren kannst. Ich nutze dafür die [vServer von ZAP-Hosting](https://zap-hosting.com/vserverhomepage). Ob ein vServer für dein Vorhaben reicht oder ein dedizierter Server sinnvoller ist, klärt der Vergleich [vServer oder Dedicated Server](/blog/vserver-vs-dedicated-server).

<ZapHostingCta href="https://zap-hosting.com/vserverhomepage" title="Linux vServer bei ZAP-Hosting" description="vServer mit Root-Zugang, deutschen Standorten und DDoS-Schutz, auf Wunsch auch als Lifetime-Variante." buttonText="vServer ansehen" couponCode="GERMANGAMING" imageSrc="" />

Merke dir, wo im Kundenpanel die Web-Konsole liegt. Falls bei der SSH-Konfiguration doch etwas schiefgeht, kommst du darüber immer noch auf den Server.

## Schritt 1: System aktualisieren

Melde dich zunächst als root an und bring das System auf den aktuellen Stand. Images von Anbietern sind oft einige Wochen oder Monate alt.

```bash
ssh root@SERVER-IP
apt update
apt full-upgrade -y
```

Wurde dabei ein neuer Kernel installiert, starte den Server einmal neu. Ob ein Neustart nötig ist, erkennst du unter Ubuntu an der Datei `/var/run/reboot-required`:

```bash
ls /var/run/reboot-required 2>/dev/null && reboot
```

Unter Debian gibt es diese Datei standardmäßig nicht. Nach einem Kernel-Update startest du dort einfach mit `reboot` neu.

## Schritt 2: Eigenen Benutzer mit sudo anlegen

Arbeite im Alltag nicht als root. Lege einen persönlichen Benutzer an und gib ihm sudo-Rechte. Ersetze `deinname` durch deinen gewünschten Benutzernamen.

```bash
apt install -y sudo
adduser deinname
usermod -aG sudo deinname
```

`adduser` fragt nach einem Passwort. Wähle ein starkes, denn du brauchst es später für sudo, auch wenn die SSH-Anmeldung per Passwort abgeschaltet ist. Auf minimalen Debian-Images fehlt sudo manchmal, deshalb steht die Installation oben mit drin.

Teste den neuen Benutzer in einer zweiten Sitzung, bevor du weitermachst:

```bash
ssh deinname@SERVER-IP
sudo whoami
```

Die Ausgabe muss `root` lauten.

## Schritt 3: SSH-Schlüssel erzeugen und hinterlegen

Passwörter lassen sich erraten oder abgreifen, ein privater Schlüssel verlässt deinen Rechner nie. Erzeuge auf deinem lokalen Rechner (nicht auf dem Server) ein Schlüsselpaar vom Typ ed25519:

```bash
ssh-keygen -t ed25519 -C "deinname@laptop"
```

Vergib eine Passphrase. Sie schützt den Schlüssel, falls dein Laptop verloren geht. Mit einem SSH-Agent musst du sie nicht bei jeder Verbindung eingeben.

Anschließend kopierst du den öffentlichen Schlüssel auf den Server:

```bash
ssh-copy-id -i ~/.ssh/id_ed25519.pub deinname@SERVER-IP
```

Der Befehl legt `~/.ssh/authorized_keys` mit den richtigen Rechten an. Teste danach, ob die Anmeldung ohne Passwortabfrage des Servers klappt (nur die Passphrase deines Schlüssels wird abgefragt):

```bash
ssh deinname@SERVER-IP
```

### Hinweis für Windows

Windows 10 und 11 bringen den OpenSSH-Client mit, `ssh-keygen` funktioniert also direkt in der PowerShell. Der Schlüssel landet unter `C:\Users\DEINNAME\.ssh\`. `ssh-copy-id` gibt es unter Windows allerdings nicht. Diese Zeile in der PowerShell erledigt dasselbe:

```powershell
type $env:USERPROFILE\.ssh\id_ed25519.pub | ssh deinname@SERVER-IP "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"
```

## Schritt 4: SSH härten

Jetzt schaltest du Passwort-Anmeldungen und den direkten root-Login ab. Statt die Hauptdatei `/etc/ssh/sshd_config` zu bearbeiten, legst du eine eigene Drop-in-Datei an. Das hat zwei Vorteile: Paketupdates fragen nicht nach Konfigurationskonflikten, und du siehst auf einen Blick, was du geändert hast.

Wichtig ist der Dateiname. OpenSSH übernimmt für jede Option den ersten gefundenen Wert, und die Dateien in `/etc/ssh/sshd_config.d/` werden alphabetisch eingelesen. Manche Images (etwa mit cloud-init) legen dort eine Datei wie `50-cloud-init.conf` mit `PasswordAuthentication yes` ab. Mit dem Präfix `00-` gewinnt deine Einstellung.

```bash
sudo nano /etc/ssh/sshd_config.d/00-hardening.conf
```

Inhalt:

```bash
# Nur Anmeldung per Schlüssel
PasswordAuthentication no
KbdInteractiveAuthentication no
PubkeyAuthentication yes

# Kein direkter root-Login
PermitRootLogin no

# Nur diese Benutzer dürfen sich anmelden (optional)
AllowUsers deinname
```

`PermitRootLogin no` ist die strengste Variante. Brauchst du root-Zugang per Schlüssel, etwa für ein Backup-Werkzeug, nimm stattdessen `PermitRootLogin prohibit-password`. Dann bleibt der root-Login per Passwort gesperrt, per Schlüssel ist er erlaubt. `AllowUsers` ist optional, verhindert aber, dass sich später versehentlich angelegte Systembenutzer anmelden können.

### Konfiguration testen

Prüfe die Syntax, bevor du irgendetwas neu startest:

```bash
sudo sshd -t
```

Kommt keine Ausgabe, ist die Konfiguration gültig. Mit `sshd -T` siehst du zusätzlich die tatsächlich wirksamen Werte:

```bash
sudo sshd -T | grep -Ei 'passwordauthentication|permitrootlogin|kbdinteractive'
```

### Neu laden, mit offener Sicherheitsleine

Lass deine aktuelle SSH-Sitzung offen. Starte den Dienst neu:

```bash
sudo systemctl restart ssh
```

Der Dienst heißt unter Debian und Ubuntu `ssh`, nicht `sshd`. Auf neueren Ubuntu-Versionen startet ihn systemd per Socket-Aktivierung über `ssh.socket`. Für geänderte Optionen wie oben reicht trotzdem `systemctl restart ssh`, bestehende Verbindungen bleiben dabei bestehen.

Öffne jetzt ein zweites Terminal und melde dich neu an. Erst wenn das klappt, schließt du die erste Sitzung. Zur Gegenprobe kannst du einen root-Login versuchen, er muss abgelehnt werden:

```bash
ssh root@SERVER-IP
```

<Tip title="PRAXIS-TIPP">
Schließe bei Änderungen an SSH und Firewall nie die letzte funktionierende Sitzung, bevor eine neue Anmeldung erfolgreich war. Diese eine Gewohnheit erspart dir den Umweg über die Web-Konsole.
</Tip>

## Schritt 5: Firewall mit UFW einrichten

UFW (Uncomplicated Firewall) ist ein Frontend für die Paketfilterregeln des Kernels und auf Debian wie Ubuntu schnell eingerichtet. Die Reihenfolge ist entscheidend: erst SSH erlauben, dann aktivieren.

```bash
sudo apt install -y ufw
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow OpenSSH
sudo ufw enable
```

Das Profil `OpenSSH` gibt Port 22/tcp frei. Betreibst du einen Webserver oder Reverse Proxy, öffnest du zusätzlich HTTP und HTTPS:

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

Den aktuellen Stand prüfst du mit:

```bash
sudo ufw status verbose
```

Öffne nur Ports, die wirklich von außen erreichbar sein müssen. Datenbanken, Admin-Oberflächen und interne Dienste gehören nicht dazu.

### Wichtig: Docker umgeht UFW

Dieser Punkt wird häufig übersehen. Wenn du Docker einsetzt (siehe [Docker auf Linux installieren](/blog/docker-installation-linux)), schreibt Docker für veröffentlichte Ports eigene iptables-Regeln. Diese greifen, bevor die Regeln von UFW überhaupt ausgewertet werden. Ein Container mit `-p 8080:80` ist deshalb aus dem Internet erreichbar, obwohl `ufw status` Port 8080 gar nicht auflistet.

Die sauberste Lösung: Veröffentliche Container-Ports nur auf der Loopback-Adresse und lass einen Reverse Proxy (etwa Caddy, Nginx oder Traefik) auf 80 und 443 die Anfragen weiterreichen.

```bash
docker run -d -p 127.0.0.1:8080:80 nginx
```

In einer `compose.yaml` sieht das so aus:

```yaml
services:
  web:
    image: nginx
    ports:
      - "127.0.0.1:8080:80"
```

Kontrolliere nach jedem neuen Container mit `ss -tulpn`, auf welcher Adresse er lauscht. Steht dort `0.0.0.0:8080`, ist der Port öffentlich. Plattformen wie [Coolify](/blog/coolify-installation) bringen ihren eigenen Reverse Proxy mit, auch dort lohnt sich der Blick auf die veröffentlichten Ports.

## Schritt 6: Fail2ban gegen Brute-Force

Auch mit reiner Schlüssel-Anmeldung klopfen Bots weiter an. Fail2ban sperrt IP-Adressen nach mehreren fehlgeschlagenen Versuchen für eine gewisse Zeit. Das hält die Logs sauber und reduziert Last.

```bash
sudo apt install -y fail2ban python3-systemd
```

Die mitgelieferte `jail.conf` bearbeitest du nicht, eigene Einstellungen kommen in `jail.local`:

```bash
sudo nano /etc/fail2ban/jail.local
```

```bash
[DEFAULT]
bantime = 1h
findtime = 10m
maxretry = 5

[sshd]
enabled = true
backend = systemd
```

`backend = systemd` ist auf aktuellen Systemen wichtig. Debian schreibt SSH-Anmeldungen standardmäßig nur noch ins systemd-Journal, eine Datei `/var/log/auth.log` gibt es ohne rsyslog nicht. Ohne diese Zeile startet der sshd-Jail dann nicht. Das Paket `python3-systemd` stellt die nötige Anbindung ans Journal bereit.

Dienst aktivieren und prüfen:

```bash
sudo systemctl enable --now fail2ban
sudo systemctl restart fail2ban
sudo fail2ban-client status sshd
```

Die Ausgabe zeigt die Zahl der fehlgeschlagenen Versuche und aktuell gesperrte Adressen. Sperrst du dich selbst aus, hebst du die Sperre über die Web-Konsole mit `sudo fail2ban-client set sshd unbanip DEINE-IP` wieder auf.

## Schritt 7: Automatische Sicherheitsupdates

Die meisten erfolgreichen Angriffe nutzen bekannte Lücken, für die längst Patches existieren. Mit unattended-upgrades spielt der Server Sicherheitsupdates selbstständig ein.

```bash
sudo apt install -y unattended-upgrades apt-listchanges
sudo dpkg-reconfigure -plow unattended-upgrades
```

Bestätige die Frage mit „Ja“. Das legt die Datei `/etc/apt/apt.conf.d/20auto-upgrades` an, die tägliche Paketlisten-Aktualisierung und Upgrades aktiviert. Standardmäßig werden nur Pakete aus den Sicherheitsquellen installiert.

Manche Updates (vor allem Kernel und Bibliotheken wie glibc) wirken erst nach einem Neustart. Wenn deine Dienste einen kurzen nächtlichen Neustart vertragen, kannst du ihn automatisieren. Lege dafür eine eigene Datei an, statt die mitgelieferte `50unattended-upgrades` zu ändern:

```bash
sudo nano /etc/apt/apt.conf.d/52unattended-upgrades-local
```

```bash
Unattended-Upgrade::Automatic-Reboot "true";
Unattended-Upgrade::Automatic-Reboot-Time "04:00";
Unattended-Upgrade::Remove-Unused-Dependencies "true";
```

Einen Probelauf ohne tatsächliche Installation startest du so:

```bash
sudo unattended-upgrade --dry-run --debug
```

Was tatsächlich passiert ist, steht später in `/var/log/unattended-upgrades/`.

## Schritt 8: Zeitsynchronisation prüfen

Korrekte Uhrzeit ist für Logs, Zertifikate und zeitbasierte Einmalpasswörter unverzichtbar. Prüfe den Status:

```bash
timedatectl
```

Steht dort `System clock synchronized: yes`, ist alles in Ordnung. Ist kein Zeitdienst aktiv (bei manchen Minimal-Images der Fall), installiere einen und setze bei Bedarf die Zeitzone:

```bash
sudo apt install -y systemd-timesyncd
sudo timedatectl set-timezone Europe/Berlin
```

## Schritt 9: Überflüssige Dienste finden

Jeder Dienst, der auf einem Netzwerkport lauscht, ist potenzielle Angriffsfläche. Verschaffe dir einen Überblick:

```bash
sudo ss -tulpn
```

Die Spalte „Local Address“ zeigt, worauf ein Dienst lauscht. `127.0.0.1` oder `[::1]` bedeutet nur lokal erreichbar, `0.0.0.0` oder `[::]` bedeutet auf allen Schnittstellen. Einträge, die du nicht zuordnen kannst, recherchierst du und schaltest sie ab, wenn du sie nicht brauchst. Anbieter-Images enthalten gelegentlich einen Mailserver oder rpcbind, die auf einem einfachen Webserver nichts verloren haben:

```bash
sudo systemctl disable --now rpcbind.service rpcbind.socket
```

Passe den Befehl an den Dienst an, den du tatsächlich gefunden hast.

## Schritt 10: Backups und Monitoring

Absicherung verhindert viele Vorfälle, aber nicht alle. Plattendefekte beim Anbieter, eigene Fehler oder ein kompromittierter Dienst lassen sich nur mit einer funktionierenden Sicherung auffangen. Die Snapshots im Kundenpanel sind praktisch vor Änderungen, ersetzen aber keine Sicherung außerhalb des Anbieters. Wie eine belastbare Strategie mit mehreren Kopien und Offline-Anteil aussieht, beschreibe ich in [Backup-Strategie für den Mittelstand](/blog/backup-strategie-mittelstand).

Genauso wichtig ist, dass du einen Ausfall bemerkst, bevor es jemand anderes tut. Für die Erreichbarkeit von außen eignet sich [Uptime Kuma](/blog/uptime-kuma-installieren), idealerweise auf einem zweiten System. Für den Blick auf Auslastung, Dienste und Logs im Browser ist [Cockpit](/blog/cockpit-installation) eine schlanke Option. Gib die Weboberfläche von Cockpit aber nicht einfach in der Firewall frei, sondern erreiche sie über einen SSH-Tunnel oder ein VPN.

## Optional: SSH-Port ändern

Viele Anleitungen empfehlen, SSH von Port 22 auf einen anderen Port zu verlegen. Das ist Lärmreduktion, keine echte Sicherheit: Automatisierte Scanner auf Port 22 finden den Dienst nicht mehr, deine Logs werden ruhiger. Ein gezielter Portscan findet den neuen Port trotzdem in Sekunden. Die eigentliche Schutzwirkung kommt von Schlüssel-Anmeldung und Fail2ban.

Wenn du den Port ändern willst, gehe in dieser Reihenfolge vor, damit die Firewall dich nicht aussperrt (Beispiel Port 2222):

```bash
sudo ufw allow 2222/tcp
echo "Port 2222" | sudo tee /etc/ssh/sshd_config.d/10-port.conf
sudo sshd -t
```

Unter Debian startest du dann den Dienst neu:

```bash
sudo systemctl restart ssh
```

Auf Ubuntu mit Socket-Aktivierung bestimmt `ssh.socket` den Port. Ein Generator übernimmt ihn aus der Konfiguration, das greift aber erst nach einem Neuladen von systemd:

```bash
sudo systemctl daemon-reload
sudo systemctl restart ssh.socket
```

Teste die Verbindung in einer neuen Sitzung mit `ssh -p 2222 deinname@SERVER-IP`. Erst danach entfernst du die alte Regel mit `sudo ufw delete allow OpenSSH` und passt bei Bedarf in `jail.local` unter `[sshd]` den Eintrag `port = 2222` an.

## Checkliste

- [ ] System mit `apt full-upgrade` aktualisiert und bei Bedarf neu gestartet
- [ ] Eigener Benutzer mit sudo angelegt und getestet
- [ ] SSH-Schlüssel (ed25519) mit Passphrase erzeugt und hinterlegt
- [ ] Drop-in-Datei in `/etc/ssh/sshd_config.d/` mit PasswordAuthentication no und PermitRootLogin no
- [ ] `sshd -t` ohne Fehler, neue Anmeldung in zweiter Sitzung erfolgreich
- [ ] UFW aktiv, nur SSH und benötigte Ports offen
- [ ] Docker-Ports an 127.0.0.1 gebunden oder hinter Reverse Proxy
- [ ] Fail2ban mit sshd-Jail und `backend = systemd` läuft
- [ ] unattended-upgrades aktiv, Neustart-Strategie festgelegt
- [ ] Zeitsynchronisation aktiv
- [ ] `ss -tulpn` geprüft, unnötige Dienste abgeschaltet
- [ ] Backup außerhalb des Anbieters eingerichtet und Wiederherstellung getestet
- [ ] Monitoring für Erreichbarkeit eingerichtet

## Häufige Fragen

### Reicht die Firewall des Anbieters nicht aus?

Manche Anbieter bieten eine vorgeschaltete Firewall im Kundenpanel. Sie ist eine gute zusätzliche Schicht, ersetzt aber keine Absicherung auf dem Server selbst. Schlüssel-Anmeldung, Updates und eine lokale Firewall brauchst du in jedem Fall.

### Was mache ich, wenn ich mich ausgesperrt habe?

Melde dich über die Web-Konsole (VNC) im Kundenpanel an. Sie funktioniert unabhängig von SSH und Firewall. Dort kannst du die Drop-in-Datei korrigieren, `sudo ufw disable` ausführen oder eine Fail2ban-Sperre aufheben. Für die Konsole brauchst du das Passwort deines Benutzers, deshalb ist ein starkes, aber bekanntes Passwort wichtig.

### Sollte ich root ein Passwort lassen?

Mit `PermitRootLogin no` ist root per SSH ohnehin gesperrt. Das Passwort ist dann nur noch an der Konsole relevant. Setze ein langes, zufälliges Passwort und bewahre es in deinem Passwortmanager auf, statt es zu löschen. So hast du im Notfall einen zweiten Weg.

### Ist ed25519 besser als RSA?

ed25519 ist aktueller Standard: kurze Schlüssel, schnelle Verarbeitung und keine Wahl der Schlüssellänge, bei der man etwas falsch machen kann. RSA mit mindestens 3072 Bit ist weiterhin sicher und nur nötig, wenn ein altes System ed25519 nicht unterstützt.

## Fazit

Die Grundabsicherung eines vServers dauert mit etwas Übung eine halbe Stunde. Schlüssel-Anmeldung, gesperrter root-Login, eine Firewall mit wenigen offenen Ports und automatische Sicherheitsupdates schließen die Lücken, über die die meisten automatisierten Angriffe laufen. Achte besonders auf das Zusammenspiel von Docker und UFW, denn dort entsteht der Eindruck von Schutz, wo keiner ist. Mit Backups und Monitoring hast du danach eine solide Basis, auf der du Anwendungen betreiben kannst.
