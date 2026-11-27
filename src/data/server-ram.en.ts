/**
 * English texts for the server RAM calculator. Numbers stay in
 * src/data/server-ram.ts, this file only holds translated strings,
 * keyed by the same ids as GAMES, APPS and GAME_GUIDES.
 */
import type { GameGuide } from './game-ram-guides';

export type GameText = {
  /** Full name as shown in the select, e.g. 'Minecraft Java (Vanilla, Paper)' */
  name: string;
  /** Short name for headings, e.g. 'Minecraft server' */
  short: string;
  note: string;
  /** Label for mods or plugins, works after "many " and "no " */
  modLabel: string;
  cpuNote: string;
};

export const GAMES_EN: Record<string, GameText> = {
  minecraft: { name: 'Minecraft Java (Vanilla, Paper)', short: 'Minecraft server', note: 'A large view distance and many plugins increase the requirement considerably.', modLabel: 'plugins', cpuNote: 'The world runs mostly on a single core, so clock speed matters more than core count.' },
  'minecraft-modpack': { name: 'Minecraft modpack (Forge, NeoForge, Fabric)', short: 'Minecraft modpack server', note: 'Large modpacks often need 8 to 12 GB, even with only a few players.', modLabel: 'modpack size', cpuNote: 'Many mods mainly load a single core, so high clock speed is important.' },
  'all-the-mods-10': { name: 'All the Mods 10 (ATM10)', short: 'All the Mods 10 server', note: 'One of the largest modpacks for Minecraft 1.21. The server does not run reliably with less than 8 GB.', modLabel: 'mods', cpuNote: 'Hundreds of mods mainly load a single core, so high clock speed is important.' },
  'better-mc': { name: 'Better MC (BMC)', short: 'Better MC server', note: 'Medium-sized modpack with new biomes, dimensions and bosses.', modLabel: 'mods', cpuNote: 'Generating new terrain takes a lot of CPU time, so high clock speed helps.' },
  rlcraft: { name: 'RLCraft', short: 'RLCraft server', note: 'Runs on Minecraft 1.12.2 and needs less memory than current large modpacks.', modLabel: 'mods', cpuNote: 'Many creatures and structures put a heavy load on a single core.' },
  'minecraft-bedrock': { name: 'Minecraft Bedrock', short: 'Minecraft Bedrock server', note: 'Much lighter on memory than the Java Edition.', modLabel: 'add-ons', cpuNote: 'Gets by with little CPU.' },
  hytale: { name: 'Hytale', short: 'Hytale server', note: 'The official minimum is 4 GB. A large view distance and many players need more.', modLabel: 'mods and plugins', cpuNote: 'The server runs on Java, and multiple cores help when loading the world.' },
  palworld: { name: 'Palworld', short: 'Palworld server', note: 'Memory usage grows with uptime, so daily restarts help.', modLabel: 'mods', cpuNote: 'Benefits from multiple cores, especially with many bases.' },
  enshrouded: { name: 'Enshrouded', short: 'Enshrouded server', note: 'Large bases and widely explored areas increase the requirement.', modLabel: 'mods', cpuNote: 'Multiple cores with high clock speed keep the world running smoothly.' },
  satisfactory: { name: 'Satisfactory', short: 'Satisfactory server', note: 'Large late-game factories tend to need 16 GB or more.', modLabel: 'mods', cpuNote: 'Factories are simulated in real time, so high clock speed is crucial.' },
  valheim: { name: 'Valheim', short: 'Valheim server', note: 'Large, widely explored worlds need more memory.', modLabel: 'mods', cpuNote: 'Runs well on two cores.' },
  rust: { name: 'Rust', short: 'Rust server', note: 'Larger maps and Oxide plugins often need 12 GB or more.', modLabel: 'Oxide plugins', cpuNote: 'Many players and buildings need high clock speed.' },
  ark: { name: 'ARK: Survival Ascended', short: 'ARK: Survival Ascended server', note: 'One of the most memory-hungry game servers, and mods come on top.', modLabel: 'mods', cpuNote: 'Needs several fast cores, especially on large maps.' },
  'conan-exiles': { name: 'Conan Exiles', short: 'Conan Exiles server', note: 'Large clan bases and many thralls increase the requirement.', modLabel: 'mods', cpuNote: 'Two fast cores are enough for small servers.' },
  '7-days-to-die': { name: '7 Days to Die', short: '7 Days to Die server', note: 'Large maps and blood moon hordes with many zombies need more.', modLabel: 'mods', cpuNote: 'Zombie hordes put a heavy load on the CPU.' },
  'project-zomboid': { name: 'Project Zomboid', short: 'Project Zomboid server', note: 'Mods and a high zombie density drive the requirement up.', modLabel: 'mods', cpuNote: 'Runs on Java, and two cores are enough for small groups.' },
  fivem: { name: 'FiveM (GTA V roleplay)', short: 'FiveM server', note: 'Large roleplay servers with many scripts and a database tend to need 8 GB or more.', modLabel: 'scripts and resources', cpuNote: 'Many scripts need high clock speed, and the database runs best on the same server.' },
  'fivem-esx': { name: 'FiveM with ESX Legacy', short: 'FiveM ESX server', note: 'The database comes on top if it runs on the same server. Many scripts tend to need 8 GB or more.', modLabel: 'scripts and resources', cpuNote: 'Many scripts need high clock speed, and the database runs best on the same server.' },
  'fivem-qbcore': { name: 'FiveM with QBCore', short: 'FiveM QBCore server', note: 'The database comes on top if it runs on the same server. Many scripts tend to need 8 GB or more.', modLabel: 'scripts and resources', cpuNote: 'Many scripts need high clock speed, and the database runs best on the same server.' },
  factorio: { name: 'Factorio', short: 'Factorio server', note: 'Very large factories need more memory and, above all, a fast CPU.', modLabel: 'mods', cpuNote: 'The simulation runs almost entirely on a single core, so clock speed is everything.' },
  terraria: { name: 'Terraria', short: 'Terraria server', note: 'With tModLoader and large mods, expect 2 to 4 GB.', modLabel: 'tModLoader mods', cpuNote: 'Gets by with one core.' },
  cs2: { name: 'Counter-Strike 2', short: 'CS2 server', note: 'The server files are large, but the RAM requirement stays modest.', modLabel: 'plugins', cpuNote: 'High clock speed keeps the tick rate stable.' },
  'ark-survival-evolved': { name: 'ARK: Survival Evolved', short: 'ARK: Survival Evolved server', note: 'Much lighter than Survival Ascended, but large maps and mods still need more.', modLabel: 'mods', cpuNote: 'The server mainly uses a single core, so clock speed counts.' },
  dayz: { name: 'DayZ', short: 'DayZ server', note: 'Modded servers with custom maps, traders and lots of loot need considerably more.', modLabel: 'mods', cpuNote: 'Many players, zombies and vehicles need high clock speed.' },
  'garrys-mod': { name: "Garry's Mod", short: "Garry's Mod server", note: 'The requirement depends almost entirely on the game mode and addons, for example with DarkRP.', modLabel: 'addons', cpuNote: 'Essentially runs on a single thread, so clock speed matters more than core count.' },
  'v-rising': { name: 'V Rising', short: 'V Rising server', note: 'Many large castles and long uptimes increase the requirement.', modLabel: 'mods', cpuNote: 'Several fast cores keep the server smooth with many castles.' },
  'sons-of-the-forest': { name: 'Sons of the Forest', short: 'Sons of the Forest server', note: 'Large bases and long-running saves need more memory.', modLabel: 'mods', cpuNote: 'Enemies and buildings are simulated on the server, so fast cores help.' },
  ls25: { name: 'Farming Simulator 25 (FS25)', short: 'Farming Simulator 25 server', note: 'Mod maps and many vehicle mods increase the requirement considerably.', modLabel: 'mods', cpuNote: 'Two fast cores are enough, but many vehicles and AI workers cost performance.' },
  'arma-3': { name: 'Arma 3', short: 'Arma 3 server', note: 'Life servers and large mod collections need more, and a database often comes on top.', modLabel: 'mods', cpuNote: 'The AI puts a heavy load on a single core, and a headless client spreads the load.' },
  'arma-reforger': { name: 'Arma Reforger', short: 'Arma Reforger server', note: 'Many AI units and Workshop mods increase the requirement.', modLabel: 'mods', cpuNote: 'Many players and AI units need several fast cores.' },
  'space-engineers': { name: 'Space Engineers', short: 'Space Engineers server', note: 'Large ships, many blocks and planets tend to need 16 GB.', modLabel: 'mods', cpuNote: 'The physics depend heavily on a single core, and high clock speed keeps the simulation speed up.' },
  soulmask: { name: 'Soulmask', short: 'Soulmask server', note: 'Large tribes with many working tribesmen need more.', modLabel: 'mods', cpuNote: 'Benefits from several fast cores.' },
  unturned: { name: 'Unturned', short: 'Unturned server', note: 'Large Workshop maps and many plugins increase the requirement.', modLabel: 'Workshop mods and plugins', cpuNote: 'Runs well on two cores.' },
  'vintage-story': { name: 'Vintage Story', short: 'Vintage Story server', note: 'Each player loads their own parts of the world, so the requirement grows noticeably with the player count.', modLabel: 'mods', cpuNote: 'Multiple cores help when generating new terrain.' },
  'dont-starve-together': { name: "Don't Starve Together", short: "Don't Starve Together server", note: 'The overworld and the caves run as two separate processes, so less is enough without caves.', modLabel: 'mods', cpuNote: 'Each of the two worlds uses one core.' },
  teamspeak: { name: 'TeamSpeak 3', short: 'TeamSpeak server', note: 'Very light, runs alongside other services without problems.', modLabel: 'plugins', cpuNote: 'Needs hardly any CPU.' },
};

