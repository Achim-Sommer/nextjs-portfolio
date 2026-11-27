import { APPS, GAMES, formatGb, gamePath, localizeApp, localizeGame, recommendGame, type Lang } from '@/data/server-ram';

const TEXT = {
  de: { game: 'Spiel', min: 'Minimum', rec: 'Empfehlung', note: 'Hinweis', at: (n: number) => `bei ${n} Spielern`, app: 'Anwendung', typical: 'Typischer Bedarf' },
  en: { game: 'Game', min: 'Minimum', rec: 'Recommended', note: 'Note', at: (n: number) => `for ${n} players`, app: 'Application', typical: 'Typical usage' },
};

/**
 * Richtwert-Tabellen für Gameserver und Anwendungen. Serverseitig gerendert,
 * damit Google die Werte lesen kann. Gleiche Datenquelle wie der RAM-Rechner.
 */
export default function RamTabelle({ type, lang = 'de' }: { type: 'games' | 'apps'; lang?: Lang }) {
  const t = TEXT[lang];

  if (type === 'games') {
    return (
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>{t.game}</th>
              <th>{t.min}</th>
              <th>{t.rec}</th>
              <th>{t.note}</th>
            </tr>
          </thead>
          <tbody>
            {GAMES.map((raw) => {
              const game = localizeGame(raw, lang);
              return (
                <tr key={game.id}>
                  <td>
                    <a href={gamePath(game.id, lang)}>{game.name}</a>
                  </td>
                  <td>{formatGb(game.min, lang)}</td>
                  <td>
                    {formatGb(recommendGame(game, game.defaultPlayers), lang)} {t.at(game.defaultPlayers)}
                  </td>
                  <td>{game.note}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th>{t.app}</th>
            <th>{t.typical}</th>
            <th>{t.note}</th>
          </tr>
        </thead>
        <tbody>
          {APPS.map((raw) => {
            const app = localizeApp(raw, lang);
            return (
              <tr key={app.id}>
                {/* Verlinkte Artikel gibt es nur auf Deutsch */}
                <td>{app.href && lang === 'de' ? <a href={app.href}>{app.name}</a> : app.name}</td>
                <td>{formatGb(app.ram, lang)}</td>
                <td>{app.note}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
