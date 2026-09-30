---
title: 'Microsoft 365 Tenant absichern: Die Checkliste'
description: 'So sicherst du deinen Microsoft 365 Tenant ab: getrennte Admin-Konten, MFA, keine Legacy-Authentifizierung, E-Mail-Schutz und ein eigenes Backup.'
date: '2026-09-30'
lastModified: '2026-09-30'
tags: ['Microsoft 365', 'IT-Sicherheit', 'IT-Administration']
featured: false
---

Ein neuer Microsoft 365 Tenant funktioniert sofort, ist aber nicht automatisch sicher konfiguriert. Diese Checkliste richtet sich an Admins und IT-Verantwortliche in kleinen und mittleren Unternehmen, die ihren Tenant systematisch härten wollen. Sie geht die wichtigen Bereiche in einer sinnvollen Reihenfolge durch: Admin-Konten, MFA, E-Mail-Schutz, Freigaben, Protokollierung und Backup.

<Figure src="/img/blog/microsoft-365-tenant-absichern/schutzschichten.webp" alt="Sechs Schutzschichten für Microsoft 365: Identitäten mit MFA, Geräte mit Intune, E-Mail mit DMARC, Datenfreigaben, Überwachung und Backup" width={1600} height={900} caption="Ein sicherer Microsoft 365 Tenant entsteht aus mehreren Schichten, die wichtigste davon ist die Absicherung der Identitäten." />

## Bevor du anfängst: Lizenzen klären

Viele Schutzfunktionen hängen an der Lizenz. Kläre deshalb zuerst, was in deinem Tenant vorhanden ist.

| Funktion | Lizenzvoraussetzung |
|---|---|
| Security Defaults | in jedem Tenant ohne Zusatzkosten |
| Conditional Access | Microsoft Entra ID P1, z. B. enthalten in Microsoft 365 Business Premium, E3 und E5 |
| Privileged Identity Management (PIM) | Microsoft Entra ID P2, z. B. enthalten in Microsoft 365 E5 |
| Microsoft Defender for Office 365 Plan 1 | enthalten in Microsoft 365 Business Premium |
| Microsoft Intune | enthalten in Microsoft 365 Business Premium, E3 und E5 |

Für Unternehmen bis 300 Benutzer ist Microsoft 365 Business Premium meist die sinnvolle Basis. Mit Business Basic oder Business Standard fehlen dir Conditional Access und die Geräteverwaltung.

## 1. Admin-Konten absichern

Wer ein Konto mit der Rolle Global Administrator übernimmt, kontrolliert alles: Postfächer, Dateien, Benutzer und Sicherheitseinstellungen.

- [ ] Jeder Admin hat zwei Konten: ein normales für E-Mail und Alltag und ein separates nur für Verwaltungsaufgaben.
- [ ] Admin-Konten sind reine Cloud-Konten und werden nicht aus dem lokalen Active Directory synchronisiert. Wird das lokale AD kompromittiert, bleibt der Tenant so geschützt.
- [ ] Admin-Konten haben kein Postfach. Wer kein Postfach hat, bekommt auch keine Phishing-Mails.
- [ ] Rollen nach dem Prinzip der geringsten Rechte vergeben: Für die Benutzerverwaltung reicht User Administrator, für Postfächer Exchange Administrator, für den Support Helpdesk Administrator.
- [ ] Die Zahl der Global Administrators klein halten: mindestens zwei, laut Microsoft-Empfehlung aber weniger als fünf.
- [ ] Rollenzuweisungen mindestens quartalsweise überprüfen und Konten ehemaliger Mitarbeiter und Dienstleister sofort entfernen.

### Break-Glass-Konten einrichten

Ein Break-Glass-Konto ist ein Notfallzugang für den Fall, dass die normalen Admin-Anmeldungen nicht mehr funktionieren, etwa nach einer falsch konfigurierten Conditional-Access-Richtlinie oder bei einer Störung des MFA-Dienstes.

- [ ] Zwei Notfallkonten als reine Cloud-Konten auf der .onmicrosoft.com-Domain des Tenants anlegen, nicht auf deiner eigenen Domain.
- [ ] Beide Konten dauerhaft als Global Administrator zuweisen.
- [ ] Die Konten mit FIDO2-Sicherheitsschlüsseln schützen. Microsoft erzwingt inzwischen MFA für die Anmeldung an den Admin-Portalen, ein reines Passwort reicht also nicht mehr.
- [ ] Die Notfallkonten von Conditional-Access-Richtlinien ausnehmen.
- [ ] Anmeldedaten und Schlüssel getrennt und physisch sicher aufbewahren, zum Beispiel in einem Tresor, und den Ablauf im Notfallhandbuch dokumentieren.
- [ ] Jede Anmeldung dieser Konten überwachen und den Zugang etwa halbjährlich testen.

