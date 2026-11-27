---
title: 'Rust Server mieten: RAM, Wipes, Plugins und Kosten'
description: 'Rust Server mieten: wie viel RAM du brauchst, wie Wipes und Kartengröße zusammenhängen, was Oxide-Plugins bringen und welche Einstellungen am Anfang zählen.'
date: '2026-11-27'
lastModified: '2026-11-27'
tags: ['Gameserver', 'Server-Hosting']
featured: false
---

Auf offiziellen Rust-Servern entscheidet oft die Gruppengröße. Wer zu zweit oder zu dritt spielt, wird von großen Clans überrannt, und nach dem nächsten Wipe geht alles von vorne los. Mit einem eigenen Rust Server legst du die Regeln selbst fest: Teamgröße, Sammelraten, Wipe-Rhythmus und ob überhaupt PvP stattfindet.

Rust gehört allerdings zu den anspruchsvolleren Gameservern. Dieser Guide zeigt, was du beim Mieten einplanen musst und welche Einstellungen danach wichtig sind.

> **Kurz gesagt:** Einen Rust Server gibt es bei ZAP-Hosting ab 9,99 € für 30 Tage, zum Testen ab 1,80 € für 3 Tage. Der Preis hängt vom Paket ab, nicht von der Spielerzahl. Mit dem Code `ZAPX-M26R79` sparst du 20% auf die Mietlaufzeiten, nicht auf die Lifetime-Option. Stand: 27. November 2026, die aktuellen Preise stehen bei ZAP-Hosting.

## Warum ein eigener Rust Server?

- **Eigene Regeln:** Begrenze die Teamgröße, damit Solo-Spieler und kleine Gruppen eine Chance haben.
- **Eigener Wipe-Rhythmus:** Du entscheidest, wann die Karte zurückgesetzt wird und ob Baupläne erhalten bleiben.
- **Eigene Raten:** Höhere Sammelraten für Gruppen, die wenig Zeit haben.
- **PvE oder PvP:** Ein ruhiger Bauserver ist genauso möglich wie ein harter PvP-Server.
- **Kontrolle über Cheater:** Als Admin kannst du selbst eingreifen.

## Mieten oder selbst hosten?

Der Dedicated Server von Rust lässt sich über SteamCMD kostenlos installieren. Auf dem eigenen Gaming-PC ist das aber kaum sinnvoll: Der Server belegt allein schon einen großen Teil des Arbeitsspeichers, und eine Rust-Welt lebt davon, dass sie rund um die Uhr läuft. Basen verfallen, Raids passieren nachts, und ein Server, der nur abends online ist, verliert seine Spieler schnell.

Ein gemieteter Server nimmt dir Installation, Portfreigabe und Betrieb ab. Dazu kommt ein Punkt, der bei Rust besonders zählt: die monatlichen Updates. Nach jedem großen Update muss der Server aktualisiert werden, sonst kann sich niemand verbinden. Im Panel ist das ein Klick oder läuft automatisch.

Wer mehrere Rust-Server oder zusätzliche Dienste betreiben will, fährt mit einem eigenen vServer oder Dedicated Server oft besser. Dazu mehr im Vergleich [vServer oder Dedicated Server](/blog/vserver-vs-dedicated-server).

## Worauf du beim Rust Hosting achten solltest

### RAM: Der Grundbedarf ist hoch

Bei den meisten Spielen wächst der Speicherbedarf mit der Spielerzahl. Bei Rust ist schon der leere Server teuer, weil die gesamte Karte im Speicher liegt. Zusätzliche Spieler machen dann vergleichsweise wenig aus. Die Werte aus meinem [RAM-Rechner für Rust](/server-ram-rechner/rust), jeweils mit 25 Prozent Puffer:

| Spieler | Plugins | Empfehlung |
| --- | --- | --- |
| 10 bis 50 | keine oder einige | 16 GB |
| 50 | viele | 24 GB |
| 100 | keine | 24 GB |

Ein Rust Server mit weniger als 16 GB ist deshalb auch für kleine Gruppen knapp geplant. Stell hier deine eigenen Werte ein:

<RamRechner initialGame="rust" />

### Kartengröße

Die Kartengröße ist der zweite große Hebel. Eine größere Karte braucht mehr RAM, mehr Speicherplatz und mehr Rechenzeit. Für eine kleine Gruppe ist eine riesige Karte außerdem langweilig, weil man sich kaum begegnet. Wähle die Karte passend zur Spielerzahl: lieber kleiner starten und beim nächsten Wipe vergrößern.

