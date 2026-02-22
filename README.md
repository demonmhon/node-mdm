# Node MDM

RESTful API for Master Data Management (MDM) using Express.js

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

First start docker with docker compose. Then start RESTful API with express.js which will start using [nodemon](https://nodemon.io/)

```bash
$ docker compose up -d
$ npm run start:dev
```

docker compose also contain [adminer](https://www.adminer.org/en/) to allow manage database on web browser. The default would be [http://localhost:8081/](http://localhost:8081/?pgsql=postgres&username=admin&db=mdm_db&ns=public)

[MIT](LICENSE.md)


## Sample data

`car-brands` → http://localhost:3300/v1/data/car-brands