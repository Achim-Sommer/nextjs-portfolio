---
title: 'Lifetime Server kaufen: Preise, Break-even und Haken'
description: 'Lifetime Server bei ZAP-Hosting: Gameserver ab 49,39 €, vServer ab 80,19 € einmalig, dazu der ZapX Pass. Break-even-Rechnung, Haken und Checkliste.'
date: '2024-11-20'
lastModified: '2026-11-27'
tags: ['Server-Hosting', 'Gameserver', 'Self-Hosting']
featured: true
ogDiagram: '/img/blog/zap-hosting-lifetime/break-even.webp'
---

Server werden normalerweise gemietet: Du zahlst jeden Monat, solange dein Projekt läuft. ZAP-Hosting bietet seit April 2023 für viele Produkte zusätzlich Lifetime Server an. Du bezahlst den Server einmal, statt ihn zu mieten. Laufend fällt danach nur noch der ZapX Pass an, ein Abo für dein ganzes Konto. Soweit mir bekannt, gibt es das bei kaum einem anderen Anbieter in dieser Breite.

Ob es sich lohnt, einen Lifetime Server zu kaufen, ist vor allem eine Rechenaufgabe, allerdings mit ein paar Haken. In diesem Artikel findest du die aktuellen Preise, die Break-even-Rechnung für Gameserver, vServer und Dedicated Server, eine Entscheidungshilfe und die Punkte, die du vor dem Kauf prüfen solltest.

> **Kurz gesagt:** Ein Lifetime Server kostet bei ZAP-Hosting das Elffache der Miete für 30 Tage: Gameserver ab 49,39 €, vServer ab 80,19 €. Dazu brauchst du einen aktiven ZapX Pass ab 4,99 € je 30 Tage. Mit Pass rechnet sich der Kauf je nach Paket erst nach etwa 18 bis 35 Monaten, bei den kleinsten Gameservern allein gar nicht. Läuft der Pass ohnehin schon, sind es 11 Monate. Für Tests, kurze Projekte und unklaren Leistungsbedarf ist Mieten die bessere Wahl. Stand: 27. November 2026.

## Was „Lifetime“ bei ZAP-Hosting bedeutet

Beim Lifetime-Modell bezahlst du den Server einmal statt alle 30 Tage. Er läuft weiterhin im Rechenzentrum des Anbieters: gleiches Webpanel, gleiche Verwaltung, gleiche Verfügbarkeit wie beim Mietserver. Anders ist das Bezahlmodell.

Die Option gibt es unter anderem für:

- Gameserver
- vServer (Linux und Windows)
- Dedicated Server
- TeamSpeak-Server
- Discord-Bots

Laut ZAP-Hosting, Stand November 2026, gelten dafür diese Regeln:

- **Preis:** Bei Gameservern, vServern, TeamSpeak und Discord-Bots ist der Lifetime-Preis ein festes Vielfaches der Miete, nämlich das Elffache des Preises für 30 Tage.
- **ZapX Pass:** Ein Lifetime-Server setzt einen aktiven ZapX Pass voraus. Der Pass ist ein Abo für das ganze Konto, nicht pro Server. Hast du beim Kauf keinen Pass, wird die günstigste Stufe automatisch mitbestellt.
- **Pass endet:** Läuft der Pass aus, wird der Server gesperrt. Der Lifetime-Anspruch bleibt bestehen.
- **Keine Aktivitätschecks:** Mit aktivem Pass wird der Server nicht wegen Inaktivität gesperrt oder gelöscht. Regelmäßiges Einloggen ist nicht nötig.
- **Extras:** Der Pass enthält außerdem zusätzliche Backup-Slots und den ZapX AI Agent.

Den Pass gibt es in drei Stufen:

| ZapX Pass | Preis je 30 Tage | Bei 365 Tagen Laufzeit | Lifetime-Server gleichzeitig |
| --- | --- | --- | --- |
| Plus | 4,99 € | 3,74 € je 30 Tage | 2 |
| Pro | 9,99 € | 7,49 € je 30 Tage | 8 |
| Max | 14,99 € | 11,24 € je 30 Tage | unbegrenzt |

