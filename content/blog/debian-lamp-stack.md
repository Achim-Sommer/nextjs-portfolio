---
title: 'Apache2, MariaDB, PHP 8 und phpMyAdmin unter Debian Linux installieren'
date: '2024-01-10'
description: 'Schritt-für-Schritt Anleitung: Installation und Konfiguration eines LAMP-Stacks (Linux, Apache2, MariaDB, PHP 8) mit phpMyAdmin auf Debian. Inklusive Sicherheitstipps und Fehlerbehebung.'
tags: ["Debian", "Linux", "Apache", "MariaDB", "PHP", "Server", "Web Development", "LAMP", "phpMyAdmin", "Tutorial"]
featured: false
---

# Apache2, MariaDB (MySQL), PHP 8 und phpMyAdmin unter Debian Linux installieren

## Voraussetzungen

- Ein Debian Linux Server (Empfehlung: [Zap-Hosting](https://zap-hosting.com/achim) bietet hochwertige Linux Server auch als Lifetime-Option an)
- Root-Zugriff auf den Server
- SSH-Client ([Termius](https://termius.com) - ein moderner, benutzerfreundlicher SSH-Client)

## Detaillierte Schritt-für-Schritt Anleitung

### 1. Vorbereitung und SSH-Verbindung

1. Lade dir [Termius](https://termius.com) herunter und installiere es. Termius ist ein moderner, benutzerfreundlicher SSH-Client, der für alle gängigen Betriebssysteme verfügbar ist.

2. Starte Termius und erstelle eine neue Verbindung:
   - Klicke in der linken Seitenleiste auf "Hosts"
   - In der oberen Leiste erscheint der Button "New Host" - klicke darauf
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

3. Hole dir zuerst die neuesten Paketinformationen:
```bash
apt update
```

4. Bringe dann dein System auf den neuesten Stand:
```bash
apt upgrade -y
```

### 3. Benötigte Pakete installieren

5. Installiere nun alle Werkzeuge, die wir später brauchen werden:
```bash
apt install ca-certificates apt-transport-https lsb-release gnupg curl nano unzip -y
```

### 4. PHP 8 Repository hinzufügen

6. Füge die PHP 8 Paketquelle hinzu:
```bash
# Key hinzufügen
curl -fsSL https://packages.sury.org/php/apt.gpg -o /usr/share/keyrings/php-archive-keyring.gpg

# Repository hinzufügen
echo "deb [signed-by=/usr/share/keyrings/php-archive-keyring.gpg] https://packages.sury.org/php/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/php.list
```

7. Da wir eine neue Paketquelle hinzugefügt haben, hole dir die aktualisierten Paketinformationen:
```bash
apt update
```

### 5. Apache2 und PHP 8 installieren

8. Installiere Apache2:
```bash
apt install apache2 -y
```

9. Installiere PHP 8.2 und benötigte Module:
```bash
apt install php8.2 php8.2-cli php8.2-common php8.2-curl php8.2-gd php8.2-intl php8.2-mbstring php8.2-mysql php8.2-opcache php8.2-readline php8.2-xml php8.2-xsl php8.2-zip php8.2-bz2 libapache2-mod-php8.2 -y
```

### 6. MariaDB installieren und konfigurieren

10. Installiere MariaDB:
```bash
apt install mariadb-server mariadb-client -y
```

11. Jetzt kümmern wir uns um die Absicherung deiner MariaDB-Installation:

**Für Debian 11 und neuer:**
```bash
mysql_secure_installation
```
- Bei der ersten Passwortabfrage: Drücke einfach Enter
- Bei der Frage zur Unix-Socket-Authentifizierung: Gib "n" ein
- Lege ein Root-Passwort fest
- Bestätige alle weiteren Fragen mit "Y"

**Für Debian 10 und älter:**
```bash
mysql_secure_installation
```
- Bei der ersten Passwortabfrage: Drücke einfach Enter
- Lege ein Root-Passwort fest
- Bestätige alle weiteren Fragen mit "Y"

### 7. phpMyAdmin installieren

12. Wechsle in das richtige Verzeichnis mit folgendem Befehl:
```bash
cd /usr/share
```

13. Lade dir phpMyAdmin herunter:
```bash
wget https://www.phpmyadmin.net/downloads/phpMyAdmin-latest-all-languages.zip -O phpmyadmin.zip
```

14. Entpacke das Archiv und lösche die Zip-Datei:
```bash
unzip phpmyadmin.zip
rm phpmyadmin.zip
mv phpMyAdmin-*-all-languages phpmyadmin
chmod -R 0755 phpmyadmin
```

15. Erstelle die Apache2-Konfiguration für phpMyAdmin:
```bash
nano /etc/apache2/conf-available/phpmyadmin.conf
```

16. Füge folgende Konfiguration ein:
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

17. Speichere die Datei (STRG + X, dann "Y", dann Enter)

18. Aktiviere die Konfiguration und lade Apache2 neu:
```bash
a2enconf phpmyadmin
systemctl reload apache2
```

19. Erstelle das temporäre Verzeichnis und setze die Berechtigungen:
```bash
mkdir /usr/share/phpmyadmin/tmp/
chown -R www-data:www-data /usr/share/phpmyadmin/tmp/
```

### 8. Root-Zugriff für phpMyAdmin einrichten (nur für Debian 10 und älter)

Wenn du Debian 10 oder älter verwendest, führe diese zusätzlichen Schritte aus:

```bash
mysql -u root
```

Führe in der MariaDB-Konsole aus:
```sql
UPDATE mysql.user SET plugin = 'mysql_native_password' WHERE user = 'root' AND plugin = 'unix_socket';
FLUSH PRIVILEGES;
exit;
```

## Fertigstellung und Zugriff

Dein LAMP-Stack ist nun einsatzbereit! 

- Das Web-Verzeichnis findest du unter `/var/www/html/`
- phpMyAdmin erreichst du unter `http://deine-domain.de/phpmyadmin`
- Logge dich in phpMyAdmin mit dem Benutzer "root" und deinem festgelegten Passwort ein

## Server-Empfehlung

Für diese Installation empfehle ich dir einen Linux-Server von [Zap-Hosting](https://zap-hosting.com/achim). Zap-Hosting bietet nicht nur hochwertige Server zu fairen Preisen, sondern auch die einzigartige Möglichkeit, Server als "Lifetime" Produkt zu erwerben - das bedeutet, du zahlst nur einmal und kannst den Server dauerhaft nutzen!
