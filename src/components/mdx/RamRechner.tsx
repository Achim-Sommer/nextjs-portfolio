'use client';

import { useMemo, useState } from 'react';
import {
  APPS,
  GAMES,
  HEADROOM,
  OS_BASE,
  ZAP_COUPON,
  ZAP_GAMESERVER_URL,
  ZAP_VSERVER_URL,
  formatGb,
  gameRam,
  roundToStep,
} from '@/data/server-ram';

type Mode = 'game' | 'vserver';

/** Interaktiver RAM-Rechner: Gameserver nach Spielerzahl oder vServer nach Diensten */
export default function RamRechner() {
  const [mode, setMode] = useState<Mode>('game');
  const [gameId, setGameId] = useState(GAMES[0].id);
  const [players, setPlayers] = useState(GAMES[0].defaultPlayers);
  const [apps, setApps] = useState<string[]>(['docker']);

  const game = GAMES.find((g) => g.id === gameId) ?? GAMES[0];

  const result = useMemo(() => {
    if (mode === 'game') {
      const need = gameRam(game, players);
      return { need, recommended: roundToStep(need * HEADROOM) };
    }
    const need = OS_BASE + APPS.filter((a) => apps.includes(a.id)).reduce((sum, a) => sum + a.ram, 0);
    return { need, recommended: roundToStep(need * HEADROOM) };
  }, [mode, game, players, apps]);

  const selectGame = (id: string) => {
    const next = GAMES.find((g) => g.id === id) ?? GAMES[0];
    setGameId(next.id);
    setPlayers(next.defaultPlayers);
  };

  const toggleApp = (id: string) =>
    setApps((current) => (current.includes(id) ? current.filter((a) => a !== id) : [...current, id]));

  const bigServer = result.recommended > 32;
  const offerUrl = mode === 'game' ? game.url ?? ZAP_GAMESERVER_URL : ZAP_VSERVER_URL;
  const offerLabel =
    mode === 'game' ? `${game.name.split(' (')[0]} Server bei ZAP-Hosting` : bigServer ? 'Rootserver oder Dedicated Server ansehen' : 'Passenden vServer ansehen';

  const tabClass = (active: boolean) =>
    `flex-1 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${
      active ? 'bg-fg text-canvas' : 'border border-line text-muted hover:text-fg'
    }`;

  return (
    <div className="not-article my-10 border border-line bg-surface p-5 sm:p-7">
      <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">RAM-Rechner</div>

      <div className="mb-6 flex gap-2" role="tablist" aria-label="Art des Servers">
        <button type="button" role="tab" aria-selected={mode === 'game'} className={tabClass(mode === 'game')} onClick={() => setMode('game')}>
          Gameserver
        </button>
        <button type="button" role="tab" aria-selected={mode === 'vserver'} className={tabClass(mode === 'vserver')} onClick={() => setMode('vserver')}>
          vServer mit Diensten
        </button>
      </div>

      {mode === 'game' ? (
        <div className="space-y-5">
          <label className="block">
            <span className="mb-2 block text-sm text-muted">Spiel</span>
            <select
              value={gameId}
              onChange={(e) => selectGame(e.target.value)}
              className="w-full border border-line bg-canvas px-3 py-2.5 text-fg"
            >
              {GAMES.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-2 flex justify-between text-sm text-muted">
              <span>Gleichzeitige Spieler</span>
              <span className="font-mono text-fg">{players}</span>
            </span>
            <input
              type="range"
              min={1}
              max={game.maxPlayers}
              value={players}
              onChange={(e) => setPlayers(Number(e.target.value))}
              className="w-full accent-[#ff6a2b]"
            />
          </label>
          <div className="text-sm text-faint">{game.note}</div>
        </div>
      ) : (
        <fieldset>
          <legend className="mb-3 text-sm text-muted">Was soll auf dem Server laufen?</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {APPS.map((app) => (
              <label
                key={app.id}
                className="flex cursor-pointer items-center justify-between gap-3 border border-line bg-canvas px-3 py-2.5 text-sm text-fg hover:border-accent"
              >
                <span className="flex items-center gap-2">
                  <input type="checkbox" checked={apps.includes(app.id)} onChange={() => toggleApp(app.id)} className="accent-[#ff6a2b]" />
                  {app.name}
                </span>
                <span className="font-mono text-xs text-faint">{formatGb(app.ram)}</span>
              </label>
            ))}
          </div>
          <div className="mt-3 text-sm text-faint">Das Betriebssystem ({formatGb(OS_BASE)}) ist bereits eingerechnet.</div>
        </fieldset>
      )}

      <div className="mt-6 border border-accent/40 bg-canvas p-5" aria-live="polite">
        <div className="text-sm text-muted">
          Geschätzter Bedarf: <span className="font-mono text-fg">{formatGb(result.need)}</span>
        </div>
        <div className="mt-1 text-3xl font-medium tracking-[-0.03em] text-fg">
          Empfehlung: <span className="text-accent">{formatGb(result.recommended)} RAM</span>
        </div>
        <div className="mt-1 text-xs text-faint">Inklusive 25 % Puffer für Spitzen, Updates und Wachstum. Richtwerte, keine Garantie.</div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <a
            href={offerUrl}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="inline-block bg-fg px-4 py-2.5 text-sm font-medium text-canvas transition-colors duration-200 hover:bg-accent"
          >
            {offerLabel}
          </a>
          <span className="text-sm text-muted">
            Mit dem Code <span className="font-mono text-fg">{ZAP_COUPON}</span> sparst du 20 % (je nach Produkt)
          </span>
        </div>
      </div>
    </div>
  );
}
