/**
 * Richtwerte für den RAM-Bedarf, gemeinsame Quelle für Tabelle und Rechner
 * im Artikel "Wie viel RAM braucht mein Server?". Werte bewusst eher großzügig:
 * Mods, Plugins, große Welten und lange Laufzeiten brauchen mehr.
 */

export const ZAP_GAMESERVER_URL = 'https://zap-hosting.com/achim';
export const ZAP_VSERVER_URL = 'https://zap-hosting.com/vserverhomepage';
export const ZAP_COUPON = 'GERMANGAMING';

export type GameProfile = {
  id: string;
  name: string;
  /** Grundbedarf des Servers in GB */
  base: number;
  /** Zusätzlicher Bedarf je Spieler in GB */
  perPlayer: number;
  /** Mindestempfehlung in GB, unabhängig von der Spielerzahl */
  min: number;
  maxPlayers: number;
  defaultPlayers: number;
  note: string;
  /** Eigene Partnerseite für das Spiel, sonst allgemeiner Gameserver-Link */
  url?: string;
};

export const GAMES: GameProfile[] = [
  { id: 'minecraft', name: 'Minecraft Java (Vanilla, Paper)', base: 2, perPlayer: 0.1, min: 2, maxPlayers: 100, defaultPlayers: 10, note: 'Große Sichtweite und viele Plugins erhöhen den Bedarf deutlich.' },
  { id: 'minecraft-modded', name: 'Minecraft Modpack (Forge, NeoForge, Fabric)', base: 6, perPlayer: 0.2, min: 6, maxPlayers: 50, defaultPlayers: 8, note: 'Große Modpacks brauchen oft 8 bis 12 GB, schon bei wenigen Spielern.' },
  { id: 'minecraft-bedrock', name: 'Minecraft Bedrock', base: 1, perPlayer: 0.05, min: 1, maxPlayers: 50, defaultPlayers: 10, note: 'Deutlich sparsamer als die Java Edition.' },
  { id: 'fivem', name: 'FiveM (GTA V Roleplay)', base: 3, perPlayer: 0.06, min: 4, maxPlayers: 128, defaultPlayers: 32, note: 'Große Roleplay-Server mit vielen Skripten und Datenbank brauchen eher 8 GB und mehr.' },
  { id: 'palworld', name: 'Palworld', base: 8, perPlayer: 0.25, min: 8, maxPlayers: 32, defaultPlayers: 8, note: 'Der Speicherbedarf wächst mit der Laufzeit, tägliche Neustarts helfen.', url: 'https://zap-hosting.com/serverpalworld' },
  { id: 'valheim', name: 'Valheim', base: 2, perPlayer: 0.2, min: 4, maxPlayers: 10, defaultPlayers: 5, note: 'Große, weit erkundete Welten brauchen mehr Speicher.' },
  { id: 'project-zomboid', name: 'Project Zomboid', base: 3, perPlayer: 0.15, min: 4, maxPlayers: 64, defaultPlayers: 8, note: 'Mods und hohe Zombie-Dichte treiben den Bedarf nach oben.' },
  { id: 'rust', name: 'Rust', base: 8, perPlayer: 0.05, min: 10, maxPlayers: 200, defaultPlayers: 50, note: 'Größere Karten und Oxide-Plugins brauchen oft 12 GB und mehr.' },
  { id: 'ark', name: 'ARK: Survival Ascended', base: 11, perPlayer: 0.1, min: 12, maxPlayers: 70, defaultPlayers: 10, note: 'Einer der speicherhungrigsten Gameserver, Mods kommen noch dazu.' },
  { id: 'terraria', name: 'Terraria', base: 1, perPlayer: 0.05, min: 1, maxPlayers: 16, defaultPlayers: 8, note: 'Mit tModLoader und großen Mods eher 2 bis 4 GB.' },
  { id: 'teamspeak', name: 'TeamSpeak 3', base: 0.25, perPlayer: 0.005, min: 0.25, maxPlayers: 200, defaultPlayers: 20, note: 'Sehr sparsam, läuft problemlos neben anderen Diensten.' },
];

