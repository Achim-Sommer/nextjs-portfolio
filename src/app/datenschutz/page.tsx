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

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">3. Cookies und Local Storage</h2>
              <h3 className="text-xl font-semibold text-white mb-2">Cookie-Banner und Einwilligung</h3>
              <p className="mb-4">Beim ersten Besuch unserer Website wird Ihnen ein Cookie-Banner angezeigt. Hier können Sie entscheiden, ob Sie der Verwendung von Cookies zustimmen möchten. Ihre Entscheidung wird im localStorage Ihres Browsers unter dem Schlüssel 'cookieConsent' gespeichert.</p>
              <h3 className="text-xl font-semibold text-white mb-2">Verwendete Cookies und Local Storage</h3>
              <p className="mb-4">Wir verwenden ausschließlich technisch notwendige Cookies und Local Storage Einträge:</p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">cookieConsent (Local Storage): Speichert Ihre Cookie-Präferenz</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">4. Externe Dienste und Integrationen</h2>
              <h3 className="text-xl font-semibold text-white mb-2">GitHub API-Integration</h3>
              <p className="mb-4">Wir nutzen die GitHub API, um Repositories und Beitragsstatistiken anzuzeigen. Dabei werden folgende Daten verarbeitet:</p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">Repository-Informationen (Name, Beschreibung, URL)</li>
                <li className="mb-2">Beitragsstatistiken</li>
                <li className="mb-2">Programmiersprachen und Statistiken</li>
              </ul>
              <p className="mb-4">Die Kommunikation mit der GitHub API erfolgt über eine verschlüsselte HTTPS-Verbindung. Weitere Informationen finden Sie in der <a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement" className="text-blue-400 hover:text-blue-300">GitHub Datenschutzerklärung</a>.</p>

              <h3 className="text-xl font-semibold text-white mb-2">Umami Analytics</h3>
              <p className="mb-4">Wir nutzen Umami als datenschutzfreundliche Alternative zu Google Analytics. Umami ist ein Privacy-First Analytics Tool, das folgende Grundsätze befolgt:</p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">Keine Verwendung von Cookies</li>
                <li className="mb-2">Keine Speicherung personenbezogener Daten</li>
                <li className="mb-2">Keine Cross-Site oder Cross-Device Tracking</li>
                <li className="mb-2">Vollständige Compliance mit DSGVO</li>
              </ul>
              <p className="mb-4">Umami sammelt anonymisierte Daten wie:</p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">Seitenaufrufe</li>
                <li className="mb-2">Besuchsquellen</li>
                <li className="mb-2">Verwendete Gerätetypen</li>
                <li className="mb-2">Ungefähre geografische Location (basierend auf IP, die nicht gespeichert wird)</li>
              </ul>
              <p className="mb-4">Diese Daten helfen uns, unsere Website zu verbessern und werden ausschließlich in aggregierter Form verwendet. Es findet keine Zusammenführung mit anderen Datenquellen statt.</p>

              <h3 className="text-xl font-semibold text-white mb-2">Google Fonts</h3>
              <p className="mb-4">Wir binden Google Fonts lokal ein, um die Ladezeiten zu optimieren und Ihre Privatsphäre zu schützen. Es findet keine direkte Verbindung zu Google-Servern statt.</p>

              <h3 className="text-xl font-semibold text-white mb-2">Font Awesome</h3>
              <p className="mb-4">Wir nutzen Font Awesome für Icons. Die Einbindung erfolgt lokal, ohne Verbindung zu externen Servern.</p>

              <h3 className="text-xl font-semibold text-white mb-2">Soziale Medien</h3>
              <p className="mb-4">Auf unserer Website befinden sich Links zu verschiedenen sozialen Medien (YouTube, Instagram, Discord, LinkedIn). Diese Links sind als einfache Hyperlinks eingebunden. Beim Klick auf diese Links verlassen Sie unsere Website. Es werden keine Daten an die sozialen Medien übertragen, bevor Sie auf einen Link klicken.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">5. Technische Details</h2>
              <h3 className="text-xl font-semibold text-white mb-2">Server-Log-Files</h3>
              <p className="mb-4">Bei jedem Zugriff auf unsere Website werden automatisch Informationen in Server-Log-Files gespeichert. Diese beinhalten:</p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">Browsertyp und -version</li>
                <li className="mb-2">Verwendetes Betriebssystem</li>
                <li className="mb-2">Referrer URL (die zuvor besuchte Seite)</li>
                <li className="mb-2">IP-Adresse (anonymisiert)</li>
                <li className="mb-2">Uhrzeit der Serveranfrage</li>
              </ul>
              <p className="mb-4">Diese Daten dienen der technischen Bereitstellung und Absicherung unserer Website. Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">6. Kontakt für Datenschutzanfragen</h2>
              <p className="mb-4">Für Anfragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden:</p>
              <p className="mb-4">
                Achim Sommer<br />
                E-Mail: imprint@achimsommer.com
              </p>
              <p className="mb-4">Wir werden Ihre Anfragen schnellstmöglich bearbeiten und Ihnen bei der Ausübung Ihrer Rechte zur Seite stehen.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">7. Ihre Rechte</h2>
              <p className="mb-4">Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:</p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">Recht auf Auskunft (Art. 15 DSGVO)</li>
                <li className="mb-2">Recht auf Berichtigung (Art. 16 DSGVO)</li>
                <li className="mb-2">Recht auf Löschung (Art. 17 DSGVO)</li>
                <li className="mb-2">Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                <li className="mb-2">Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
                <li className="mb-2">Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
              </ul>
              <p className="mb-4">Um diese Rechte auszuüben, können Sie sich jederzeit an uns unter den oben angegebenen Kontaktdaten wenden.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">8. Datensicherheit</h2>
              <p className="mb-4">Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL-bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von "http://" auf "https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">9. Aktualität und Änderung dieser Datenschutzerklärung</h2>
              <p className="mb-4">Diese Datenschutzerklärung ist aktuell gültig und hat den Stand Januar 2024. Durch die Weiterentwicklung unserer Website und Angebote oder aufgrund geänderter gesetzlicher beziehungsweise behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung zu ändern. Die jeweils aktuelle Datenschutzerklärung kann jederzeit auf dieser Website von Ihnen abgerufen und ausgedruckt werden.</p>
            </section>
            
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
