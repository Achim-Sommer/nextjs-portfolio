import { HOSTING_PRODUCTS, RENT_DISCOUNT, breakEvenMonths, eur, findProduct, months1 } from '@/data/hosting-prices';

/** „ca. 8,1 Monate“, glatte Werte ohne „ca.“ */
const monthsLabel = (v: number) => {
  const rounded = Math.round(v * 10) / 10;
  return `${Number.isInteger(rounded) ? '' : 'ca. '}${months1(rounded)} Monate`;
};

/** Break-even aller Produkte, mit und ohne Mietrabatt. Daten aus src/data/hosting-prices.ts */
export function BreakEvenTabelle() {
  return (
    <table>
      <thead>
        <tr>
          <th>Produkt</th>
          <th>Miete pro Monat</th>
          <th>Lifetime einmalig</th>
          <th>Break-even</th>
          <th>Break-even bei {RENT_DISCOUNT * 100}% Mietrabatt</th>
        </tr>
      </thead>
      <tbody>
        {HOSTING_PRODUCTS.map((p) => (
          <tr key={p.id}>
            <td>{p.name}</td>
            <td>{eur(p.monthly)}</td>
            <td>{eur(p.lifetime)}</td>
            <td>{monthsLabel(breakEvenMonths(p))}</td>
            <td>{monthsLabel(breakEvenMonths(p, RENT_DISCOUNT))}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const savingLabel = (v: number) => {
  const cents = Math.round(v * 100) / 100;
  if (cents === 0) return 'Gleichstand';
  return cents > 0 ? eur(cents) : `Miete ${eur(-cents)} günstiger`;
};

/** Ersparnis durch Lifetime nach 1, 2 und 5 Jahren (ohne Rabatt) */
export function ErsparnisTabelle() {
  const years = [1, 2, 5];
  return (
    <table>
      <thead>
        <tr>
          <th>Produkt</th>
          {years.map((y) => (
            <th key={y}>nach {y === 1 ? '1 Jahr' : `${y} Jahren`}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {HOSTING_PRODUCTS.map((p) => (
          <tr key={p.id}>
            <td>{p.name}</td>
            {years.map((y) => (
              <td key={y}>{savingLabel(p.monthly * 12 * y - p.lifetime)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** Kosten eines Produkts über mehrere Laufzeiten: Miete, Miete mit Rabatt, Lifetime */
export function LaufzeitTabelle({ product, months = '3,6,9,12,24,36' }: { product: string; months?: string }) {
  const p = findProduct(product);
  if (!p) return null;
  const discounted = p.monthly * (1 - RENT_DISCOUNT);
  return (
    <table>
      <thead>
        <tr>
          <th>Laufzeit</th>
          <th>Mieten ({eur(p.monthly)} pro Monat)</th>
          <th>Mieten mit Code (ca. {eur(discounted)} pro Monat)</th>
          <th>Lifetime ({eur(p.lifetime)} einmalig)</th>
        </tr>
      </thead>
      <tbody>
        {months.split(',').map((m) => {
          const n = Number(m);
          return (
            <tr key={m}>
              <td>{n} Monate</td>
              <td>{eur(p.monthly * n)}</td>
              <td>{eur(discounted * n)}</td>
              <td>{eur(p.lifetime)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
