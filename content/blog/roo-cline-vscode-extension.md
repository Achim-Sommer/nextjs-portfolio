---
title: 'Roo Code (Roo Cline) in VS Code einrichten'
description: 'Roo Code, früher Roo Cline, in VS Code installieren und mit OpenAI, Anthropic oder DeepSeek verbinden. Einrichtung, Funktionen und Tipps für den Alltag.'
date: '2025-01-04'
lastModified: '2026-09-30'
tags: ['KI', 'Webentwicklung']
featured: false
---

> **TL;DR**: Roo Code ist eine leistungsstarke VS Code Extension, die KI-gestützte Entwicklung ermöglicht. Diese Anleitung zeigt dir, wie du Roo Code in VS Code installierst, mit einem KI-Anbieter verbindest und die wichtigsten Funktionen nutzt.

> **Hinweis zum Namen**: Die Extension hieß ursprünglich "Roo Cline" und wurde 2025 in "Roo Code" umbenannt. Es handelt sich um dieselbe Extension; im Marketplace findest du sie unter dem neuen Namen.

In diesem ausführlichen Tutorial zeige ich dir **Schritt für Schritt**, wie du Roo Code in Visual Studio Code installierst und konfigurierst. Roo Code ist aus einem Fork des bekannten Coding-Agenten Cline entstanden und hat sich seitdem mit eigenen Funktionen wie verschiedenen Arbeitsmodi eigenständig weiterentwickelt.

## Voraussetzungen

> **Wichtig**: Bevor du mit der Installation beginnst, stelle sicher, dass dein System alle Mindestanforderungen erfüllt.

### Systemvoraussetzungen
- Eine aktuelle Version von Visual Studio Code
- Ein API-Key eines KI-Anbieters (oder ein lokal laufendes Modell)
- Internetzugang für die API-Kommunikation
- Node.js nur, wenn du die Extension selbst aus dem Quellcode bauen möchtest

### KI-Anbieter und Kosten
Roo Code ist selbst kostenlos, du bezahlst aber die Nutzung der KI-Modelle beim jeweiligen Anbieter. Unterstützt werden unter anderem:

