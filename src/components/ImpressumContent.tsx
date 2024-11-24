'use client';

import Footer from '@/components/Footer';

export default function ImpressumContent() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <main className="flex-grow">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <nav className="mb-8">
            <button
              onClick={() => window.location.href = '/'}
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300 cursor-pointer z-50 relative"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Zurück zur Startseite
            </button>
          </nav>

          <article className="text-gray-300">
            <h1 className="text-4xl font-bold text-white mb-8">Impressum</h1>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Angaben gemäß § 5 TMG</h2>
              <p>Achim Sommer</p>
              <p>Adalbertsteinweg 156</p>
              <p>52066 Aachen</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Kontakt</h2>
              <p>E-Mail: imprint@achimsommer.com</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Umsatzsteuer-ID</h2>
              <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:</p>
              <p>DE320790671</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Redaktionell Verantwortlicher</h2>
              <p>Achim Sommer</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">EU-Streitschlichtung</h2>
              <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr" className="text-blue-400 hover:text-blue-300" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr</a>.</p>
              <p>Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
              <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Haftung für Inhalte</h2>
              <p className="mb-4">
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
              <p>
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Haftung für Links</h2>
              <p className="mb-4">
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
              </p>
              <p>
                Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
              </p>
            </section>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