export const APPS_EN: Record<string, { name: string; note: string }> = {
  docker: { name: 'Docker Engine', note: 'Base load for the Docker service itself.' },
  coolify: { name: 'Coolify', note: 'The official minimum is 2 GB, plus the apps you run with it.' },
  portainer: { name: 'Portainer', note: 'Docker management in the browser.' },
  'uptime-kuma': { name: 'Uptime Kuma', note: 'Monitoring, ideally on its own small server.' },
  wordpress: { name: 'WordPress with MariaDB', note: 'With caching plugins and more visitors, expect 2 GB.' },
  nextjs: { name: 'Next.js or Node.js app', note: 'Considerably more for a short time during the build, often 1 to 2 GB.' },
  'discord-bot': { name: 'Discord bot', note: 'Small bots written in Node.js or Python are very light.' },
  nextcloud: { name: 'Nextcloud with database and Redis', note: 'With an office integration (Collabora, OnlyOffice), expect 4 GB. Your files come on top for disk space.' },
  n8n: { name: 'n8n (automation)', note: 'Many parallel workflows need more.' },
  umami: { name: 'Umami with PostgreSQL', note: 'Privacy-friendly web analytics.' },
  vaultwarden: { name: 'Vaultwarden', note: 'Password manager, very light.' },
  adguard: { name: 'AdGuard Home or Pi-hole', note: 'DNS filter, very light.' },
  database: { name: 'Database (PostgreSQL, MariaDB)', note: 'For small projects. Large databases need considerably more.' },
  mailcow: { name: 'Mail server (mailcow)', note: 'Very memory-hungry with the virus scanner enabled.' },
};

