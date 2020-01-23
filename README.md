# Projekt - Bazy Danych

## How-To

Do poprawnego działania wymagane są NodeJS oraz npm oraz serwer Postgres

### Baza danych

1. Domyślna nazwa bazy danych to `library`.
2. Dump tworzący strukturę danych oraz dodający podstawowe dane znajduje się w głównym katalogu repozytorium pod nazwą `db.dump`

### Backend
1. Instalacja wymaganych komponentów i uruchomienie backendu
```bash
cd backend/
npm install
npm start
```
2. W pliku backend/src/server.js:7 należy skonfigurować klienta połączenia z bazą danych wg. poniższego wzoru
```js
const pgClient = new pg.Client({
    database: 'DB_PROJ_MIELIMONKA_OSTROWKA',
    host: '192.168.244.131',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
});
```

### Frontend
1. Instalacja wymaganych komponentów i uruchomienie frontendu
```bash
cd frontend/
npm install
npm start
```
2. W pliku frontend/src/app/services/common.ts należy skonfigurować adres backendu (domyślnie `http://localhost:3000`)
3. Frontend jest osiągalny pod adresem `http://localhost:4200`