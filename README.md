# nodeTsEs6Babel

## PRIMEROS PASOS

Clonar el repositorio:

```
$ git clone https://github.com/RoxnnyABarriosC/nodeTsEs6Babel.git
```
Configura tu usuario y contraseña y presiona enter. Luego entra a la carpeta `nodeTsEs6Babel`.

```sh
cd nodeTsEs6Babel
```

## INSTALACION

require:

1. [Node.js](https://nodejs.org/) v16+
2. [TypeORM](https://typeorm.io/) v0.3+
3. [Babel](https://babeljs.io/) v7+
4. [TypeScript](https://www.typescriptlang.org/) v4+
4. [Nodemon](https://www.npmjs.com/package/nodemon) v2+

Instala las dependencias y las de desarrollo haciendo:

```sh
pnpm i
```

> **_NOTE:_** Si no tines intalado pnpm puedes hacerlo ejecutanto `npm i -G pnpm`


Luego crea un nuevo archivo .env, copia y pega todas las variables del archivo .env.example y pon los valores correspondientes como sigue:


```sh
NODE_ENV=development
URL_API=<protocol>://<domain><port><prefix><version>
URL_WEB=http://localhost:3000
PREFIX=/api
PORT=3000
VERSION=/v1

DB_HOST=localhost
DB_USER=nodetses6babel
DB_DATABASE=nodetses6babel
DB_PASSWORD=nodetses6babel
DB_PORT=5433
DB_SYNCHRONIZE=true
DB_TYPE=postgres

PAGINATION_LIMIT=10

SET_COOKIE_SECURE=true
SET_COOKIE_SAME_SITE=none

JWT_SECRET=nodetses6babel
JWT_EXPIRES=600000
JWT_ISS=nodetses6babel
JWT_AUD=nodetses6babel.com

ENCRYPTION_DEFAULT=bcrypt

LOCALE=es
```

## PUESTA EN MARCHA

Debes usar `${pnpm start:dev}`, Por ejemplo.

```sh
$ pnpm start:dev
```

> **_COLECCION EN POSTMAN:_** [aqui](./nodetses6babel.postman_collection.json)