Früher lief das Lifetime-Modell ohne Pass. Dafür gab es eine Aktivitätsprüfung, und Server konnten bei längerer Inaktivität gesperrt werden. Für ältere Lifetime-Server können eigene Regeln gelten. Wenn du so einen Server hast, frag beim Support nach.

Wichtig ist das Kleingedruckte: „Lifetime“ bezieht sich auf die Laufzeit des Produkts beim Anbieter und ist keine Garantie für alle Zukunft. Die Bedingungen können sich ändern. Prüfe sie vor dem Kauf im Shop. Mehr dazu im Abschnitt zu den Risiken weiter unten.

<iframe width="100%" height="415" src="https://www.youtube.com/embed/eVt7DiYif2k" title="ZAP-Hosting Lifetime Server Ankündigung" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

## Break-even: Ab wann sich der Kauf rechnet

Die Rechnung hat zwei Teile. Der Lifetime-Preis ist die einmalige Ausgabe. Jeden Monat sparst du die Miete, zahlst aber weiter den Pass. Also:

Break-even in Monaten = Lifetime-Preis ÷ (Monatsmiete − ZapX Pass)

Beispiel vServer mit 4 Kernen: 126,39 € ÷ (11,49 € − 4,99 €) ≈ 19 Monate. Läuft der Pass ohnehin schon, etwa für einen anderen Lifetime-Server oder wegen der Zusatzfunktionen, fällt er aus der Rechnung heraus. Dann sind es immer 11 Monate, weil der Lifetime-Preis das Elffache der Miete ist.

Im Diagramm siehst du, wie sich die Kosten entwickeln: Die orange Linie ist die Miete, die jeden Monat weiter steigt. Die helle Linie ist der Kaufpreis plus Pass. Sie beginnt beim Lifetime-Preis und steigt leicht, solange der Haken bei „ZapX Pass einrechnen“ gesetzt ist. Wo sich beide Linien treffen, liegt der Break-even. Ab diesem Monat ist der gekaufte Server günstiger. Wähle ein Produkt aus, um die Kurve anzupassen.

<BreakEvenChart initial="vcore" />

Die Tabelle nutzt die Einstiegspreise („ab“-Preise) und zwei konkrete Pakete. Preise können sich ändern, die aktuellen Preise findest du immer direkt bei ZAP-Hosting.

<BreakEvenTabelle />

Vier Hinweise zum Lesen der Tabelle:

- **ZapX Pass:** Die Spalte mit Pass rechnet mit der Stufe Plus zu 4,99 € je 30 Tage. Beim Gameserver-Einstieg für 4,49 € kostet der Pass mehr als die Miete. Der Kauf rechnet sich dort allein nie. Die letzte Spalte gilt, wenn der Pass schon läuft: Dann sind es überall 11 Monate.
- **Mehrere Server:** Der Pass Plus deckt zwei Lifetime-Server gleichzeitig ab. Teilen sich zwei Server den Pass, sind es je Server rund 2,50 € laufend. Im Jahrestarif kostet der Pass 3,74 € je 30 Tage. Beides verkürzt den Break-even. Größere Pakete rechnen sich ohnehin schneller, weil der Pass gleich viel kostet.
- **Mietrabatt:** Die Tabelle rechnet mit dem normalen Preis für 30 Tage. Mit 20% Rabatt auf die Miete, etwa mit dem Code `ZAPX-M26R79`, oder mit einem Laufzeitrabatt (90 Tage −10%, 180 Tage −17%, 365 Tage −25%) dauert es länger. Der Code gilt nur für Mietlaufzeiten, der Lifetime-Kauf ist ein Festpreis.
- **Dedicated Server:** Miete und Lifetime sind hier beides „ab“-Preise und gehören nicht zwingend zum selben Modell. Zum Pass kommt ein eigener Slot für 9,90 € je 30 Tage. Der Wert ist nur eine grobe Orientierung.

### Was du langfristig sparst

Die Ersparnis ergibt sich aus den Mietkosten über den Zeitraum abzüglich des Lifetime-Preises und der Pass-Kosten. Gerechnet ist ohne Rabatt, mit gleichbleibendem Mietpreis und mit dem Pass Plus zu 4,99 € je 30 Tage.

