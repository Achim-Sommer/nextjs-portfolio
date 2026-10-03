import { APPS, GAMES, formatGb, recommendGame } from '@/data/server-ram';

/**
 * Richtwert-Tabellen für Gameserver und Anwendungen. Serverseitig gerendert,
 * damit Google die Werte lesen kann. Gleiche Datenquelle wie der RAM-Rechner.
 */
export default function RamTabelle({ type }: { type: 'games' | 'apps' }) {
  if (type === 'games') {
    return (
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Spiel</th>
              <th>Minimum</th>
              <th>Empfehlung</th>
              <th>Hinweis</th>
            </tr>
          </thead>
          <tbody>
            {GAMES.map((game) => (
              <tr key={game.id}>
                <td>
                  <a href={`/server-ram-rechner/${game.id}`}>{game.name}</a>
                </td>
                <td>{formatGb(game.min)}</td>
                <td>
                  {formatGb(recommendGame(game, game.defaultPlayers))} bei {game.defaultPlayers}{' '}
                  Spielern
                </td>
                <td>{game.note}</td>
              </tr>
            ))}
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
            <th>Anwendung</th>
            <th>Typischer Bedarf</th>
            <th>Hinweis</th>
          </tr>
        </thead>
        <tbody>
          {APPS.map((app) => (
            <tr key={app.id}>
              <td>{app.href ? <a href={app.href}>{app.name}</a> : app.name}</td>
              <td>{formatGb(app.ram)}</td>
              <td>{app.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
