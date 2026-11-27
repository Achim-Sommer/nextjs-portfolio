/**
 * Richtwerte für RAM, CPU und Speicherplatz. Gemeinsame Quelle für den
 * RAM-Rechner, die Tabellen, die Rechner-Seite und die Unterseiten pro Spiel.
 * Werte bewusst eher großzügig: Mods, Plugins, große Welten und lange
 * Laufzeiten brauchen mehr.
 */

import { APPS_EN, GAMES_EN } from './server-ram.en';

/** Sprache der Rechner-Seiten: Deutsch unter /server-ram-rechner, Englisch unter /en/server-ram-calculator */
export type Lang = 'de' | 'en';

export const RAM_PATH: Record<Lang, string> = { de: '/server-ram-rechner', en: '/en/server-ram-calculator' };

/** Abweichende Adressen der englischen Unterseiten, sonst gilt die ID */
const EN_SLUGS: Record<string, string> = { ls25: 'farming-simulator-25' };
export const gameSlug = (id: string, lang: Lang = 'de') => (lang === 'en' ? EN_SLUGS[id] ?? id : id);
export const gamePath = (id: string, lang: Lang = 'de') => `${RAM_PATH[lang]}/${gameSlug(id, lang)}`;
export const findGameBySlug = (slug: string, lang: Lang = 'de') => GAMES.find((g) => gameSlug(g.id, lang) === slug);

export const ZAP_GAMESERVER_URL = 'https://zap-hosting.com/achim';
export const ZAP_VSERVER_URL = 'https://zap-hosting.com/vserverhomepage';
export const ZAP_COUPON = 'ZAPX-M26R79';

/** Stand der Richtwerte, wird auf den Seiten angezeigt */
export const RAM_DATA_AS_OF = 'November 2026';
export const RAM_DATA_AS_OF_EN = 'November 2026';

export type ModLevel = 0 | 1 | 2;

export type GameProfile = {
  /** Kennung, zugleich Adresse der Unterseite /server-ram-rechner/<id> */
  id: string;
  name: string;
  /** Kurzname für Überschriften, z. B. „Minecraft Server“ */
  short: string;
  /** Grundbedarf des Servers in GB */
  base: number;
  /** Zusätzlicher Bedarf je Spieler in GB */
  perPlayer: number;
  /** Mindestempfehlung in GB, unabhängig von der Spielerzahl */
  min: number;
  maxPlayers: number;
  defaultPlayers: number;
  note: string;
  /** Zusätzlicher RAM in GB für „einige“ und „viele“ Mods oder Plugins, null = keine Mod-Unterstützung */
  mods: [number, number] | null;
  /** Bezeichnung für Erweiterungen in diesem Spiel */
  modLabel: string;
  /** vCPU-Kerne auf einem vServer bei normaler Spielerzahl */
  cores: number;
  /** Speicherplatz für Serverdateien und Spielstände in GB */
  disk: number;
  /** Kurzer Hinweis zur CPU */
  cpuNote: string;
  /** Eigene Partnerseite für das Spiel, sonst allgemeiner Gameserver-Link */
  url?: string;
};

