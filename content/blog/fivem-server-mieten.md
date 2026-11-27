---
title: 'FiveM Server mieten: ESX, QBCore, RAM und Kosten'
description: 'FiveM Server mieten für GTA V Roleplay: ESX oder QBCore, Datenbank, txAdmin, Lizenzschlüssel und RAM-Bedarf. Mit Rechner und Schritten bis zum ersten Start.'
date: '2026-11-27'
lastModified: '2026-11-27'
tags: ['Gameserver', 'Server-Hosting']
featured: false
---

Ein FiveM Server ist mehr als ein Gameserver. Zu einem Roleplay-Projekt gehören ein Framework wie ESX oder QBCore, eine Datenbank, Dutzende Skripte und meist ein Team, das daran arbeitet. Der Server selbst ist dabei der kleinste Teil, aber er muss passen: genug RAM, eine schnelle CPU und eine Datenbank, die nah am Server liegt.

Dieser Guide zeigt, worauf du beim Mieten achten solltest und wie du nach der Bestellung zu einem lauffähigen Server kommst.

> **Kurz gesagt:** Einen FiveM Server gibt es bei ZAP-Hosting ab 5,29 € für 30 Tage, zum Testen ab 0,95 € für 3 Tage. Die Pakete richten sich nach dem Arbeitsspeicher: 2 GB für 5,29 €, 4 GB für 8,79 €, 8 GB für 14,99 € und 16 GB für 26,99 € je 30 Tage. Der Preis hängt vom Paket ab, nicht von der Spielerzahl. Mit dem Code `ZAPX-M26R79` sparst du 20% auf die Mietlaufzeiten, nicht auf die Lifetime-Option. Stand: 27. November 2026, die aktuellen Preise stehen bei ZAP-Hosting.

## Warum ein eigener FiveM Server?

Auf fremden Servern spielst du nach fremden Regeln. Mit einem eigenen Server bestimmst du alles selbst:

- Framework, Wirtschaft, Jobs und Fraktionen
- welche Fahrzeuge, Karten und Kleidung es gibt
- wer auf den Server darf, etwa per Whitelist über Discord
- Regeln, Team und Support

Das macht FiveM zu einem Projekt, das eher an Softwareentwicklung erinnert als an einen klassischen Gameserver. Entsprechend wichtig ist eine saubere Basis.

## Mieten oder selbst hosten?

Die Serversoftware von FiveM ist kostenlos und läuft auf Windows und Linux. Du kannst sie also auch auf einem eigenen vServer oder Rootserver betreiben. Dann installierst du Server, Datenbank und Updates selbst und bist für die Absicherung verantwortlich.

Ein gemieteter FiveM Server passt, wenn du

- schnell starten willst, ohne Server und Datenbank von Hand aufzusetzen,
- ein Panel für Start, Stopp, Dateien und Backups möchtest,
- dich auf Skripte und Inhalte konzentrieren willst statt auf die Administration.

Für große Projekte mit eigenem Entwicklerteam, Testserver und zusätzlichen Diensten ist ein vServer oder Dedicated Server oft die bessere Wahl. Den Unterschied erklärt der Vergleich [vServer oder Dedicated Server](/blog/vserver-vs-dedicated-server). Wer selbst hostet, sollte den Server von Anfang an härten: [Linux vServer absichern](/blog/linux-vserver-absichern).

## Worauf du beim FiveM Hosting achten solltest

### Framework: ESX oder QBCore

Die meisten Roleplay-Server bauen auf einem der beiden Frameworks auf. Beide liefern die Grundlagen wie Charaktere, Geld, Inventar und Jobs. Der wichtigste Unterschied für dich: Skripte sind in der Regel für ein bestimmtes Framework geschrieben. Die Entscheidung legt also fest, aus welchem Angebot an Skripten du später schöpfst. Ein Wechsel mitten im Projekt ist aufwendig.

Wenn du nicht bei null anfangen willst: Ich biete ein kostenloses ESX-Template an, mit dem du eine vorbereitete Basis bekommst. Du findest es auf der Seite zum [FiveM Template Server](/fivem-template-server).

### Datenbank

ESX und QBCore speichern Spieler, Fahrzeuge und Inventare in einer MySQL- oder MariaDB-Datenbank. Am besten läuft sie auf demselben Server oder zumindest im selben Rechenzentrum, denn jede Abfrage mit hoher Latenz bremst die Skripte. Prüfe vor der Bestellung, ob eine Datenbank im Paket enthalten ist.

### RAM

Die Spielerzahl ist bei FiveM nur ein Teil der Rechnung. Den größeren Anteil machen Skripte und Ressourcen aus. Die folgenden Werte stammen aus meinem [RAM-Rechner für FiveM](/server-ram-rechner/fivem) und enthalten 25 Prozent Puffer:

| Server | Spieler | Empfehlung |
| --- | --- | --- |
| FiveM ohne Framework | 32 | 8 GB |
| ESX oder QBCore | 32 | 8 GB |
| ESX oder QBCore mit einigen Skripten | 32 | 12 GB |
| ESX oder QBCore | 64 | 12 GB |
| ESX oder QBCore mit vielen Skripten | 64 | 16 GB |

Eigene Seiten mit Details gibt es für [FiveM mit ESX](/server-ram-rechner/fivem-esx) und [FiveM mit QBCore](/server-ram-rechner/fivem-qbcore). Läuft die Datenbank auf demselben Server, kommt ihr Bedarf noch dazu.

<RamRechner initialGame="fivem-esx" />

### CPU

Viele Skripte brauchen vor allem einen hohen Takt. Ein Server mit wenigen schnellen Kernen läuft besser als einer mit vielen langsamen. Schlecht geschriebene Skripte kann allerdings auch die beste CPU nicht ausgleichen.

### Standort, Slots und Backups

Für eine deutsche Community gehört der Server nach Deutschland oder Europa. Plane die Slots nach der Zahl der Spieler, die gleichzeitig online sind. Wie viele Slots technisch und rechtlich möglich sind, hängt auch von den aktuellen Bedingungen von Cfx.re ab.

Bei Backups zählt nicht nur der Ordner mit den Ressourcen. Der eigentliche Spielstand liegt in der Datenbank. Ein Backup ohne Datenbank-Dump ist bei einem Roleplay-Server wertlos. Wie du Sicherungen planst, zeigt der Artikel zur [Backup-Strategie](/blog/backup-strategie-mittelstand).

## FiveM Server mieten: Schritt für Schritt

### Schritt 1: Framework und Größe festlegen

Entscheide dich für ESX oder QBCore und schätze, wie viele Spieler gleichzeitig online sein werden. Zum Start sind das meist weniger, als man hofft.

### Schritt 2: RAM und Slots wählen

Nimm den Wert aus dem Rechner und plane eine Stufe mehr ein, wenn du viele Fahrzeuge, Karten und Skripte laden willst.

### Schritt 3: Standort und Laufzeit wählen

Wähle die Region und entscheide dich zwischen Miete und Lifetime. Für ein neues Projekt ist die monatliche Miete sinnvoller.

### Schritt 4: Rabattcode eintragen

Trage im Checkout den Code `ZAPX-M26R79` ein. Er gibt 20% auf die Mietlaufzeiten.

### Schritt 5: Lizenzschlüssel erstellen

Jeder FiveM Server braucht einen Lizenzschlüssel von Cfx.re. Den erstellst du kostenlos mit deinem Cfx.re-Konto und trägst ihn im Panel oder in der `server.cfg` ein.

### Schritt 6: Server starten und verbinden

Nach dem ersten Start richtest du den Server über txAdmin ein, die Verwaltungsoberfläche, die FiveM mitbringt. Danach verbindest du dich über die Serverliste oder per Direktverbindung.

<ZapHostingCta href="https://zap-hosting.com/achim" title="FiveM Server in Minuten starten" buttonText="FiveM Server jetzt mieten" />

## Wichtige Einstellungen nach der Bestellung

1. **txAdmin absichern:** Vergib ein starkes Passwort und lege für jedes Teammitglied einen eigenen Zugang mit passenden Rechten an.
2. **Servername, Beschreibung und Tags** in der `server.cfg` setzen, damit der Server in der Liste gefunden wird.
3. **Slots und OneSync** passend zur gebuchten Größe einstellen.
4. **Datenbank verbinden:** Die Verbindungsdaten gehören in die `server.cfg`. Teile diese Datei nie öffentlich.
5. **Startreihenfolge der Ressourcen prüfen:** Das Framework muss vor den Skripten starten, die darauf aufbauen.
6. **Geplante Neustarts** in txAdmin einrichten, mit Ankündigung für die Spieler.
7. **Backups für Dateien und Datenbank** aktivieren.

> Tipp: Gekaufte Skripte sind oft an das Cfx.re-Konto gebunden, mit dem der Lizenzschlüssel erstellt wurde. Nutze dafür ein Konto, das dem Projekt gehört und nicht einem einzelnen Teammitglied.

## Performance- und Sicherheitstipps