export type AppProfile = {
  id: string;
  name: string;
  /** Typischer RAM-Bedarf in GB inklusive eigener Datenbank, falls nötig */
  ram: number;
  note: string;
  /** Artikel im Blog dazu */
  href?: string;
};

export const APPS: AppProfile[] = [
  { id: 'docker', name: 'Docker Engine', ram: 0.3, note: 'Grundlast für den Docker-Dienst selbst.', href: '/blog/docker-installation-linux' },
  { id: 'coolify', name: 'Coolify', ram: 2, note: 'Offizielles Minimum 2 GB, dazu kommen die Apps, die du damit betreibst.', href: '/blog/coolify-installation' },
  { id: 'portainer', name: 'Portainer', ram: 0.2, note: 'Verwaltung für Docker im Browser.', href: '/blog/portainer-installation-linux-docker-management' },
  { id: 'uptime-kuma', name: 'Uptime Kuma', ram: 0.2, note: 'Monitoring, am besten auf einem eigenen kleinen Server.', href: '/blog/uptime-kuma-installieren' },
  { id: 'wordpress', name: 'WordPress mit MariaDB', ram: 1, note: 'Mit Caching-Plugins und mehr Besuchern eher 2 GB.', href: '/blog/wordpress-installation-linux-server' },
  { id: 'nextjs', name: 'Next.js- oder Node.js-App', ram: 0.5, note: 'Beim Build kurzzeitig deutlich mehr, oft 1 bis 2 GB.' },
  { id: 'nextcloud', name: 'Nextcloud mit Datenbank und Redis', ram: 1.5, note: 'Mit Office-Integration (Collabora, OnlyOffice) eher 4 GB.' },
  { id: 'n8n', name: 'n8n (Automatisierung)', ram: 0.5, note: 'Viele parallele Workflows brauchen mehr.' },
  { id: 'umami', name: 'Umami mit PostgreSQL', ram: 0.5, note: 'Datenschutzfreundliche Webanalyse.', href: '/blog/umami-open-source-alternative-google-analytics' },
  { id: 'vaultwarden', name: 'Vaultwarden', ram: 0.1, note: 'Passwortmanager, sehr sparsam.' },
  { id: 'adguard', name: 'AdGuard Home oder Pi-hole', ram: 0.1, note: 'DNS-Filter, sehr sparsam.' },
  { id: 'database', name: 'Eigene Datenbank (PostgreSQL, MariaDB)', ram: 1, note: 'Für kleine Projekte, große Datenbanken brauchen deutlich mehr.' },
  { id: 'mailcow', name: 'Mailserver (mailcow)', ram: 6, note: 'Mit Virenscanner sehr speicherhungrig.' },
];

/** Grundbedarf des Betriebssystems (Debian, Ubuntu) in GB */
export const OS_BASE = 0.5;
/** Puffer für Spitzen, Updates und Wachstum */
export const HEADROOM = 1.25;
/** Übliche Paketgrößen in GB, auf die aufgerundet wird */
export const RAM_STEPS = [1, 2, 4, 6, 8, 12, 16, 24, 32, 48, 64, 128];

export function roundToStep(gb: number): number {
  return RAM_STEPS.find((step) => step >= gb) ?? Math.ceil(gb);
}

export function gameRam(game: GameProfile, players: number): number {
  return Math.max(game.min, game.base + game.perPlayer * players);
}

/** Formatiert GB-Werte deutsch, Werte unter 1 GB in MB */
export function formatGb(gb: number): string {
  if (gb < 1) return `${Math.round(gb * 1024)} MB`;
  return `${gb.toLocaleString('de-DE', { maximumFractionDigits: 1 })} GB`;
}
