'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  GAMES,
  MOD_LEVELS,
  RAM_STEPS,
  ZAP_COUPON,
  ZAP_GAMESERVER_URL,
  findGame,
  formatGb,
  gamePath,
  gameRam,
  maxPlayersFor,
  minPackage,
  type ModLevel,
} from '@/data/server-ram';

/** Paketgrößen zur Auswahl */
const SIZES = RAM_STEPS.filter((gb) => gb <= 64);

type Props = {
  initialGame?: string;
  initialRam?: number;
  /** Einstellungen in der Adresse halten (nur auf der Rechner-Seite) */
  syncUrl?: boolean;
};

/** Umkehrung des RAM-Rechners: Spiel und Paketgröße wählen, Spielerzahl ablesen */
export default function SlotRechner({ initialGame = 'minecraft', initialRam = 8, syncUrl = false }: Props) {
  const [gameId, setGameId] = useState(findGame(initialGame)?.id ?? GAMES[0].id);
  const [ram, setRam] = useState(initialRam);
  const [mods, setMods] = useState<ModLevel>(0);
  const loaded = useRef(false);

  // Einstellungen aus der Adresse übernehmen, danach Änderungen zurückschreiben
  useEffect(() => {
    if (syncUrl && window.location.search) {
      const params = new URLSearchParams(window.location.search);
      const game = findGame(params.get('spiel') ?? '');
      const size = Number(params.get('ram'));
      const level = Number(params.get('mods'));
      if (game) setGameId(game.id);
      if (SIZES.includes(size)) setRam(size);
      if (level === 1 || level === 2) setMods(level);
    }
    loaded.current = true;
  }, [syncUrl]);

  useEffect(() => {
    if (!syncUrl || !loaded.current) return;
    const changed = gameId !== initialGame || ram !== initialRam || mods !== 0;
    if (!window.location.search && !changed) return;
    const query = `spiel=${gameId}&ram=${ram}${mods ? `&mods=${mods}` : ''}`;
    window.history.replaceState(window.history.state, '', `${window.location.pathname}?${query}${window.location.hash}`);
  }, [gameId, ram, mods, syncUrl, initialGame, initialRam]);

  const game = findGame(gameId) ?? GAMES[0];
  const level: ModLevel = game.mods ? mods : 0;
  const players = maxPlayersFor(game, ram, level);
  const needed = minPackage(game, level);
  const atLimit = players === game.maxPlayers;
  const used = players > 0 ? gameRam(game, players, level) : 0;

  return (
    <div className="not-article my-10 border border-line bg-surface p-5 sm:p-7">
      <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">Slot-Rechner</div>

      <div className="space-y-5">
        <label className="block">
          <span className="mb-2 block text-sm text-muted">Spiel</span>
          <select
            value={game.id}
            onChange={(e) => {
              setGameId(e.target.value);
              setMods(0);
            }}
            className="w-full border border-line bg-canvas px-3 py-2.5 text-fg"
          >
            {GAMES.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </label>

        <div>
          <span className="mb-2 block text-sm text-muted">Arbeitsspeicher deines Servers</span>
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6" role="radiogroup" aria-label="Arbeitsspeicher">
            {SIZES.map((size) => (
              <button
                key={size}
                type="button"
                role="radio"
                aria-checked={ram === size}
                onClick={() => setRam(size)}
                className={`px-2 py-2 font-mono text-sm transition-colors ${
                  ram === size ? 'bg-fg text-canvas' : 'border border-line text-muted hover:border-accent hover:text-fg'
                }`}
              >
                {size} GB
              </button>
            ))}
          </div>
        </div>

        {game.mods && (
          <div>
            <span className="mb-2 block text-sm text-muted">{game.modLabel}</span>
            <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label={game.modLabel}>
              {MOD_LEVELS.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  role="radio"
                  aria-checked={level === item.value}
                  onClick={() => setMods(item.value)}
                  className={`px-3 py-2 text-sm transition-colors ${
                    level === item.value ? 'bg-fg text-canvas' : 'border border-line text-muted hover:border-accent hover:text-fg'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 border border-accent/40 bg-canvas p-5" aria-live="polite">
        {players > 0 ? (
          <>
            <div className="text-sm text-muted">
              {game.short} mit {formatGb(ram)} RAM
            </div>
            <div className="mt-1 text-3xl font-medium tracking-[-0.03em] text-fg">
              Bis zu{' '}
              <span className="text-accent">
                {players} Spieler
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {atLimit
                ? `Das ist das Maximum, das der Rechner für dieses Spiel vorsieht. Der Speicher reicht dafür aus.`
                : `Bei ${players} Spielern belegt der Server geschätzt ${formatGb(used)}, der Rest ist Puffer für Spitzen und Wachstum.`}
            </p>
          </>
        ) : (
          <>
            <div className="text-sm text-muted">
              {game.short} mit {formatGb(ram)} RAM
            </div>
            <div className="mt-1 text-3xl font-medium tracking-[-0.03em] text-fg">
              Zu wenig, du brauchst <span className="text-accent">{formatGb(needed)}</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Mit Puffer läuft das Spiel erst ab {formatGb(needed)} stabil. Darunter drohen Ruckler und Abstürze.
            </p>
          </>
        )}

        <div className="mt-4 text-xs leading-relaxed text-faint">
          Gerechnet mit 25 % Puffer, wie im RAM-Rechner. Richtwerte, keine Garantie. {game.note}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-3">
          <a
            href={game.url ?? ZAP_GAMESERVER_URL}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="inline-block bg-fg px-4 py-2.5 text-sm font-medium text-canvas transition-colors duration-200 hover:bg-accent"
          >
            {game.short} bei ZAP-Hosting
          </a>
          <Link href={gamePath(game.id)} className="text-sm text-fg underline decoration-accent underline-offset-4 hover:text-accent">
            RAM-Bedarf für {game.short} im Detail
          </Link>
        </div>
        <div className="mt-3 text-sm text-muted">
          Mit dem Code <span className="font-mono text-fg">{ZAP_COUPON}</span> sparst du 20 % (je nach Produkt)
        </div>
      </div>
    </div>
  );
}