export const GAMES: GameProfile[] = [
  { id: 'minecraft', name: 'Minecraft Java (Vanilla, Paper)', short: 'Minecraft Server', base: 2, perPlayer: 0.1, min: 2, maxPlayers: 100, defaultPlayers: 10, note: 'Große Sichtweite und viele Plugins erhöhen den Bedarf deutlich.', mods: [1, 3], modLabel: 'Plugins', cores: 2, disk: 10, cpuNote: 'Die Welt läuft größtenteils auf einem Kern, hoher Takt zählt mehr als viele Kerne.' },
  { id: 'minecraft-modpack', name: 'Minecraft Modpack (Forge, NeoForge, Fabric)', short: 'Minecraft Modpack Server', base: 6, perPlayer: 0.2, min: 6, maxPlayers: 50, defaultPlayers: 8, note: 'Große Modpacks brauchen oft 8 bis 12 GB, schon bei wenigen Spielern.', mods: [2, 4], modLabel: 'Größe des Modpacks', cores: 3, disk: 20, cpuNote: 'Viele Mods belasten vor allem einen Kern, hoher Takt ist wichtig.' },
  { id: 'all-the-mods-10', name: 'All the Mods 10 (ATM10)', short: 'All the Mods 10 Server', base: 8, perPlayer: 0.25, min: 8, maxPlayers: 30, defaultPlayers: 6, note: 'Eines der größten Modpacks für Minecraft 1.21. Unter 8 GB läuft der Server nicht stabil.', mods: null, modLabel: 'Mods', cores: 4, disk: 25, cpuNote: 'Hunderte Mods belasten vor allem einen Kern, hoher Takt ist wichtig.' },
  { id: 'better-mc', name: 'Better MC (BMC)', short: 'Better MC Server', base: 5, perPlayer: 0.2, min: 6, maxPlayers: 30, defaultPlayers: 6, note: 'Mittelgroßes Modpack mit neuen Biomen, Dimensionen und Bossen.', mods: null, modLabel: 'Mods', cores: 3, disk: 15, cpuNote: 'Neue Gebiete zu erzeugen kostet viel Rechenzeit, hoher Takt hilft.' },
  { id: 'rlcraft', name: 'RLCraft', short: 'RLCraft Server', base: 4, perPlayer: 0.2, min: 4, maxPlayers: 30, defaultPlayers: 6, note: 'Läuft auf Minecraft 1.12.2 und braucht weniger Speicher als aktuelle große Modpacks.', mods: null, modLabel: 'Mods', cores: 2, disk: 10, cpuNote: 'Viele Kreaturen und Strukturen belasten einen Kern stark.' },
  { id: 'minecraft-bedrock', name: 'Minecraft Bedrock', short: 'Minecraft Bedrock Server', base: 1, perPlayer: 0.05, min: 1, maxPlayers: 50, defaultPlayers: 10, note: 'Deutlich sparsamer als die Java Edition.', mods: [0.5, 1], modLabel: 'Add-ons', cores: 1, disk: 5, cpuNote: 'Kommt mit wenig CPU aus.' },
  { id: 'hytale', name: 'Hytale', short: 'Hytale Server', base: 4, perPlayer: 0.1, min: 4, maxPlayers: 100, defaultPlayers: 10, note: 'Offizielles Minimum sind 4 GB. Große Sichtweite und viele Spieler brauchen mehr.', mods: [1, 3], modLabel: 'Mods und Plugins', cores: 2, disk: 10, cpuNote: 'Der Server läuft auf Java, mehrere Kerne helfen beim Laden der Welt.' },
  { id: 'palworld', name: 'Palworld', short: 'Palworld Server', base: 8, perPlayer: 0.25, min: 8, maxPlayers: 32, defaultPlayers: 8, note: 'Der Speicherbedarf wächst mit der Laufzeit, tägliche Neustarts helfen.', mods: [1, 2], modLabel: 'Mods', cores: 4, disk: 15, cpuNote: 'Profitiert von mehreren Kernen, vor allem mit vielen Basen.', url: 'https://zap-hosting.com/serverpalworld' },
  { id: 'enshrouded', name: 'Enshrouded', short: 'Enshrouded Server', base: 6, perPlayer: 0.25, min: 6, maxPlayers: 16, defaultPlayers: 8, note: 'Große Basen und weit erkundete Gebiete erhöhen den Bedarf.', mods: null, modLabel: 'Mods', cores: 4, disk: 10, cpuNote: 'Mehrere Kerne mit hohem Takt halten die Welt flüssig.' },
  { id: 'satisfactory', name: 'Satisfactory', short: 'Satisfactory Server', base: 10, perPlayer: 0.5, min: 12, maxPlayers: 8, defaultPlayers: 4, note: 'Große Fabriken im späten Spiel brauchen eher 16 GB und mehr.', mods: [1, 3], modLabel: 'Mods', cores: 4, disk: 15, cpuNote: 'Fabriken werden in Echtzeit simuliert, hoher Takt ist entscheidend.' },
  { id: 'valheim', name: 'Valheim', short: 'Valheim Server', base: 2, perPlayer: 0.2, min: 4, maxPlayers: 10, defaultPlayers: 5, note: 'Große, weit erkundete Welten brauchen mehr Speicher.', mods: [0.5, 1.5], modLabel: 'Mods', cores: 2, disk: 5, cpuNote: 'Kommt mit zwei Kernen gut aus.' },
  { id: 'rust', name: 'Rust', short: 'Rust Server', base: 8, perPlayer: 0.05, min: 10, maxPlayers: 200, defaultPlayers: 50, note: 'Größere Karten und Oxide-Plugins brauchen oft 12 GB und mehr.', mods: [1, 3], modLabel: 'Oxide-Plugins', cores: 4, disk: 20, cpuNote: 'Viele Spieler und Bauten brauchen hohen Takt.' },
  { id: 'ark', name: 'ARK: Survival Ascended', short: 'ARK: Survival Ascended Server', base: 11, perPlayer: 0.1, min: 12, maxPlayers: 70, defaultPlayers: 10, note: 'Einer der speicherhungrigsten Gameserver, Mods kommen noch dazu.', mods: [2, 6], modLabel: 'Mods', cores: 4, disk: 40, cpuNote: 'Braucht mehrere schnelle Kerne, vor allem auf großen Karten.' },
  { id: 'conan-exiles', name: 'Conan Exiles', short: 'Conan Exiles Server', base: 4, perPlayer: 0.05, min: 4, maxPlayers: 70, defaultPlayers: 20, note: 'Große Clan-Basen und viele Thralls erhöhen den Bedarf.', mods: [1, 4], modLabel: 'Mods', cores: 2, disk: 30, cpuNote: 'Zwei schnelle Kerne reichen für kleine Server.' },
  { id: '7-days-to-die', name: '7 Days to Die', short: '7 Days to Die Server', base: 6, perPlayer: 0.15, min: 8, maxPlayers: 32, defaultPlayers: 8, note: 'Große Karten und Blutmond-Hordes mit vielen Zombies brauchen mehr.', mods: [1, 4], modLabel: 'Mods', cores: 4, disk: 15, cpuNote: 'Zombie-Horden belasten die CPU stark.' },
  { id: 'project-zomboid', name: 'Project Zomboid', short: 'Project Zomboid Server', base: 3, perPlayer: 0.15, min: 4, maxPlayers: 64, defaultPlayers: 8, note: 'Mods und hohe Zombie-Dichte treiben den Bedarf nach oben.', mods: [1, 3], modLabel: 'Mods', cores: 2, disk: 10, cpuNote: 'Läuft auf Java, zwei Kerne reichen für kleine Gruppen.' },
  { id: 'fivem', name: 'FiveM (GTA V Roleplay)', short: 'FiveM Server', base: 3, perPlayer: 0.06, min: 4, maxPlayers: 128, defaultPlayers: 32, note: 'Große Roleplay-Server mit vielen Skripten und Datenbank brauchen eher 8 GB und mehr.', mods: [1, 3], modLabel: 'Skripte und Ressourcen', cores: 2, disk: 20, cpuNote: 'Viele Skripte brauchen hohen Takt, die Datenbank läuft am besten auf demselben Server.' },
  { id: 'fivem-esx', name: 'FiveM mit ESX Legacy', short: 'FiveM ESX Server', base: 4, perPlayer: 0.06, min: 4, maxPlayers: 128, defaultPlayers: 32, note: 'Die Datenbank kommt dazu, wenn sie auf demselben Server läuft. Viele Skripte brauchen eher 8 GB und mehr.', mods: [1, 3], modLabel: 'Skripte und Ressourcen', cores: 2, disk: 25, cpuNote: 'Viele Skripte brauchen hohen Takt, die Datenbank läuft am besten auf demselben Server.' },
  { id: 'fivem-qbcore', name: 'FiveM mit QBCore', short: 'FiveM QBCore Server', base: 4, perPlayer: 0.06, min: 4, maxPlayers: 128, defaultPlayers: 32, note: 'Die Datenbank kommt dazu, wenn sie auf demselben Server läuft. Viele Skripte brauchen eher 8 GB und mehr.', mods: [1, 3], modLabel: 'Skripte und Ressourcen', cores: 2, disk: 25, cpuNote: 'Viele Skripte brauchen hohen Takt, die Datenbank läuft am besten auf demselben Server.' },
  { id: 'factorio', name: 'Factorio', short: 'Factorio Server', base: 1, perPlayer: 0.05, min: 2, maxPlayers: 100, defaultPlayers: 10, note: 'Sehr große Fabriken brauchen mehr Speicher und vor allem schnelle CPU.', mods: [0.5, 2], modLabel: 'Mods', cores: 2, disk: 5, cpuNote: 'Die Simulation läuft fast nur auf einem Kern, Takt ist alles.' },
  { id: 'terraria', name: 'Terraria', short: 'Terraria Server', base: 1, perPlayer: 0.05, min: 1, maxPlayers: 16, defaultPlayers: 8, note: 'Mit tModLoader und großen Mods eher 2 bis 4 GB.', mods: [0.5, 2], modLabel: 'tModLoader-Mods', cores: 1, disk: 2, cpuNote: 'Kommt mit einem Kern aus.' },
  { id: 'cs2', name: 'Counter-Strike 2', short: 'CS2 Server', base: 2, perPlayer: 0.03, min: 2, maxPlayers: 64, defaultPlayers: 20, note: 'Die Serverdateien sind groß, der RAM-Bedarf bleibt überschaubar.', mods: [0.5, 1], modLabel: 'Plugins', cores: 2, disk: 60, cpuNote: 'Hoher Takt sorgt für stabile Tickrate.' },
  { id: 'ark-survival-evolved', name: 'ARK: Survival Evolved', short: 'ARK: Survival Evolved Server', base: 6, perPlayer: 0.1, min: 6, maxPlayers: 70, defaultPlayers: 10, note: 'Deutlich sparsamer als Survival Ascended, große Karten und Mods brauchen trotzdem mehr.', mods: [2, 4], modLabel: 'Mods', cores: 2, disk: 30, cpuNote: 'Der Server nutzt vor allem einen Kern, hoher Takt zählt.' },
  { id: 'dayz', name: 'DayZ', short: 'DayZ Server', base: 6, perPlayer: 0.05, min: 6, maxPlayers: 100, defaultPlayers: 40, note: 'Gemoddete Server mit eigenen Karten, Händlern und viel Loot brauchen deutlich mehr.', mods: [2, 4], modLabel: 'Mods', cores: 4, disk: 20, cpuNote: 'Viele Spieler, Zombies und Fahrzeuge brauchen hohen Takt.' },
  { id: 'garrys-mod', name: "Garry's Mod", short: "Garry's Mod Server", base: 2, perPlayer: 0.03, min: 2, maxPlayers: 128, defaultPlayers: 24, note: 'Der Bedarf hängt fast nur von Spielmodus und Addons ab, etwa bei DarkRP.', mods: [1, 3], modLabel: 'Addons', cores: 2, disk: 15, cpuNote: 'Läuft im Kern auf einem Thread, hoher Takt ist wichtiger als viele Kerne.' },
  { id: 'v-rising', name: 'V Rising', short: 'V Rising Server', base: 4, perPlayer: 0.1, min: 6, maxPlayers: 40, defaultPlayers: 10, note: 'Viele große Burgen und lange Laufzeiten erhöhen den Bedarf.', mods: [1, 2], modLabel: 'Mods', cores: 4, disk: 10, cpuNote: 'Mehrere schnelle Kerne halten den Server bei vielen Burgen flüssig.' },
  { id: 'sons-of-the-forest', name: 'Sons of the Forest', short: 'Sons of the Forest Server', base: 6, perPlayer: 0.5, min: 8, maxPlayers: 8, defaultPlayers: 4, note: 'Große Basen und lange Spielstände brauchen mehr Speicher.', mods: null, modLabel: 'Mods', cores: 4, disk: 10, cpuNote: 'Gegner und Bauten werden auf dem Server simuliert, schnelle Kerne helfen.' },
  { id: 'ls25', name: 'Landwirtschafts-Simulator 25 (LS25)', short: 'LS25 Server', base: 4, perPlayer: 0.15, min: 4, maxPlayers: 16, defaultPlayers: 8, note: 'Mod-Karten und viele Fahrzeug-Mods erhöhen den Bedarf deutlich.', mods: [1, 3], modLabel: 'Mods', cores: 2, disk: 60, cpuNote: 'Zwei schnelle Kerne reichen, viele Fahrzeuge und Helfer kosten Leistung.' },
  { id: 'arma-3', name: 'Arma 3', short: 'Arma 3 Server', base: 4, perPlayer: 0.05, min: 4, maxPlayers: 100, defaultPlayers: 30, note: 'Life-Server und große Mod-Sammlungen brauchen mehr, dazu kommt oft eine Datenbank.', mods: [2, 4], modLabel: 'Mods', cores: 4, disk: 20, cpuNote: 'Die KI belastet einen Kern stark, ein Headless Client verteilt die Last.' },
  { id: 'arma-reforger', name: 'Arma Reforger', short: 'Arma Reforger Server', base: 4, perPlayer: 0.05, min: 6, maxPlayers: 128, defaultPlayers: 32, note: 'Viele KI-Einheiten und Mods aus dem Workshop erhöhen den Bedarf.', mods: [2, 4], modLabel: 'Mods', cores: 4, disk: 20, cpuNote: 'Viele Spieler und KI brauchen mehrere schnelle Kerne.' },
  { id: 'space-engineers', name: 'Space Engineers', short: 'Space Engineers Server', base: 6, perPlayer: 0.25, min: 8, maxPlayers: 16, defaultPlayers: 6, note: 'Große Schiffe, viele Blöcke und Planeten brauchen eher 16 GB.', mods: [1, 3], modLabel: 'Mods', cores: 4, disk: 10, cpuNote: 'Die Physik hängt stark an einem Kern, hoher Takt hält die Simulationsgeschwindigkeit oben.' },
  { id: 'soulmask', name: 'Soulmask', short: 'Soulmask Server', base: 10, perPlayer: 0.2, min: 12, maxPlayers: 50, defaultPlayers: 10, note: 'Große Stämme mit vielen arbeitenden Stammesmitgliedern brauchen mehr.', mods: [1, 2], modLabel: 'Mods', cores: 4, disk: 15, cpuNote: 'Profitiert von mehreren schnellen Kernen.' },
  { id: 'unturned', name: 'Unturned', short: 'Unturned Server', base: 2, perPlayer: 0.05, min: 2, maxPlayers: 48, defaultPlayers: 16, note: 'Große Workshop-Karten und viele Plugins erhöhen den Bedarf.', mods: [0.5, 2], modLabel: 'Workshop-Mods und Plugins', cores: 2, disk: 5, cpuNote: 'Kommt mit zwei Kernen gut aus.' },
  { id: 'vintage-story', name: 'Vintage Story', short: 'Vintage Story Server', base: 2, perPlayer: 0.3, min: 2, maxPlayers: 32, defaultPlayers: 8, note: 'Jeder Spieler lädt eigene Teile der Welt, deshalb wächst der Bedarf mit der Spielerzahl spürbar.', mods: [0.5, 2], modLabel: 'Mods', cores: 2, disk: 5, cpuNote: 'Mehrere Kerne helfen beim Erzeugen neuer Gebiete.' },
  { id: 'dont-starve-together', name: "Don't Starve Together", short: "Don't Starve Together Server", base: 1.5, perPlayer: 0.1, min: 2, maxPlayers: 16, defaultPlayers: 6, note: 'Oberwelt und Höhlen laufen als zwei getrennte Prozesse, ohne Höhlen reicht weniger.', mods: [0.5, 1.5], modLabel: 'Mods', cores: 2, disk: 5, cpuNote: 'Jede der beiden Welten nutzt einen Kern.' },
  { id: 'teamspeak', name: 'TeamSpeak 3', short: 'TeamSpeak Server', base: 0.25, perPlayer: 0.005, min: 0.25, maxPlayers: 200, defaultPlayers: 20, note: 'Sehr sparsam, läuft problemlos neben anderen Diensten.', mods: null, modLabel: 'Plugins', cores: 1, disk: 1, cpuNote: 'Braucht kaum CPU.' },
];

