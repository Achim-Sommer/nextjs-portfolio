'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { FiCheck, FiLink, FiMinus, FiPlus } from 'react-icons/fi';
import {
  APPS,
  GAMES,
  MOD_LEVELS,
  ZAP_COUPON,
  ZAP_GAMESERVER_URL,
  ZAP_VSERVER_URL,
  calculate,
  findGame,
  formatGb,
  fromQuery,
  toQuery,
  type ModLevel,
  type Mode,
  type RamInput,
} from '@/data/server-ram';

/** Farben der Balkenabschnitte, in der Reihenfolge der Bestandteile */
const SEGMENT_COLORS = ['#ff6a2b', '#ecebe8', '#c2552a', '#8e8d89', '#f3a77c', '#5f5e5a', '#ffd0b5', '#a9a8a4'];

type Props = {
  /** Vorausgewähltes Spiel (ID aus src/data/server-ram.ts) */
  initialGame?: string;
  initialMode?: Mode;
  /** Einstellungen in der Adresse halten (nur auf den Rechner-Seiten) */
  syncUrl?: boolean;
  /** Seite, auf die der geteilte Link zeigt */
  sharePath?: string;
};

/** Interaktiver Rechner: Gameserver nach Spiel, Spielern und Mods oder vServer mit Diensten und optionalem Gameserver */
export default function RamRechner({ initialGame = 'minecraft', initialMode = 'game', syncUrl = false, sharePath = '/server-ram-rechner' }: Props) {
  const fallback = useMemo<RamInput>(() => {
    const game = findGame(initialGame) ?? GAMES[0];
    return {
      mode: initialMode,
      gameId: initialMode === 'vserver' ? '' : game.id,
      players: game.defaultPlayers,
      mods: 0,
      apps: { docker: 1 },
    };
  }, [initialGame, initialMode]);

  const [input, setInput] = useState<RamInput>(fallback);
  const [copied, setCopied] = useState(false);
  const loaded = useRef(false);

  // Einstellungen aus der Adresse übernehmen, danach Änderungen zurückschreiben
  useEffect(() => {
    if (syncUrl && window.location.search) setInput(fromQuery(window.location.search, fallback));
    loaded.current = true;
  }, [syncUrl, fallback]);

  useEffect(() => {
    if (!syncUrl || !loaded.current) return;
    // Unveränderte Standardwerte nicht in die Adresse schreiben
    if (!window.location.search && toQuery(input) === toQuery(fallback)) return;
    const url = `${window.location.pathname}?${toQuery(input)}${window.location.hash}`;
    window.history.replaceState(window.history.state, '', url);
  }, [input, syncUrl, fallback]);

  const game = input.gameId ? findGame(input.gameId) : undefined;
  const result = useMemo(() => calculate(input), [input]);
  const update = (patch: Partial<RamInput>) => setInput((current) => ({ ...current, ...patch }));

  const setMode = (mode: Mode) =>
    setInput((current) => ({
      ...current,
      mode,
      // Gameserver-Modus braucht immer ein Spiel
      gameId: mode === 'game' && !current.gameId ? fallback.gameId || GAMES[0].id : current.gameId,
    }));

  const selectGame = (id: string) => {
    const next = findGame(id);
    update({ gameId: id, players: next?.defaultPlayers ?? input.players, mods: 0 });
  };

  const setAppCount = (id: string, count: number) =>
    setInput((current) => ({ ...current, apps: { ...current.apps, [id]: Math.max(0, Math.min(10, count)) } }));

  const share = async () => {
    const url = `${window.location.origin}${sharePath}?${toQuery(input)}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt('Link zum Kopieren:', url);
    }
  };

  const isGame = input.mode === 'game';
  const bigServer = result.recommended > 32;
  const offerUrl = isGame ? game?.url ?? ZAP_GAMESERVER_URL : ZAP_VSERVER_URL;
  const offerLabel = isGame
    ? `${game?.short ?? 'Gameserver'} bei ZAP-Hosting`
    : bigServer
      ? 'Rootserver oder Dedicated Server ansehen'
      : 'Passenden vServer ansehen';

  const tabClass = (active: boolean) =>
    `flex-1 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${
      active ? 'bg-fg text-canvas' : 'border border-line text-muted hover:text-fg'
    }`;

  return (
    <div className="not-article my-10 border border-line bg-surface p-5 sm:p-7">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">RAM-Rechner</div>
        <button
          type="button"
          onClick={share}
          className="inline-flex items-center gap-1.5 border border-line px-2.5 py-1.5 text-xs text-muted transition-colors hover:border-accent hover:text-fg"
        >
          {copied ? <FiCheck className="h-3.5 w-3.5 text-accent" aria-hidden="true" /> : <FiLink className="h-3.5 w-3.5" aria-hidden="true" />}
          {copied ? 'Link kopiert' : 'Ergebnis teilen'}
        </button>
      </div>

      <div className="mb-6 flex gap-2" role="tablist" aria-label="Art des Servers">
        <button type="button" role="tab" aria-selected={isGame} className={tabClass(isGame)} onClick={() => setMode('game')}>
          Gameserver
        </button>
        <button type="button" role="tab" aria-selected={!isGame} className={tabClass(!isGame)} onClick={() => setMode('vserver')}>
          vServer
        </button>
      </div>

      <div className="space-y-5">
        <label className="block">
          <span className="mb-2 block text-sm text-muted">{isGame ? 'Spiel' : 'Gameserver auf dem vServer'}</span>
          <select
            value={input.gameId}
            onChange={(e) => selectGame(e.target.value)}
            className="w-full border border-line bg-canvas px-3 py-2.5 text-fg"
          >
            {!isGame && <option value="">Kein Gameserver</option>}
            {GAMES.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </label>

        {game && (
          <>
            <label className="block">
              <span className="mb-2 flex justify-between text-sm text-muted">
                <span>Gleichzeitige Spieler</span>
                <span className="font-mono text-fg">{Math.min(input.players, game.maxPlayers)}</span>
              </span>
              <input
                type="range"
                min={1}
                max={game.maxPlayers}
                value={Math.min(input.players, game.maxPlayers)}
                onChange={(e) => update({ players: Number(e.target.value) })}
                className="w-full accent-[#ff6a2b]"
              />
            </label>

            {game.mods && (
              <div>
                <span className="mb-2 block text-sm text-muted">{game.modLabel}</span>
                <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label={game.modLabel}>
                  {MOD_LEVELS.map((level) => (
                    <button
                      key={level.value}
                      type="button"
                      role="radio"
                      aria-checked={input.mods === level.value}
                      onClick={() => update({ mods: level.value as ModLevel })}
                      className={`px-3 py-2 text-sm transition-colors ${
                        input.mods === level.value ? 'bg-fg text-canvas' : 'border border-line text-muted hover:border-accent hover:text-fg'
                      }`}
                    >
                      {level.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="text-sm text-faint">{game.note}</div>
          </>
        )}

        {!isGame && (
          <fieldset>
            <legend className="mb-3 text-sm text-muted">Welche Dienste laufen mit?</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {APPS.map((app) => {
                const count = input.apps[app.id] ?? 0;
                const active = count > 0;
                return (
                  <div
                    key={app.id}
                    className={`flex items-center justify-between gap-3 border bg-canvas px-3 py-2 text-sm ${active ? 'border-accent/60' : 'border-line'}`}
                  >
                    {app.multi ? (
                      <span className="min-w-0 text-fg">{app.name}</span>
                    ) : (
                      <label className="flex min-w-0 cursor-pointer items-center gap-2 text-fg">
                        <input
                          type="checkbox"
                          checked={active}
                          onChange={() => setAppCount(app.id, active ? 0 : 1)}
                          className="accent-[#ff6a2b]"
                        />
                        {app.name}
                      </label>
                    )}
                    <span className="flex shrink-0 items-center gap-2">
                      <span className="font-mono text-xs text-faint">{formatGb(app.ram)}</span>
                      {app.multi && (
                        <span className="flex items-center border border-line">
                          <button
                            type="button"
                            aria-label={`${app.name} weniger`}
                            onClick={() => setAppCount(app.id, count - 1)}
                            disabled={count === 0}
                            className="px-1.5 py-1 text-muted hover:text-fg disabled:opacity-30"
                          >
                            <FiMinus className="h-3 w-3" aria-hidden="true" />
                          </button>
                          <span className="w-5 text-center font-mono text-xs text-fg" aria-live="polite">
                            {count}
                          </span>
                          <button
                            type="button"
                            aria-label={`${app.name} mehr`}
                            onClick={() => setAppCount(app.id, count + 1)}
                            disabled={count >= 10}
                            className="px-1.5 py-1 text-muted hover:text-fg disabled:opacity-30"
                          >
                            <FiPlus className="h-3 w-3" aria-hidden="true" />
                          </button>
                        </span>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </fieldset>
        )}
      </div>

      <div className="mt-6 border border-accent/40 bg-canvas p-5" aria-live="polite">
        <div className="text-sm text-muted">
          Geschätzter Bedarf: <span className="font-mono text-fg">{formatGb(result.need)}</span>
        </div>
        <div className="mt-1 text-3xl font-medium tracking-[-0.03em] text-fg">
          Empfehlung: <span className="text-accent">{formatGb(result.recommended)} RAM</span>
        </div>

        {result.cores !== undefined && result.disk !== undefined && (
          <div className="mt-4 grid grid-cols-3 gap-px border border-line bg-line text-center">
            {[
              { label: 'RAM', value: formatGb(result.recommended) },
              { label: 'vCPU', value: `${result.cores} ${result.cores === 1 ? 'Kern' : 'Kerne'}` },
              { label: 'SSD', value: `${result.disk} GB` },
            ].map((item) => (
              <div key={item.label} className="bg-canvas px-2 py-3">
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">{item.label}</div>
                <div className="mt-1 font-medium text-fg">{item.value}</div>
              </div>
            ))}
          </div>
        )}

        <Breakdown parts={result.parts} need={result.need} buffer={result.buffer} total={result.recommended} />

        <div className="mt-4 text-xs leading-relaxed text-faint">
          Inklusive 25 % Puffer für Spitzen, Updates und Wachstum. Richtwerte, keine Garantie.
          {isGame && game ? ` ${game.cpuNote}` : ''}
          {!isGame && result.disk !== undefined ? ' Beim Speicherplatz kommen deine eigenen Dateien und Backups dazu.' : ''}
        </div>

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

/** Gestapelter Balken: woraus sich die Empfehlung zusammensetzt, bis zur Paketgröße */
function Breakdown({
  parts,
  need,
  buffer,
  total,
}: {
  parts: { key: string; label: string; gb: number }[];
  need: number;
  buffer: number;
  total: number;
}) {
  if (!parts.length) return null;
  const pct = (gb: number) => `${(gb / total) * 100}%`;
  const free = Math.max(0, total - need - buffer);

  return (
    <div className="mt-5">
      <div className="mb-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
        <span>Zusammensetzung</span>
        <span>Paket {formatGb(total)}</span>
      </div>
      <div className="relative flex h-4 w-full overflow-hidden border border-line" role="img" aria-label={`Bedarf ${formatGb(need)} von ${formatGb(total)}`}>
        {parts.map((part, i) => (
          <span
            key={part.key}
            className="h-full transition-[width] duration-500"
            style={{ width: pct(part.gb), background: SEGMENT_COLORS[i % SEGMENT_COLORS.length] }}
            title={`${part.label}: ${formatGb(part.gb)}`}
          />
        ))}
        <span
          className="h-full transition-[width] duration-500"
          style={{
            width: pct(buffer),
            background: 'repeating-linear-gradient(135deg, rgba(255,106,43,0.45) 0 4px, transparent 4px 8px)',
          }}
          title={`Puffer: ${formatGb(buffer)}`}
        />
        {free > 0 && <span className="h-full flex-1" title={`Frei bis zur Paketgröße: ${formatGb(free)}`} />}
        {/* Markierung beim geschätzten Bedarf */}
        <span className="absolute inset-y-0 w-px bg-fg/80" style={{ left: pct(need) }} aria-hidden="true" />
      </div>

      <ul className="mt-3 grid gap-x-5 gap-y-1.5 text-xs text-muted sm:grid-cols-2">
        {parts.map((part, i) => (
          <li key={part.key} className="flex items-center justify-between gap-3">
            <span className="flex min-w-0 items-center gap-2">
              <span className="h-2.5 w-2.5 shrink-0" style={{ background: SEGMENT_COLORS[i % SEGMENT_COLORS.length] }} aria-hidden="true" />
              <span className="truncate">{part.label}</span>
            </span>
            <span className="font-mono text-fg">{formatGb(part.gb)}</span>
          </li>
        ))}
        <li className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 shrink-0 border border-accent/60"
              style={{ background: 'repeating-linear-gradient(135deg, rgba(255,106,43,0.6) 0 2px, transparent 2px 4px)' }}
              aria-hidden="true"
            />
            Puffer 25 %
          </span>
          <span className="font-mono text-fg">{formatGb(buffer)}</span>
        </li>
        {free > 0.05 && (
          <li className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 shrink-0 border border-line" aria-hidden="true" />
              Frei bis zur Paketgröße
            </span>
            <span className="font-mono text-fg">{formatGb(free)}</span>
          </li>
        )}
      </ul>
    </div>
  );
}
