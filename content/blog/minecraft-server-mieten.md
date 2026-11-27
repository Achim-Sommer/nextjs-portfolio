---
title: 'Minecraft Server mieten: RAM, Kosten und Einrichtung'
description: 'Minecraft Server mieten: Java oder Bedrock, Paper oder Modpack, wie viel RAM du wirklich brauchst und welche Einstellungen nach der Bestellung wichtig sind.'
date: '2026-11-27'
lastModified: '2026-11-27'
tags: ['Gameserver', 'Server-Hosting']
featured: false
---

Ein eigener Minecraft Server ist schnell gemietet. Die eigentliche Arbeit steckt in drei Entscheidungen davor: Java oder Bedrock, Vanilla, Plugins oder Modpack, und wie viel RAM das Ganze braucht. Wer hier falsch plant, zahlt entweder zu viel oder hat nach zwei Wochen einen Server, der bei jedem neuen Chunk ruckelt.

Dieser Guide führt dich durch die Auswahl, die Bestellung und die Einstellungen, die du direkt danach setzen solltest.

> **Kurz gesagt:** Gameserver bei ZAP-Hosting starten ab 2,76 € im Monat, der Preis hängt von Spiel, Slots und RAM ab. Mit dem Code `ZAPX-M26R79` sparst du 20% auf die Mietlaufzeiten. Für die Lifetime-Option gilt der Code nicht. Preise können sich ändern, die aktuellen Werte stehen bei ZAP-Hosting.

## Warum ein eigener Minecraft Server?

Eine Welt, die du im Einzelspieler für das LAN öffnest, ist nur erreichbar, solange dein Rechner läuft und du selbst im Spiel bist. Ein eigener Server trennt die Welt von deinem PC:

- Die Welt ist rund um die Uhr erreichbar, auch wenn du offline bist.
- Du legst die Regeln fest: Schwierigkeit, PvP, Whitelist, Spielmodus.
- Du entscheidest über Plugins, Mods und Datapacks.
- Backups, Updates und Admin-Rechte liegen an einer Stelle.

## Mieten oder selbst hosten?

Die Serversoftware von Minecraft ist kostenlos, du kannst sie also auch auf dem eigenen PC oder einem vServer betreiben. Dann kümmerst du dich selbst um Java, Portfreigabe, Updates und Sicherheit, und du musst die EULA von Mojang von Hand bestätigen, bevor der Server überhaupt startet.

Ein gemieteter Server lohnt sich, wenn du

- ohne Linux-Kenntnisse und ohne Portforwarding online sein willst,
- nicht möchtest, dass dein PC Tag und Nacht läuft,
- Version, Servertyp und Modpack per Klick wechseln willst,
- Backups und Neustarts im Panel planen möchtest.

Willst du neben Minecraft noch eine Website, einen Discord-Bot oder eine Karte wie BlueMap betreiben, kann ein vServer besser passen. Den Unterschied der Servertypen erklärt der Vergleich [vServer oder Dedicated Server](/blog/vserver-vs-dedicated-server). Wenn du selbst hostest, lies vorher die Anleitung [Linux vServer absichern](/blog/linux-vserver-absichern).

## Worauf du beim Minecraft Hosting achten solltest

### Java oder Bedrock

Das ist die erste Entscheidung, und sie lässt sich später nicht einfach umkehren. Die Java Edition läuft auf PC, Mac und Linux und bringt die große Welt der Plugins und Mods mit. Die Bedrock Edition läuft auf Konsolen, Smartphones und Windows. Beide Editionen nutzen unterschiedliche Serversoftware und können sich von Haus aus nicht miteinander verbinden. Spielt ein Teil der Gruppe auf der Konsole, brauchst du einen Bedrock-Server oder einen Java-Server mit einer Brücke wie Geyser.

Ein Bedrock-Server ist deutlich sparsamer. Die Werte dazu stehen auf der Seite [RAM für Minecraft Bedrock](/server-ram-rechner/minecraft-bedrock).

### Vanilla, Paper oder Modpack

- **Vanilla:** die unveränderte Serversoftware von Mojang. Reicht für kleine Gruppen ohne Extras.
- **Paper:** eine auf Leistung optimierte Serversoftware, die Bukkit- und Spigot-Plugins lädt. Die Spieler brauchen dafür nichts zu installieren. Für die meisten Server ist Paper die beste Wahl.
- **Modpack (Forge, NeoForge, Fabric):** Mods verändern das Spiel grundlegend. Jeder Spieler muss dasselbe Modpack in derselben Version installiert haben.

