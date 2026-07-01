# Hausmeister Scherer — Website

Statische, handgemachte Website für den Hausmeisterservice Scherer in Saarbrücken. Kein Build-Step, kein Framework, keine Abhängigkeiten — nur HTML, CSS und ein wenig Vanilla-JavaScript.

## Lokal öffnen

Einfach `index.html` im Browser doppelklicken — oder mit einem kleinen lokalen Server:

```bash
cd hausmeister-scherer
python3 -m http.server 5173
# dann http://localhost:5173 öffnen
```

## Inhalte ändern

- **Texte / CTAs**: direkt in `index.html`.
- **Bilder / Hero-Video**: URLs zu Pexels/Unsplash in `index.html` ersetzen. Bei eigenen Dateien in `assets/` ablegen und Pfade anpassen.
- **Farben & Typografie**: zentral als CSS-Variablen in `styles/main.css` (`:root`).
- **Impressum / Datenschutz**: Vorlagen unter `impressum.html` und `datenschutz.html` — Platzhalter in eckigen Klammern ergänzen.

## Brand-Palette

| Rolle      | Hex      |
|------------|----------|
| Primary    | #1F3A2E  |
| Accent     | #C9A878  |
| Surface    | #F5F1EA  |
| Text       | #1A1A1A  |
| Muted      | #6B6B6B  |