export type AppProfile = {
  id: string;
  name: string;
  /** Typischer RAM-Bedarf in GB inklusive eigener Datenbank, falls nötig */
  ram: number;
  /** Anteil an einem CPU-Kern im normalen Betrieb */
  cpu: number;
  /** Speicherplatz in GB ohne Nutzdaten */
  disk: number;
  note: string;
  /** Kann mehrfach laufen, z. B. mehrere Apps oder Datenbanken */
  multi?: boolean;
  /** Artikel im Blog dazu */
  href?: string;
};

export const APPS: AppProfile[] = [
  { id: 'docker', name: 'Docker Engine', ram: 0.3, cpu: 0.1, disk: 5, note: 'Grundlast für den Docker-Dienst selbst.', href: '/blog/docker-installation-linux' },
  { id: 'coolify', name: 'Coolify', ram: 2, cpu: 0.5, disk: 10, note: 'Offizielles Minimum 2 GB, dazu kommen die Apps, die du damit betreibst.', href: '/blog/coolify-installation' },
  { id: 'portainer', name: 'Portainer', ram: 0.2, cpu: 0.1, disk: 1, note: 'Verwaltung für Docker im Browser.', href: '/blog/portainer-installation-linux-docker-management' },
  { id: 'uptime-kuma', name: 'Uptime Kuma', ram: 0.2, cpu: 0.1, disk: 1, note: 'Monitoring, am besten auf einem eigenen kleinen Server.', href: '/blog/uptime-kuma-installieren' },
  { id: 'wordpress', name: 'WordPress mit MariaDB', ram: 1, cpu: 0.25, disk: 5, multi: true, note: 'Mit Caching-Plugins und mehr Besuchern eher 2 GB.', href: '/blog/wordpress-installation-linux-server' },
  { id: 'nextjs', name: 'Next.js- oder Node.js-App', ram: 0.5, cpu: 0.25, disk: 3, multi: true, note: 'Beim Build kurzzeitig deutlich mehr, oft 1 bis 2 GB.' },
  { id: 'discord-bot', name: 'Discord-Bot', ram: 0.2, cpu: 0.1, disk: 1, multi: true, note: 'Kleine Bots in Node.js oder Python sind sehr sparsam.' },
  { id: 'nextcloud', name: 'Nextcloud mit Datenbank und Redis', ram: 1.5, cpu: 0.5, disk: 20, note: 'Mit Office-Integration (Collabora, OnlyOffice) eher 4 GB. Dateien kommen beim Speicher dazu.' },
  { id: 'n8n', name: 'n8n (Automatisierung)', ram: 0.5, cpu: 0.2, disk: 2, note: 'Viele parallele Workflows brauchen mehr.' },
  { id: 'umami', name: 'Umami mit PostgreSQL', ram: 0.5, cpu: 0.1, disk: 2, note: 'Datenschutzfreundliche Webanalyse.', href: '/blog/umami-open-source-alternative-google-analytics' },
  { id: 'vaultwarden', name: 'Vaultwarden', ram: 0.1, cpu: 0.05, disk: 1, note: 'Passwortmanager, sehr sparsam.' },
  { id: 'adguard', name: 'AdGuard Home oder Pi-hole', ram: 0.1, cpu: 0.05, disk: 1, note: 'DNS-Filter, sehr sparsam.' },
  { id: 'database', name: 'Eigene Datenbank (PostgreSQL, MariaDB)', ram: 1, cpu: 0.25, disk: 10, multi: true, note: 'Für kleine Projekte, große Datenbanken brauchen deutlich mehr.' },
  { id: 'mailcow', name: 'Mailserver (mailcow)', ram: 6, cpu: 1, disk: 20, note: 'Mit Virenscanner sehr speicherhungrig.' },
];