Plugins und Mods sind zwei verschiedene Welten. Ein Paper-Server lädt keine Forge-Mods, und ein Forge-Server lädt keine Paper-Plugins.

### RAM richtig planen

Der Arbeitsspeicher hängt viel stärker am Servertyp als an der Spielerzahl. Die folgenden Werte stammen aus meinem [RAM-Rechner für Minecraft](/server-ram-rechner/minecraft) und enthalten 25 Prozent Puffer:

| Server | Spieler | Empfehlung |
| --- | --- | --- |
| Java, Vanilla oder Paper | 10 | 4 GB |
| Java, Paper mit einigen Plugins | 10 | 6 GB |
| Java, Paper mit vielen Plugins | 10 | 8 GB |
| Bedrock | 10 | 2 GB |
| Modpack (Forge, NeoForge, Fabric) | 8 | 12 GB |
| Großes Modpack mit sehr vielen Mods | 8 | 16 GB |

Für bekannte Modpacks gibt es eigene Seiten: [All the Mods 10](/server-ram-rechner/all-the-mods-10) braucht bei 6 Spielern 12 GB, [Better MC](/server-ram-rechner/better-mc) und [RLCraft](/server-ram-rechner/rlcraft) kommen bei 6 Spielern mit 8 GB aus. Allgemeine Werte für andere Packs findest du unter [RAM für Minecraft Modpacks](/server-ram-rechner/minecraft-modpack).

Stell hier deine eigene Spielerzahl ein:

<RamRechner initialGame="minecraft" />

Mehr RAM ist nicht automatisch besser. Ein Vanilla-Server mit 16 GB läuft nicht flüssiger als einer mit 4 GB, er kostet nur mehr.

### CPU: Takt vor Kernen

Die Welt eines Minecraft-Servers wird größtenteils auf einem einzigen Kern berechnet. Ein schneller Kern bringt deshalb mehr als viele langsame. Wenn der Server trotz freiem RAM laggt, liegt es fast immer an der CPU, an der Sichtweite oder an einer Farm, die zu viele Kreaturen erzeugt.

### Standort, Slots und Backups

Wähle einen Standort nah an deinen Spielern, für deutsche Gruppen also Deutschland oder Europa. Die Slots planst du nach der Zahl der Spieler, die gleichzeitig online sind, nicht nach der Größe der Whitelist. Automatische Backups sind Pflicht, denn ein einziger Griefer oder ein fehlerhaftes Plugin kann eine Welt ruinieren. Für Welten, an denen ihr monatelang baut, lohnt sich eine zusätzliche Kopie außerhalb des Hosters. Wie so eine Sicherung aufgebaut ist, zeigt der Artikel zur [Backup-Strategie](/blog/backup-strategie-mittelstand).

## Minecraft Server mieten: Schritt für Schritt

### Schritt 1: Edition und Servertyp festlegen

Entscheide dich für Java oder Bedrock und für Vanilla, Paper oder ein Modpack. Davon hängt alles Weitere ab.

### Schritt 2: RAM und Slots wählen

Nimm den Wert aus dem Rechner als Startpunkt. Bei einem Mietserver kannst du in der Regel später aufstocken, wenn die Gruppe wächst oder ein größeres Modpack dazukommt.

### Schritt 3: Standort und Laufzeit wählen

Wähle die Region und entscheide, ob du monatlich mietest oder die Lifetime-Option nimmst. Für den Einstieg ist die Miete die flexiblere Wahl.

### Schritt 4: Rabattcode eintragen

Trage im Checkout den Code `ZAPX-M26R79` ein. Er gibt 20% auf die Mietlaufzeiten, nicht auf die Lifetime-Option.

### Schritt 5: Bestellen und verbinden

Nach der Bestellung wird der Server automatisch eingerichtet. Im Panel findest du die Adresse des Servers. Die trägst du in Minecraft unter „Mehrspieler“ und „Server hinzufügen“ ein.

<ZapHostingCta href="https://zap-hosting.com/achim" title="Minecraft Server in Minuten starten" buttonText="Minecraft Server jetzt mieten" />

## Wichtige Einstellungen nach der Bestellung

1. **Version und Servertyp prüfen:** Die Version des Servers muss zur Version der Spieler passen. Bei Modpacks gilt das auch für die Version des Packs.
2. **Whitelist aktivieren**, wenn ihr privat spielen wollt. Ohne Whitelist findet früher oder später ein Fremder die Adresse.
3. **Operator-Rechte sparsam vergeben:** Nur Personen, denen du vertraust, bekommen Admin-Rechte.
4. **Sichtweite anpassen:** In der Datei `server.properties` steuern `view-distance` und `simulation-distance`, wie viel Welt der Server pro Spieler lädt und berechnet.
5. **Schwierigkeit, Spielmodus und PvP** festlegen.
6. **Automatische Backups und einen täglichen Neustart** einrichten.