<ErsparnisTabelle />

Die Tabelle zeigt auch die Kehrseite: Endet dein Projekt vor dem Break-even, hast du mehr bezahlt als mit der Miete. Bei kleinen Paketen ist das auch nach zwei Jahren noch so.

## Gameserver kaufen statt mieten

Gameserver gibt es bei ZAP-Hosting ab 4,49 € für 30 Tage, als Lifetime-Server ab 49,39 €. Das gilt zum Beispiel für Minecraft. Wer einen Minecraft Server kaufen und für immer behalten will, zahlt also 49,39 € einmalig und dazu den ZapX Pass. Welches Paket zu deiner Welt passt, steht im Guide [Minecraft Server mieten](/blog/minecraft-server-mieten).

Genau beim kleinsten Paket geht die Rechnung aber nicht auf: Der Pass kostet mit 4,99 € mehr als die Miete von 4,49 €. Ein einzelner kleiner Gameserver rechnet sich als Lifetime-Kauf deshalb nie. Sinnvoll wird der Kauf,

- wenn der Pass ohnehin läuft, weil du schon einen Lifetime-Server hast oder die Zusatzfunktionen nutzt. Dann liegt der Break-even bei 11 Monaten.
- wenn du ein größeres Paket brauchst. Ein Palworld-Server für 12,99 € (Lifetime 142,89 €) rechnet sich mit Pass nach rund 18 Monaten, ein Hytale-Server für 7,49 € (Lifetime 82,39 €) nach rund 33 Monaten.

Davon abgesehen hängt die Entscheidung stärker am Spiel als an der Technik. Die entscheidende Frage ist weniger „Wie viel Leistung brauche ich?“ als „Spielt die Gruppe in zwei Jahren noch?“.

Ein Lifetime-Gameserver passt, wenn

- ihr eine feste Gruppe seid oder eine Community betreibt, die seit Monaten aktiv ist,
- die Welt dauerhaft laufen soll und nicht nach jedem größeren Update neu beginnt,
- das Spiel die Early-Access-Phase hinter sich hat oder sich zumindest stabil entwickelt.

Mieten ist besser, wenn ihr ein neues Spiel erst ausprobiert, einen Server nur für ein Event oder Turnier braucht oder die Roadmap des Spiels noch offen ist.

Ein Punkt spricht bei ZAP-Hosting für Lifetime: Bei Gameservern ist ein Wechsel des Spiels möglich. Verliert die Gruppe das Interesse an einem Titel, ist das bezahlte Paket nicht automatisch verloren. Prüfe aber vorher, ob die Ressourcen deines Pakets für andere Spiele reichen, denn der Bedarf unterscheidet sich stark.

Ein sinnvoller Weg: erst ein paar Monate mieten und auf Lifetime wechseln, sobald klar ist, dass die Gruppe dabei bleibt. Anleitungen mit Einstellungen und Break-even für einzelne Spiele findest du in den Guides [Palworld Server mieten oder kaufen](/blog/palworld-server-mieten) und [Hytale Server mieten oder kaufen](/blog/hytale-server-mieten).

## vServer kaufen statt mieten

Ein vServer ist ein virtueller Server mit Root-Zugriff. Du wählst das Betriebssystem, installierst, was du brauchst, und kannst mehrere Projekte auf einer Maschine betreiben. Typische Einsatzzwecke:

- Webseiten und Blogs mit Apache oder Nginx
- Docker-Container und Deployment-Plattformen wie Coolify
- Datenbanken wie MySQL oder PostgreSQL
- Entwicklungs- und Staging-Umgebungen
- VPN, Mailserver, Bots und Monitoring

Ein Lifetime vServer kostet ab 80,19 € einmalig. Das ist das Paket ZAP Spark, das zur Miete 7,29 € für 30 Tage kostet. Mit Pass liegt der Break-even bei rund 35 Monaten. Das Paket ZAP Core mit 4 CPU-Kernen und 80 GB NVMe kostet 11,49 € Miete oder 126,39 € einmalig und rechnet sich nach rund 19 Monaten. Nach fünf Jahren hast du damit 263,61 € gespart, beim Einstiegspaket 57,81 €. Windows kostet keinen Aufpreis, der Paketpreis ist derselbe wie mit Linux.

