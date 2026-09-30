---
title: 'Backup-Strategie für den Mittelstand'
description: 'So planst du Backups im Mittelstand: 3-2-1-1-0-Regel, RPO und RTO, Schutz vor Ransomware, Microsoft 365 und regelmäßige Wiederherstellungstests.'
date: '2026-09-30'
lastModified: '2026-09-30'
tags: ['IT-Administration', 'IT-Sicherheit']
featured: false
---

Ein Backup-Job, der jede Nacht eine Erfolgsmeldung schickt, ist noch keine Backup-Strategie. Entscheidend ist, ob du nach einem Hardwaredefekt, einem versehentlichen Löschen oder einem Ransomware-Angriff deine Daten in vertretbarer Zeit zurückbekommst. Dieser Artikel zeigt, wie du in einem kleinen oder mittleren Unternehmen eine Sicherung aufbaust, die im Ernstfall trägt.

## Die 3-2-1-Regel als Grundlage

Die 3-2-1-Regel ist seit Jahren der Maßstab für jede Backup-Planung:

- **3 Kopien** deiner Daten: das Original und zwei Sicherungen.
- **2 verschiedene Speichermedien oder Speichersysteme**, zum Beispiel lokale Festplatten und zusätzlich Objektspeicher oder Band.
- **1 Kopie außer Haus**, damit Brand, Wasserschaden oder Diebstahl nicht alle Kopien gleichzeitig treffen.

Gegen Ransomware reicht das nicht: Ein Angreifer mit Administratorrechten erreicht oft auch die Kopie außer Haus, wenn sie online und mit denselben Zugangsdaten erreichbar ist.

### Die Erweiterung: 3-2-1-1-0

Deshalb hat sich eine erweiterte Form durchgesetzt:

| Ziffer | Bedeutung | Schützt vor |
|---|---|---|
| 3 | drei Kopien der Daten | Verlust einer einzelnen Kopie |
| 2 | zwei unterschiedliche Medien oder Systeme | Fehler eines Speichersystems |
| 1 | eine Kopie an einem anderen Standort | Brand, Wasser, Diebstahl |
| 1 | eine Kopie offline oder unveränderbar | Ransomware, böswilliges Löschen |
| 0 | null Fehler bei der Wiederherstellungsprüfung | Sicherungen, die sich nicht zurückspielen lassen |

Die zweite Eins heißt: Mindestens eine Kopie ist physisch getrennt (etwa ein Band im Tresor) oder technisch unveränderbar. Die Null bedeutet, dass du Wiederherstellungen regelmäßig prüfst und dabei keine Fehler auftreten. Ein nie getestetes Backup ist eine Annahme, kein Backup.

<Figure src="/img/blog/backup-strategie-mittelstand/3-2-1-1-0-regel.webp" alt="Die 3-2-1-1-0-Regel: drei Kopien, zwei Speichermedien, eine Kopie außer Haus, eine offline oder unveränderbar und null Fehler beim Restore" width={1600} height={900} caption="Die 3-2-1-1-0-Regel ergänzt das klassische 3-2-1-Prinzip um eine unveränderbare Kopie und geprüfte Wiederherstellungen." />

## RPO und RTO verständlich erklärt

**RPO (Recovery Point Objective)** beschreibt, wie viel Datenverlust maximal akzeptabel ist, gemessen in Zeit. Ein RPO von 24 Stunden bedeutet: Im schlimmsten Fall ist die Arbeit eines Tages verloren. Das RPO bestimmt, wie oft du sicherst.

**RTO (Recovery Time Objective)** beschreibt, wie lange ein System maximal ausfallen darf. Ein RTO von vier Stunden bedeutet: Vier Stunden nach dem Ausfall muss das System wieder nutzbar sein. Das RTO bestimmt, wie schnell die Wiederherstellung sein muss.

Ein Beispiel: Das ERP-System fällt um 16 Uhr aus, die letzte Sicherung stammt von 2 Uhr nachts. Damit sind 14 Stunden Buchungen verloren. Liegt dein RPO bei vier Stunden, passt die nächtliche Sicherung nicht.

Sinnvoll ist es, Systeme in Klassen einzuteilen:

| Klasse | Beispiele | RPO | RTO |
|---|---|---|---|
| Kritisch | ERP, Warenwirtschaft, Produktionssteuerung | 1 bis 4 Stunden | 4 bis 8 Stunden |
| Wichtig | Fileserver, Dokumentenmanagement | 24 Stunden | 1 Arbeitstag |
| Unkritisch | Archivdaten, Testsysteme | bis 1 Woche | mehrere Tage |

Die Werte sind Beispiele. Stimme sie mit Fachabteilungen und Geschäftsführung ab, denn kurze Werte kosten Geld.