/** Grundbedarf des Betriebssystems (Debian, Ubuntu) */
export const OS_BASE = 0.5;
export const OS_CPU = 0.5;
export const OS_DISK = 10;
/** Puffer für Spitzen, Updates und Wachstum */
export const HEADROOM = 1.25;
/** Puffer für Logs, Backups und Updates beim Speicherplatz */
export const DISK_HEADROOM = 1.3;
/** Übliche Paketgrößen, auf die aufgerundet wird */
export const RAM_STEPS = [1, 2, 4, 6, 8, 12, 16, 24, 32, 48, 64, 128];
export const CORE_STEPS = [1, 2, 3, 4, 6, 8, 12, 16];
export const DISK_STEPS = [10, 20, 40, 60, 80, 100, 120, 160, 200, 250, 320, 500];

export const MOD_LEVELS: { value: ModLevel; label: string }[] = [
  { value: 0, label: 'Keine' },
  { value: 1, label: 'Einige' },
  { value: 2, label: 'Viele' },
];
const MOD_LEVELS_EN: typeof MOD_LEVELS = [
  { value: 0, label: 'None' },
  { value: 1, label: 'Some' },
  { value: 2, label: 'Many' },
];
export const modLevels = (lang: Lang = 'de') => (lang === 'en' ? MOD_LEVELS_EN : MOD_LEVELS);

