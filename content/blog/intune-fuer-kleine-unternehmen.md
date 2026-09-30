---
title: 'Microsoft Intune für kleine Unternehmen'
description: 'Mit Microsoft Intune verwaltest du Windows-PCs und Smartphones zentral aus der Cloud. Der Leitfaden zeigt den Einstieg Schritt für Schritt.'
date: '2026-09-30'
lastModified: '2026-09-30'
tags: ['Microsoft 365', 'IT-Administration', 'IT-Sicherheit']
featured: false
---

Microsoft Intune ist die Geräteverwaltung aus der Microsoft-Cloud. Dieser Leitfaden richtet sich an kleine Unternehmen und IT-Verantwortliche, die ihre Windows-PCs und Smartphones zentral verwalten wollen, ohne eigene Server dafür zu betreiben. Du erfährst, was du voraussetzen musst, welche Richtlinien am Anfang wichtig sind und in welcher Reihenfolge du die Einführung angehst.

## Was ist Microsoft Intune?

Intune ist ein Cloud-Dienst für Endpoint Management. Er deckt zwei Bereiche ab: Mobile Device Management (MDM), also die Verwaltung ganzer Geräte, und Mobile Application Management (MAM), also den Schutz von Firmendaten innerhalb einzelner Apps. Verwaltet werden Windows, macOS, iOS, iPadOS und Android. Die Oberfläche dafür ist das Microsoft Intune Admin Center.

Benutzer und Gruppen kommen aus Microsoft Entra ID. Intune liefert den Gerätestatus zurück, und Conditional Access entscheidet auf dieser Grundlage über den Zugriff.

In der Praxis registrierst du mit Intune Geräte, verteilst Einstellungen, prüfst Mindeststandards (Compliance), installierst Apps, steuerst Windows-Updates und kannst Geräte aus der Ferne sperren oder zurücksetzen. Für kleine Unternehmen ersetzt Intune damit vieles, was früher Gruppenrichtlinien, WSUS und ein Softwareverteilungs-Tool erledigt haben.

<Figure src="/img/blog/intune-fuer-kleine-unternehmen/intune-ablauf.webp" alt="Intune-Ablauf: Ein Windows-Laptop wird per Autopilot und Entra Join registriert, Intune prüft Compliance, Conditional Access gibt M365 frei" width={1600} height={900} caption="Nur konforme Firmengeräte erhalten Zugriff auf Microsoft 365, private Smartphones werden über App-Schutzrichtlinien abgesichert." />

## Lizenz: Was du brauchst

Intune Plan 1 ist in Microsoft 365 Business Premium enthalten, ebenso in Microsoft 365 E3 und E5. Business Basic und Business Standard enthalten kein Intune. Für kleine Unternehmen ist Business Premium meist die passende Wahl, weil es zusätzlich Microsoft Entra ID P1 mitbringt.

Entra ID P1 brauchst du für die automatische MDM-Registrierung von Windows-Geräten und für Conditional Access. Einige Zusatzfunktionen aus der Intune Suite sind separat lizenziert.

## Voraussetzungen

- [ ] Lizenzen sind den Benutzern zugewiesen, die Geräte nutzen sollen.
- [ ] Die Geräte laufen mit Windows 11 Pro, Enterprise oder Education. Windows Home lässt sich nicht sinnvoll verwalten, und Windows 10 hat das Ende des regulären Supports bereits erreicht.
- [ ] Die Benutzer existieren in Microsoft Entra ID, entweder als reine Cloud-Konten oder synchronisiert aus dem lokalen Active Directory über Microsoft Entra Connect oder Cloud Sync.
- [ ] Die automatische MDM-Registrierung ist aktiviert, zu Beginn nur für eine Pilotgruppe.
- [ ] In den Entra-Geräteeinstellungen ist festgelegt, wer Geräte in Entra ID einbinden darf.
- [ ] Die zuständigen Admins haben die Rolle Intune Administrator, nicht automatisch Global Administrator.
- [ ] Für iPhones und iPads gibt es ein Apple-Push-Zertifikat (APNs), erstellt mit einer Apple-ID des Unternehmens, nicht mit einer privaten. Für firmeneigene Apple-Geräte kommt Apple Business Manager dazu.
- [ ] Für Android ist die Verbindung zu Managed Google Play eingerichtet.
- [ ] Eine Pilotgruppe steht fest: IT-Geräte plus einige Kollegen, die Rückmeldung geben.