Für den Kauf spricht: Viele vServer-Projekte laufen über Jahre mit ähnlichem Bedarf. Eine Website, ein VPN oder ein kleiner Docker-Stack ändern sich selten grundlegend. Genau für solche Dienste ist Lifetime gedacht. Dagegen spricht beim kleinsten Paket der lange Weg bis zum Break-even. Er lohnt sich nur, wenn der Server sicher drei Jahre oder länger läuft oder der Pass schon vorhanden ist.

Worauf du achten solltest: Docker-Stacks wachsen gern. Jeder weitere Container braucht RAM, und irgendwann reicht das Einstiegspaket nicht mehr. Rechne deshalb ein wahrscheinliches Upgrade mit ein oder starte gleich eine Stufe größer. Das größere Paket rechnet sich außerdem schneller.

## Rootserver kaufen statt mieten

Der Begriff Rootserver wird nicht einheitlich verwendet. Gemeint ist ein Server mit vollem Root-Zugriff. Bei ZAP-Hosting ist der Rootserver keine eigene Produktlinie mehr: Die Seite „Root Server mieten“ zeigt dieselben vServer-Pakete, also ab 7,29 € für 30 Tage oder ab 80,19 € als Lifetime-Server. Wenn du einen Rootserver kaufen willst, gilt deshalb die Rechnung aus dem Abschnitt zum vServer.

Brauchst du mehr Leistung, etwa für einen Gameserver, eine Website und einen Discord-Bot auf einer Maschine, nimmst du ein größeres vServer-Paket. Erst bei dauerhaft hoher Last ist ein Dedicated Server die nächste Stufe.

## Dedicated Server kaufen statt mieten

Ein Dedicated Server ist ein physischer Server, den nur du nutzt. Bei ZAP-Hosting kostet die Miete ab 92,99 € für 30 Tage (Intel Xeon E5 v4), größere Klassen beginnen bei 163,99 € und 192,99 €. Der Lifetime-Preis liegt je nach Hardware ab 1.664,30 €.

Zwei Dinge sind hier anders als bei Gameservern und vServern:

- **Eigener Slot:** Jeder Lifetime-Dedicated braucht laut ZAP-Hosting, Stand November 2026, einen eigenen Slot für 9,90 € je 30 Tage, zusätzlich zum ZapX Pass. Laufend sind das mit dem Pass Plus 14,89 € je 30 Tage.
- **„ab“-Preise:** Welche Hardware zum Lifetime-Preis von 1.664,30 € gehört, siehst du im Konfigurator. Miet- und Lifetime-Einstieg gehören nicht zwingend zum selben Modell.

Als grobe Orientierung: 1.664,30 € ÷ (92,99 € − 14,89 €) ≈ 21 Monate. Rechne mit den Preisen deines Modells nach.

Beim Dedicated Server geht es um deutlich höhere Beträge. Deshalb gelten ein paar zusätzliche Überlegungen:

- **Hardware altert:** Finanziell rechnet sich der Kauf nach knapp zwei Jahren. Ob die Hardware in fünf Jahren noch zu deinen Anforderungen passt, ist eine andere Frage.
- **Defekte:** Kläre vorher, was bei einem Hardware-Defekt passiert und ob du gleichwertigen Ersatz bekommst.
- **Kapitalbindung:** Rund 1.700 € oder mehr sind weg, wenn das Projekt nach einem halben Jahr endet.

Sinnvoll ist ein gekaufter Dedicated Server für dauerhaft hohe Last: große Datenbanken, eigene Virtualisierung mit mehreren VMs oder rechenintensive Dienste. Ob du überhaupt einen Dedicated Server brauchst oder ein vServer reicht, klärt der Vergleich [vServer oder Dedicated Server](/blog/vserver-vs-dedicated-server).

## Mieten oder Lifetime: Die Entscheidungshilfe