### PIM nutzen, falls lizenziert

Mit Microsoft Entra Privileged Identity Management (PIM) sind Admin-Rollen nicht dauerhaft aktiv. Ein Admin aktiviert seine Rolle bei Bedarf für eine begrenzte Zeit, optional mit Begründung und Genehmigung. PIM setzt Microsoft Entra ID P2 voraus, das in Business Premium nicht enthalten ist. Ohne P2 bleiben dir die Grundregeln: wenige Admins, getrennte Konten, passende Rollen und regelmäßige Überprüfung.

## 2. MFA für alle: Security Defaults oder Conditional Access

MFA für alle Konten ist die wirksamste Einzelmaßnahme. Offen ist nur, auf welchem Weg du sie umsetzt.

**Security Defaults** sind ein kostenloses Grundpaket, das Microsoft in neueren Tenants standardmäßig aktiviert. Sie erzwingen die MFA-Registrierung für alle Benutzer, verlangen von Administratoren MFA und blockieren Legacy-Authentifizierung. Stellschrauben gibt es kaum: keine Ausnahmen, keine Bedingungen nach Gerät oder Standort, keine stärkeren Methoden für Admins.

**Conditional Access** (bedingter Zugriff) prüft bei jeder Anmeldung Bedingungen wie Benutzer, Anwendung, Gerät oder Standort und erlaubt den Zugriff, verlangt MFA oder blockiert. Dafür brauchst du Microsoft Entra ID P1. Beide Varianten schließen sich aus: Bevor du Richtlinien aktivierst, musst du die Security Defaults abschalten. Plane den Wechsel so, dass keine ungeschützte Lücke entsteht.

Eine sinnvolle Grundausstattung für KMU:

| Richtlinie | Zweck |
|---|---|
| MFA für alle Benutzer und alle Anwendungen | Basisschutz gegen gestohlene Passwörter |
| Legacy-Authentifizierung blockieren | schließt Protokolle, die kein MFA können |
| Phishingresistente MFA für Admin-Rollen | stärkster Schutz für die wichtigsten Konten |
| Registrierung von Sicherheitsinformationen absichern | ein Angreifer mit Passwort soll keine eigene MFA-Methode hinterlegen können |
| Konformes Gerät verlangen | Zugriff nur von verwalteten Geräten, setzt Intune voraus |

- [ ] Neue Richtlinien immer zuerst im Modus Report-only laufen lassen und die Auswirkungen in den Anmeldeprotokollen prüfen.
- [ ] Break-Glass-Konten in jeder Richtlinie ausnehmen.
- [ ] Ausnahmen über Gruppen steuern, nicht über einzelne Benutzer, und jede Ausnahme dokumentieren.

<Tip title="PRAXIS-TIPP">Kläre vor jeder neuen Conditional-Access-Richtlinie, wie du wieder in den Tenant kommst, falls sie dich aussperrt. Ein getestetes Break-Glass-Konto ist die Voraussetzung dafür, überhaupt mit Richtlinien zu arbeiten.</Tip>

## 3. Legacy-Authentifizierung abschalten

Legacy-Authentifizierung meint ältere Verfahren wie POP3, IMAP oder SMTP AUTH mit Basic Authentication. Benutzername und Passwort werden direkt übertragen, MFA ist technisch nicht möglich. Ein Angreifer mit gültigem Passwort umgeht so jede MFA-Richtlinie. Microsoft hat Basic Authentication für die meisten Exchange-Online-Protokolle bereits abgeschaltet, die Prüfung lohnt sich trotzdem.

- [ ] Eine Conditional-Access-Richtlinie blockiert Legacy-Clients, alternativ übernehmen das die Security Defaults.
- [ ] In den Anmeldeprotokollen von Microsoft Entra nach Client-App filtern und prüfen, ob noch Legacy-Anmeldungen auftauchen.
- [ ] SMTP AUTH für alle Postfächer deaktivieren, die es nicht brauchen.
- [ ] Für Multifunktionsgeräte und Fachanwendungen, die Mails versenden, moderne Alternativen nutzen, etwa einen Connector mit fester IP-Adresse oder SMTP mit OAuth. Den aktuellen Stand zur Abschaltung von Basic Authentication bei SMTP AUTH findest du im Message Center.