## Geräte registrieren: Entra Join und Windows Autopilot

### Microsoft Entra Join

Beim Entra Join wird ein Windows-Gerät direkt in Microsoft Entra ID eingebunden statt in eine lokale Domäne. Benutzer melden sich mit ihrem Microsoft-365-Konto an. Ist die automatische MDM-Registrierung aktiv, landet das Gerät dabei gleich in Intune. Das geht bei der Ersteinrichtung von Windows oder nachträglich in den Windows-Einstellungen unter Konten im Bereich „Auf Arbeits- oder Schulkonto zugreifen“.

Mit lokalem Active Directory gibt es alternativ den Hybrid Join, für neue Geräte empfiehlt Microsoft aber Entra Join. Auf lokale Dateifreigaben kommen Benutzer trotzdem per Single Sign-on, sofern ihre Konten synchronisiert sind und das Gerät einen Domänencontroller erreicht. Bestehende Domänen-PCs lassen sich nicht einfach umhängen, der Wechsel erfordert meist ein Zurücksetzen. In der Praxis bietet sich dafür der reguläre Hardwaretausch an.

### Windows Autopilot

Mit Windows Autopilot geht ein neues Gerät direkt vom Händler zum Benutzer. Der schaltet es ein und meldet sich mit seinem Firmenkonto an. Das Gerät tritt Entra ID bei, registriert sich in Intune und bekommt Richtlinien und Apps, ganz ohne eigenes Image.

So richtest du Autopilot ein:

1. Geräte registrieren: Den Hardware-Hash lässt du vom Händler oder Hersteller hochladen, oder du liest ihn auf vorhandenen Geräten selbst aus und importierst ihn in Intune.
2. Ein Bereitstellungsprofil anlegen: benutzergesteuert, Entra Join, Benutzer als Standardbenutzer statt als lokaler Administrator.
3. Die Registrierungsstatusseite (Enrollment Status Page) konfigurieren, damit wichtige Apps und Richtlinien installiert sind, bevor der Benutzer arbeitet.
4. Mit einem echten Gerät testen, bevor du den Händler einbindest.

Den Hardware-Hash eines vorhandenen Geräts liest du mit dem offiziellen Skript aus:

```powershell
New-Item -Type Directory -Path C:\HWID -Force
Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned
$env:Path += ";C:\Program Files\WindowsPowerShell\Scripts"
Install-Script -Name Get-WindowsAutopilotInfo -Force
Get-WindowsAutopilotInfo -OutputFile C:\HWID\AutopilotHWID.csv
```

Neben dem klassischen Autopilot gibt es inzwischen Windows Autopilot Device Preparation, eine neuere Variante, die ohne vorherigen Import des Hardware-Hashs auskommt. Für den Einstieg reicht es, eine der beiden Varianten sauber umzusetzen.

## Compliance-Richtlinien

Compliance-Richtlinien legen Mindeststandards fest. Intune prüft jedes Gerät dagegen und markiert es als konform oder nicht konform. Dieser Status ist die Grundlage für Conditional Access.

Für Windows eignen sich für den Start:

| Einstellung | Empfehlung |
|---|---|
| BitLocker erforderlich | ja |
| Secure Boot erforderlich | ja |
| Firewall aktiv | ja |
| Microsoft Defender Antivirus aktiv | ja |
| Mindestversion des Betriebssystems | eine aktuell unterstützte Windows-11-Version |