### Der Bedarf wächst bis zum Wipe

Je länger ein Wipe läuft, desto mehr Basen, Kisten und Objekte liegen auf der Karte. Speicherbedarf und CPU-Last steigen deshalb über die Wochen an. Ein Server, der am ersten Tag flüssig läuft, kann drei Wochen später ins Stocken geraten. Plane den Puffer für das Ende des Wipes, nicht für den Anfang.

### CPU

Rust braucht einen hohen Takt. Viele Spieler, große Basen und Raids mit vielen Explosionen belasten vor allem einzelne Kerne. Achte auf aktuelle, schnelle Prozessoren statt auf eine hohe Kernzahl.

### Plugins mit Oxide

Der unveränderte Server heißt Vanilla. Für Plugins brauchst du ein Mod-Framework, meistens Oxide, das auch unter dem Namen uMod bekannt ist. Damit installierst du zum Beispiel höhere Sammelraten, Kits, Teleport-Befehle oder Verwaltungswerkzeuge. Jedes Plugin kostet etwas Speicher und Rechenzeit, und nach einem großen Spielupdate müssen Oxide und manche Plugins erst aktualisiert werden, bevor der Server wieder sauber läuft.

### Standort und Slots

Bei einem Shooter mit Raids zählt der Ping. Für deutsche Spieler gehört der Server nach Deutschland oder Europa. Die Slots planst du nach der Zahl der Spieler, die gleichzeitig online sind.

## Rust Server mieten: Schritt für Schritt

### Schritt 1: Größe festlegen

Überlege, ob du einen privaten Server für Freunde oder einen öffentlichen Community-Server planst. Davon hängen Slots, Kartengröße und RAM ab.

### Schritt 2: RAM und Slots wählen

Nimm den Wert aus dem [RAM-Rechner für Rust](/server-ram-rechner/rust) und spare nicht am Arbeitsspeicher. Zu wenig RAM zeigt sich bei Rust durch Ruckler und Abstürze beim Speichern.

### Schritt 3: Standort und Laufzeit wählen

Wähle die Region und entscheide dich zwischen Miete und Lifetime. Zum Testen ist die Miete richtig.

### Schritt 4: Rabattcode eintragen

Trage im Checkout den Code `ZAPX-M26R79` ein. Er gibt 20% auf die Mietlaufzeiten.

### Schritt 5: Bestellen und verbinden

Nach der Einrichtung startest du den Server im Panel. Der erste Start dauert, weil die Karte erzeugt wird. Danach verbindest du dich über die Serverliste oder mit `client.connect` und der Adresse in der Konsole, die du im Spiel mit F1 öffnest.

<ZapHostingCta href="https://zap-hosting.com/achim" title="Rust Server in Minuten starten" buttonText="Rust Server jetzt mieten" />

## Wichtige Einstellungen nach der Bestellung

1. **Servername und Beschreibung** setzen. Schreib Wipe-Rhythmus, Teamgröße und Raten in den Namen oder die Beschreibung, danach suchen Spieler.
2. **Kartengröße und Seed** festlegen. Beides bestimmt, wie die Karte aussieht. Eine Änderung bedeutet eine neue Karte.
3. **RCON-Passwort** setzen. Über RCON steuerst du den Server von außen. Ein schwaches Passwort ist ein offenes Tor.
4. **Admins eintragen:** Vergib Admin-Rechte über die Steam-ID und nur an Personen, denen du vertraust.
5. **Wipe-Plan festlegen** und klar kommunizieren.
6. **Automatische Backups und Neustarts** einrichten.

### Wipes verstehen

Bei einem Karten-Wipe werden Karte und Basen zurückgesetzt. Bei einem Blueprint-Wipe verlieren die Spieler zusätzlich ihre erlernten Baupläne. Facepunch veröffentlicht einmal im Monat ein großes Update, das einen Karten-Wipe erzwingt. Daran kommst du auch mit einem eigenen Server nicht vorbei. Ob du dazwischen zusätzlich wöchentlich oder alle zwei Wochen wipest, entscheidest du selbst.

## Performance- und Sicherheitstipps