/** Spiel mit Texten in der gewünschten Sprache, Zahlen bleiben gleich */
export function localizeGame(game: GameProfile, lang: Lang = 'de'): GameProfile {
  return lang === 'en' && GAMES_EN[game.id] ? { ...game, ...GAMES_EN[game.id] } : game;
}

export function localizeApp(app: AppProfile, lang: Lang = 'de'): AppProfile {
  return lang === 'en' && APPS_EN[app.id] ? { ...app, ...APPS_EN[app.id] } : app;
}

/** Stand der Richtwerte in der gewünschten Sprache */
export const ramDataAsOf = (lang: Lang = 'de') => (lang === 'en' ? RAM_DATA_AS_OF_EN : RAM_DATA_AS_OF);

const roundUp = (steps: number[], value: number) => steps.find((step) => step >= value) ?? Math.ceil(value);

export function roundToStep(gb: number): number {
  return roundUp(RAM_STEPS, gb);
}

export const findGame = (id: string) => GAMES.find((g) => g.id === id);

/** RAM eines Gameservers ohne Puffer */
export function gameRam(game: GameProfile, players: number, mods: ModLevel = 0): number {
  return Math.max(game.min, game.base + game.perPlayer * players) + modRam(game, mods);
}

export function modRam(game: GameProfile, mods: ModLevel): number {
  if (!game.mods || mods === 0) return 0;
  return game.mods[mods - 1];
}

