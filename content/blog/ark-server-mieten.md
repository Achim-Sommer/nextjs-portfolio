---
title: 'ARK Server mieten: Ascended und Evolved im Vergleich'
description: 'ARK Server mieten für Survival Ascended oder Survival Evolved: RAM-Bedarf beider Spiele, Mods, Cluster, Raten und die wichtigsten Einstellungen zum Start.'
date: '2026-11-27'
lastModified: '2026-11-27'
tags: ['Gameserver', 'Server-Hosting']
featured: false
---

Wer einen ARK Server mieten will, muss zuerst eine Frage klären: Welches ARK? ARK: Survival Evolved ist das Original, ARK: Survival Ascended die Neuauflage auf Basis der Unreal Engine 5. Beide sind getrennte Spiele mit getrennten Servern, und beim Hosting unterscheiden sie sich deutlich. Ascended braucht deutlich mehr Arbeitsspeicher als Evolved.

Dieser Guide deckt beide Spiele ab: worauf du bei der Auswahl achten solltest, wie du den Server mietest und welche Einstellungen danach zählen.

> **Kurz gesagt:** ARK: Survival Evolved gibt es bei ZAP-Hosting ab 9,99 € für 30 Tage, zum Testen ab 1,80 € für 3 Tage. Survival Ascended bietet ZAP-Hosting nicht als Gameserver-Paket an, sondern als vServer ab 22,29 € je 30 Tage (3 Tage zum Testen ab 4,01 €). Der Preis hängt vom Paket ab, nicht von der Spielerzahl. Mit dem Code `ZAPX-M26R79` sparst du 20% auf die Mietlaufzeiten, nicht auf die Lifetime-Option. Stand: 27. November 2026, die aktuellen Preise stehen bei ZAP-Hosting.

## Warum ein eigener ARK Server?

ARK ist mit den Standardwerten ein Spiel für Menschen mit sehr viel Zeit. Das Zähmen eines großen Dinos kann Stunden dauern, und auf offiziellen Servern kann ein Stamm über Nacht alles verlieren. Ein eigener Server ändert das:

- **Eigene Raten:** Zähmen, Ernten, Erfahrung und Zucht lassen sich beschleunigen.
- **PvE oder PvP:** Ihr entscheidet, ob Basen angegriffen werden können.
- **Mods:** neue Dinos, größere Stapel, bessere Bauteile.
- **Keine fremden Stämme:** Mit Passwort bleibt ihr unter euch.
- **Die Welt läuft weiter:** Anders als bei einer privaten Sitzung hängt nichts an einem Host, der online sein muss.

## Survival Ascended oder Survival Evolved?

| | Survival Ascended | Survival Evolved |
| --- | --- | --- |
| Technik | Neuauflage mit Unreal Engine 5 | Original |
| RAM bei 10 Spielern | 16 GB | 12 GB |
| Mods | direkt im Spiel, auch für Konsolen | über den Steam Workshop |
| Anspruch an die Hardware | hoch, bei Server und Spielern | deutlich geringer |

Entscheidend ist, welches Spiel eure Gruppe besitzt und auf welcher Hardware sie spielt. Ascended sieht besser aus und wird aktiv weiterentwickelt, verlangt aber starke PCs. Evolved läuft auch auf älteren Rechnern und ist als Server günstiger zu betreiben. Ein Spielstand lässt sich nicht einfach von einem Spiel ins andere mitnehmen. Die Entscheidung solltet ihr also vor dem ersten Dino treffen.

## Mieten oder selbst hosten?

Für beide Spiele gibt es einen Dedicated Server, den du selbst betreiben kannst. In der Praxis scheitert das am Speicher: Ein Ascended-Server belegt mehr RAM, als viele Gaming-PCs neben dem Spiel selbst frei haben. Dazu kommen häufige Updates und Mods, die nach einem Update erst nachziehen müssen.

Ein gemieteter Server lohnt sich, wenn du schnell starten, Einstellungen im Panel ändern und Backups nicht von Hand machen willst. Planst du einen Cluster aus mehreren Karten, kann ein eigener vServer oder Dedicated Server günstiger sein, weil du den Speicher selbst aufteilst. Den Unterschied erklärt der Vergleich [vServer oder Dedicated Server](/blog/vserver-vs-dedicated-server).

## Worauf du beim ARK Hosting achten solltest

### RAM

Die folgenden Werte stammen aus meinem Rechner und enthalten 25 Prozent Puffer. Details stehen auf den Seiten [RAM für ARK: Survival Ascended](/server-ram-rechner/ark) und [RAM für ARK: Survival Evolved](/server-ram-rechner/ark-survival-evolved).

