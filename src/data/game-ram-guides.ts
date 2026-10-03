/**
 * Spieltypische Inhalte für die Unterseiten /server-ram-rechner/<spiel>.
 * Zahlen kommen aus src/data/server-ram.ts, hier stehen nur Texte.
 */
export type GameGuide = {
  /** Einleitung unter der Überschrift */
  intro: string;
  tips: { title: string; text: string }[];
  faqs: { question: string; answer: string }[];
  /** Passende Artikel im Blog */
  links?: { href: string; title: string }[];
};

export const GAME_GUIDES: Record<string, GameGuide> = {
  minecraft: {
    intro:
      'Ein Minecraft Server mit Vanilla oder Paper kommt mit wenig Arbeitsspeicher aus. Entscheidend sind die Zahl der Spieler, die Sichtweite und die Plugins.',
    tips: [
      { title: 'Paper statt Vanilla', text: 'Paper ist mit Vanilla-Clients kompatibel und deutlich sparsamer. Für Server mit mehreren Spielern ist es die übliche Wahl.' },
      { title: 'Sichtweite begrenzen', text: 'view-distance und simulation-distance in der server.properties haben großen Einfluss auf RAM und CPU. Werte um 8 bis 10 reichen meist.' },
      { title: 'Welt vorgenerieren', text: 'Mit einem Plugin wie Chunky erzeugst du die Welt vorab. Das verhindert Lastspitzen, wenn Spieler neue Gebiete erkunden.' },
    ],
    faqs: [
      { question: 'Reichen 2 GB RAM für einen Minecraft Server?', answer: 'Für wenige Spieler ohne Plugins ja. Mit mehr Spielern, größerer Sichtweite oder Plugins solltest du 4 GB einplanen.' },
      { question: 'Bringt mehr RAM bei Minecraft immer mehr Leistung?', answer: 'Nein. Zu viel zugewiesener Speicher kann sogar zu längeren Pausen bei der Speicherbereinigung führen. Wichtiger als sehr viel RAM ist eine schnelle CPU.' },
    ],
  },
  'minecraft-modpack': {
    intro:
      'Modpacks mit Forge, NeoForge oder Fabric brauchen deutlich mehr Speicher als ein Vanilla-Server. Schon das Laden der Mods belegt mehrere Gigabyte.',
    tips: [
      { title: 'Empfehlung des Modpacks lesen', text: 'Viele Modpacks nennen auf CurseForge oder Modrinth eine Mindestgröße für den Server. Nimm diesen Wert als Untergrenze.' },
      { title: 'Server-Pack verwenden', text: 'Nutze das offizielle Server-Pack. Reine Client-Mods belegen auf dem Server nur Speicher oder verhindern den Start.' },
      { title: 'Performance-Mods ergänzen', text: 'Mods wie FerriteCore oder ModernFix senken den Speicherverbrauch spürbar, sofern das Modpack sie nicht schon enthält.' },
    ],
    faqs: [
      { question: 'Wie viel RAM braucht ein großes Modpack wie All the Mods?', answer: 'Große Kitchen-Sink-Modpacks brauchen meist 10 bis 12 GB, bei vielen Spielern mehr. Stelle im Rechner die Größe auf „Viele“.' },
      { question: 'Warum startet mein Modpack-Server nicht?', answer: 'Häufige Ursachen sind zu wenig zugewiesener RAM, eine falsche Java-Version oder Client-Mods im Server-Ordner. Das Server-Log nennt meist die genaue Ursache.' },
    ],
  },
  'minecraft-bedrock': {
    intro: 'Der Bedrock Dedicated Server ist in C++ geschrieben und braucht deutlich weniger Speicher als die Java Edition.',
    tips: [
      { title: 'Sichtweite anpassen', text: 'view-distance und tick-distance in der server.properties steuern, wie viel der Welt geladen und simuliert wird.' },
      { title: 'Crossplay beachten', text: 'Bedrock-Spieler auf Konsole, Handy und PC können gemeinsam spielen. Java-Spieler brauchen dafür einen eigenen Java-Server.' },
      { title: 'Backups regelmäßig', text: 'Sichere den Welt-Ordner regelmäßig, am besten bei gestopptem Server oder mit dem Befehl save hold.' },
    ],
    faqs: [
      { question: 'Reicht 1 GB RAM für Minecraft Bedrock?', answer: 'Für eine kleine Gruppe meist ja. Für 10 Spieler empfiehlt der Rechner mit Puffer 2 GB, mit Add-ons 4 GB.' },
      { question: 'Können Java-Spieler auf einem Bedrock-Server spielen?', answer: 'Nicht direkt. Dafür gibt es Brücken wie Geyser, die auf einem Java-Server laufen und Bedrock-Spieler zulassen.' },
    ],
  },
  hytale: {
    intro:
      'Der Hytale Server läuft auf Java. Als offizielles Minimum gelten 4 GB Arbeitsspeicher, mit mehr Spielern und großer Sichtweite steigt der Bedarf.',
    tips: [
      { title: 'Sichtweite im Blick behalten', text: 'Eine große Sichtweite lädt mehr Welt in den Speicher. Passe sie an, wenn der Server bei vielen Spielern knapp wird.' },
      { title: 'Aktuelles Java verwenden', text: 'Der Server braucht eine aktuelle Java-Version. Eine passende Laufzeit wie Temurin vermeidet Startprobleme.' },
      { title: 'Erst mieten, dann entscheiden', text: 'Teste mit einem Mietserver, wie viel Speicher eure Welt wirklich braucht, und wechsle erst danach auf ein größeres Paket oder Lifetime.' },
    ],
    faqs: [
      { question: 'Wie viel RAM braucht ein Hytale Server mindestens?', answer: 'Offiziell 4 GB. Für eine Gruppe von 10 Spielern empfiehlt der Rechner mit Puffer 8 GB.' },
      { question: 'Kann ich einen Hytale Server selbst unter Linux betreiben?', answer: 'Ja. Wie das auf Debian oder Ubuntu funktioniert, zeigt die Anleitung im Blog Schritt für Schritt.' },
    ],
    links: [
      { href: '/blog/hytale-server-linux-installieren-debian-ubuntu', title: 'Hytale Server auf Linux installieren' },
      { href: '/blog/hytale-server-mieten', title: 'Hytale Server mieten oder kaufen' },
    ],
  },
  palworld: {
    intro:
      'Palworld ist für seinen hohen Speicherbedarf bekannt. Der Verbrauch wächst mit der Laufzeit, mit vielen Pals und großen Basen.',
    tips: [
      { title: 'Täglich neu starten', text: 'Ein geplanter Neustart zu einer ruhigen Uhrzeit gibt belegten Speicher frei und verhindert Abstürze nach langer Laufzeit.' },
      { title: 'Basen und Pals begrenzen', text: 'Viele Basen mit vielen arbeitenden Pals sind der größte Speicherfresser. Die Werte lassen sich in den Servereinstellungen begrenzen.' },
      { title: 'Backups vor Updates', text: 'Sichere den Spielstand vor jedem größeren Update. Gerade bei Early-Access-Spielen ändern sich Spielstände gelegentlich.' },
    ],
    faqs: [
      { question: 'Reichen 8 GB RAM für einen Palworld Server?', answer: 'Für wenige Spieler und kurze Laufzeiten ja. Für 8 Spieler empfiehlt der Rechner mit Puffer 16 GB, weil der Verbrauch mit der Zeit steigt.' },
      { question: 'Warum stürzt mein Palworld Server nach einigen Stunden ab?', answer: 'Meist ist der Speicher voll gelaufen. Mehr RAM und ein täglicher Neustart lösen das in den meisten Fällen.' },
    ],
    links: [
      { href: '/blog/palworld-server-mieten', title: 'Palworld Server mieten oder kaufen' },
      { href: '/palworld', title: 'Palworld Server: Preise im Überblick' },
    ],
  },
  enshrouded: {
    intro:
      'Ein Enshrouded Server bietet Platz für bis zu 16 Spieler. Der Speicherbedarf hängt vor allem von der Spielerzahl und der Größe eurer Basen ab.',
    tips: [
      { title: 'Spielerzahl festlegen', text: 'Lege die maximale Spielerzahl in der Konfiguration fest. Weniger Slots bedeuten weniger Last im Spielverlauf.' },
      { title: 'Mehrere Kerne einplanen', text: 'Der Server profitiert von mehreren schnellen Kernen, vor allem wenn viele Spieler gleichzeitig in verschiedenen Gebieten unterwegs sind.' },
      { title: 'Spielstände sichern', text: 'Sichere den Ordner mit den Spielständen regelmäßig, bevor ihr ein Update einspielt.' },
    ],
    faqs: [
      { question: 'Wie viele Spieler passen auf einen Enshrouded Server?', answer: 'Bis zu 16 Spieler gleichzeitig. Für 8 Spieler empfiehlt der Rechner mit Puffer 12 GB RAM.' },
      { question: 'Unterstützt Enshrouded Mods auf dem Server?', answer: 'Offiziell nicht. Deshalb gibt es im Rechner für Enshrouded keinen Regler für Mods.' },
    ],
  },
  satisfactory: {
    intro:
      'Satisfactory simuliert ganze Fabriken in Echtzeit. Der Server braucht schon zu Beginn viel Speicher, im späten Spiel mit großen Fabriken noch mehr.',
    tips: [
      { title: 'Mit Wachstum rechnen', text: 'Der Bedarf steigt mit der Größe der Fabrik, nicht nur mit der Spielerzahl. Plane für späte Spielphasen eine Stufe höher.' },
      { title: 'Hoher Takt vor vielen Kernen', text: 'Die Simulation profitiert vor allem von schnellen Kernen. Viele langsame Kerne helfen wenig.' },
      { title: 'Autosave nicht abschalten', text: 'Regelmäßiges Speichern kostet kurz Leistung, schützt aber vor Verlusten bei Abstürzen.' },
    ],
    faqs: [
      { question: 'Wie viel RAM braucht ein Satisfactory Server?', answer: 'Mindestens 12 GB. Für 4 Spieler empfiehlt der Rechner mit Puffer 16 GB, mit großen Fabriken und Mods mehr.' },
      { question: 'Warum ruckelt mein Satisfactory Server im späten Spiel?', answer: 'Große Fabriken belasten CPU und Speicher. Mehr RAM hilft gegen Abstürze, gegen Ruckler hilft vor allem eine schnellere CPU.' },
    ],
  },
  valheim: {
    intro: 'Valheim ist für bis zu 10 Spieler ausgelegt und gehört zu den sparsameren Survival-Spielen. Große, weit erkundete Welten brauchen etwas mehr.',
    tips: [
      { title: 'Welt-Backups nutzen', text: 'Der Server legt Sicherungen der Welt an. Kopiere sie zusätzlich an einen anderen Ort.' },
      { title: 'Mods auf allen Seiten gleich', text: 'Mit BepInEx-Mods müssen Server und Spieler meist dieselben Versionen nutzen.' },
      { title: 'Crossplay bewusst wählen', text: 'Crossplay mit Xbox und Game Pass lässt sich beim Start aktivieren. Ohne Bedarf bleibt es aus.' },
    ],
    faqs: [
      { question: 'Reichen 4 GB RAM für einen Valheim Server?', answer: 'Für eine kleine Gruppe ja. Für 10 Spieler oder mit Mods solltest du 6 bis 8 GB einplanen.' },
      { question: 'Wie viele Spieler passen auf einen Valheim Server?', answer: 'Offiziell bis zu 10 Spieler. Mit Mods lässt sich die Grenze anheben, das erhöht aber den Bedarf.' },
    ],
  },
  rust: {
    intro: 'Rust Server brauchen viel Speicher, schon für kleine Communities. Kartengröße, Bauten und Oxide-Plugins bestimmen den Bedarf.',
    tips: [
      { title: 'Kartengröße passend wählen', text: 'Große Karten brauchen deutlich mehr RAM und Ladezeit. Für kleine Gruppen reicht eine kleinere Karte.' },
      { title: 'Wipes einplanen', text: 'Regelmäßige Wipes halten die Zahl der Bauten und damit den Speicherbedarf im Rahmen.' },
      { title: 'Plugins sparsam einsetzen', text: 'Jedes Oxide-Plugin kostet etwas Leistung. Prüfe nach Updates, ob alle Plugins noch nötig und kompatibel sind.' },
    ],
    faqs: [
      { question: 'Wie viel RAM braucht ein Rust Server für 50 Spieler?', answer: 'Der Rechner empfiehlt mit Puffer 16 GB. Mit vielen Plugins und großer Karte sind 24 GB sinnvoll.' },
      { question: 'Warum braucht Rust nach einiger Zeit mehr Speicher?', answer: 'Mit jedem Tag kommen Bauten und Gegenstände hinzu. Deshalb steigt der Verbrauch bis zum nächsten Wipe.' },
    ],
  },
  ark: {
    intro: 'ARK: Survival Ascended gehört zu den speicherhungrigsten Gameservern. Schon ohne Mods sind 12 GB das Minimum.',
    tips: [
      { title: 'Viel Speicherplatz einplanen', text: 'Serverdateien, Karten und Mods belegen viel Platz. Rechne mit mehreren Dutzend Gigabyte.' },
      { title: 'Dinosaurier begrenzen', text: 'Viele gezähmte Dinos und große Basen erhöhen den Bedarf stetig. Grenzen für Zähmungen halten den Server stabil.' },
      { title: 'Eine Karte pro Server', text: 'Jede Karte läuft als eigener Serverprozess. Für einen Cluster brauchst du den Speicher mehrfach.' },
    ],
    faqs: [
      { question: 'Wie viel RAM braucht ein ARK Server?', answer: 'Mindestens 12 GB. Für 10 Spieler empfiehlt der Rechner mit Puffer 16 GB, mit vielen Mods eher 24 GB.' },
      { question: 'Brauche ich für einen ARK Cluster mehr RAM?', answer: 'Ja. Jede Karte ist ein eigener Server und braucht ihren eigenen Speicher.' },
    ],
  },
  'conan-exiles': {
    intro: 'Ein Conan Exiles Server kommt für kleine Gruppen mit moderatem Speicher aus. Große Clan-Basen, viele Thralls und Mods treiben den Bedarf nach oben.',
    tips: [
      { title: 'Mods früh festlegen', text: 'Mods nachträglich zu entfernen kann Spielstände beschädigen. Lege die Mod-Liste vor dem Start fest.' },
      { title: 'Verfall aktiv lassen', text: 'Der Gebäudeverfall räumt verlassene Basen auf und hält den Speicherbedarf im Rahmen.' },
      { title: 'Datenbank sichern', text: 'Der Spielstand liegt in einer Datenbankdatei. Sichere sie regelmäßig bei gestopptem Server.' },
    ],
    faqs: [
      { question: 'Wie viel RAM braucht ein Conan Exiles Server?', answer: 'Für 20 Spieler empfiehlt der Rechner mit Puffer 8 GB. Mit vielen Mods solltest du mehr einplanen.' },
      { question: 'Warum wird mein Conan Exiles Server mit der Zeit langsamer?', answer: 'Viele Gebäude und Thralls belasten Speicher und CPU. Der Gebäudeverfall und Grenzen für Thralls helfen.' },
    ],
  },
  '7-days-to-die': {
    intro: '7 Days to Die braucht vor allem während der Blutmond-Horden viel Leistung. Kartengröße und Zombie-Zahl bestimmen den Bedarf.',
    tips: [
      { title: 'Kartengröße wählen', text: 'Zufallskarten in großer Größe brauchen mehr Speicher und längere Ladezeiten. Für kleine Gruppen reicht eine kleinere Karte.' },
      { title: 'Horden-Größe anpassen', text: 'Die Zahl der Zombies pro Spieler in der Blutmond-Nacht lässt sich einstellen und entlastet CPU und RAM.' },
      { title: 'Mods auf Server und Client', text: 'Viele Mods müssen auf dem Server und bei allen Spielern installiert sein.' },
    ],
    faqs: [
      { question: 'Wie viel RAM braucht ein 7 Days to Die Server?', answer: 'Mindestens 8 GB. Für 8 Spieler empfiehlt der Rechner mit Puffer 12 GB, mit Overhaul-Mods mehr.' },
      { question: 'Warum laggt mein Server beim Blutmond?', answer: 'Dann sind besonders viele Zombies gleichzeitig aktiv. Mehr CPU-Leistung und eine kleinere Horden-Größe helfen.' },
    ],
  },
  'project-zomboid': {
    intro: 'Project Zomboid läuft auf Java. Der Bedarf hängt von der Zombie-Dichte, der Spielerzahl und vor allem von Mods ab.',
    tips: [
      { title: 'Speicher in der Startdatei setzen', text: 'Der zugewiesene Arbeitsspeicher wird beim Start über einen Java-Parameter festgelegt. Erhöhe ihn, wenn du mehr Mods nutzt.' },
      { title: 'Mod-Liste schlank halten', text: 'Große Karten-Mods brauchen viel Speicher. Prüfe, welche Mods ihr wirklich nutzt.' },
      { title: 'Zombie-Dichte anpassen', text: 'Eine niedrigere Bevölkerung entlastet den Server spürbar, gerade bei vielen Spielern.' },
    ],
    faqs: [
      { question: 'Wie viel RAM braucht ein Project Zomboid Server?', answer: 'Für 8 Spieler empfiehlt der Rechner mit Puffer 6 GB. Mit vielen Mods solltest du 8 GB und mehr einplanen.' },
      { question: 'Warum reicht der Speicher trotz freiem RAM nicht?', answer: 'Der Server nutzt nur den Speicher, der Java beim Start zugewiesen wurde. Erhöhe den Wert in der Startdatei.' },
    ],
  },
  fivem: {
    intro: 'Ein FiveM Server für GTA V Roleplay braucht je nach Framework, Skripten und Datenbank unterschiedlich viel Speicher.',
    tips: [
      { title: 'Datenbank mitrechnen', text: 'ESX und QBCore brauchen MariaDB oder MySQL. Läuft die Datenbank auf demselben Server, kommt ihr Speicher dazu.' },
      { title: 'Skripte prüfen', text: 'Mit dem Befehl resmon im Client siehst du, welche Ressourcen viel Leistung kosten. Schlecht programmierte Skripte sind die häufigste Ursache für Lags.' },
      { title: 'Template als Start', text: 'Ein fertiges Template spart Einrichtung und enthält bereits eine abgestimmte Auswahl an Skripten.' },
    ],
    faqs: [
      { question: 'Wie viel RAM braucht ein FiveM Server?', answer: 'Für 32 Spieler empfiehlt der Rechner mit Puffer 8 GB. Große Roleplay-Server mit vielen Skripten brauchen mehr.' },
      { question: 'Brauche ich für FiveM einen vServer?', answer: 'Für eigene Frameworks mit Datenbank ist ein vServer praktisch. Wähle dann im Rechner den Modus vServer und ergänze die Datenbank.' },
    ],
    links: [{ href: '/fivem-template-server', title: 'Kostenloses FiveM Template' }],
  },
  factorio: {
    intro: 'Factorio braucht wenig Arbeitsspeicher, aber eine schnelle CPU. Bei sehr großen Fabriken steigt auch der Speicherbedarf.',
    tips: [
      { title: 'Takt ist entscheidend', text: 'Die Simulation läuft größtenteils auf einem Kern. Ein schneller Kern bringt mehr als viele langsame.' },
      { title: 'Autosave-Intervall anpassen', text: 'Große Spielstände brauchen zum Speichern einige Sekunden. Ein längeres Intervall verringert spürbare Pausen.' },
      { title: 'Mods automatisch synchronisieren', text: 'Spieler laden fehlende Mods beim Beitreten automatisch herunter, wenn sie im Mod-Portal verfügbar sind.' },
    ],
    faqs: [
      { question: 'Wie viel RAM braucht ein Factorio Server?', answer: 'Für 10 Spieler empfiehlt der Rechner mit Puffer 4 GB. Megafabriken und große Mods brauchen mehr.' },
      { question: 'Warum sinkt die Spielgeschwindigkeit trotz freiem RAM?', answer: 'Dann ist die CPU am Limit. Factorio wird bei großen Fabriken eher durch den Prozessor als durch den Speicher begrenzt.' },
    ],
  },
  terraria: {
    intro: 'Ein Terraria Server ist sehr sparsam. Mit tModLoader und großen Mods wie Calamity steigt der Bedarf deutlich.',
    tips: [
      { title: 'Weltgröße wählen', text: 'Große Welten brauchen mehr Speicher und längere Ladezeiten als kleine.' },
      { title: 'tModLoader getrennt betreiben', text: 'Für Mods brauchst du den tModLoader-Server. Alle Spieler müssen dieselben Mods nutzen.' },
      { title: 'Welt regelmäßig sichern', text: 'Kopiere die Weltdatei regelmäßig an einen anderen Ort, besonders vor Updates.' },
    ],
    faqs: [
      { question: 'Reicht 1 GB RAM für einen Terraria Server?', answer: 'Für Vanilla und kleine Gruppen meist ja. Für 8 Spieler empfiehlt der Rechner mit Puffer 2 GB, mit vielen Mods 6 GB.' },
      { question: 'Wie viele Spieler passen auf einen Terraria Server?', answer: 'Bis zu 16 Spieler gleichzeitig. Der Speicherbedarf steigt dabei nur wenig.' },
    ],
  },
  cs2: {
    intro: 'Ein Counter-Strike 2 Server braucht wenig Arbeitsspeicher, aber viel Speicherplatz und eine schnelle CPU für eine stabile Tickrate.',
    tips: [
      { title: 'Speicherplatz einplanen', text: 'Die Serverdateien von CS2 belegen mehrere Dutzend Gigabyte. Plane genug SSD-Speicher ein.' },
      { title: 'Plugins mit Bedacht', text: 'Frameworks wie CounterStrikeSharp erweitern den Server. Viele Plugins kosten Leistung und müssen nach Updates oft angepasst werden.' },
      { title: 'Standort nah an den Spielern', text: 'Für kompetitive Spiele zählt der Ping. Wähle einen Standort nah an deinen Spielern.' },
    ],
    faqs: [
      { question: 'Wie viel RAM braucht ein CS2 Server?', answer: 'Für 20 Spieler empfiehlt der Rechner mit Puffer 4 GB. Der Arbeitsspeicher ist bei CS2 selten der Engpass.' },
      { question: 'Wie viel Speicherplatz braucht ein CS2 Server?', answer: 'Rechne mit rund 60 GB für Serverdateien, Updates und Demos.' },
    ],
  },
  teamspeak: {
    intro: 'Ein TeamSpeak 3 Server gehört zu den sparsamsten Diensten überhaupt und läuft problemlos neben anderen Anwendungen.',
    tips: [
      { title: 'Auf denselben Server packen', text: 'TeamSpeak braucht so wenig Speicher, dass er gut neben einem Gameserver oder einer Website auf einem vServer läuft.' },
      { title: 'Lizenz beachten', text: 'Ohne Lizenz ist die Zahl der Slots begrenzt. Für größere Communities brauchst du eine passende Lizenz.' },
      { title: 'Ports freigeben', text: 'TeamSpeak nutzt UDP für Sprache und TCP für Dateiübertragung und Abfragen. Gib nur die nötigen Ports in der Firewall frei.' },
    ],
    faqs: [
      { question: 'Wie viel RAM braucht ein TeamSpeak Server?', answer: 'Sehr wenig. Für 20 Nutzer empfiehlt der Rechner mit Puffer 1 GB, davon wird nur ein Bruchteil genutzt.' },
      { question: 'Kann TeamSpeak auf demselben Server wie ein Gameserver laufen?', answer: 'Ja. Wähle im Rechner den Modus vServer, das Spiel und ergänze die übrigen Dienste.' },
    ],
  },
};