1. **[DeepSeek](https://www.deepseek.com)**: eine vergleichsweise günstige Option für den Einstieg
2. **[Anthropic](https://www.anthropic.com/api)**: die Claude-Modelle, die sich für Coding-Aufgaben bewährt haben
3. **[OpenAI](https://platform.openai.com/docs/overview)**: die GPT-Modelle
4. **[Google AI Studio](https://aistudio.google.com/)**: Gemini-Modelle, mit einem begrenzten kostenlosen Kontingent
5. **OpenRouter**: ein Dienst, über den du mit einem einzigen API-Key viele Modelle verschiedener Anbieter nutzen kannst
6. **Lokale Modelle** über Ollama oder LM Studio, wenn dein Code den eigenen Rechner nicht verlassen soll

**Zu den Preisen**: Modelle und Preise ändern sich bei allen Anbietern häufig. Abgerechnet wird meist pro Million Tokens, getrennt nach Eingabe und Ausgabe. Prüfe die aktuellen Konditionen deshalb direkt auf den Preisseiten der Anbieter, bevor du dich entscheidest, und setze dir dort ein Ausgabenlimit.

## 1. Roo Code installieren: So richtest du die VS Code Extension ein

Wenn du dir erst einen Überblick über weitere KI-Helfer verschaffen möchtest, lies meinen Artikel über [KI-Tools für Entwickler](/blog/ki-tools-entwickler-produktivitaet).

### Über den VS Code Marketplace
1. Öffne Visual Studio Code
2. Gehe zum Extensions Marketplace (Ctrl+Shift+X)
3. Suche nach "Roo Code"
4. Klicke auf "Installieren"

Alternativ kannst du die Extension direkt über ihre [Seite im VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=RooVeterinaryInc.roo-cline) installieren. Die technische Kennung der Extension enthält aus historischen Gründen noch den alten Namen.

### Über GitHub
Der Quellcode liegt öffentlich auf GitHub:
```bash
git clone https://github.com/RooCodeInc/Roo-Code
```
Wie du die Extension daraus baust und in VS Code startest, beschreibt das README im Repository. Für den normalen Einsatz reicht die Installation über den Marketplace.

## 2. Konfiguration der APIs

### DeepSeek API einrichten
1. Erstelle ein Konto auf [deepseek.com](https://www.deepseek.com)
2. Generiere einen API-Key
3. Öffne die Roo Code Einstellungen in VS Code
4. Wähle DeepSeek als API-Anbieter und füge den API-Key ein

### Alternative APIs
- OpenAI: Erstelle einen API-Key im [OpenAI Dashboard](https://platform.openai.com/api-keys)
- Anthropic: Registriere dich auf [anthropic.com](https://www.anthropic.com/api)
- Google AI Studio: Nutze das kostenlose Kontingent

## 3. Funktionen im Überblick

### Modi
Roo Code arbeitet mit verschiedenen Modi, die jeweils auf eine Aufgabe zugeschnitten sind, zum Beispiel:
- **Code** für das Schreiben und Ändern von Code
- **Architect** für Planung und Konzeption
- **Ask** für Fragen zu deinem Code, ohne dass Dateien verändert werden
- **Debug** für die systematische Fehlersuche

Zusätzlich kannst du eigene Modi mit eigenen Anweisungen und Berechtigungen anlegen.

### Drag & Drop
- Ziehe Bilder direkt in den Chat
- Extrahiere Text aus Screenshots

### Nachrichtenmanagement
- Lösche einzelne Nachrichten aus dem Chatverlauf
- Kopiere Prompts schnell aus der Historie

### KI-Optimierung
- "Enhance Prompt" Button, der deinen Prompt vor dem Absenden verbessert
- Unterstützung zahlreicher Anbieter wie OpenRouter und AWS Bedrock

### Benutzererlebnis
- Soundeffekte für Feedback
- Anpassbare Browser-Größen
- Konfigurierbare Screenshot-Qualität
- Systemzeit im Prompt
- Zuverlässiger Dateisystem-Watcher

### Internationalisierung
- Sprachauswahl für Roo Code (Deutsch, Englisch, Japanisch, Spanisch, Französisch und mehr)

### MCP Kontrolle
- Per-Tool Auto-Approval
- Einzelne MCP Server aktivieren/deaktivieren
- MCP Feature komplett deaktivierbar
- Konfigurierbare Verzögerung nach Auto-Writes
- Kontrolle über Terminal-Ausgabezeilen

Der Funktionsumfang wächst mit fast jedem Update. Einen aktuellen Überblick liefern die Release Notes im Repository.

## Häufig gestellte Fragen (FAQ)

### Ist Roo Code kostenlos?
Ja, Roo Code ist eine kostenlose Open-Source-Software. Du zahlst nur für die API-Nutzung.

### Kann ich mehrere APIs gleichzeitig nutzen?
Ja. Du kannst mehrere API-Konfigurationen anlegen und zwischen ihnen wechseln, zum Beispiel ein günstiges Modell für einfache Aufgaben und ein stärkeres für komplexe Änderungen.

### Welche API ist am besten für Roo Code?
Das hängt von deinem Budget und deinen Aufgaben ab. DeepSeek ist eine günstige Option für den Einstieg, die leistungsstärksten Modelle von Anthropic oder OpenAI kosten mehr, liefern bei komplexen Aufgaben aber oft bessere Ergebnisse. Vergleiche vor der Entscheidung die aktuellen Preise der Anbieter.

### Brauche ich Programmierkenntnisse für Roo Code?
Grundlegende Programmierkenntnisse sind hilfreich, damit du die Vorschläge der KI beurteilen kannst. Worauf du beim Einsatz von KI-Tools achten solltest, beschreibe ich in meinem Artikel [KI in der Webentwicklung](/blog/ki-in-der-webentwicklung-wie-entwickler-von-ki-tools-profitieren-koennen).

## Fazit: Warum sich Roo Code lohnt

Mit dieser Anleitung kannst du Roo Code erfolgreich in VS Code installieren und als KI-gestützten Coding-Assistenten nutzen. Die Installation ist dank des VS Code Marketplaces sehr einfach, und du kannst direkt mit der Nutzung beginnen.

**Vorteile von Roo Code auf einen Blick:**
- Kostenlose Open-Source VS Code Extension
- Einfache Installation und Bedienung
- Unterstützung für viele KI-Anbieter und lokale Modelle
- Anpassbare Modi für unterschiedliche Aufgaben
- Geeignet für einzelne Entwickler und Teams

Bei Fragen oder Problemen kannst du gerne einen Kommentar hinterlassen oder mich direkt kontaktieren. Viel Erfolg mit Roo Code!
