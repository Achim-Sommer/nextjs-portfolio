import Footer from '@/components/Footer';

export default function DatenschutzPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <main className="flex-grow">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <nav className="mb-8">
            <a
              href="/"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300 cursor-pointer z-50 relative"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Zurück zur Startseite
            </a>
          </nav>

          <article className="text-gray-300">
            <h1 className="text-4xl font-bold text-white mb-8">Datenschutzerklärung</h1>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">1. Datenschutz auf einen Blick</h2>
              <h3 className="text-xl font-semibold text-white mb-2">Allgemeine Hinweise</h3>
              <p className="mb-4">Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.</p>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-2">Datenerfassung auf unserer Website</h3>
              <h4 className="text-lg font-semibold text-white mb-2">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h4>
              <p className="mb-4">Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.</p>

              <h4 className="text-lg font-semibold text-white mb-2">Wie erfassen wir Ihre Daten?</h4>
              <p className="mb-4">Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben.</p>
              <p className="mb-4">Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie unsere Website betreten.</p>

              <h4 className="text-lg font-semibold text-white mb-2">Wofür nutzen wir Ihre Daten?</h4>
              <p className="mb-4">Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.</p>

              <h4 className="text-lg font-semibold text-white mb-2">Welche Rechte haben Sie bezüglich Ihrer Daten?</h4>
              <p className="mb-4">Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung, Sperrung oder Löschung dieser Daten zu verlangen. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">2. Allgemeine Hinweise und Pflichtinformationen</h2>
              <h3 className="text-xl font-semibold text-white mb-2">Datenschutz</h3>
              <p className="mb-4">Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p>
              <p className="mb-4">Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.</p>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-2">Hinweis zur verantwortlichen Stelle</h3>
              <p className="mb-4">Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
              <p className="mb-4">
                Achim Sommer<br />
                Adalbertsteinweg 156<br />
                52066 Aachen<br />
                E-Mail: imprint@achimsommer.com
              </p>
            </section>

            {/* Weitere Abschnitte der Datenschutzerklärung hier einfügen */}
            
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
