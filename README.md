# Prokrastinatr

**Prokrastinatr** är en webbapplikation som hjälper användare att skriva ner uppgifter de prokrastinerar, utan krav på deadlines! Det är en lekfull todo-app med framtida ambitioner att lägga till humoristiska inslag och "prokrastinatr-roliga" UI-komponenter.

## Applikationen består av

- Ett **.NET 8 Web API** som hanterar uppgifter (todos) och lagrar dem i en **MongoDB**-databas.
- Ett **React.js**-frontend som kommunicerar med API:t och erbjuder ett enkelt och intuitivt användargränssnitt.
- Alla delar körs i **Docker-containrar**, gjorda med **Docker Compose** för enkel uppstart och hantering.
- MongoDB körs som en separat container.

## Teknik & verktyg

| Del         | Teknik/ramverk                | Kommentar                                                        |
| ----------- | ----------------------------- | ---------------------------------------------------------------- |
| Backend     | .NET 8 Web API                | Stabilt och snabbt API i C#, passar väl med MongoDB.             |
| Databas     | MongoDB                       | Passar bra för flexibel datastruktur, lätt att använda med .NET. |
| Frontend    | React.js                      | Snabb utveckling, bra ekosystem och komponenthantering.          |
| Docker      | Docker & Compose              | Enkel hantering av tjänster lokalt och i framtida molnmiljöer.   |
| Hemligheter | `dotnet user-secrets`, `.env` | Säker hantering av känslig data under utveckling.                |

## Kom igång med Docker

Följ stegen nedan för att köra applikationen lokalt med Docker och Docker Compose.

### 1. Klona projektet

```bash
git clone https://github.com/TantBella/dockercompose_labb.git
cd dockercompose_labb
```

### 2. Bygg och starta containrarna

```bash
docker-compose up --build
```

Applikationen kommer att vara tillgänglig på:

- Frontend: [http://localhost:3000](http://localhost:3000)
- API: [http://localhost:5000](http://localhost:5000) _(eller enligt din `docker-compose.yml`)_

## Hantering av hemligheter

- **Backend (.NET)**: `dotnet user-secrets` används för att hantera API-nycklar och anslutningssträngar lokalt utan att de checkas in i Git.
- **Frontend (React)**: `.env`-fil används för miljövariabler som API-URL, vilket skyddar känslig data från att hamna på GitHub.

## Framtida funktioner

- Inloggning och autentisering
- Möjlighet att sätta deadlines och prioritera uppgifter
- Humorbaserade UI-inslag ("prokrastinatr mode", memes m.m.)

---

Projektet är skapat som en del av min utbildning inom .NET och DevOps och visar hur man bygger och containeriserar en fullstackapplikation med moderna verktyg.
