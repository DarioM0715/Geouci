# GeoUCI

GeoUCI es una aplicación de mapas georreferenciados para la Universidad de las Ciencias Informáticas (UCI). El proyecto integra datos espaciales con información contextual mediante sistemas de información geográfica (SIG), con el objetivo de ofrecer orientación dentro del campus, gestionar espacios universitarios y digitalizar la experiencia académica a través de tecnologías de código abierto.

## Descripción

Inspirado en iniciativas geoespaciales de universidades internacionales (Stanford, MIT, UNAM, USP) y en plataformas como ArcGIS Online y OpenStreetMap, GeoUCI busca brindar una plataforma sostenible y de código abierto para la visualización cartográfica y la gestión de la información universitarios en el contexto cubano.

Este repositorio contiene el **backend** del proyecto, expuesto como una API REST construida sobre:

- [NestJS](https://nestjs.com) como marco de desarrollo.
- [Prisma ORM](https://www.prisma.io) para el acceso a datos, con cliente generado en `src/generated/prisma`.
- [PostgreSQL](https://www.postgresql.org) (con soporte futuro de [PostGIS](https://postgis.net)) como base de datos espacial.
- [Leaflet.js / OpenLayers](https://leafletjs.com) previstos como frontend cartográfico.

## Requisitos

- Node.js 20+
- PostgreSQL 18
- npm

## Configuración

1. Instalar dependencias:

```bash
$ npm install
```

2. Configurar variables de entorno. Copiar el archivo `.env` con la conexión a PostgreSQL:

```
DATABASE_URL="postgresql://USUARIO:CLAVE@localhost:5433/geouci?schema=public"
```

3. Aplicar las migraciones a la base de datos:

```bash
$ npx prisma migrate deploy
```

4. Regenerar el cliente Prisma (tras cambios en `prisma/schema.prisma`):

```bash
$ npx prisma generate
```

## Ejecución del proyecto

```bash
# desarrollo (watch mode)
$ npm run start:dev

# producción
$ npm run start:prod
```

## Scripts

```bash
$ npm run build       # compilar el proyecto
$ npm run start       # arrancar la aplicación
$ npm run lint        # análisis estático (oxlint)
$ npm run test        # pruebas unitarias (vitest)
$ npm run test:e2e    # pruebas end-to-end
```

## Estructura

- `src/` — código fuente de la API (módulos NestJS: `prisma`, `events`, `users`).
- `prisma/` — esquema de datos y migraciones.
- `src/generated/prisma/` — cliente Prisma generado.