## 4. Phishingresistente Anmeldemethoden

Nicht jede MFA schützt gleich gut. SMS lassen sich per SIM-Swapping abfangen, Push-Benachrichtigungen verleiten zum gedankenlosen Bestätigen. Moderne Phishing-Seiten, die sich zwischen Benutzer und Microsoft schalten, greifen sogar bestätigte Anmeldungen ab. Dagegen helfen nur phishingresistente Verfahren.

| Methode | Einordnung |
|---|---|
| SMS, Sprachanruf | schwach, nur als Übergangslösung |
| Microsoft Authenticator mit Push und Number Matching | solide Basis für die meisten Benutzer |
| Passkeys (FIDO2) auf Sicherheitsschlüssel oder im Microsoft Authenticator | phishingresistent |
| Windows Hello for Business | phishingresistent, an das Gerät gebunden |

- [ ] Microsoft Authenticator als Standardmethode ausrollen. Number Matching ist bei Push-Benachrichtigungen fest aktiv: Der Benutzer tippt eine Zahl vom Anmeldebildschirm in die App ein.
- [ ] SMS und Sprachanruf in der Richtlinie für Authentifizierungsmethoden deaktivieren, sobald alle Benutzer eine bessere Methode registriert haben.
- [ ] Admins mit FIDO2-Sicherheitsschlüsseln oder Passkeys ausstatten und das in Conditional Access über eine Authentifizierungsstärke erzwingen.
- [ ] Für Ersteinrichtung und verlorene Smartphones den befristeten Zugriffspass (Temporary Access Pass) nutzen, statt MFA vorübergehend abzuschalten.
- [ ] Benutzer schulen: Eine unerwartete MFA-Anfrage bedeutet, dass jemand das Passwort kennt. Ablehnen und die IT informieren.

## 5. E-Mail-Schutz: SPF, DKIM, DMARC und Defender

Zwei Ziele: Niemand soll Mails im Namen deiner Domain fälschen können, und gefährliche Mails sollen gar nicht erst im Postfach landen.

### SPF, DKIM und DMARC

- **SPF** legt fest, welche Server im Namen deiner Domain Mails versenden dürfen.
- **DKIM** signiert ausgehende Mails, der Empfänger prüft die Signatur mit einem öffentlichen Schlüssel aus deinem DNS.
- **DMARC** verknüpft beide Prüfungen, legt fest, was mit durchgefallenen Mails passiert, und liefert dir Berichte.

Beispiel für eine Domain, die ausschließlich über Microsoft 365 versendet:

```text
example.de.         TXT  "v=spf1 include:spf.protection.outlook.com -all"
_dmarc.example.de.  TXT  "v=DMARC1; p=none; rua=mailto:dmarc-reports@example.de"
```

- [ ] SPF vollständig halten: Newsletter-Tool, CRM, ERP und Scanner gehören hinein, wenn sie mit deiner Domain versenden. SPF erlaubt höchstens zehn DNS-Abfragen.
- [ ] DKIM für jede eigene Domain im Microsoft Defender Portal aktivieren. Die Werte für die zwei nötigen CNAME-Einträge zeigt dir das Portal an.
- [ ] DMARC mit p=none starten. Das schützt noch nicht, liefert aber Berichte darüber, wer mit deiner Domain versendet. Nach einigen Wochen Auswertung schrittweise auf p=quarantine und p=reject erhöhen.
- [ ] Domains ohne Mailversand ebenfalls absichern: SPF mit v=spf1 -all und DMARC mit p=reject.

### Microsoft Defender for Office 365

Jeder Exchange-Online-Tenant hat mit Exchange Online Protection einen Basisschutz gegen Spam und Malware. Defender for Office 365 Plan 1 ergänzt unter anderem Safe Links (Prüfung von Links beim Anklicken), Safe Attachments (Prüfung von Anhängen in einer isolierten Umgebung) und einen erweiterten Schutz gegen Identitätswechsel.

- [ ] Die voreingestellten Sicherheitsrichtlinien Standard oder Strict nutzen, statt alles einzeln zu konfigurieren.
- [ ] Den Schutz vor Identitätswechsel für Geschäftsführung, Buchhaltung und eigene Domains konfigurieren.
- [ ] Automatische Weiterleitungen an externe Adressen unterbinden. Eine Weiterleitungsregel nach außen ist ein typisches Muster nach einer Kontoübernahme.
- [ ] Externe Absender in Outlook kennzeichnen und Benutzern das Melden verdächtiger Mails ermöglichen. Jemand muss diese Meldungen auch auswerten.

