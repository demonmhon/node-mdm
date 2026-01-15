# express-5x-api-starter

The express 5x starter for RestAPI project. Also Docker provided for production build.

## Getting started

Set your environment variables, update all variables in `.env` with correct values

```bash
$ cp .env.example .env
```

Install dependencies

```bash
$ npm install
```

## Start app

For development, will start using [nodemon](https://nodemon.io/)

```bash
$ npm run start:dev
```

**_Starter routes_**

- /v1/docs
- /v1/users

## Versioning

Starter route will provide API version with:

```text
http://localhost:3000/
http://localhost:3000/v1/
http://localhost:3000/latest/
```

## Docker

### Build

```bash
docker build . -t express-5x-api-starter
```

### Monitor with PM2

```bash
docker exec -it $(docker ps | grep express-5x-api-starter | cut -d' ' -f1) pm2 monit
```

## License

[MIT](LICENSE.md)