/** Empfohlene Paketgröße inklusive Puffer */
export function recommendGame(game: GameProfile, players: number, mods: ModLevel = 0): number {
  return roundToStep(gameRam(game, players, mods) * HEADROOM);
}

/** Formatiert GB-Werte, Werte unter 1 GB in MB */
export function formatGb(gb: number, lang: Lang = 'de'): string {
  if (gb < 1) return `${Math.round(gb * 1024)} MB`;
  return `${gb.toLocaleString(lang === 'en' ? 'en-US' : 'de-DE', { maximumFractionDigits: 1 })} GB`;
}

/**
 * Umkehrung des Rechners: Wie viele Spieler passen in ein Paket dieser Größe?
 * 0 = das Paket ist für dieses Spiel zu klein.
 */
export function maxPlayersFor(game: GameProfile, ramGb: number, mods: ModLevel = 0): number {
  for (let players = game.maxPlayers; players >= 1; players--) {
    if (recommendGame(game, players, mods) <= ramGb) return players;
  }
  return 0;
}

/** Kleinstes Paket, in dem das Spiel überhaupt läuft */
export const minPackage = (game: GameProfile, mods: ModLevel = 0) => recommendGame(game, 1, mods);

export type Mode = 'game' | 'vserver';

/** Alles, was der Rechner eingestellt hat. Lässt sich als Adresse teilen. */
export type RamInput = {
  mode: Mode;
  /** Im vServer-Modus optional: leer = kein Gameserver auf dem vServer */
  gameId: string;
  players: number;
  mods: ModLevel;
  /** Dienste mit Anzahl */
  apps: Record<string, number>;
};

