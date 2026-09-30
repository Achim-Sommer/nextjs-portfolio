---
title: 'WordPress auf eigenem Linux-Server installieren'
description: 'WordPress auf Debian oder Ubuntu installieren: LAMP-Stack, Datenbank, SSL-Zertifikat und Absicherung. Schritt für Schritt für den eigenen Server.'
date: '2024-11-27'
lastModified: '2026-09-30'
tags: ['Linux', 'Webentwicklung']
featured: false
---

## Einleitung

> **TL;DR**: Diese umfassende Anleitung zeigt dir Schritt für Schritt, wie du WordPress sicher und performant auf einem Linux-Server installierst.

### Warum dieser Leitfaden?

WordPress ist das beliebteste Content-Management-System weltweit:
- Über 40% aller Websites nutzen WordPress
- Höchste Flexibilität und Anpassungsmöglichkeiten
- SEO-freundliche Struktur
- Umfangreiche Plugin-Ökosystem

<Figure src="/img/blog/wordpress-installation-linux-server/wordpress-anfrage.webp" alt="WordPress-Seitenaufruf: Apache nimmt die HTTPS-Anfrage an, PHP führt Core, Theme und Plugins aus und fragt MariaDB nach den Inhalten" width={1600} height={900} caption="Bei jedem Seitenaufruf baut WordPress die HTML-Seite aus Datenbankinhalten zusammen, Medien kommen direkt aus wp-content/uploads." />

## Voraussetzungen

### Hardware
- Linux-Server (Debian/Ubuntu)
- Mindestens 1 GB RAM
- 10 GB Speicherplatz
- SSH-Zugriff

### Empfohlener Server
[ZAP-Hosting Lifetime-Server](https://zap-hosting.com/vserverhomepage) bietet:
- Kostengünstige Optionen
- Unbegrenzte Nutzungsdauer
- Perfekt für WordPress-Hosting

### Benötigte Software
- Apache2
- MySQL/MariaDB
- PHP 8.x
- Curl
- Wget

## LAMP-Stack Installation

### Systemaktualisierung
```bash
sudo apt update
sudo apt upgrade -y
```

### Apache2 Installation
```bash
sudo apt install apache2 -y
sudo systemctl enable apache2
sudo systemctl start apache2
```

### PHP Installation
Installiere PHP mit den Modulen, die WordPress braucht. Die Pakete ohne Versionsnummer funktionieren unter Debian und Ubuntu gleichermaßen und installieren die PHP-Version deiner Distribution:
```bash
sudo apt install php libapache2-mod-php php-mysql php-xml php-curl php-gd php-imagick php-mbstring php-intl php-zip php-soap -y
php -v
```

Brauchst du unter Debian eine neuere PHP-Version als die mitgelieferte, zeige ich dir in meiner Anleitung zum [LAMP-Stack unter Debian](/blog/debian-lamp-stack), wie du dafür eine zusätzliche Paketquelle einbindest.

### MariaDB Installation
```bash
sudo apt install mariadb-server mariadb-client -y
sudo mariadb-secure-installation
```

## Datenbank-Vorbereitung

### Datenbank und Benutzer erstellen
```bash
sudo mariadb
```

Führe in der MariaDB-Konsole aus:
```sql
CREATE DATABASE wordpress;
CREATE USER 'wpuser'@'localhost' IDENTIFIED BY 'sicheres_passwort';
GRANT ALL PRIVILEGES ON wordpress.* TO 'wpuser'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

## WordPress Download und Installation

### WordPress herunterladen
```bash
cd /tmp
wget https://wordpress.org/latest.tar.gz
tar -xzvf latest.tar.gz
sudo mv wordpress /var/www/html/mywordpress
```

### Konfiguration
```bash
cd /var/www/html/mywordpress
cp wp-config-sample.php wp-config.php
nano wp-config.php
```

Passe Datenbank-Zugangsdaten an:
```php
define( 'DB_NAME', 'wordpress' );
define( 'DB_USER', 'wpuser' );
define( 'DB_PASSWORD', 'sicheres_passwort' );
```

Ersetze in derselben Datei außerdem die Platzhalter bei den Sicherheitsschlüsseln (`AUTH_KEY` und folgende). Frische Werte erzeugt dir der offizielle [Generator von WordPress.org](https://api.wordpress.org/secret-key/1.1/salt/).

### Berechtigungen setzen
```bash
sudo chown -R www-data:www-data /var/www/html/mywordpress
sudo chmod -R 755 /var/www/html/mywordpress
```

## Konfiguration und Sicherheit

### Apache Virtual Host
```bash
sudo nano /etc/apache2/sites-available/wordpress.conf
```

Konfiguriere Virtual Host:
```apache
<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    DocumentRoot /var/www/html/mywordpress
    ServerName example.com
    ServerAlias www.example.com

    <Directory /var/www/html/mywordpress>
        AllowOverride All
    </Directory>
</VirtualHost>
```

`AllowOverride All` erlaubt WordPress, eigene Regeln in der `.htaccess` abzulegen. Das ist zum Beispiel für sprechende Permalinks nötig.

Aktiviere anschließend die neue Seite und das Rewrite-Modul, deaktiviere die Standardseite von Apache und lade die Konfiguration neu:
```bash
sudo a2ensite wordpress.conf
sudo a2enmod rewrite
sudo a2dissite 000-default.conf
sudo systemctl reload apache2
```

Danach rufst du deine Domain im Browser auf und schließt die Installation im WordPress-Assistenten ab.

### SSL-Verschlüsselung mit Let's Encrypt
```bash
sudo apt install certbot python3-certbot-apache -y
sudo certbot --apache -d example.com -d www.example.com
```

### Zusätzliche Sicherheitsmaßnahmen
- Regelmäßige Updates
- Starke Passwörter
- Zwei-Faktor-Authentifizierung
- Sicherheits-Plugins
- Regelmäßige Backups von Dateien und Datenbank. Worauf es dabei ankommt, erkläre ich in meinem Artikel zur [Backup-Strategie](/blog/backup-strategie-mittelstand)

## Performance-Optimierung

### Caching-Konfiguration
- W3 Total Cache
- WP Super Cache
- Redis Object Cache

### Empfohlene Optimierungen
- PHP-FPM
- OPcache aktivieren
- CDN-Integration
- Minimierung von Plugins

## Häufige Probleme und Lösungen

### Fehlerbehandlung
- Überprüfe Apache-Logs: `sudo tail -f /var/log/apache2/error.log`
- PHP-Fehler anzeigen: `sudo nano /etc/php/VERSION/apache2/php.ini` (ersetze `VERSION` durch deine PHP-Version, etwa 8.3; `php -v` zeigt sie dir an)

### Troubleshooting
- Berechtigungsprobleme
- Datenbank-Verbindungsfehler
- Performance-Engpässe

## Fazit

WordPress auf einem Linux-Server zu installieren erfordert Sorgfalt und Verständnis. Mit diesem Leitfaden hast du:
- Eine sichere WordPress-Installation
- Optimierte Performance
- Vollständige Kontrolle über deine Webseite

## Weiterführende Ressourcen
- [vServer oder Dedicated Server: Welcher Server passt zu dir?](/blog/vserver-vs-dedicated-server)
- [Docker auf Linux installieren](/blog/docker-installation-linux)
- [LAMP-Stack unter Debian einrichten](/blog/debian-lamp-stack)