/** Same shape as the German guides, but without `links`. */
export const GAME_GUIDES_EN: Record<string, GameGuide> = {
  minecraft: {
    intro:
      'A Minecraft server running Vanilla or Paper gets by with little memory. What matters is the number of players, the view distance and the plugins.',
    tips: [
      { title: 'Paper instead of Vanilla', text: 'Paper is compatible with Vanilla clients and uses considerably fewer resources. It is the usual choice for servers with several players.' },
      { title: 'Limit the view distance', text: 'view-distance and simulation-distance in server.properties have a big impact on RAM and CPU. Values around 8 to 10 are usually enough.' },
      { title: 'Pre-generate the world', text: 'A plugin such as Chunky lets you generate the world in advance. This prevents load spikes when players explore new areas.' },
    ],
    faqs: [
      { question: 'Is 2 GB of RAM enough for a Minecraft server?', answer: 'For a few players without plugins, yes. With more players, a larger view distance or plugins, you should plan for 4 GB.' },
      { question: 'Does more RAM always mean better Minecraft performance?', answer: 'No. Allocating too much memory can even lead to longer garbage collection pauses. A fast CPU matters more than a very large amount of RAM.' },
    ],
  },
  'minecraft-modpack': {
    intro:
      'Modpacks with Forge, NeoForge or Fabric need considerably more memory than a Vanilla server. Loading the mods alone takes up several gigabytes.',
    tips: [
      { title: 'Read the modpack recommendation', text: 'Many modpacks state a minimum server size on CurseForge or Modrinth. Treat that value as the lower limit.' },
      { title: 'Use the server pack', text: 'Use the official server pack. Client-only mods just take up memory on the server or prevent it from starting.' },
      { title: 'Add performance mods', text: 'Mods such as FerriteCore or ModernFix noticeably reduce memory usage, unless the modpack already includes them.' },
    ],
    faqs: [
      { question: 'How much RAM does a large modpack like All the Mods need?', answer: 'Large kitchen-sink modpacks usually need 10 to 12 GB, and more with many players. Set the size in the calculator to "Many".' },
      { question: 'Why does my modpack server not start?', answer: 'Common causes are too little allocated RAM, the wrong Java version or client mods in the server folder. The server log usually names the exact cause.' },
    ],
  },
  'all-the-mods-10': {
    intro: 'All the Mods 10 is one of the largest modpacks for Minecraft 1.21 and runs on NeoForge. Just starting up with several hundred mods takes up many gigabytes.',
    tips: [
      { title: 'Use the modpack server files', text: 'Download the official server files from CurseForge. They contain only the mods the server needs and a matching start script.' },
      { title: 'Set the memory in the start script', text: 'The allocated memory is set through Java parameters. Do not allocate all of the RAM, because the system needs some for itself.' },
      { title: 'Load chunks sparingly', text: 'Permanently loaded chunks with large factories use the most memory. Limit how many chunks each player may keep loaded.' },
    ],
    faqs: [
      { question: 'Is 8 GB of RAM enough for All the Mods 10?', answer: 'The server starts with it, but it is no more than the lower limit. With headroom for growing bases, the calculator recommends 12 GB even for small groups.' },
      { question: 'Which Java version does All the Mods 10 need?', answer: 'Java 21, the same as Minecraft 1.21 itself.' },
    ],
  },
  'better-mc': {
    intro: 'Better MC adds new biomes, dimensions, bosses and structures to Minecraft. The modpack is medium-sized and needs noticeably more memory than Vanilla.',
    tips: [
      { title: 'Choose the right version', text: 'Better MC is available for several Minecraft versions and mod loaders. The server and the players must use the same edition.' },
      { title: 'Pre-generate the world', text: 'The many new biomes and structures make generating new terrain expensive. A pre-generated world avoids lag while exploring.' },
      { title: 'Limit the view distance', text: 'A view distance of 8 to 10 chunks is usually enough and saves memory and CPU.' },
    ],
    faqs: [
      { question: 'Is 6 GB of RAM enough for a Better MC server?', answer: 'The server runs with it, but it is no more than the lower limit. With headroom, the calculator recommends 8 GB.' },
      { question: 'Why does my Better MC server lag while exploring?', answer: 'Generating new terrain with many structures takes CPU time. A pre-generated world and a smaller view distance help.' },
    ],
  },
  rlcraft: {
    intro: 'RLCraft runs on Minecraft 1.12.2 with Forge. The modpack needs less memory than current large modpacks, but considerably more than a Vanilla server.',
    tips: [
      { title: 'Use Java 8', text: 'Minecraft 1.12.2 and the RLCraft mods are built for Java 8. With newer versions the server usually does not start.' },
      { title: 'Do not allocate too much RAM', text: 'On this old version, a very large memory allocation makes garbage collection pauses longer. Stay close to the recommendation.' },
      { title: 'Pre-generate the world', text: 'The many structures make generating new terrain slow. A pre-generated world takes load off the server.' },
    ],
    faqs: [
      { question: 'Is 4 GB of RAM enough for an RLCraft server?', answer: 'The server runs with it, but it is no more than the lower limit. With headroom, the calculator recommends 6 to 8 GB.' },
      { question: 'Which Minecraft version does RLCraft use?', answer: 'Minecraft 1.12.2 with Forge. All players need the same version of the modpack as the server.' },
    ],
  },
  'minecraft-bedrock': {
    intro: 'The Bedrock Dedicated Server is written in C++ and needs considerably less memory than the Java Edition.',
    tips: [
      { title: 'Adjust the view distance', text: 'view-distance and tick-distance in server.properties control how much of the world is loaded and simulated.' },
      { title: 'Keep crossplay in mind', text: 'Bedrock players on console, mobile and PC can play together. Java players need a separate Java server.' },
      { title: 'Back up regularly', text: 'Back up the world folder regularly, ideally with the server stopped or using the save hold command.' },
    ],
    faqs: [
      { question: 'Is 1 GB of RAM enough for Minecraft Bedrock?', answer: 'For a small group, usually yes. For 10 players the calculator recommends 2 GB including headroom, and 4 GB with add-ons.' },
      { question: 'Can Java players join a Bedrock server?', answer: 'Not directly. There are bridges such as Geyser, which run on a Java server and let Bedrock players join.' },
    ],
  },
  hytale: {
    intro:
      'The Hytale server runs on Java. The official minimum is 4 GB of memory, and the requirement rises with more players and a large view distance.',
    tips: [
      { title: 'Keep an eye on the view distance', text: 'A large view distance loads more of the world into memory. Adjust it if the server runs short with many players.' },
      { title: 'Use a current Java version', text: 'The server needs a current Java version. A suitable runtime such as Temurin avoids startup problems.' },
      { title: 'Rent first, then decide', text: 'Use a rented server to test how much memory your world really needs, and only then switch to a larger plan or a one-time purchase.' },
    ],
    faqs: [
      { question: 'How much RAM does a Hytale server need at minimum?', answer: 'Officially 4 GB. For a group of 10 players, the calculator recommends 8 GB including headroom.' },
      { question: 'Can I run a Hytale server myself on Linux?', answer: 'Yes, the server runs on Debian or Ubuntu.' },
    ],
  },
  palworld: {
    intro:
      'Palworld is known for its high memory requirement. Usage grows with uptime, with many Pals and with large bases.',
    tips: [
      { title: 'Restart daily', text: 'A scheduled restart at a quiet time frees up memory and prevents crashes after long uptimes.' },
      { title: 'Limit bases and Pals', text: 'Many bases with many working Pals use the most memory. You can limit both values in the server settings.' },
      { title: 'Back up before updates', text: 'Back up the save before every major update. Saves occasionally change, especially in early access games.' },
    ],
    faqs: [
      { question: 'Is 8 GB of RAM enough for a Palworld server?', answer: 'For a few players and short uptimes, yes. For 8 players the calculator recommends 16 GB including headroom, because usage rises over time.' },
      { question: 'Why does my Palworld server crash after a few hours?', answer: 'Usually the memory has filled up. More RAM and a daily restart solve this in most cases.' },
    ],
  },
  enshrouded: {
    intro:
      'An Enshrouded server has room for up to 16 players. The memory requirement depends mainly on the player count and the size of your bases.',
    tips: [
      { title: 'Set the player count', text: 'Set the maximum number of players in the configuration. Fewer slots mean less load as the game progresses.' },
      { title: 'Plan for multiple cores', text: 'The server benefits from several fast cores, especially when many players are in different areas at the same time.' },
      { title: 'Back up your saves', text: 'Back up the save folder regularly and before you install an update.' },
    ],
    faqs: [
      { question: 'How many players fit on an Enshrouded server?', answer: 'Up to 16 players at the same time. For 8 players the calculator recommends 12 GB of RAM including headroom.' },
      { question: 'Does Enshrouded support mods on the server?', answer: 'Not officially. That is why the calculator has no mod setting for Enshrouded.' },
    ],
  },
  satisfactory: {
    intro:
      'Satisfactory simulates entire factories in real time. The server needs a lot of memory from the start, and even more in the late game with large factories.',
    tips: [
      { title: 'Expect growth', text: 'The requirement rises with the size of the factory, not just with the player count. Plan one step higher for the late game.' },
      { title: 'Clock speed over core count', text: 'The simulation benefits mainly from fast cores. Many slow cores help little.' },
      { title: 'Do not turn off autosave', text: 'Regular saving briefly costs performance, but it protects you from losses after a crash.' },
    ],
    faqs: [
      { question: 'How much RAM does a Satisfactory server need?', answer: 'At least 12 GB. For 4 players the calculator recommends 16 GB including headroom, and more with large factories and mods.' },
      { question: 'Why does my Satisfactory server stutter in the late game?', answer: 'Large factories put load on CPU and memory. More RAM helps against crashes, while a faster CPU is what helps most against stuttering.' },
    ],
  },
  valheim: {
    intro: 'Valheim is designed for up to 10 players and is one of the lighter survival games. Large, widely explored worlds need a bit more.',
    tips: [
      { title: 'Use world backups', text: 'The server creates backups of the world. Copy them to another location as well.' },
      { title: 'Same mods on every side', text: 'With BepInEx mods, the server and the players usually have to use the same versions.' },
      { title: 'Enable crossplay deliberately', text: 'Crossplay with Xbox and Game Pass can be enabled at startup. Leave it off if you do not need it.' },
    ],
    faqs: [
      { question: 'Is 4 GB of RAM enough for a Valheim server?', answer: 'For a small group, yes. For 10 players or with mods, you should plan for 6 to 8 GB.' },
      { question: 'How many players fit on a Valheim server?', answer: 'Officially up to 10 players. Mods can raise the limit, but that increases the requirement.' },
    ],
  },
  rust: {
    intro: 'Rust servers need a lot of memory, even for small communities. Map size, buildings and Oxide plugins determine the requirement.',
    tips: [
      { title: 'Choose a suitable map size', text: 'Large maps need considerably more RAM and loading time. A smaller map is enough for small groups.' },
      { title: 'Plan for wipes', text: 'Regular wipes keep the number of buildings, and with it the memory requirement, in check.' },
      { title: 'Use plugins sparingly', text: 'Every Oxide plugin costs some performance. After updates, check whether all plugins are still needed and compatible.' },
    ],
    faqs: [
      { question: 'How much RAM does a Rust server need for 50 players?', answer: 'The calculator recommends 16 GB including headroom. With many plugins and a large map, 24 GB makes sense.' },
      { question: 'Why does Rust need more memory after a while?', answer: 'Buildings and items are added every day. That is why usage rises until the next wipe.' },
    ],
  },
  ark: {
    intro: 'ARK: Survival Ascended is one of the most memory-hungry game servers. Even without mods, 12 GB is the minimum.',
    tips: [
      { title: 'Plan for a lot of disk space', text: 'Server files, maps and mods take up a lot of space. Expect several dozen gigabytes.' },
      { title: 'Limit dinosaurs', text: 'Many tamed dinos and large bases steadily increase the requirement. Taming limits keep the server stable.' },
      { title: 'One map per server', text: 'Each map runs as its own server process. For a cluster you need the memory several times over.' },
    ],
    faqs: [
      { question: 'How much RAM does an ARK: Survival Ascended server need?', answer: 'At least 12 GB. For 10 players the calculator recommends 16 GB including headroom, and more like 24 GB with many mods.' },
      { question: 'Do I need more RAM for an ARK cluster?', answer: 'Yes. Each map is a separate server and needs its own memory.' },
    ],
  },
  'conan-exiles': {
    intro: 'A Conan Exiles server gets by with a moderate amount of memory for small groups. Large clan bases, many thralls and mods drive the requirement up.',
    tips: [
      { title: 'Decide on mods early', text: 'Removing mods later can corrupt saves. Settle on the mod list before you start.' },
      { title: 'Leave decay enabled', text: 'Building decay clears abandoned bases and keeps the memory requirement in check.' },
      { title: 'Back up the database', text: 'The save is stored in a database file. Back it up regularly with the server stopped.' },
    ],
    faqs: [
      { question: 'How much RAM does a Conan Exiles server need?', answer: 'For 20 players the calculator recommends 8 GB including headroom. With many mods you should plan for more.' },
      { question: 'Why does my Conan Exiles server get slower over time?', answer: 'Many buildings and thralls put load on memory and CPU. Building decay and thrall limits help.' },
    ],
  },
  '7-days-to-die': {
    intro: '7 Days to Die needs a lot of performance, especially during blood moon hordes. Map size and the number of zombies determine the requirement.',
    tips: [
      { title: 'Choose the map size', text: 'Large random maps need more memory and longer loading times. A smaller map is enough for small groups.' },
      { title: 'Adjust the horde size', text: 'The number of zombies per player during the blood moon night can be configured, which takes load off CPU and RAM.' },
      { title: 'Mods on server and client', text: 'Many mods have to be installed on the server and by all players.' },
    ],
    faqs: [
      { question: 'How much RAM does a 7 Days to Die server need?', answer: 'At least 8 GB. For 8 players the calculator recommends 12 GB including headroom, and more with overhaul mods.' },
      { question: 'Why does my server lag during the blood moon?', answer: 'That is when a particularly large number of zombies are active at once. More CPU power and a smaller horde size help.' },
    ],
  },
  'project-zomboid': {
    intro: 'Project Zomboid runs on Java. The requirement depends on the zombie density, the player count and, above all, on mods.',
    tips: [
      { title: 'Set the memory in the start file', text: 'The allocated memory is set at startup through a Java parameter. Increase it if you use more mods.' },
      { title: 'Keep the mod list lean', text: 'Large map mods need a lot of memory. Check which mods you actually use.' },
      { title: 'Adjust the zombie density', text: 'A lower population noticeably takes load off the server, especially with many players.' },
    ],
    faqs: [
      { question: 'How much RAM does a Project Zomboid server need?', answer: 'For 8 players the calculator recommends 6 GB including headroom. With many mods you should plan for 8 GB or more.' },
      { question: 'Why does the server run out of memory even though RAM is free?', answer: 'The server only uses the memory that was allocated to Java at startup. Increase the value in the start file.' },
    ],
  },
  fivem: {
    intro: 'A FiveM server for GTA V roleplay needs a different amount of memory depending on the framework, the scripts and the database.',
    tips: [
      { title: 'Include the database', text: 'ESX and QBCore need MariaDB or MySQL. If the database runs on the same server, its memory comes on top.' },
      { title: 'Check your scripts', text: 'The resmon command in the client shows you which resources cost a lot of performance. Poorly written scripts are the most common cause of lag.' },
      { title: 'Start from a template', text: 'A ready-made template saves setup work and already contains a well-matched selection of scripts.' },
    ],
    faqs: [
      { question: 'How much RAM does a FiveM server need?', answer: 'For 32 players the calculator recommends 8 GB including headroom. Large roleplay servers with many scripts need more.' },
      { question: 'Do I need a VPS for FiveM?', answer: 'For custom frameworks with a database, a VPS is practical. In that case, select the VPS tab in the calculator and add the database.' },
    ],
  },
  'fivem-esx': {
    intro: 'ESX Legacy is the most widely used framework for FiveM roleplay. The memory requirement depends on the number of scripts and on the database.',
    tips: [
      { title: 'Include the database', text: 'ESX stores players, vehicles and inventories in MariaDB or MySQL. If the database runs on the same server, its memory comes on top.' },
      { title: 'Start with a template', text: 'A ready-made ESX template contains a well-matched selection of scripts and saves you the basic setup.' },
      { title: 'Check scripts with resmon', text: 'The resmon command shows which resources cost a lot of performance. A few bad scripts slow down the whole server.' },
    ],
    faqs: [
      { question: 'Do I need a database for an ESX server?', answer: 'Yes. ESX Legacy needs MariaDB or MySQL. Select the VPS tab in the calculator and add "Database (PostgreSQL, MariaDB)" if it runs on the same server.' },
      { question: 'Does ESX need more RAM than QBCore?', answer: 'The frameworks themselves are close to each other. The difference comes from the number and quality of the scripts.' },
    ],
  },
  'fivem-qbcore': {
    intro: 'Alongside ESX, QBCore is the second major framework for FiveM roleplay. The memory requirement depends on the number of scripts and on the database.',
    tips: [
      { title: 'Include the database', text: 'QBCore stores player data in MariaDB or MySQL. If the database runs on the same server, its memory comes on top.' },
      { title: 'Scripts that match the framework', text: 'Scripts are usually written for a specific framework. When buying or downloading, make sure they support QBCore.' },
      { title: 'Check scripts with resmon', text: 'The resmon command shows which resources cost a lot of performance. A few bad scripts slow down the whole server.' },
    ],
    faqs: [
      { question: 'Do I need a database for a QBCore server?', answer: 'Yes. QBCore needs MariaDB or MySQL. Select the VPS tab in the calculator and add "Database (PostgreSQL, MariaDB)" if it runs on the same server.' },
      { question: 'Does QBCore need more RAM than ESX?', answer: 'The frameworks themselves are close to each other. The difference comes from the number and quality of the scripts.' },
    ],
  },
  factorio: {
    intro: 'Factorio needs little memory, but a fast CPU. With very large factories the memory requirement rises as well.',
    tips: [
      { title: 'Clock speed is key', text: 'The simulation runs mostly on a single core. One fast core does more than many slow ones.' },
      { title: 'Adjust the autosave interval', text: 'Large saves take a few seconds to write. A longer interval reduces noticeable pauses.' },
      { title: 'Sync mods automatically', text: 'Players download missing mods automatically when joining, as long as the mods are available on the mod portal.' },
    ],
    faqs: [
      { question: 'How much RAM does a Factorio server need?', answer: 'For 10 players the calculator recommends 4 GB including headroom. Megabases and large mods need more.' },
      { question: 'Why does the game speed drop even though RAM is free?', answer: 'In that case the CPU is at its limit. With large factories, Factorio is limited by the processor rather than by memory.' },
    ],
  },
  terraria: {
    intro: 'A Terraria server is very light. With tModLoader and large mods such as Calamity, the requirement rises considerably.',
    tips: [
      { title: 'Choose the world size', text: 'Large worlds need more memory and longer loading times than small ones.' },
      { title: 'Run tModLoader separately', text: 'For mods you need the tModLoader server. All players must use the same mods.' },
      { title: 'Back up the world regularly', text: 'Copy the world file to another location regularly, especially before updates.' },
    ],
    faqs: [
      { question: 'Is 1 GB of RAM enough for a Terraria server?', answer: 'For Vanilla and small groups, usually yes. For 8 players the calculator recommends 2 GB including headroom, and 6 GB with many mods.' },
      { question: 'How many players fit on a Terraria server?', answer: 'Up to 16 players at the same time. The memory requirement rises only slightly with them.' },
    ],
  },
  cs2: {
    intro: 'A Counter-Strike 2 server needs little memory, but a lot of disk space and a fast CPU for a stable tick rate.',
    tips: [
      { title: 'Plan for disk space', text: 'The CS2 server files take up several dozen gigabytes. Plan for enough SSD storage.' },
      { title: 'Choose plugins with care', text: 'Frameworks such as CounterStrikeSharp extend the server. Many plugins cost performance and often need adjusting after updates.' },
      { title: 'Location close to the players', text: 'Ping matters in competitive games. Choose a location close to your players.' },
    ],
    faqs: [
      { question: 'How much RAM does a CS2 server need?', answer: 'For 20 players the calculator recommends 4 GB including headroom. Memory is rarely the bottleneck with CS2.' },
      { question: 'How much disk space does a CS2 server need?', answer: 'Expect around 60 GB for server files, updates and demos.' },
    ],
  },
  'ark-survival-evolved': {
    intro: 'ARK: Survival Evolved needs less memory than its successor, Survival Ascended. The map, the mods and the number of tamed dinos determine the requirement.',
    tips: [
      { title: 'One server per map', text: 'In a cluster, each map runs as its own server with its own memory. Calculate the requirement per map.' },
      { title: 'Choose mods sparingly', text: 'Every mod from the Steam Workshop makes startup longer and takes up memory. Large overhaul mods weigh in particularly heavily.' },
      { title: 'Set dino limits', text: 'Many tamed dinos put load on memory and CPU. A limit per tribe keeps the server stable.' },
    ],
    faqs: [
      { question: 'Does ARK: Survival Evolved need less RAM than Survival Ascended?', answer: 'Yes, considerably less. Survival Ascended uses Unreal Engine 5 and needs several times as much memory even without players.' },
      { question: 'How much RAM does an ARK cluster need?', answer: 'Calculate each map separately and add up the values, because each map runs as its own server process.' },
    ],
  },
  dayz: {
    intro: 'A DayZ server simulates zombies, animals, loot and vehicles across the entire map. With mods such as custom maps and traders, the requirement rises considerably.',
    tips: [
      { title: 'Restart regularly', text: 'Restarts every few hours are common. They free up memory and redistribute loot and vehicles.' },
      { title: 'Do not overdo the loot', text: 'Very high loot amounts in the Central Economy cost memory and performance. Raise the values in small steps.' },
      { title: 'Keep mods up to date', text: 'The server and the players need the same mod versions. After Workshop updates you have to update the mods on the server.' },
    ],
    faqs: [
      { question: 'Why does a modded DayZ server need so much RAM?', answer: 'Custom maps, traders, base building and additional items increase the amount of data the server keeps in memory permanently.' },
      { question: 'Why does my DayZ server lag with many players?', answer: 'Usually the CPU is the bottleneck. Many bases, vehicles and zombies mainly load a single core, so high clock speed helps.' },
    ],
  },
  'garrys-mod': {
    intro: "A Garry's Mod server is very light without addons. The requirement depends almost entirely on the game mode and the number of addons.",
    tips: [
      { title: 'Use a Workshop collection', text: 'With a Steam Workshop collection, the server and the players load the same addons automatically.' },
      { title: 'Clear out addons', text: 'Every addon makes loading times longer and takes up memory. Remove what nobody uses.' },
      { title: 'Limit props', text: 'Limits for props and other objects per player protect against lag and crashes.' },
    ],
    faqs: [
      { question: 'How much RAM does a DarkRP server need?', answer: 'DarkRP itself is light. With many addons, jobs and maps, you should select "Some" or "Many" addons in the calculator.' },
      { question: "Why does my Garry's Mod server lag even though RAM is free?", answer: 'The server essentially runs on a single thread. Poorly written addons and many props slow down the CPU, not the memory.' },
    ],
  },
  'v-rising': {
    intro: 'A V Rising server needs a moderate amount of memory for small groups. The requirement grows with many castles and long uptimes.',
    tips: [
      { title: 'Leave castle decay enabled', text: 'Abandoned castles decay and free up space and memory. This is important on public servers.' },
      { title: 'Limit castles per player', text: 'The number of castle hearts and the size of the castles can be limited in the server settings.' },
      { title: 'Choose settings before the first start', text: 'PvP or PvE, clan size and rates are best set before the first start.' },
    ],
    faqs: [
      { question: 'Does a V Rising server run on Linux?', answer: 'The dedicated server is built for Windows. On Linux it only runs through a compatibility layer such as Wine. With a rented game server you do not have to deal with this.' },
      { question: 'How many players fit on a V Rising server?', answer: 'Up to 40 players is common. With more players and castles, it is mainly the CPU load that rises.' },
    ],
  },
  'sons-of-the-forest': {
    intro: 'A Sons of the Forest server is designed for up to 8 players and still needs a lot of memory.',
    tips: [
      { title: 'Back up the save', text: 'Back up the save regularly, especially before game updates.' },
      { title: 'Watch out for large bases', text: 'A very large number of built structures increases the memory requirement and loading times.' },
      { title: 'Use an existing save', text: 'You can transfer a save from the regular multiplayer mode to the server and continue playing there.' },
    ],
    faqs: [
      { question: 'How many players fit on a Sons of the Forest server?', answer: 'Up to 8 players at the same time.' },
      { question: 'Does a Sons of the Forest server run on Linux?', answer: 'The dedicated server is built for Windows. On Linux it only runs through a compatibility layer such as Wine.' },
    ],
  },
  ls25: {
    intro: 'A Farming Simulator 25 server needs little memory without mods. Mod maps and large mod collections increase the requirement considerably.',
    tips: [
      { title: 'Choose mods deliberately', text: 'Every mod is loaded at startup. Large maps and many vehicles make loading times longer and take up memory.' },
      { title: 'Plan for disk space', text: 'The game and the mods take up a lot of space. Plan for enough SSD storage for the game, mods and saves.' },
      { title: 'Mind the license', text: 'For a self-hosted dedicated server you need a separate game license. With rented servers it is usually included.' },
    ],
    faqs: [
      { question: 'How many players fit on a Farming Simulator 25 server?', answer: 'On PC, up to 16 players at the same time.' },
      { question: 'How much RAM does a Farming Simulator 25 server need with many mods?', answer: 'Considerably more than without. Select "Many" for mods in the calculator if you use a mod map and a large vehicle collection.' },
    ],
  },
  'arma-3': {
    intro: 'How much memory an Arma 3 server needs varies widely with the mission and the mods. Life servers with a database and large mod collections are at the upper end.',
    tips: [
      { title: 'Headless client for AI', text: 'A headless client takes over the AI calculations and relieves the server in missions with many units.' },
      { title: 'Include the database', text: 'Life servers store player data in a database. If it runs on the same server, its memory comes on top.' },
      { title: 'Keep mods in sync', text: 'The server and the players need the same mods in the same version. A fixed mod list avoids problems when joining.' },
    ],
    faqs: [
      { question: 'How much RAM does an Arma 3 Life server need?', answer: 'Plan for many mods and for the database on top. In the calculator, select the VPS tab, Arma 3 and "Database (PostgreSQL, MariaDB)".' },
      { question: 'Why does the server FPS drop with many AI units?', answer: 'The AI is calculated mostly on a single core. A headless client and fewer units active at the same time help.' },
    ],
  },
  'arma-reforger': {
    intro: 'For large battles with many players and AI, an Arma Reforger server needs a noticeable amount of memory and a fast CPU.',
    tips: [
      { title: 'Mods from the Workshop', text: 'Players download the server mods automatically when joining. Many large mods make loading longer and increase the requirement.' },
      { title: 'Limit the AI', text: 'The number of AI units has a big impact on performance. Limit it if the server gets slow when it is full.' },
      { title: 'Plan for crossplay', text: 'With crossplay enabled, console players can join as well. This affects which mods make sense.' },
    ],
    faqs: [
      { question: 'How many players fit on an Arma Reforger server?', answer: 'Up to 128 players. For full servers you mainly need a fast CPU.' },
      { question: 'Does Arma Reforger need more RAM than Arma 3?', answer: 'Without mods the requirement is in a similar range. What matters is the player count, the AI and the mods.' },
    ],
  },
  'space-engineers': {
    intro: 'Space Engineers simulates the physics of every construction. Large ships, many blocks and planets need a lot of memory and, above all, a fast CPU.',
    tips: [
      { title: 'Set block limits', text: 'Limits for blocks and PCU per player prevent individual constructions from slowing down the server.' },
      { title: 'Let the server clean up', text: 'Automatic cleanup removes abandoned wrecks and debris and keeps the world and the memory requirement small.' },
      { title: 'Watch the simulation speed', text: 'If the simulation speed drops below 1.0, the server is overloaded. Usually the CPU is the cause.' },
    ],
    faqs: [
      { question: 'Why is my Space Engineers server running slowly?', answer: 'Usually the CPU is the limit, not the memory. Large constructions, many pistons and rotors, and scripts all cost CPU time.' },
      { question: 'How many players fit on a Space Engineers server?', answer: 'Up to 16 players is common. More are possible, but they require strict limits.' },
    ],
  },
  soulmask: {
    intro: 'Soulmask is one of the memory-hungry survival games. Even a small server needs a double-digit number of gigabytes.',
    tips: [
      { title: 'Limit tribesmen', text: 'Many recruited tribesmen working in the bases put load on memory and CPU.' },
      { title: 'Scheduled restarts', text: 'A regular restart at a quiet time keeps memory usage stable.' },
      { title: 'Set up backups', text: 'Back up the save regularly, especially before updates.' },
    ],
    faqs: [
      { question: 'Is 8 GB of RAM enough for a Soulmask server?', answer: 'No, that is too tight. Plan for at least 12 GB, and for a group 16 GB including headroom.' },
      { question: 'Why does Soulmask need so much RAM?', answer: 'The large world and the many simulated tribesmen are kept in memory permanently.' },
    ],
  },
  unturned: {
    intro: 'An Unturned server is light and runs even on small plans. Large Workshop maps and plugins increase the requirement.',
    tips: [
      { title: 'List your Workshop content', text: 'The server downloads maps and mods from the Steam Workshop automatically once you list them in the configuration.' },
      { title: 'Use plugins selectively', text: 'Plugin frameworks add commands, shops and permissions to the server. Every plugin costs some performance.' },
      { title: 'Mind the map size', text: 'Large maps with many objects need more memory than the small default maps.' },
    ],
    faqs: [
      { question: 'Is 2 GB of RAM enough for an Unturned server?', answer: 'For a small group without mods, yes. With more players, large maps or plugins, you should plan for 4 GB.' },
      { question: 'Is an Unturned server free?', answer: 'The game and the server files are free. The only cost is the server it runs on.' },
    ],
  },
  'vintage-story': {
    intro: 'A Vintage Story server needs more memory per player than many other games, because each player loads their own parts of the world.',
    tips: [
      { title: 'Limit the view distance', text: 'A maximum view distance for players keeps the number of loaded chunks, and with it the memory requirement, in check.' },
      { title: 'Staying together saves memory', text: 'If everyone plays in the same area, less of the world is loaded than with players spread far apart.' },
      { title: 'Plan for backups', text: 'The world is stored in a single file that grows quickly. Back it up regularly and plan the disk space for it.' },
    ],
    faqs: [
      { question: 'Does a Vintage Story server run on Linux?', answer: 'Yes, the server runs on Windows and Linux.' },
      { question: 'Does Vintage Story need more RAM than Minecraft?', answer: 'Per player, usually yes, because the world is more detailed. For small groups the requirement still stays modest.' },
    ],
  },
  'dont-starve-together': {
    intro: "A Don't Starve Together server is light. With caves, however, two worlds run at the same time, each with its own memory requirement.",
    tips: [
      { title: 'Enable caves deliberately', text: 'The overworld and the caves run as two separate processes. Without caves the requirement drops considerably.' },
      { title: 'List mods on the server', text: 'Mods have to be listed for the server and enabled for each of the two worlds.' },
      { title: 'Regenerate the world occasionally', text: 'Very old worlds with many buildings and items get slower. Starting the world over fixes this.' },
    ],
    faqs: [
      { question: "Is 2 GB of RAM enough for a Don't Starve Together server?", answer: 'For a small group, yes. With caves, more players and mods, you should plan for 4 GB.' },
      { question: "How many players fit on a Don't Starve Together server?", answer: 'The default is 6 players, and more can be configured. With many players, it is mainly the CPU that becomes the bottleneck.' },
    ],
  },
  teamspeak: {
    intro: 'A TeamSpeak 3 server is one of the lightest services there is and runs alongside other applications without problems.',
    tips: [
      { title: 'Put it on the same server', text: 'TeamSpeak needs so little memory that it runs well on a VPS next to a game server or a website.' },
      { title: 'Mind the license', text: 'Without a license the number of slots is limited. Larger communities need a suitable license.' },
      { title: 'Open the ports', text: 'TeamSpeak uses UDP for voice and TCP for file transfer and queries. Open only the necessary ports in the firewall.' },
    ],
    faqs: [
      { question: 'How much RAM does a TeamSpeak server need?', answer: 'Very little. For 20 users the calculator recommends 1 GB including headroom, of which only a fraction is used.' },
      { question: 'Can TeamSpeak run on the same server as a game server?', answer: 'Yes. Select the VPS tab in the calculator, pick the game and add the other services.' },
    ],
  },
};