## 6. Externe Freigaben in SharePoint, OneDrive und Teams

Die Freigabeeinstellungen sind in vielen Tenants offener als nötig. SharePoint kennt vier Stufen, die du organisationsweit und pro Website setzen kannst: Jeder (Links ohne Anmeldung), neue und vorhandene Gäste, nur vorhandene Gäste sowie nur Personen in deiner Organisation.

- [ ] Anonyme Links (Jeder) organisationsweit deaktivieren. Wenn sie fachlich nötig sind, nur mit Ablaufdatum und Leserechten erlauben.
- [ ] Als Standard-Linktyp Bestimmte Personen oder Nur Personen in deiner Organisation festlegen.
- [ ] Freigaben pro Website steuern: Interne Websites brauchen meist gar keine externe Freigabe. OneDrive kann dabei nie offener sein als die Organisationseinstellung von SharePoint.
- [ ] Bei Bedarf externe Freigaben auf bestimmte Partnerdomains beschränken.
- [ ] In Teams den externen Zugriff (Chat mit anderen Organisationen) und den Gastzugriff (Externe als Teammitglied) getrennt bewerten.
- [ ] Die Kommunikation mit privaten Teams-Konten abschalten, wenn niemand sie braucht. Externe Teams-Chats werden inzwischen gezielt für Phishing genutzt.

## 7. Gastzugriffe kontrollieren

Gastkonten sind praktisch für die Zusammenarbeit, bleiben aber oft aktiv, obwohl das Projekt längst vorbei ist.

- [ ] Festlegen, wer Gäste einladen darf. Sinnvoll ist eine Beschränkung auf Mitglieder oder bestimmte Rollen, nicht auf alle Benutzer inklusive Gäste.
- [ ] Die Verzeichnisrechte von Gästen einschränken, damit sie nicht alle Benutzer und Gruppen einsehen können.
- [ ] Auch von Gästen per Conditional Access MFA verlangen.
- [ ] Inaktive Gäste regelmäßig entfernen. Mit Entra ID P2 oder Entra ID Governance geht das über Zugriffsüberprüfungen, sonst per Bericht und manueller Prüfung, zum Beispiel quartalsweise.
- [ ] Jedes Team mit Gästen braucht einen internen Besitzer, der für diese Gäste verantwortlich ist.

## 8. Audit-Log, Warnungen und Anmeldeprotokolle

Wenn etwas passiert, brauchst du Spuren. Und du willst davon erfahren, bevor ein Kunde dich auf merkwürdige Mails aus deinem Unternehmen anspricht.

- [ ] Prüfen, ob die Überwachungsprotokollierung (Audit) in Microsoft Purview aktiv ist. Meist ist sie standardmäßig eingeschaltet, verlassen solltest du dich darauf nicht.
- [ ] Die Aufbewahrung kennen: Audit (Standard) hält Einträge 180 Tage. Die Anmeldeprotokolle in Microsoft Entra sind je nach Lizenz nur 7 oder 30 Tage verfügbar. Für längere Zeiträume exportierst du sie in einen Log-Analytics-Arbeitsbereich oder ein SIEM.
- [ ] Die Standard-Warnungsrichtlinien prüfen und festlegen, wer die Benachrichtigungen erhält. Ein Alarm, den niemand liest, ist wertlos.
- [ ] Eigene Warnungen ergänzen, etwa für Anmeldungen der Break-Glass-Konten, neue Global-Admin-Zuweisungen und neue Weiterleitungsregeln.

Den Status des Audit-Logs prüfst du per PowerShell:

```powershell
Connect-ExchangeOnline
Get-AdminAuditLogConfig | Format-List UnifiedAuditLogIngestionEnabled
```

## 9. Microsoft Secure Score als Kompass

Secure Score im Microsoft Defender Portal bewertet deine Konfiguration und schlägt Maßnahmen vor, sortiert nach Wirkung. Arbeite die Empfehlungen nicht blind ab: Manche passen nicht zu deinem Betrieb oder setzen Lizenzen voraus, die du nicht hast. Bewusst akzeptierte Risiken markierst du mit Begründung. Ein plötzlicher Rückgang im Verlauf weist oft auf geänderte Einstellungen hin. Und ein hoher Wert bedeutet nicht automatisch Sicherheit, denn der Score misst Konfiguration, nicht Verhalten.