- [ ] Aktionen bei Nichtkonformität festlegen, etwa eine Karenzzeit von einigen Tagen und eine E-Mail an den Benutzer.
- [ ] Beachten, dass Intune Geräte ohne zugewiesene Compliance-Richtlinie standardmäßig als konform behandelt. Stelle diese Einstellung auf nicht konform um, sobald alle Geräte eine Richtlinie haben.
- [ ] Einplanen, dass BitLocker und Secure Boot beim Systemstart geprüft werden. Nach der Verschlüsselung meldet ein Gerät den richtigen Status oft erst nach einem Neustart.
- [ ] Für Smartphones eigene Richtlinien anlegen: Mindestversion, Gerätesperre, kein Jailbreak oder Root.

## Konfigurationsprofile

Konfigurationsprofile verteilen Einstellungen auf die Geräte, ähnlich wie Gruppenrichtlinien. Für die meisten Fälle nutzt du den Einstellungskatalog. Sicherheitsrelevante Themen wie Virenschutz, Firewall und Verschlüsselung findest du zusätzlich im Bereich Endpunktsicherheit.

Ein sinnvolles Startpaket:

- [ ] Windows Hello for Business für die Anmeldung per PIN oder Biometrie
- [ ] Microsoft Defender Antivirus und Firewall
- [ ] BitLocker (siehe nächster Abschnitt)
- [ ] Windows LAPS: ein zufälliges Passwort für das lokale Admin-Konto pro Gerät, gesichert in Entra ID
- [ ] OneDrive mit automatischer Anmeldung und Umleitung von Desktop, Dokumenten und Bildern
- [ ] Regeln zur Verringerung der Angriffsfläche, zunächst im Überwachungsmodus

Microsoft stellt außerdem Sicherheitsbaselines bereit. Sie sind ein guter Ausgangspunkt, aber umfangreich: Prüfe sie vor der Zuweisung und konfiguriere jede Einstellung nur an einer Stelle. Widersprüchliche Werte in mehreren Profilen führen zu schwer auffindbaren Konflikten.

## BitLocker richtig einrichten

BitLocker verschlüsselt die Festplatte. Geht ein Laptop verloren, sind die Daten ohne Anmeldung oder Wiederherstellungsschlüssel nicht lesbar.

- [ ] BitLocker über eine Richtlinie im Bereich Endpunktsicherheit konfigurieren.
- [ ] Die stille Verschlüsselung einrichten, damit Benutzer nichts bestätigen müssen. Auf Geräten mit TPM und Entra Join ist das möglich, wenn die Einstellungen zusammenpassen.
- [ ] Festlegen, dass der Wiederherstellungsschlüssel in Entra ID gesichert wird, bevor die Verschlüsselung startet.
- [ ] Im Verschlüsselungsbericht und am Gerät prüfen, ob die Schlüssel tatsächlich hinterlegt sind, und den Abruf einmal testen.
- [ ] Bewusst entscheiden, ob Benutzer ihre eigenen Wiederherstellungsschlüssel selbst abrufen dürfen.

## Updates steuern mit Update-Ringen

Intune verteilt Windows-Updates nicht selbst, sondern steuert über Windows Update for Business, wann die Geräte sie direkt von Microsoft beziehen. Das zentrale Werkzeug sind Update-Ringe: Gerätegruppen, die Updates mit unterschiedlicher Verzögerung erhalten.

| Ring | Zielgruppe | Aufschub Qualitätsupdates (Beispiel) |
|---|---|---|
| Pilot | IT und einige erfahrene Benutzer | 0 Tage |
| Breit | alle übrigen Geräte | einige Tage |
| Vorsichtig (optional) | Geräte an Maschinen oder Kassen | etwas länger |

- [ ] Stichtage und eine Karenzzeit für Neustarts setzen. Ohne Stichtag schieben Benutzer den Neustart oft wochenlang vor sich her.
- [ ] Mit einer Richtlinie für Funktionsupdates festlegen, auf welcher Windows-11-Version die Geräte bleiben.
- [ ] Alte Update-Einstellungen aus Gruppenrichtlinien oder WSUS entfernen, damit sie nicht mit Intune konkurrieren.