- **Täglicher Neustart:** Ein geplanter Neustart in der Nacht hält den Speicher sauber.
- **Karte passend wählen:** Eine zu große Karte ist die häufigste Ursache für unnötig hohen Bedarf.
- **Plugins ausmisten:** Entferne, was niemand nutzt. Führe neue Plugins einzeln ein und beobachte die Auslastung.
- **Updates am Wipe-Tag einplanen:** Aktualisiere erst den Server, dann Oxide, dann die Plugins.
- **Anti-Cheat eingeschaltet lassen:** Ohne Easy Anti-Cheat wird ein öffentlicher Server schnell unspielbar.
- **Verbrauch beobachten:** Wie du den tatsächlichen Bedarf misst, steht im Artikel [Wie viel RAM braucht mein Server?](/blog/wie-viel-ram-braucht-mein-server).

## Mieten oder Lifetime kaufen?

Bei Rust wird zwar die Karte regelmäßig zurückgesetzt, der Server selbst läuft aber oft über Jahre, vor allem bei einer festen Community. Dafür gibt es bei ZAP-Hosting die Lifetime-Option: Du bezahlst den Server einmal statt jeden Monat. Der Kaufpreis ist das Elffache des Preises für 30 Tage.

Wichtig: Ein Lifetime-Server läuft nur mit einem aktiven ZapX Pass. Der kostet ab 4,99 € je 30 Tage, bei einer Laufzeit von 365 Tagen 3,74 € je 30 Tage. Ganz ohne laufende Kosten ist Lifetime also nicht. Der Pass gilt für dein ganzes Konto und deckt in der kleinsten Stufe zwei Lifetime-Server ab.

Ein Beispiel: Das kleinste Rust-Paket kostet 9,99 € für 30 Tage, als Lifetime-Server also 109,89 €. Danach zahlst du statt der Miete nur noch den Pass und sparst gegenüber der Monatsmiete 5,00 € im Monat. Der Kauf hat sich damit nach rund 22 Monaten bezahlt gemacht, mit dem Jahres-Pass nach rund 18 Monaten. Hast du den Pass ohnehin schon für einen anderen Server, sind es 11 Monate.

Zwei Dinge verschieben die Rechnung: Größere Pakete lohnen sich schneller, weil der Pass gleich viel kostet. Und wer länger mietet, bekommt Rabatt (10 % bei 90 Tagen, 17 % bei 180 Tagen, 25 % bei 365 Tagen), dann dauert es länger. Für die meisten Gruppen ist deshalb richtig: erst mieten, und erst kaufen, wenn klar ist, dass der Server mehrere Jahre läuft. Mehr dazu im Artikel [Server kaufen statt mieten](/blog/zap-hosting-lifetime).

## Häufige Fragen

### Wie viel RAM braucht ein Rust Server?

Plane mindestens 16 GB ein. Das gilt für 10 Spieler genauso wie für 50, weil der Grundbedarf der Karte den größten Teil ausmacht. Mit 100 Spielern oder mit 50 Spielern und vielen Oxide-Plugins solltest du 24 GB nehmen. Die Werte enthalten 25 Prozent Puffer.

### Was kostet ein Rust Server?

Einen Rust Server gibt es bei ZAP-Hosting ab 9,99 € für 30 Tage, zum Testen ab 1,80 € für 3 Tage. Längere Laufzeiten sind günstiger: 10 % Rabatt bei 90 Tagen, 17 % bei 180 Tagen und 25 % bei 365 Tagen. Mit dem Code `ZAPX-M26R79` sparst du 20% auf die Miete. Stand: 27. November 2026.

### Wie oft muss ich wipen?

Mindestens einmal im Monat, denn das monatliche Update von Facepunch erzwingt einen Karten-Wipe. Viele Server wipen zusätzlich wöchentlich oder alle zwei Wochen. Ob du dabei auch die Baupläne zurücksetzt, entscheidest du selbst.

### Was ist der Unterschied zwischen Vanilla und Modded?

Ein Vanilla-Server läuft mit den Standardwerten des Spiels. Ein Modded-Server nutzt Plugins, zum Beispiel für höhere Sammelraten oder Kits. Technisch brauchst du dafür Oxide. Server mit veränderten Spielwerten gehören in der Serverliste in den Bereich für gemoddete Server.

### Kann ich einen privaten Server nur für Freunde betreiben?

Ja. Mit Oxide lässt sich der Zugang per Whitelist-Plugin einschränken. Der RAM-Bedarf bleibt auch bei wenigen Spielern hoch, eine kleinere Karte hilft.

### Kann ich die Kartengröße später ändern?

Ja, aber nur mit einer neuen Karte. Der passende Zeitpunkt ist deshalb der nächste Wipe.