## Was gesichert werden muss

### Server und virtuelle Maschinen

Virtuelle Maschinen sicherst du am besten image-basiert auf Ebene des Hypervisors. So kannst du eine komplette VM oder einzelne Dateien daraus wiederherstellen. Denk auch an die Hypervisor-Hosts, deren Konfiguration und an physische Server außerhalb der Virtualisierung. Bekannte Beispiele für image-basierte Backup-Lösungen sind Veeam, Acronis oder Proxmox Backup Server.

### Datenbanken

Achte bei Datenbanken auf anwendungskonsistente Sicherungen, unter Windows etwa per VSS für SQL Server. Für kurze RPO-Werte brauchst du zusätzlich Sicherungen der Transaktionsprotokolle (SQL Server) oder eine WAL-Archivierung (PostgreSQL).

### Clients

Auf Clients sollten keine unersetzlichen Daten liegen. Leite Desktop und Dokumente zum Beispiel über die OneDrive-Funktion zum Verschieben bekannter Ordner um und sichere dann OneDrive. Standard-Clients installierst du im Ernstfall neu, etwa über [Intune und Autopilot](/blog/intune-fuer-kleine-unternehmen). Ausnahmen wie Messrechner in der Produktion brauchen ein eigenes Image-Backup.

### Microsoft 365 und andere SaaS-Dienste

Exchange Online, SharePoint, OneDrive und Teams brauchen ein eigenes Backup, dazu weiter unten mehr. Dasselbe gilt für andere SaaS-Dienste wie CRM, Ticketsystem oder Buchhaltung. Kläre für jeden Dienst: Welche Exportmöglichkeiten gibt es, was sichert der Anbieter vertraglich zu und wie lange hält er gelöschte Daten vor?

### Konfigurationen von Firewall, Switches und Co.

Netzwerkgeräte werden gern vergessen, bis eine Firewall mit Hunderten Regeln neu aufgebaut werden muss. Exportiere die Konfigurationen regelmäßig und automatisiert, am besten versioniert. Dafür gibt es Werkzeuge wie Oxidized oder die Exportfunktionen der Hersteller.

Außerdem auf die Liste gehören:

- Active Directory inklusive Systemstatus, DNS und DHCP
- Zertifikate und private Schlüssel
- Lizenzschlüssel und Installationsmedien für Spezialsoftware
- der Tresor des Passwortmanagers als verschlüsselter Export
- Skripte, Automatisierungen und Container-Konfigurationen

Wenn du Anwendungen in Containern betreibst (Grundlagen in [Docker unter Linux installieren](/blog/docker-installation-linux)), sichere neben den Compose-Dateien vor allem die Volumes mit den eigentlichen Daten.

## Ransomware: Das Backup ist das erste Ziel

Angreifer bewegen sich oft Tage oder Wochen im Netz, bevor sie verschlüsseln, und suchen gezielt nach den Sicherungen, um den Druck zur Zahlung zu erhöhen. Dein Backup muss deshalb einen kompromittierten Domain-Admin überstehen.

### Unveränderbarer Speicher

Immutable Storage bedeutet: Einmal geschriebene Sicherungen lassen sich für einen festgelegten Zeitraum weder ändern noch löschen, auch nicht mit Administratorrechten. Übliche Umsetzungen sind:

- S3-kompatibler Objektspeicher mit Object Lock (im Compliance-Modus kann niemand die Sperre vorzeitig aufheben)
- gehärtete Linux-Repositories, bei denen die Backup-Software Dateien gegen Änderungen sperrt
- NAS-Systeme mit unveränderbaren Snapshots
- Bänder oder Wechselmedien, die nach dem Schreiben physisch getrennt werden

Plane die Aufbewahrung so, dass du auch bei einem erst nach Wochen entdeckten Angriff noch einen sauberen Stand hast.

### Getrennte Zugangsdaten und MFA

- Der Backup-Server gehört nicht in die Active-Directory-Domäne. Ein kompromittierter Domain-Admin darf keinen Zugriff auf die Sicherungen haben.
- Backup-Konsole und Backup-Speicher bekommen eigene Konten mit Passwörtern, die nirgendwo sonst verwendet werden.
- Die Anmeldung an der Backup-Konsole ist mit MFA geschützt.
- Zugangsdaten zum externen Speicher liegen nicht im Klartext auf Produktivsystemen.
- Bietet deine Lösung ein Vier-Augen-Prinzip für das Löschen von Sicherungen, aktiviere es.

### Backup-Netz trennen

Lege Backup-Server und Backup-Speicher in ein eigenes VLAN und erlaube per Firewall nur die Verbindungen, die für die Sicherung nötig sind. Die Verwaltungsoberflächen sollten nur aus einem Admin-Netz erreichbar sein. Wo möglich, holt der Backup-Server die Daten ab, statt dass Produktivsysteme selbst auf den Backup-Speicher schreiben dürfen.

