# Agentur-Bingo

Eine Handy-Bingo-Karte für die Agenturtour des Portfoliokurses in Berlin. Grün, Rosa, ein bisschen Druckraster und sehr flache Hierarchien.

## Spielen

Die Seite zieht 16 unterschiedliche Begriffe aus der Sammlung und mischt ihre Positionen. Tippen markiert ein Feld; erneutes Tippen entfernt die Markierung. Vier waagerecht, senkrecht oder diagonal ergeben Bingo. Karte und Häkchen bleiben im selben Browser gespeichert. „Neue Karte“ mischt neu; bei vorhandenen Häkchen wird vor dem Zurücksetzen nachgefragt.

## Mit GitHub Pages veröffentlichen

1. Den Ordner `portfoliokurs-agentur-bingo` in GitHub Desktop öffnen. Die neuen Dateien mit einer Nachricht wie „Agentur-Bingo erstellen“ committen und **Publish branch** bzw. **Push origin** wählen.
2. Im [GitHub-Repo](https://github.com/juliuswenk/portfoliokurs-agentur-bingo) **Settings → Pages** öffnen.
3. Unter **Build and deployment → Source** die Option **Deploy from a branch** wählen.
4. Als Branch **main** und als Ordner **/(root)** auswählen, dann **Save** drücken.
5. Warten, bis GitHub unter Pages die erfolgreiche Veröffentlichung meldet. Die Website ist dann normalerweise unter **https://juliuswenk.github.io/portfoliokurs-agentur-bingo/** erreichbar. Bei Problemen den Reiter **Actions** prüfen.

Es ist kein Build und keine Installation nötig. Die Datei `index.html` liegt direkt im Hauptverzeichnis. `.nojekyll` sorgt dafür, dass GitHub die Dateien unverändert bereitstellt. Ein öffentliches Repo lässt sich auch mit GitHub Free über Pages hosten.

Spätere Änderungen einfach erneut committen und pushen; GitHub aktualisiert die Seite automatisch.

[Offizielle GitHub-Anleitung](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## Begriffe ändern

Die Sammlung steht am Anfang von `bingo.js` in `ENTRIES`. Weitere Begriffe als eigene Zeile ergänzen. Mindestens 16 unterschiedliche Einträge sind nötig. Jede neue Karte wählt zufällig 16 aus; bestehende gespeicherte Karten bleiben erhalten, solange ihre Begriffe noch enthalten sind.

## Lokal ansehen und prüfen

`index.html` im Browser öffnen oder diesen Ordner mit einem lokalen Webserver bereitstellen, zum Beispiel `python3 -m http.server 8765`, dann `http://localhost:8765` öffnen. Der Test für Auswahl, Speicherung und Bingo-Erkennung läuft mit `node bingo.test.cjs`.

Keine externen Schriftarten, Bibliotheken, Cookies oder Trackingdienste. Der Spielstand wird nur lokal im Browser gespeichert.
