import LegalPage from '@/components/legal/LegalPage';
import Link from 'next/link';

import type { Metadata } from 'next';

export const viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Datenschutzerklärung - Achim Sommer',
  description: 'Datenschutzerklärung für das Portfolio von Achim Sommer',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function DatenschutzPage() {
  return (
    <LegalPage eyebrow="Rechtliches" title="Datenschutzerklärung">
      <section>
        <h2>1. Datenschutz auf einen Blick</h2>
        <h3>Allgemeine Hinweise</h3>
        <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.</p>
      </section>

      <section>
        <h3>Datenerfassung auf unserer Website</h3>
        <h4>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h4>
        <p>Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.</p>

        <h4>Wie erfassen wir Ihre Daten?</h4>
        <p>Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben.</p>
        <p>Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie unsere Website betreten.</p>

        <h4>Wofür nutzen wir Ihre Daten?</h4>
        <p>Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.</p>

        <h4>Welche Rechte haben Sie bezüglich Ihrer Daten?</h4>
        <p>Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung, Sperrung oder Löschung dieser Daten zu verlangen. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.</p>
      </section>

      <section>
        <h2>2. Allgemeine Hinweise und Pflichtinformationen</h2>
        <h3>Datenschutz</h3>
        <p>Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p>
        <p>Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.</p>
      </section>

      <section>
        <h3>Hinweis zur verantwortlichen Stelle</h3>
        <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
        <p>
          Achim Sommer<br />
          Adalbertsteinweg 156<br />
          52066 Aachen<br />
          E-Mail: imprint@achimsommer.com
        </p>
      </section>

      <section>
        <h2>3. Cookies und Local Storage</h2>
        <h3>Cookie-Banner und Einwilligung</h3>
        <p>Beim ersten Besuch unserer Website wird Ihnen ein Cookie-Banner angezeigt. Hier können Sie entscheiden, ob Sie der Verwendung von Cookies zustimmen möchten. Ihre Entscheidung wird im localStorage Ihres Browsers unter dem Schlüssel 'cookieConsent' gespeichert.</p>
        <h3>Verwendete Cookies und Local Storage</h3>
        <p>Wir verwenden ausschließlich technisch notwendige Cookies und Local Storage Einträge:</p>
        <ul>
          <li>cookieConsent (Local Storage): Speichert Ihre Cookie-Präferenz</li>
        </ul>
      </section>

      <section>
        <h2>4. Kontaktformular</h2>
        <h3>Umfang der Verarbeitung</h3>
        <p>Wenn Sie uns über das <Link href="/kontakt">Kontaktformular</Link> eine Nachricht senden, verarbeiten wir folgende Daten:</p>
        <ul>
          <li>Name (Pflichtangabe)</li>
          <li>E-Mail-Adresse (Pflichtangabe)</li>
          <li>Betreff (freiwillige Angabe)</li>
          <li>Inhalt Ihrer Nachricht (Pflichtangabe)</li>
          <li>Zeitpunkt der Absendung</li>
          <li>Ihre IP-Adresse, ausschließlich flüchtig im Arbeitsspeicher zur Begrenzung der Anfragen pro Stunde (Spam-Schutz). Es findet keine dauerhafte Speicherung statt.</li>
        </ul>

        <h3>Zweck und Rechtsgrundlage</h3>
        <p>Die Verarbeitung erfolgt ausschließlich zur Bearbeitung und Beantwortung Ihrer Anfrage. Rechtsgrundlage ist Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO, die Sie über die Checkbox im Formular erteilen. Sofern Ihre Anfrage auf den Abschluss oder die Durchführung eines Vertrages gerichtet ist, ist zusätzlich Art. 6 Abs. 1 lit. b DSGVO Rechtsgrundlage. Das Interesse an einem funktionsfähigen Spam-Schutz stützt sich auf Art. 6 Abs. 1 lit. f DSGVO.</p>
        <p>Ihre Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen, etwa per formloser E-Mail an imprint@achimsommer.com. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt davon unberührt.</p>

        <h3>Versanddienstleister (Auftragsverarbeitung)</h3>
        <p>Für die technische Zustellung der Formularnachrichten als E-Mail nutzen wir den Dienst Resend der Resend, Inc., 2261 Market Street #5039, San Francisco, CA 94114, USA. Die von Ihnen eingegebenen Daten werden zu diesem Zweck an Resend übermittelt. Mit Resend besteht ein Auftragsverarbeitungsvertrag nach Art. 28 DSGVO; die Übermittlung in die USA erfolgt auf Grundlage der EU-Standardvertragsklauseln nach Art. 46 Abs. 2 lit. c DSGVO. Weitere Informationen finden Sie in der <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Datenschutzerklärung von Resend</a>.</p>

        <h3>Speicherdauer</h3>
        <p>Die Formulardaten werden nicht in einer Datenbank auf dieser Website gespeichert, sondern unmittelbar als E-Mail an unser Postfach zugestellt. Dort verbleiben sie, bis der Zweck der Speicherung entfällt, also bis Ihre Anfrage abschließend bearbeitet ist und keine gesetzlichen Aufbewahrungspflichten (insbesondere handels- und steuerrechtliche Fristen) entgegenstehen. Anschließend werden die Daten gelöscht.</p>

        <h3>Erforderlichkeit</h3>
        <p>Die Angabe der Pflichtfelder ist erforderlich, damit wir Ihre Anfrage bearbeiten und beantworten können. Die Nutzung des Formulars ist freiwillig. Sie können uns alternativ jederzeit direkt per E-Mail an imprint@achimsommer.com kontaktieren.</p>
      </section>

      <section>
        <h2>5. Externe Dienste und Integrationen</h2>
        <h3>GitHub API-Integration</h3>
        <p>Wir nutzen die GitHub API, um Repositories und Beitragsstatistiken anzuzeigen. Dabei werden folgende Daten verarbeitet:</p>
        <ul>
          <li>Repository-Informationen (Name, Beschreibung, URL)</li>
          <li>Beitragsstatistiken</li>
          <li>Programmiersprachen und Statistiken</li>
        </ul>
        <p>Die Kommunikation mit der GitHub API erfolgt über eine verschlüsselte HTTPS-Verbindung. Weitere Informationen finden Sie in der <a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement">GitHub Datenschutzerklärung</a>.</p>

        <h3>Aktivitätskalender (GitHub und GitLab)</h3>
        <p>Im Bereich Projekte zeigen wir einen Kalender mit der Anzahl der Beiträge (zum Beispiel Commits) des Websitebetreibers pro Tag. Dafür ruft ausschließlich unser Server folgende Quellen ab:</p>
        <ul>
          <li>die öffentliche Beitragsübersicht des GitLab-Profils des Websitebetreibers bei GitLab (GitLab B.V. bzw. GitLab Inc., gitlab.com)</li>
          <li>die Beitragsübersicht des GitHub-Profils des Websitebetreibers über den Dienst github-contributions-api.jogruber.de, der diese öffentlichen GitHub-Daten bereitstellt</li>
        </ul>
        <p>Abgerufen werden nur Datum und Anzahl der Beiträge des Websitebetreibers. Ihr Browser stellt dabei keine Verbindung zu GitLab, GitHub oder dem genannten Dienst her, sondern erhält die zusammengefassten Daten von unserem eigenen Server. Es werden keine personenbezogenen Daten von Besuchern an diese Dienste übermittelt. Die Daten werden auf unserem Server für einige Stunden zwischengespeichert. Weitere Informationen finden Sie in der <a href="https://about.gitlab.com/privacy/" target="_blank" rel="noopener noreferrer">Datenschutzerklärung von GitLab</a>.</p>

        <h3>Umami Analytics</h3>
        <p>Wir nutzen Umami als datenschutzfreundliche Alternative zu Google Analytics. Umami ist ein Privacy-First Analytics Tool, das folgende Grundsätze befolgt:</p>
        <ul>
          <li>Keine Verwendung von Cookies</li>
          <li>Keine Speicherung personenbezogener Daten</li>
          <li>Keine Cross-Site oder Cross-Device Tracking</li>
          <li>Vollständige Compliance mit DSGVO</li>
        </ul>
        <p>Umami sammelt anonymisierte Daten wie:</p>
        <ul>
          <li>Seitenaufrufe</li>
          <li>Besuchsquellen</li>
          <li>Verwendete Gerätetypen</li>
          <li>Ungefähre geografische Location (basierend auf IP, die nicht gespeichert wird)</li>
        </ul>
        <p>Diese Daten helfen uns, unsere Website zu verbessern und werden ausschließlich in aggregierter Form verwendet. Es findet keine Zusammenführung mit anderen Datenquellen statt.</p>

        <h3>Google Fonts</h3>
        <p>Wir binden Google Fonts lokal ein, um die Ladezeiten zu optimieren und Ihre Privatsphäre zu schützen. Es findet keine direkte Verbindung zu Google-Servern statt.</p>

        <h3>Font Awesome</h3>
        <p>Wir nutzen Font Awesome für Icons. Die Einbindung erfolgt lokal, ohne Verbindung zu externen Servern.</p>

        <h3>Soziale Medien</h3>
        <p>Auf unserer Website befinden sich Links zu verschiedenen sozialen Medien (YouTube, Instagram, Discord, LinkedIn). Diese Links sind als einfache Hyperlinks eingebunden. Beim Klick auf diese Links verlassen Sie unsere Website. Es werden keine Daten an die sozialen Medien übertragen, bevor Sie auf einen Link klicken.</p>
      </section>

      <section>
        <h2>6. Technische Details</h2>
        <h3>Server-Log-Files</h3>
        <p>Bei jedem Zugriff auf unsere Website werden automatisch Informationen in Server-Log-Files gespeichert. Diese beinhalten:</p>
        <ul>
          <li>Browsertyp und -version</li>
          <li>Verwendetes Betriebssystem</li>
          <li>Referrer URL (die zuvor besuchte Seite)</li>
          <li>IP-Adresse (anonymisiert)</li>
          <li>Uhrzeit der Serveranfrage</li>
        </ul>
        <p>Diese Daten dienen der technischen Bereitstellung und Absicherung unserer Website. Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.</p>
      </section>

      <section>
        <h2>7. Kontakt für Datenschutzanfragen</h2>
        <p>Für Anfragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden:</p>
        <p>
          Achim Sommer<br />
          E-Mail: imprint@achimsommer.com
        </p>
        <p>Wir werden Ihre Anfragen schnellstmöglich bearbeiten und Ihnen bei der Ausübung Ihrer Rechte zur Seite stehen.</p>
      </section>

      <section>
        <h2>8. Ihre Rechte</h2>
        <p>Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:</p>
        <ul>
          <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
          <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
          <li>Recht auf Löschung (Art. 17 DSGVO)</li>
          <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
        </ul>
        <p>Um diese Rechte auszuüben, können Sie sich jederzeit an uns unter den oben angegebenen Kontaktdaten wenden.</p>
      </section>

      <section>
        <h2>9. Datensicherheit</h2>
        <p>Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL-bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von "http://" auf "https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.</p>
      </section>

      <section>
        <h2>10. Aktualität und Änderung dieser Datenschutzerklärung</h2>
        <p>Diese Datenschutzerklärung ist aktuell gültig und hat den Stand Oktober 2026. Durch die Weiterentwicklung unserer Website und Angebote oder aufgrund geänderter gesetzlicher beziehungsweise behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung zu ändern. Die jeweils aktuelle Datenschutzerklärung kann jederzeit auf dieser Website von Ihnen abgerufen und ausgedruckt werden.</p>
      </section>
    </LegalPage>
  );
}