<Tip title="PRAXIS-TIPP">
Stell dir eine einfache Frage: Wenn ein Angreifer heute Abend die Zugangsdaten eines Domain-Admins hat, welche Sicherungen kann er dann löschen? Lautet die ehrliche Antwort „alle“, ist das deine wichtigste Baustelle.
</Tip>

## Verschlüsselung

Sicherungen enthalten Personaldaten, Verträge und Kundendaten. Verschlüssele sie auf dem Transportweg und im Speicher, spätestens sobald sie das Haus verlassen. Gängige Backup-Lösungen bieten dafür Verfahren wie AES-256 an.

Der kritische Punkt ist der Schlüssel. Ohne ihn ist die Sicherung auch für dich wertlos. Bewahre ihn an mindestens zwei Orten auf, davon einer offline, etwa ausgedruckt in einem versiegelten Umschlag im Tresor. Der Passwortmanager allein reicht nicht, wenn er im Ernstfall selbst nicht erreichbar ist.

## Aufbewahrung nach dem Generationenprinzip

Die Sicherung von letzter Nacht hilft wenig, wenn ein Fehler erst nach drei Wochen auffällt. Das Generationenprinzip (Grandfather-Father-Son, kurz GFS) arbeitet deshalb mit abgestuften Fristen:

| Generation | Rhythmus | Beispiel für die Aufbewahrung |
|---|---|---|
| Sohn | täglich | 14 Tage |
| Vater | wöchentlich | 8 Wochen |
| Großvater | monatlich | 12 Monate |
| optional | jährlich | mehrere Jahre |

Die meisten Backup-Lösungen bilden GFS direkt ab.

Beachte dabei: Ein Backup ist kein Archiv. Gesetzliche Aufbewahrungspflichten, etwa nach HGB und Abgabenordnung, erfüllst du mit einem revisionssicheren Archiv, nicht mit Jahressicherungen.

## Microsoft 365 braucht ein eigenes Backup

Viele Unternehmen gehen davon aus, dass Microsoft ihre Daten sichert. Das stimmt nur zum Teil: Microsoft arbeitet nach dem Modell der geteilten Verantwortung (Shared Responsibility): Microsoft kümmert sich um Infrastruktur, Verfügbarkeit und Redundanz der Rechenzentren. Für die Daten selbst, die Konten und deren Schutz bist du verantwortlich.

Fällt bei Microsoft ein Rechenzentrum aus, sind deine Daten also weiter da. Löscht aber ein Mitarbeiter versehentlich einen Ordner, verschlüsselt eine Ransomware synchronisierte OneDrive-Dateien oder löscht ein Angreifer mit einem gekaperten Admin-Konto Postfächer, bleiben dir nur Papierkörbe und Aufbewahrungsfunktionen. Diese sind zeitlich begrenzt: Gelöschte Elemente in Exchange Online sind standardmäßig 14 Tage wiederherstellbar (auf 30 Tage erweiterbar), der Papierkorb von SharePoint und OneDrive hält Daten insgesamt 93 Tage. Aufbewahrungsrichtlinien aus Microsoft Purview sind ein Compliance-Werkzeug und nicht dafür gedacht, ganze Postfächer oder Websites schnell auf einen bestimmten Stand zurückzusetzen.

Ein eigenes Backup für Microsoft 365 sollte mindestens abdecken:

- Exchange Online mit Postfächern, Kalendern und freigegebenen Postfächern
- OneDrive und SharePoint-Websites
- Teams (Dateien liegen in SharePoint, Chats und Kanalnachrichten je nach Lösung)
- nach Möglichkeit die Konfiguration von Entra ID und Intune

Angeboten wird das von Microsoft selbst (Microsoft 365 Backup) und von Drittanbietern wie Veeam, AvePoint, Keepit oder Hornetsecurity. Achte bei der Auswahl darauf, wo die Sicherung liegt, wenn du die Regel mit dem zweiten Standort ernst nimmst. Wie du den Tenant selbst gegen Angriffe härtest, steht im Artikel [Microsoft 365 Tenant absichern](/blog/microsoft-365-tenant-absichern).

## Wiederherstellungstests

Die Null in 3-2-1-1-0 bekommst du nur durch Tests. Eine erfolgreiche Statusmeldung zeigt, dass Daten geschrieben wurden, nicht dass du sie zurückbekommst. Ein praxistauglicher Rhythmus:

- **Monatlich:** einzelne Dateien, ein Postfach und eine Datenbank stichprobenartig zurückspielen.
- **Vierteljährlich:** eine komplette VM in einem isolierten Netz starten und prüfen, ob die Anwendung funktioniert.
- **Jährlich:** den Ausfall mehrerer Kernsysteme durchspielen, etwa Active Directory, Datenbank und ERP, und die benötigte Zeit mit deinem RTO vergleichen.

Automatisierte Prüfungen ersetzen nicht den gelegentlichen Test mit einem Fachanwender, der die Daten auf Vollständigkeit prüft.

Protokolliere jeden Test mit Datum, System, Dauer und Ergebnis. Die DSGVO nennt in Artikel 32 ausdrücklich die Fähigkeit, Verfügbarkeit und Zugang zu personenbezogenen Daten nach einem Zwischenfall rasch wiederherzustellen, und ein Verfahren zur regelmäßigen Überprüfung der Maßnahmen.

## Dokumentation und Notfallhandbuch

Im Ernstfall ist der Fileserver mit der Dokumentation womöglich verschlüsselt. Zu jeder Backup-Strategie gehört deshalb ein Notfallhandbuch, das auch ausgedruckt vorliegt. Es sollte enthalten:

- Ansprechpartner intern und extern: Dienstleister, Hersteller-Support, Versicherung, Datenschutz
- eine Wiederanlaufreihenfolge, zum Beispiel Netzwerk, dann Active Directory und DNS, dann Datenbanken, dann Anwendungen
- wo welche Sicherungen liegen und wie du darauf zugreifst
- Anleitungen für die Wiederherstellung der wichtigsten Systeme
- Netzwerkplan, IP-Adressen und Lizenzinformationen
- den Aufbewahrungsort von Notfall-Zugangsdaten und Schlüsseln

Orientierung bieten der IT-Grundschutz des BSI mit dem Baustein CON.3 Datensicherungskonzept und der BSI-Standard 200-4 zum Business Continuity Management. Aktualisiere das Handbuch nach jeder größeren Änderung und prüfe es bei den Wiederherstellungstests mit.

## Typische Fehler

- **Synchronisation mit Backup verwechseln:** OneDrive oder Replikation übertragen auch Löschungen und verschlüsselte Dateien.
- **RAID als Backup betrachten:** RAID schützt vor dem Ausfall einer Platte, nicht vor Löschen oder Ransomware.
- **Backup-Server in der Domäne:** Wer die Domäne übernimmt, übernimmt auch die Sicherungen.
- **Fehlgeschlagene Jobs bleiben unbemerkt:** Die Berichte landen in einem Postfach, das niemand liest.
- **Neue Systeme fehlen:** Eine neue VM läuft seit Monaten, ist aber in keinem Backup-Job.
- **Aufbewahrung zu kurz:** Ein Fehler fällt erst auf, wenn alle sauberen Stände überschrieben sind.
- **Schlüssel verloren:** Die verschlüsselte Sicherung ist da, das Kennwort nicht.
- **Microsoft 365 vergessen:** Die Daten liegen in der Cloud, gesichert sind sie deshalb noch nicht.
- **Nie getestet:** Ob die Wiederherstellung funktioniert, zeigt sich erst im Ernstfall.

## Häufige Fragen

### Reicht ein NAS mit Snapshots als Backup?

Als eine von mehreren Kopien ja, als einzige Sicherung nein. Ein NAS im selben Gebäude und Netz ersetzt weder den zweiten Standort, noch ist es automatisch vor Angreifern geschützt. Mit unveränderbaren Snapshots und einer Kopie außer Haus ist es ein sinnvoller Baustein.

### Muss ich Microsoft 365 wirklich selbst sichern?

Ja. Microsoft sorgt für die Verfügbarkeit des Dienstes, nicht für die Wiederherstellbarkeit deiner Daten nach Löschung, Fehlbedienung oder Angriff. Die eingebauten Papierkörbe sind zeitlich begrenzt.

### Cloud-Backup oder eigene Hardware?

Beides hat seinen Platz. Lokale Sicherungen ermöglichen schnelle Wiederherstellungen und damit kurze RTO-Werte, eine Kopie in der Cloud oder einem zweiten Rechenzentrum deckt den Ausfall des Standorts ab. Oft ist die Kombination die praktikabelste Lösung.

## Fazit

Eine gute Backup-Strategie beginnt bei RPO, RTO und der Frage, was du sichern musst. Die 3-2-1-1-0-Regel gibt die Struktur vor, getrennte Zugangsdaten und unveränderbarer Speicher schützen vor Ransomware, und regelmäßige Tests zeigen, ob das Ganze funktioniert. Vergiss Microsoft 365 und die Netzwerkkonfigurationen nicht und halte alles in einem Notfallhandbuch fest, das auch ohne funktionierende IT greifbar ist.