- **Ressourcen messen:** In txAdmin und mit dem Befehl `resmon` siehst du, welche Skripte am meisten Zeit verbrauchen. Oft sind es wenige Ausreißer.
- **Weniger ist mehr:** Jedes Fahrzeug, jede Karte und jedes Skript kostet Speicher und Ladezeit. Entferne, was niemand nutzt.
- **Skripte einzeln einführen:** Teste neue Ressourcen erst auf einem Testserver oder außerhalb der Stoßzeiten.
- **Nur aus vertrauenswürdigen Quellen laden:** Geleakte oder manipulierte Skripte enthalten immer wieder Hintertüren.
- **Server aktuell halten:** Aktualisiere die Serverversion regelmäßig, aber nicht ungetestet am Freitagabend.
- **Datenbank pflegen:** Alte Einträge und fehlende Indizes machen Abfragen langsam.

## Mieten oder Lifetime kaufen?

Läuft die Community stabil, bleibt ein FiveM Server oft über Jahre online. Dafür gibt es bei ZAP-Hosting die Lifetime-Option: Du bezahlst den Server einmal statt jeden Monat. Der Kaufpreis ist das Elffache des Preises für 30 Tage. Das kleinste Paket für 5,29 € gibt es also ab 58,19 € einmalig.

Wichtig: Ein Lifetime-Server läuft nur mit einem aktiven ZapX Pass. Der kostet ab 4,99 € je 30 Tage, bei einer Laufzeit von 365 Tagen 3,74 € je 30 Tage. Ganz ohne laufende Kosten ist Lifetime also nicht. Der Pass gilt für dein ganzes Konto und deckt in der kleinsten Stufe zwei Lifetime-Server ab.

Ein Beispiel: Das Paket mit 4 GB für einen RP-Server mit ESX oder QBCore kostet 8,79 € für 30 Tage, als Lifetime-Server also 96,69 €. Danach zahlst du statt der Miete nur noch den Pass und sparst gegenüber der Monatsmiete 3,80 € im Monat. Der Kauf hat sich damit nach rund 25 Monaten bezahlt gemacht, mit dem Jahres-Pass nach rund 19 Monaten. Hast du den Pass ohnehin schon für einen anderen Server, sind es 11 Monate.

Zwei Dinge verschieben die Rechnung: Größere Pakete lohnen sich schneller, weil der Pass gleich viel kostet. Und wer länger mietet, bekommt Rabatt (10 % bei 90 Tagen, 17 % bei 180 Tagen, 25 % bei 365 Tagen), dann dauert es länger. Für die meisten Gruppen ist deshalb richtig: erst mieten, und erst kaufen, wenn klar ist, dass der Server mehrere Jahre läuft. Mehr dazu im Artikel [Server kaufen statt mieten](/blog/zap-hosting-lifetime).

## Häufige Fragen

### Wie viel RAM braucht ein FiveM Server?

Für einen Server mit ESX oder QBCore und 32 Spielern sind 8 GB ein guter Start. Mit einigen zusätzlichen Skripten oder mit 64 Spielern solltest du 12 GB einplanen, mit vielen Skripten und 64 Spielern 16 GB. Die Werte enthalten 25 Prozent Puffer. Eine Datenbank auf demselben Server kommt dazu.

### Was kostet ein FiveM Server?

Einen FiveM Server gibt es bei ZAP-Hosting ab 5,29 € für 30 Tage, zum Testen ab 0,95 € für 3 Tage. Die Pakete richten sich nach dem Arbeitsspeicher: 2 GB für 5,29 €, 4 GB für 8,79 €, 8 GB für 14,99 € und 16 GB für 26,99 € je 30 Tage. Längere Laufzeiten sind günstiger: 10 % Rabatt bei 90 Tagen, 17 % bei 180 Tagen und 25 % bei 365 Tagen. Mit dem Code `ZAPX-M26R79` sparst du 20% auf die Miete. Stand: 27. November 2026.

### ESX oder QBCore: Was ist besser?

Keines der beiden ist grundsätzlich besser. Entscheidend ist, für welches Framework es die Skripte gibt, die du nutzen willst, und womit dein Team Erfahrung hat. Für den Einstieg mit ESX kannst du mein kostenloses [ESX-Template](/fivem-template-server) nutzen.

### Brauchen die Spieler GTA V?

Ja. Jeder Spieler braucht eine gekaufte PC-Version von GTA V und den FiveM-Client.

### Brauche ich eine Datenbank?

Für ESX und QBCore ja. Beide Frameworks speichern ihre Daten in MySQL oder MariaDB. Ein Server ohne Framework kommt ohne Datenbank aus.

### Kann ich später mehr Slots oder RAM buchen?

Bei einem Mietserver ist ein Upgrade in der Regel unkompliziert. Beim Lifetime-Server buchst du zusätzliche Ressourcen gegen eine einmalige Zuzahlung dazu.