| Spieler und Mods | Survival Ascended | Survival Evolved |
| --- | --- | --- |
| 10 Spieler, keine Mods | 16 GB | 12 GB |
| 20 Spieler, keine Mods | 24 GB | 12 GB |
| 10 Spieler, einige Mods | 24 GB | 12 GB |
| 10 Spieler, viele Mods | 24 GB | 16 GB |
| 40 Spieler, keine Mods | 24 GB | 16 GB |

Bei Ascended ist also schon der kleinste sinnvolle Server ein 16-GB-Paket. Stell hier deine Werte ein. Im Auswahlfeld wechselst du zwischen beiden Spielen:

<RamRechner initialGame="ark" />

### CPU

Ascended braucht mehrere schnelle Kerne, vor allem auf großen Karten. Der Server von Evolved nutzt vor allem einen Kern, hier zählt ein hoher Takt. In beiden Fällen gilt: Viele gezähmte Dinos und große Basen kosten Rechenzeit, lange bevor der Speicher voll ist.

### Speicherplatz

ARK ist auch auf der Festplatte groß. Die Serverdateien von Ascended belegen deutlich mehr als die der meisten anderen Spiele, und mit Mods und Backups wächst der Bedarf weiter. Achte darauf, dass im Paket genug Platz für mehrere Spielstände ist.

### Mods

Mods gehören bei ARK für viele Gruppen dazu. Bei Evolved kommen sie aus dem Steam Workshop, bei Ascended werden sie direkt im Spiel verwaltet und stehen damit auch Konsolenspielern zur Verfügung. Jeder Mod kostet Speicher und verlängert die Ladezeit. Nach Spielupdates kann es dauern, bis alle Mods wieder funktionieren.

### Cluster

Ein Cluster verbindet mehrere Karten, zwischen denen Spieler mit Charakter, Dinos und Gegenständen wechseln können. Wichtig für die Planung: Jede Karte ist ein eigener Server mit eigenem Speicherbedarf. Zwei Karten in Ascended bedeuten also zweimal 16 GB und mehr, nicht einen Server mit etwas Aufschlag.

### Standort, Slots und Backups

Wähle einen Standort in Deutschland oder Europa. Die Slots richten sich nach den Spielern, die gleichzeitig online sind. Backups sind bei ARK besonders wichtig, weil in einem Spielstand oft Hunderte Stunden an gezähmten und gezüchteten Dinos stecken. Sichere zusätzlich außerhalb des Hosters. Wie das aussieht, zeigt der Artikel zur [Backup-Strategie](/blog/backup-strategie-mittelstand).

## ARK Server mieten: Schritt für Schritt

### Schritt 1: Spiel und Karte festlegen

Wähle Survival Ascended oder Survival Evolved und die Karte, auf der ihr starten wollt. Für Einsteiger ist The Island der übliche Start.

### Schritt 2: RAM und Slots wählen

Nimm den Wert aus der Tabelle oder aus dem Rechner. Wenn ihr Mods plant, rechne sie von Anfang an ein.

### Schritt 3: Standort und Laufzeit wählen

Wähle die Region und entscheide dich zwischen Miete und Lifetime.

### Schritt 4: Rabattcode eintragen

Trage im Checkout den Code `ZAPX-M26R79` ein. Er gibt 20% auf die Mietlaufzeiten.

### Schritt 5: Bestellen und verbinden

Nach der Einrichtung startest du den Server im Panel. Der erste Start kann einige Minuten dauern. Danach findest du den Server im Spiel in der Liste der inoffiziellen Server.

<ZapHostingCta href="https://zap-hosting.com/achim" title="ARK Server in Minuten starten" buttonText="ARK Server jetzt mieten" />

## Wichtige Einstellungen nach der Bestellung

1. **Servername, Server-Passwort und Admin-Passwort** setzen. Das Admin-Passwort brauchst du im Spiel für Befehle.
2. **Raten anpassen:** Zähmgeschwindigkeit, Erntemenge und Erfahrung sind die drei Werte, die das Spielgefühl am stärksten verändern. Sie stehen in der `GameUserSettings.ini`.
3. **Zucht einstellen:** Brutzeit und Wachstum der Jungtiere stehen in der `Game.ini`. Mit Standardwerten dauert das Aufziehen sehr lange.
4. **PvE oder PvP** festlegen.
5. **Mods eintragen** und danach einmal sauber neu starten.
6. **Automatische Backups und einen täglichen Neustart** einrichten.

> Tipp: Dreh nicht alle Raten gleichzeitig auf das Zehnfache. Ein Server, auf dem nach einem Wochenende alles erreicht ist, ist schnell leer.

## Performance-Tipps