## 10. Geräte einbeziehen

Ein sauber abgesichertes Konto hilft wenig, wenn es auf einem ungepatchten Laptop ohne Verschlüsselung genutzt wird. Mit Microsoft Intune setzt du Mindeststandards wie Verschlüsselung, Updates und Virenschutz durch und koppelst den Zugriff über Conditional Access an konforme Geräte. Wie du dabei vorgehst, beschreibt der Leitfaden [Microsoft Intune für kleine Unternehmen](/blog/intune-fuer-kleine-unternehmen).

## 11. Backup: Deine Daten sind deine Verantwortung

Microsoft betreibt die Plattform und sorgt für Verfügbarkeit und redundante Speicherung. Für deine Daten und deren Wiederherstellung nach versehentlichem Löschen, Ransomware oder einem böswilligen Admin bist du selbst verantwortlich. Das ist das Prinzip der geteilten Verantwortung (Shared Responsibility).

| Eingebauter Mechanismus | Grenze |
|---|---|
| Papierkorb in SharePoint und OneDrive | 93 Tage |
| Wiederherstellbare Elemente in Exchange Online | standardmäßig 14 Tage, maximal 30 Tage |
| Gelöschte Benutzerkonten in Microsoft Entra | 30 Tage wiederherstellbar |
| Aufbewahrungsrichtlinien in Microsoft Purview | bewahren Daten auf, ersetzen aber keine einfache Wiederherstellung |

- [ ] Exchange Online, OneDrive, SharePoint und Teams sichern, mit Microsoft 365 Backup oder einer Lösung eines Drittanbieters.
- [ ] Sicherstellen, dass ein kompromittiertes Admin-Konto das Backup nicht mitlöschen kann, etwa durch unveränderliche Kopien und getrennte Zugangsdaten.
- [ ] Die Wiederherstellung regelmäßig testen, für einzelne Dateien und komplette Postfächer.
- [ ] Die Tenant-Konfiguration (Conditional Access, Intune-Richtlinien, Freigabeeinstellungen) separat dokumentieren. Viele Backup-Lösungen sichern nur Inhalte.

Wie du das in eine Gesamtstrategie mit Servern und Clients einbettest, steht im Artikel [Backup-Strategie für den Mittelstand](/blog/backup-strategie-mittelstand).

## Die Checkliste in Kurzform

| Zeitpunkt | Maßnahmen |
|---|---|
| Sofort | Break-Glass-Konten, getrennte Admin-Konten, MFA für alle, Legacy-Authentifizierung blockieren |
| In den ersten Wochen | SPF, DKIM und DMARC, Defender-Voreinstellungen, Freigaben und Gäste einschränken, Warnungen einrichten |
| Mittelfristig | phishingresistente MFA für Admins, Geräteverwaltung mit Intune, Backup der M365-Daten |
| Laufend | Secure Score, Anmeldeprotokolle, Rollen und Gäste überprüfen, Restore-Tests |

## Häufige Fragen

### Reichen Security Defaults für ein kleines Unternehmen?

Sie sind deutlich besser als gar keine MFA und ohne P1-Lizenz ein vernünftiger Start. Sobald du Ausnahmen, Gerätebedingungen oder phishingresistente MFA für Admins brauchst, führt kein Weg an Conditional Access vorbei.

### Ist Microsoft 365 nicht schon durch Microsoft gesichert?

Microsoft schützt die Plattform gegen Ausfälle, nicht deine Inhalte gegen Löschung oder Verschlüsselung durch einen Angreifer. Papierkörbe und Aufbewahrungsfristen sind begrenzt und kein Ersatz für ein eigenes Backup.

### Wie oft sollte ich die Einstellungen überprüfen?

Ein fester Termin pro Quartal hat sich bewährt: Rollen, Gäste, Freigaben, Secure Score und Conditional-Access-Ausnahmen durchgehen. Zusätzlich lohnt der regelmäßige Blick ins Message Center, weil Microsoft Standardwerte und Funktionen laufend ändert.

## Fazit

Die größte Wirkung haben die ersten Schritte: saubere Admin-Konten, Notfallzugänge, MFA für alle und blockierte Legacy-Authentifizierung. Darauf bauen E-Mail-Schutz, Freigaberegeln, Geräteverwaltung und ein eigenes Backup auf. Arbeite die Liste in dieser Reihenfolge ab und plane feste Termine für die Überprüfung ein, denn ein sicherer Tenant ist kein einmaliges Projekt.