export type RamPart = { key: string; label: string; gb: number };

export type RamResult = {
  parts: RamPart[];
  need: number;
  buffer: number;
  recommended: number;
  /** Nur im vServer-Modus */
  cores?: number;
  disk?: number;
};

export function calculate(input: RamInput, lang: Lang = 'de'): RamResult {
  const en = lang === 'en';
  const parts: RamPart[] = [];
  let cpu = 0;
  let disk = 0;
  const found = input.gameId ? findGame(input.gameId) : undefined;
  const game = found ? localizeGame(found, lang) : undefined;

  if (input.mode === 'vserver') {
    parts.push({ key: 'os', label: en ? 'Operating system' : 'Betriebssystem', gb: OS_BASE });
    // Die Kern-Empfehlung eines Spiels deckt das Betriebssystem bereits mit ab
    if (!game) cpu += OS_CPU;
    disk += OS_DISK;
  }

  if (game) {
    const players = Math.min(input.players, game.maxPlayers);
    const playerPart = game.perPlayer * players;
    const total = Math.max(game.min, game.base + playerPart);
    parts.push({ key: 'game', label: en ? `${game.short}, base` : `${game.short}, Grundbedarf`, gb: total - playerPart });
    if (playerPart > 0) parts.push({ key: 'players', label: en ? `${players} players` : `${players} Spieler`, gb: playerPart });
    const mods = modRam(game, input.mods);
    if (mods > 0) parts.push({ key: 'mods', label: game.modLabel, gb: mods });
    cpu += game.cores + (players > game.maxPlayers * 0.5 ? 1 : 0) + (input.mods === 2 ? 1 : 0);
    disk += game.disk + (input.mods === 2 ? 10 : 0);
  }

  if (input.mode === 'vserver') {
    for (const raw of APPS) {
      const app = localizeApp(raw, lang);
      const count = input.apps[app.id] ?? 0;
      if (count <= 0) continue;
      parts.push({ key: app.id, label: count > 1 ? `${app.name} × ${count}` : app.name, gb: app.ram * count });
      cpu += app.cpu * count;
      disk += app.disk * count;
    }
  }

  const need = parts.reduce((sum, p) => sum + p.gb, 0);
  const recommended = roundToStep(need * HEADROOM);
  return {
    parts,
    need,
    buffer: need * (HEADROOM - 1),
    recommended,
    ...(input.mode === 'vserver'
      ? { cores: roundUp(CORE_STEPS, Math.max(1, cpu)), disk: roundUp(DISK_STEPS, disk * DISK_HEADROOM) }
      : {}),
  };
}