> Tipp: Lass `online-mode` eingeschaltet. Dann prüft der Server jedes Konto bei Mojang, und niemand kann sich mit einem fremden Namen einloggen.

## Performance-Tipps

- **Paper statt Vanilla:** Paper bringt viele Optimierungen mit, ohne dass sich das Spiel für die Spieler ändert.
- **Sichtweite senken:** Eine kleinere Sichtweite entlastet CPU und RAM sofort, vor allem bei vielen Spielern.
- **Welt vorab erzeugen:** Neue Chunks zu erzeugen ist die teuerste Aufgabe des Servers. Mit einem Plugin wie Chunky lässt du die Welt vorab generieren.
- **Plugins und Mods einzeln einführen:** So erkennst du sofort, was ein Problem verursacht.
- **Farmen begrenzen:** Riesige Mob-Farmen und endlose Trichterketten sind häufige Ursachen für Lags.
- **Verbrauch messen:** Wie du prüfst, ob dein Server wirklich mehr RAM braucht, steht im Artikel [Wie viel RAM braucht mein Server?](/blog/wie-viel-ram-braucht-mein-server).

## Mieten oder Lifetime kaufen?

Minecraft-Server laufen oft über Jahre. Genau dafür gibt es bei ZAP-Hosting die Lifetime-Option: Du zahlst einmal und nutzt den Server danach ohne monatliche Kosten, mit demselben Panel wie beim Mietserver. Gameserver gibt es als Lifetime-Variante ab 45 € einmalig, der Preis deines Pakets hängt wieder von RAM und Slots ab.

Die Rechnung ist einfach: Lifetime-Preis geteilt durch Monatspreis ergibt die Zahl der Monate bis zum Break-even. Beim Einstiegspaket sind das 45 € ÷ 2,76 € ≈ 16 Monate. Im Diagramm siehst du diesen Verlauf. Unter „Eigene Preise“ trägst du die Werte deines eigenen Pakets aus dem Shop ein.

<BreakEvenChart initial="game" only="game,custom" />

Meine Empfehlung: erst ein bis zwei Monate mieten und wechseln, wenn klar ist, dass die Gruppe bleibt. Eine Checkliste und die Risiken findest du im Artikel [Server kaufen statt mieten](/blog/zap-hosting-lifetime).

## Häufige Fragen

### Wie viel RAM braucht ein Minecraft Server?

Für einen Java-Server mit Vanilla oder Paper und 10 Spielern reichen 4 GB, bei 20 Spielern sind es 6 GB. Mit vielen Plugins solltest du bei 10 Spielern 8 GB einplanen. Ein Bedrock-Server kommt bei 10 Spielern mit 2 GB aus. Modpacks brauchen deutlich mehr, meist 12 GB und bei sehr großen Packs 16 GB. Alle Werte enthalten 25 Prozent Puffer.

### Was kostet ein Minecraft Server?

Das hängt von RAM und Slots ab. Gameserver bei ZAP-Hosting starten ab 2,76 € im Monat, ein Server mit großem Modpack kostet entsprechend mehr. Mit dem Code `ZAPX-M26R79` sparst du 20% auf die Miete. Den genauen Preis für deine Konfiguration siehst du im Shop.

### Java oder Bedrock: Welche Edition soll ich nehmen?

Spielen alle am PC, nimm Java. Dort gibt es die meisten Plugins und Mods. Spielen einige auf Konsole oder Smartphone, brauchst du Bedrock oder einen Java-Server mit Geyser.

### Können Java- und Bedrock-Spieler zusammen spielen?

Von Haus aus nicht. Mit dem Plugin Geyser können Bedrock-Spieler einem Java-Server beitreten. Das funktioniert gut, einzelne Funktionen verhalten sich aber anders als auf einem reinen Java-Server.

### Kann ich später auf ein Modpack wechseln?

Ja, der Servertyp lässt sich im Panel ändern. Plane dafür mehr RAM ein und starte am besten mit einer neuen Welt, denn eine Vanilla-Welt enthält die Inhalte des Modpacks in bereits erkundeten Gebieten nicht.

### Gilt der Rabattcode auch für den Lifetime-Kauf?

Nein. `ZAPX-M26R79` gibt 20% auf die Mietlaufzeiten. Die Lifetime-Option ist ein einmaliger Festpreis.