## Apps bereitstellen

Für die ersten Wochen reicht ein überschaubarer Katalog: Microsoft 365 Apps, Browser, PDF-Reader, VPN-Client und die wichtigsten Fachanwendungen.

- **Microsoft 365 Apps:** eigener App-Typ in Intune. Du wählst Apps, Sprache und Updatekanal aus.
- **Microsoft Store-Apps:** viele gängige Programme lassen sich direkt aus dem Store zuweisen und werden automatisch aktualisiert.
- **Win32-Apps:** klassische Installer verpackst du mit dem Microsoft Win32 Content Prep Tool als .intunewin-Datei und hinterlegst Installationsbefehl, Deinstallationsbefehl und eine Erkennungsregel. Updates musst du selbst paketieren.

Bei der Zuweisung unterscheidest du zwischen erforderlich (wird automatisch installiert) und verfügbar (Benutzer installiert selbst aus dem Unternehmensportal).

## BYOD: Private Smartphones mit App-Schutzrichtlinien

Viele Mitarbeiter wollen Outlook und Teams auf dem privaten Smartphone nutzen, ohne ihr Gerät von der Firma verwalten zu lassen. Dafür gibt es App-Schutzrichtlinien (MAM). Intune verwaltet dabei nicht das Gerät, sondern schützt die Firmendaten innerhalb von Apps wie Outlook, Teams, OneDrive und Edge.

Typische Einstellungen:

- [ ] PIN oder Biometrie beim Öffnen von Firmen-Apps
- [ ] Kopieren und Einfügen nur zwischen verwalteten Apps
- [ ] Speichern nur in OneDrive oder SharePoint
- [ ] Keine Weitergabe von Firmendaten an private Apps
- [ ] Mindestversionen für Apps und Betriebssystem
- [ ] Sperre für Geräte mit Jailbreak oder Root

Verlässt jemand das Unternehmen, löschst du selektiv nur die Firmendaten aus den Apps, private Fotos und Apps bleiben unberührt. Auf Android muss für App-Schutzrichtlinien die Unternehmensportal-App installiert sein, das Gerät wird aber nicht registriert. Firmeneigene Smartphones registrierst du dagegen vollständig, bei Apple über Apple Business Manager, bei Android über Android Enterprise.

Wenn es einen Betriebsrat gibt, ist die Einführung von Intune in der Regel mitbestimmungspflichtig. Beziehe ihn und den Datenschutz früh ein und erkläre offen, was Intune sieht und was nicht.

## Zusammenspiel mit Conditional Access

Seine volle Wirkung entfaltet Intune erst mit Conditional Access. Intune meldet, ob ein Gerät konform ist, und Conditional Access macht daraus eine Zugriffsregel. Zwei Richtlinien bilden eine solide Basis:

- **Windows und macOS:** Zugriff auf Microsoft 365 nur mit konformem Gerät.
- **iOS und Android ohne Registrierung:** Zugriff nur über Apps mit App-Schutzrichtlinie.

Aktiviere beide zuerst im Modus Report-only, prüfe in den Anmeldeprotokollen, welche Zugriffe blockiert würden, und nimm die Break-Glass-Konten aus. Teste auch andere Browser als Edge: Manche brauchen zusätzliche Einstellungen oder Erweiterungen, um den Gerätestatus zu übermitteln. Wie du Conditional Access und die übrigen Sicherheitseinstellungen aufbaust, steht in der Checkliste [Microsoft 365 Tenant absichern](/blog/microsoft-365-tenant-absichern).

<Tip title="PRAXIS-TIPP">Schalte die Conditional-Access-Richtlinie für konforme Geräte erst scharf, wenn alle betroffenen Geräte registriert und konform sind. Sonst sperrst du Kollegen aus, deren Laptop einfach noch nicht an der Reihe war.</Tip>

## Typische Fehler beim Start