/* ---------- Teilen per Adresse ---------- */

export function toQuery(input: RamInput): string {
  const params = new URLSearchParams();
  params.set('modus', input.mode === 'game' ? 'gameserver' : 'vserver');
  if (input.gameId) {
    params.set('spiel', input.gameId);
    params.set('spieler', String(input.players));
    if (input.mods) params.set('mods', String(input.mods));
  }
  if (input.mode === 'vserver') {
    const apps = Object.entries(input.apps)
      .filter(([, n]) => n > 0)
      .map(([id, n]) => (n > 1 ? `${id}*${n}` : id))
      .join(',');
    if (apps) params.set('dienste', apps);
  }
  return params.toString().replace(/%2C/g, ',').replace(/%2A/g, '*');
}

export function fromQuery(search: string, fallback: RamInput): RamInput {
  const params = new URLSearchParams(search);
  if (![...params.keys()].length) return fallback;
  const mode: Mode = params.get('modus') === 'vserver' ? 'vserver' : params.get('modus') === 'gameserver' ? 'game' : fallback.mode;
  const spiel = params.get('spiel');
  const game = spiel ? findGame(spiel) : undefined;
  // Im vServer-Modus ohne „spiel“ läuft kein Gameserver mit
  const gameId = game ? game.id : mode === 'vserver' ? '' : fallback.gameId;
  const players = Number(params.get('spieler'));
  const mods = Number(params.get('mods'));
  const apps: Record<string, number> = {};
  for (const entry of (params.get('dienste') ?? '').split(',').filter(Boolean)) {
    const [id, n] = entry.split('*');
    if (APPS.some((a) => a.id === id)) apps[id] = Math.max(1, Math.min(10, Number(n) || 1));
  }
  const current = findGame(gameId);
  return {
    mode,
    gameId,
    players: current && players > 0 ? Math.min(players, current.maxPlayers) : current?.defaultPlayers ?? fallback.players,
    mods: (mods === 1 || mods === 2 ? mods : 0) as ModLevel,
    apps: params.has('dienste') ? apps : mode === 'vserver' ? fallback.apps : {},
  };
}

/* ---------- Formulierungen für erzeugte Texte ---------- */

/** „vielen Plugins“ bzw. „many plugins“, passend hinter „mit“ / „with“. Erwartet ein Spiel in der Zielsprache. */
export function manyMods(game: GameProfile, lang: Lang = 'de'): string {
  if (game.id === 'minecraft-modpack') return lang === 'en' ? 'a large modpack' : 'einem großen Modpack';
  return lang === 'en' ? `many ${game.modLabel}` : `vielen ${game.modLabel.replace('Skripte ', 'Skripten ')}`;
}

/** „ ohne Plugins“ bzw. „ without plugins“, mit führendem Leerzeichen */
export function noMods(game: GameProfile, lang: Lang = 'de'): string {
  if (game.id === 'minecraft-modpack') return lang === 'en' ? ' with a small modpack' : ' mit einem kleinen Modpack';
  return lang === 'en' ? ` without ${game.modLabel}` : ` ohne ${game.modLabel}`;
}

/** Englischer unbestimmter Artikel vor dem Kurznamen, z. B. „an ARK server“ */
export const article = (short: string) => (/^([aeiou]|RL)/i.test(short) ? 'an' : 'a');