| Situation | Empfehlung |
| --- | --- |
| Du testest ein Spiel, ein Tool oder eine Idee | Mieten |
| Server für ein Event, ein Turnier oder eine Saison | Mieten |
| Spiel in Early Access mit offener Roadmap | Mieten |
| Leistungsbedarf ist noch unklar | Erst mieten, nach ein paar Monaten entscheiden |
| Budget für eine Einmalzahlung fehlt | Mieten |
| Kleinstes Gameserver-Paket, kein ZapX Pass vorhanden | Mieten |
| Website oder Dienst läuft seit Monaten stabil | Lifetime prüfen |
| Feste Gruppe oder aktive Community | Lifetime prüfen |
| ZapX Pass läuft ohnehin schon | Lifetime prüfen, Break-even nach 11 Monaten |
| Geplante Laufzeit deutlich über dem Break-even | Lifetime |

Wenn du unsicher bist, beantworte dir vier Fragen:

1. Wie lange läuft das Projekt realistisch, nicht im besten Fall?
2. Wie sicher bist du, dass die gewählte Leistung auch in zwei Jahren noch reicht?
3. Kannst du die Einmalzahlung verschmerzen, falls das Projekt früher endet?
4. Hast du den ZapX Pass schon oder würdest du ihn nur für diesen einen Server bezahlen?

## Vor dem Kauf prüfen: Risiken und Checkliste

### Bedingungen des Anbieters lesen

„Lifetime“ bedeutet: für die Laufzeit des Produkts beim Anbieter. Lies vor dem Kauf die aktuellen Produkt- und Vertragsbedingungen von ZAP-Hosting. Achte darauf, was genau zum Paket gehört (Ressourcen, Traffic, IP-Adressen, Backups), ob Nutzungsregeln gelten und wie Upgrades berechnet werden.

### ZapX Pass einplanen

Der Pass ist die laufende Ausgabe, die bleibt. Rechne ihn von Anfang an ein und prüfe, welche Stufe du brauchst: Plus deckt zwei Lifetime-Server ab, Pro acht, Max beliebig viele. Endet der Pass, wird der Server laut ZAP-Hosting gesperrt, bis wieder ein Pass aktiv ist. Der Preis des Passes kann sich wie jeder Abo-Preis ändern.

### Was passiert bei Produktänderungen?

Produkte werden überarbeitet, Hardware wird ausgetauscht, Spiele werden eingestellt. Kläre, was dann mit deinem Lifetime-Paket passiert: Umzug auf neue Hardware, Wechsel auf ein vergleichbares Produkt oder Ende der Laufzeit. Wenn die Bedingungen dazu nichts sagen, frag den Support vor dem Kauf und lass dir die Antwort schriftlich geben.

### Dein Leistungsbedarf kann wachsen

Vergleiche nicht nur Einstiegspaket gegen Einstiegspaket, sondern rechne das wahrscheinliche Upgrade mit ein. Die Upgrade-Preise siehst du im Konfigurator. Wenn früh absehbar ist, dass du deutlich mehr brauchst, kauf gleich passend oder miete, bis der Bedarf klar ist.

### Backups bleiben deine Aufgabe

Lifetime ändert nichts an der Verantwortung für deine Daten. Backups im Panel liegen beim selben Anbieter wie der Server, auch die zusätzlichen Backup-Slots aus dem Pass. Bei versehentlichem Löschen, einem kompromittierten Account oder Problemen beim Anbieter hilft nur eine Kopie an einem anderen Ort. Wie du Sicherungen sauber planst, beschreibe ich im Artikel zur [Backup-Strategie](/blog/backup-strategie-mittelstand).

### Das Geld ist gebunden

Die Einmalzahlung bekommst du nicht zurück, wenn das Projekt vor dem Break-even endet. Beispiel Palworld: Hört die Gruppe nach drei Monaten auf, hast du 142,89 € für den Server und 14,97 € für den Pass bezahlt, zusammen 157,86 €. Die Miete hätte 38,97 € gekostet.

## Fazit