- **Dinos begrenzen:** Jeder gezähmte Dino wird dauerhaft berechnet. Ein Limit pro Stamm hält den Server flüssig.
- **Große Basen im Blick behalten:** Sehr viele Bauteile an einem Ort verlängern die Ladezeiten für alle in der Nähe.
- **Mods sparsam wählen:** Wenige gut gepflegte Mods sind besser als eine lange Liste.
- **Täglich neu starten:** Der Speicherbedarf wächst mit der Laufzeit.
- **Updates nicht aufschieben:** Spieler mit neuerer Version können sich sonst nicht verbinden.
- **Verbrauch messen:** Wie du prüfst, ob der Speicher wirklich knapp ist, steht im Artikel [Wie viel RAM braucht mein Server?](/blog/wie-viel-ram-braucht-mein-server).

## Mieten oder Lifetime kaufen?

ARK-Welten laufen oft sehr lange, weil in Zucht und Basen viel Zeit steckt. Dafür gibt es bei ZAP-Hosting die Lifetime-Option: Du bezahlst den Server einmal statt jeden Monat. Der Kaufpreis ist das Elffache des Preises für 30 Tage. Das kleinste Paket (Survival Evolved) für 9,99 € gibt es also ab 109,89 € einmalig.

Wichtig: Ein Lifetime-Server läuft nur mit einem aktiven ZapX Pass. Der kostet ab 4,99 € je 30 Tage, bei einer Laufzeit von 365 Tagen 3,74 € je 30 Tage. Ganz ohne laufende Kosten ist Lifetime also nicht. Der Pass gilt für dein ganzes Konto und deckt in der kleinsten Stufe zwei Lifetime-Server ab.

Ein Beispiel: Das kleinste Paket für Survival Ascended kostet 22,29 € für 30 Tage, als Lifetime-Server also 245,19 €. Danach zahlst du statt der Miete nur noch den Pass und sparst gegenüber der Monatsmiete 17,30 € im Monat. Der Kauf hat sich damit nach rund 14 Monaten bezahlt gemacht, mit dem Jahres-Pass nach rund 13 Monaten. Hast du den Pass ohnehin schon für einen anderen Server, sind es 11 Monate.

Zwei Dinge verschieben die Rechnung: Größere Pakete lohnen sich schneller, weil der Pass gleich viel kostet. Und wer länger mietet, bekommt Rabatt (10 % bei 90 Tagen, 17 % bei 180 Tagen, 25 % bei 365 Tagen), dann dauert es länger. Für die meisten Gruppen ist deshalb richtig: erst mieten, und erst kaufen, wenn klar ist, dass der Server mehrere Jahre läuft. Mehr dazu im Artikel [Server kaufen statt mieten](/blog/zap-hosting-lifetime).

## Häufige Fragen

### Wie viel RAM braucht ein ARK Server?

Für ARK: Survival Ascended brauchst du bei 10 Spielern ohne Mods 16 GB, mit Mods oder ab 20 Spielern 24 GB. ARK: Survival Evolved kommt bei 10 bis 20 Spielern mit 12 GB aus, mit vielen Mods oder 40 Spielern sind es 16 GB. Alle Werte enthalten 25 Prozent Puffer.

### Was kostet ein ARK Server?

ARK: Survival Evolved gibt es bei ZAP-Hosting ab 9,99 € für 30 Tage, zum Testen ab 1,80 € für 3 Tage. Survival Ascended bietet ZAP-Hosting nicht als Gameserver-Paket an, sondern als vServer ab 22,29 € je 30 Tage (3 Tage zum Testen ab 4,01 €). Längere Laufzeiten sind günstiger: 10 % Rabatt bei 90 Tagen, 17 % bei 180 Tagen und 25 % bei 365 Tagen. Mit dem Code `ZAPX-M26R79` sparst du 20% auf die Miete. Stand: 27. November 2026.

### Können Spieler von Evolved und Ascended zusammen spielen?

Nein. Es sind zwei getrennte Spiele mit getrennten Servern. Alle Spieler brauchen dasselbe Spiel.

### Was ist ein ARK Cluster?

Ein Verbund aus mehreren Servern mit unterschiedlichen Karten, zwischen denen Spieler ihre Charaktere, Dinos und Gegenstände übertragen können. Jede Karte braucht einen eigenen Server mit eigenem RAM.

### Kann ich meinen bisherigen Spielstand hochladen?

In der Regel ja. Spielstände aus dem Einzelspieler oder von einem anderen Server desselben Spiels lassen sich meist per Dateizugriff übertragen. Mach vorher ein Backup und achte darauf, dass dieselben Mods installiert sind.

### Kann ich später mehr RAM oder Slots buchen?

Bei einem Mietserver ist ein Upgrade in der Regel unkompliziert. Beim Lifetime-Server buchst du zusätzliche Ressourcen gegen eine einmalige Zuzahlung dazu.
