# Home Library Service

Clone repository and checkout to branch - `part_2`.

## Installing NPM modules

```
npm install
```

## Running application using docker compose

```
docker-compose up
```

by default the application uses and exposes PORT 4000

PORT value is stored into .env file

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test

```

## Generating migration

```
npm run migration:generate && npm run migration:run

```