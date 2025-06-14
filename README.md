# Procrastinatr

Procrastinatr är en enkel fullstack webbapplikation byggd för att hjälpa dig hantera uppgifter – när du *väl* får tummen ur.

Applikationen består av:
- Ett **.NET 8 Web API** (backend) som hanterar uppgifter och lagrar dem i en MongoDB-databas.
- Ett **React-frontend** (frontend) som kommunicerar med API:t och ger ett användarvänligt gränssnitt.
- Allt är paketerat och körs med **Docker Compose** för enkel uppstart och testning.
- All data sparas i en MongoDB-databas som körs som en egen container.

---

 - Docker används för att containerisera alla tjänster  
 - Docker Compose används för att koppla ihop backend, frontend och MongoDB i ett gemensamt nätverk  
 - Volym används för att spara MongoDB-data lokalt  
- Hantering av hemligheter  
   - Lokalt används dotnet user-secrets för utveckling  
   - I frontend används en .env-fil, för att undvika att känslig data hamnar på GitHub
---

## Kom igång med Docker

Följ stegen nedan för att köra applikationen lokalt med Docker och Docker Compose.

### 1. Klona projektet
``bash
git clone https://github.com/TantBella/dockercompose_labb.git 
  cd dockercompose_labb``

### 2. Bygg och starta containrar
``docker-compose build  
docker-compose up``

---
Planer för framtiden

  -Inloggning och autentisering

  - Möjlighet att sätta deadlines eller prioriteter

  - Några "prokrastinatr-roliga" inslag i UI:t