| Fehler | Besser |
|---|---|
| Richtlinien sofort allen Benutzern zuweisen | erst Pilotgruppe, dann Rollout in Wellen |
| Benutzer bleiben nach Entra Join lokale Administratoren | Standardbenutzer im Autopilot-Profil und in den Entra-Geräteeinstellungen, Windows LAPS für den Notfall |
| Gruppenrichtlinien, WSUS und Intune steuern dieselben Einstellungen | eine Quelle pro Einstellung, alte GPOs abbauen |
| Dieselbe Einstellung in mehreren Profilen | klare Profilstruktur, Einstellungskatalog bevorzugen |
| APNs-Zertifikat mit privater Apple-ID oder abgelaufen | Firmen-Apple-ID, jährliche Erneuerung mit derselben ID, sonst müssen alle Apple-Geräte neu registriert werden |
| Geräte ohne Richtlinie gelten dauerhaft als konform | Standardeinstellung nach dem Rollout umstellen |
| Benutzer werden nicht informiert | kurze Anleitung und fester Ansprechpartner |

## Sinnvolle Reihenfolge für die Einführung

1. **Grundlagen:** Lizenzen, Admin-Rollen, MDM-Registrierung für die Pilotgruppe, Entra-Geräteeinstellungen, Namenskonvention und Gruppen.
2. **Windows-Pilot:** IT-Geräte per Entra Join registrieren, Compliance-Richtlinie, BitLocker, Defender, Firewall, Windows LAPS, Windows Hello und Update-Ringe zuweisen.
3. **Apps:** Microsoft 365 Apps, Browser und die wichtigsten Anwendungen bereitstellen.
4. **Autopilot:** Bereitstellungsprofil und Registrierungsstatusseite einrichten, ein neues Gerät komplett durchspielen.
5. **Smartphones:** App-Schutzrichtlinien für private Geräte, Registrierung für Firmengeräte.
6. **Conditional Access:** Richtlinien im Modus Report-only testen, dann für die Pilotgruppe aktivieren.
7. **Rollout in Wellen:** Abteilung für Abteilung, danach die Standardeinstellung für Geräte ohne Compliance-Richtlinie auf nicht konform stellen.
8. **Betrieb:** Compliance- und Update-Berichte regelmäßig prüfen, Apps aktualisieren, Richtlinien dokumentieren.

Denk auch an die Daten auf den Geräten: Mit der OneDrive-Ordnerumleitung liegen die wichtigen Dateien in der Cloud. Ein eigenes Backup der Microsoft-365-Daten ersetzt das aber nicht, dazu mehr im Artikel [Backup-Strategie für den Mittelstand](/blog/backup-strategie-mittelstand).

## Häufige Fragen

### Ist Intune in Microsoft 365 Business Standard enthalten?

Nein. Business Standard enthält kein Intune. Du brauchst Business Premium oder eine separate Intune-Lizenz, für automatische Registrierung und Conditional Access zusätzlich Entra ID P1.

### Brauche ich noch ein lokales Active Directory?

Für Intune nicht. Geräte lassen sich rein über Entra Join verwalten. Wenn Fachanwendungen oder Dateiserver noch ein lokales AD voraussetzen, funktioniert der Zugriff mit synchronisierten Konten trotzdem.

### Was mache ich, wenn ein Laptop verloren geht?

Dank BitLocker sind die Daten verschlüsselt. In Intune löst du das Zurücksetzen aus, das greift, sobald das Gerät online geht. Zusätzlich widerrufst du in Microsoft Entra die Sitzungen des Benutzers und änderst bei Bedarf sein Passwort.

## Fazit

Intune gibt auch kleinen Unternehmen eine zentrale Geräteverwaltung ohne eigene Server. Entscheidend ist ein kontrollierter Start: Pilotgruppe, wenige klare Richtlinien, dann Autopilot, App-Schutz für Smartphones und zuletzt Conditional Access. Wer diese Reihenfolge einhält, vermeidet ausgesperrte Benutzer und baut Schritt für Schritt einen sauberen Standard auf.