Ein Lifetime Server ist kein Selbstläufer. Der Server ist einmal bezahlt, der ZapX Pass läuft weiter. Dadurch rechnet sich der Kauf später, als der Preis vermuten lässt: bei einem Palworld-Server oder einem vServer mit 4 Kernen nach rund eineinhalb Jahren, bei den Einstiegspaketen für vServer nach knapp drei Jahren, beim kleinsten Gameserver allein gar nicht. Anders sieht es aus, wenn der Pass ohnehin läuft oder sich zwei Server einen Pass teilen. Wenn du unsicher bist, mietest du zuerst und wechselst, sobald klar ist, dass das Projekt bleibt. Vor dem Kauf gilt: Bedingungen im Shop prüfen, Pass und Upgrade-Kosten einplanen, Backups selbst organisieren.

<ZapHostingCta href="https://zap-hosting.com/vserverhomepage" title="Lifetime-Pakete bei ZAP-Hosting" description="Gameserver, vServer und Dedicated Server mieten oder als Lifetime-Server kaufen. Aktuelle Preise und Bedingungen findest du direkt beim Anbieter." couponCode="" buttonText="Pakete und Preise ansehen" />

Wenn du bei Einrichtung oder Betrieb deines Servers Unterstützung brauchst, [schreib mir gern](/kontakt).

## Häufige Fragen

### Ist ein Lifetime-Server wirklich unbegrenzt nutzbar?

Du bezahlst den Server einmal. Laut ZAP-Hosting, Stand November 2026, brauchst du dazu dauerhaft einen aktiven ZapX Pass, sonst wird der Server gesperrt. „Lifetime“ bezieht sich außerdem auf die Laufzeit des Produkts beim Anbieter. Was bei Produktänderungen oder bei der Einstellung eines Produkts passiert, regeln die Bedingungen von ZAP-Hosting. Lies sie vor dem Kauf.

### Was kostet ein Lifetime-Server laufend?

Den ZapX Pass: in der Stufe Plus 4,99 € je 30 Tage oder 3,74 € je 30 Tage bei 365 Tagen Laufzeit. Der Pass gilt für das ganze Konto und deckt in dieser Stufe zwei Lifetime-Server ab. Bei einem Dedicated Server kommt ein eigener Slot für 9,90 € je 30 Tage dazu.

### Kann ich einen Minecraft Server für immer kaufen?

Ja, als Lifetime-Server ab 49,39 €. Die Miete beginnt bei 4,49 € für 30 Tage. Weil der ZapX Pass mit 4,99 € mehr kostet als diese Miete, lohnt sich der Kauf beim kleinsten Paket nur, wenn der Pass ohnehin läuft.

### Wird ein Lifetime-Server bei Inaktivität gelöscht?

Laut ZAP-Hosting, Stand November 2026, gibt es mit aktivem ZapX Pass keine Aktivitätschecks. Der Server wird nicht wegen Inaktivität gesperrt oder gelöscht. Für ältere Lifetime-Server aus der Zeit vor dem Pass können eigene Regeln gelten, das klärt der Support.

### Kann ich einen Lifetime-Server später upgraden?

Die Upgrade-Möglichkeiten und Preise für dein Paket siehst du im Konfigurator. Beziehe sie vorab in deine Rechnung ein.

### Gilt der Rabattcode ZAPX-M26R79 auch für Lifetime?

Bei den Gameservern gilt der Code (20%) nur für Mietlaufzeiten, der Lifetime-Kauf ist ein Festpreis. Mit Rabatt auf die Miete dauert es länger, bis sich der Kauf rechnet.

### Läuft ein Lifetime-Server schlechter als ein Mietserver?

Nein. Er läuft im selben Rechenzentrum mit demselben Panel und derselben Verfügbarkeit. Unterschiedlich ist nur das Bezahlmodell.

### vServer oder Dedicated Server als Lifetime?

Für Webseiten, Docker und kleinere Dienste reicht meist ein vServer. Mit Pass rechnet er sich je nach Paket nach rund 19 bis 35 Monaten. Einen Dedicated Server brauchst du erst bei dauerhaft hoher Last oder wenn du eigene Hardware ohne andere Nutzer brauchst.
