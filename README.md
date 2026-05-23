## Pipeline

Wir haben unsere Pipeline zuerst so erstellt, dass wir sie mit commits testen konnten. Als dies geklappt hat haben wir den Trigger auf Pull Request umgestellt in dem wir die Zeile 

```bash
on:
  pull_request:
    branches: [main]
```

nach on: pull_request eingesetzt haben und nur wenn branch main ist.

Die Pipeline an sich hat 2 Jobs:
-frontend
-backend

Diese Jobs laufen auf GitHub Runners und das machen wir durch diese Zeilen:

```bash
jobs:
  frontend:
    runs-on: ubuntu-latest
```
und
```bash
  backend:
    runs-on: ubuntu-latest
```

Das Ziel der Pipeline ist:
2 Artifacts zu erstellen bei einem Pull Request, eine dist/ für das frontend und eine .war für das backend

Was macht unsere main.yml:

### Frontend

```bash
actions/setup-node@v4
```
hier wird node installiert
---

```bash
npm install
```
hier installieren wir die Dependecies
---

Dadurch ensteht ein Ordner dist
---

```bash
actions/upload-artifact
```
speichert das Ergbnis also das Artifact

### Backend:

```bash
actions/setup-java@v4
```
Hier wird die Java Umgebung eingerichtet
---

```bash
mvn clean package
```
Maven package wird erstellt
---

```bash
target/*.war
```
speichert die Datei als .war Datei
---

Getroffene Entscheidungen:

Frontend: 
wir verwenden:
- actions/setup-node@v4
- Node Version: 20

Begründung:

- offizielle GitHub Action
- einfache Installation ohne eigenes Docker Image
- kompatibel mit Vite und React
---

Backend:
wir verwenden:
- actions/setup-java@v4
- Distribution: temurin
- Java Version: 17

Begründung:

- LTS-Version (stabil)
- Standard für Spring Boot Projekte
- Maven kompatibel
---

Build Tool Frontend Vite
Begründung:
- schneller als klassische React Toolchains
- erzeugt optimierten Produktionsbuild
- Output: dist/ Ordner
---

Backend Build Tool Apache Maven
Begründung:
- Standard für Java Projekte
- automatisiert Dependencies + Build
- erzeugt .war Datei für Deployment
---
  
GitHub Actions Runner ubuntu-latest
Begründung:
- Linux Standard in CI/CD
- schnell verfügbar
- keine Setup-Kosten
- kompatibel mit Node + Java

---


# Kurzanleitung für die Installation der Entwicklungsumgebung zum Basisprojekt im Modul 324

## TLDR

ToDo-Liste mit React (frontend) und Spring (backend). Weitere Details sind in den
Kommentaren vor allem in App.js zu finden.

**Liebe Lernende, bitte FORKT dieses Repo für M324, und macht die Pull-Requests in euren FORKS.**

## Relevante Dateien in den Teil-Projekten (Verzeichnisse):

1. diese Beschreibung
2. frontend (Tools: npm und VSCode)
	* App.js

3. backend (Eclipse oder VS-Code)
	* DemoApplication.java
	* Task.java
	* pom.xml (JAR configuration, mit div. Plugins s.u.)

## Inbetriebnahme

1. forken oder clonen
1. *backend* in Eclipse importieren und mit Maven starten, oder in VS-Code via Java Extension Pack. Ohne Persistenz - nach dem Serverneustart sind die Todos futsch. Läuft auf default port 8080.
2. Im Terminal im *frontend* Verzeichnis
	1. mit `npm install` benötige Module laden
	2. mit `npm run dev` den Frontend-Server starten

## Benutzung

1. http://localhost:5173 zeigt das Frontend an. Hier kann man Tasks eingeben, die sofort darunter in der Liste mit einem *Done*-Button angezeigt werden.
2. Klickt man auf den *Done*-Button eines Tasks wird dieser aus der Liste entfernt (und natürlich auch von Backend-Server).
3. Die Task Beschreibungen müssen eindeutig (bzw. einmalig) sein.

### Anstehende Aufgaben

- Erweiterung der Funktionalität durch die Lernenden
- Alternatives Backend für eine VM (WAR Konfiguration)
- Test Umbegung mit Unit-Tests erweitern

(Ausgaben für white-box debugging sind bereits auf den beiden Server vorhanden)

