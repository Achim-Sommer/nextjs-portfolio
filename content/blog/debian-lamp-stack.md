---
title: 'LAMP-Stack unter Debian: Apache, MariaDB, PHP'
description: 'Apache2, MariaDB, PHP 8 und phpMyAdmin unter Debian installieren und einrichten. Schritt für Schritt mit allen Befehlen und Hinweisen zur Sicherheit.'
date: '2024-11-20'
lastModified: '2026-09-30'
tags: ['Linux', 'Webentwicklung']
featured: false
---

<Figure src="/img/blog/debian-lamp-stack/lamp-stack.webp" alt="LAMP-Stack unter Debian: Der Browser fragt Apache2 an, PHP 8 verarbeitet die Seite, MariaDB liefert Daten, zurück kommt fertiges HTML" width={1600} height={900} caption="Linux, Apache, MariaDB und PHP bilden die Schichten, über die jede Anfrage bis zur fertigen HTML-Seite läuft." />

## Voraussetzungen

- Ein Debian Linux Server in einer aktuellen, noch mit Sicherheitsupdates versorgten Version (Empfehlung: [ZAP-Hosting](https://zap-hosting.com/achim) bietet hochwertige Linux Server auch als [Lifetime-Option](/blog/zap-hosting-lifetime) an)
- Root-Zugriff auf den Server
- SSH-Client (zum Beispiel [Termius](https://termius.com), ein moderner, benutzerfreundlicher SSH-Client)

Falls du noch überlegst, welche Art von Server du für dein Projekt brauchst, hilft dir mein Vergleich [vServer oder Dedicated Server](/blog/vserver-vs-dedicated-server) bei der Entscheidung.

## Detaillierte Schritt-für-Schritt Anleitung

### 1. Vorbereitung und SSH-Verbindung

1. Lade dir [Termius](https://termius.com) herunter und installiere es. Termius ist ein moderner, benutzerfreundlicher SSH-Client, der für alle gängigen Betriebssysteme verfügbar ist.

2. Starte Termius und erstelle eine neue Verbindung:
   - Klicke in der linken Seitenleiste auf "Hosts"
   - In der oberen Leiste erscheint der Button "New Host", klicke darauf
   - Gib unter "Alias" einen Namen für deine Verbindung ein (z.B. "Mein Debian Server")
   - Trage unter "Address" die IP-Adresse oder Domain deines Servers ein
   - Gib unter "Username" deinen Benutzernamen ein (meist "root")
   - Wähle unter "Authentication" die Option "Password"
   - Gib dein Passwort ein
   - Klicke auf "Save", um die Verbindung zu speichern

3. Verbinde dich mit deinem Server:
   - Deine neue Verbindung erscheint nun in der Liste unter "Hosts"
   - Klicke auf den "Connect" Button oder doppelklicke auf den Eintrag
   - Termius wird nun automatisch eine SSH-Verbindung zu deinem Server herstellen

*Tipp: Termius bietet auch Features wie das Speichern mehrerer Verbindungen, Snippets für häufig verwendete Befehle und eine übersichtliche Verwaltung deiner SSH-Keys.*

### 2. System aktualisieren

4. Hole dir zuerst die neuesten Paketinformationen:
```bash
apt update
```

5. Bringe dann dein System auf den neuesten Stand:
```bash
apt upgrade -y
```

### 3. Benötigte Pakete installieren

6. Installiere nun alle Werkzeuge, die wir später brauchen werden:
```bash
apt install ca-certificates apt-transport-https lsb-release gnupg curl nano unzip -y
```

### 4. PHP 8 Repository hinzufügen

Debian liefert je nach Version eine bestimmte PHP-Version mit. Über die Paketquelle von Ondřej Surý (packages.sury.org) bekommst du auch neuere PHP-Versionen. Diese Anleitung nutzt PHP 8.4.

7. Füge die PHP-Paketquelle hinzu:
```bash
# Schlüssel-Paket herunterladen und installieren
curl -sSLo /tmp/debsuryorg-archive-keyring.deb https://packages.sury.org/debsuryorg-archive-keyring.deb
dpkg -i /tmp/debsuryorg-archive-keyring.deb

# Repository hinzufügen
echo "deb [signed-by=/usr/share/keyrings/debsuryorg-archive-keyring.gpg] https://packages.sury.org/php/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/php.list
```

8. Da wir eine neue Paketquelle hinzugefügt haben, hole dir die aktualisierten Paketinformationen:
```bash
apt update
```

### 5. Apache2 und PHP 8 installieren

9. Installiere Apache2:
```bash
apt install apache2 -y
```

10. Installiere PHP 8.4 und benötigte Module:
```bash
apt install php8.4 php8.4-cli php8.4-common php8.4-curl php8.4-gd php8.4-intl php8.4-mbstring php8.4-mysql php8.4-opcache php8.4-readline php8.4-xml php8.4-zip php8.4-bz2 libapache2-mod-php8.4 -y
```

Mit `php -v` prüfst du anschließend, ob die richtige Version aktiv ist.

### 6. MariaDB installieren und konfigurieren

11. Installiere MariaDB:
```bash
apt install mariadb-server mariadb-client -y
```

12. Jetzt kümmern wir uns um die Absicherung deiner MariaDB-Installation:

```bash
mariadb-secure-installation
```
- Bei der ersten Passwortabfrage: Drücke einfach Enter
- Bei der Frage zur Unix-Socket-Authentifizierung: Gib "n" ein
- Lege ein Root-Passwort fest
- Bestätige alle weiteren Fragen mit "Y"

Der Befehl hieß früher `mysql_secure_installation`. Auf aktuellen Debian-Versionen verwendest du den Namen mit `mariadb`.

### 7. phpMyAdmin installieren

13. Wechsle in das richtige Verzeichnis mit folgendem Befehl:
```bash
cd /usr/share
```

14. Lade dir phpMyAdmin herunter:
```bash
wget https://www.phpmyadmin.net/downloads/phpMyAdmin-latest-all-languages.zip -O phpmyadmin.zip
```

15. Entpacke das Archiv und lösche die Zip-Datei:
```bash
unzip phpmyadmin.zip
rm phpmyadmin.zip
mv phpMyAdmin-*-all-languages phpmyadmin
chmod -R 0755 phpmyadmin
```

16. Erstelle die Apache2-Konfiguration für phpMyAdmin:
```bash
nano /etc/apache2/conf-available/phpmyadmin.conf
```

17. Füge folgende Konfiguration ein:
```apache
# phpMyAdmin Apache configuration

Alias /phpmyadmin /usr/share/phpmyadmin

<Directory /usr/share/phpmyadmin>
    Options SymLinksIfOwnerMatch
    DirectoryIndex index.php
</Directory>

# Disallow web access to directories that don't need it
<Directory /usr/share/phpmyadmin/templates>
    Require all denied
</Directory>
<Directory /usr/share/phpmyadmin/libraries>
    Require all denied
</Directory>
<Directory /usr/share/phpmyadmin/setup/lib>
    Require all denied
</Directory>
```

18. Speichere die Datei (STRG + X, dann "Y", dann Enter)

19. Aktiviere die Konfiguration und lade Apache2 neu:
```bash
a2enconf phpmyadmin
systemctl reload apache2
```

20. Erstelle das temporäre Verzeichnis und setze die Berechtigungen:
```bash
mkdir /usr/share/phpmyadmin/tmp/
chown -R www-data:www-data /usr/share/phpmyadmin/tmp/
```

## Fertigstellung und Zugriff

Dein LAMP-Stack ist nun einsatzbereit!

- Das Web-Verzeichnis findest du unter `/var/www/html/`
- phpMyAdmin erreichst du unter `http://deine-domain.de/phpmyadmin`
- Logge dich in phpMyAdmin mit dem Benutzer "root" und deinem festgelegten Passwort ein

Der Stack ist eine gute Basis für viele PHP-Anwendungen. Wie du darauf ein CMS aufsetzt, zeige ich dir in meiner Anleitung [WordPress auf einem Linux-Server installieren](/blog/wordpress-installation-linux-server).

## Sicherheitshinweise

- Richte ein SSL-Zertifikat ein, zum Beispiel kostenlos mit Let's Encrypt und certbot, damit Passwörter nicht unverschlüsselt übertragen werden
- Lege für jede Anwendung einen eigenen Datenbankbenutzer an, statt überall "root" zu verwenden
- Schränke den Zugriff auf phpMyAdmin ein, etwa auf bestimmte IP-Adressen, oder deaktiviere die Konfiguration mit `a2disconf phpmyadmin`, wenn du sie nicht brauchst
- Spiele Updates regelmäßig mit `apt update && apt upgrade` ein

## Server-Empfehlung

Für diese Installation empfehle ich dir einen Linux-Server von [Zap-Hosting](https://zap-hosting.com/achim). Zap-Hosting bietet nicht nur hochwertige Server zu fairen Preisen, sondern auch die einzigartige Möglichkeit, Server als "Lifetime" Produkt zu erwerben. Das bedeutet, du zahlst nur einmal und kannst den Server dauerhaft nutzen!
