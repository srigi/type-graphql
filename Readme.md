# srigi/type-graphql

Fullstack demo project (backend API, light frontend webapp in Preact) demonstrating [type-graphql](https://github.com/MichalLytek/type-graphql) and [Prisma](https://www.prisma.io/).

This is a monorepo with workspaces managed by PNPM!

## Requirements

- Node.js 20+
- pnpm
- [direnv](https://direnv.net/#docs)
- for zero-conf code-formatting in **VSCode** install [**ESLint**](https://marketplace.visualstudio.com/items/?itemName=dbaeumer.vscode-eslint), [**Prettier**](https://marketplace.cursorapi.com/items?itemName=esbenp.prettier-vscode) and [**Prisma**](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma) extensions

## Getting started

1. clone this repository

   ```sh
   mkdir type-graphql \
     && cd type-graphql \
     && git clone https://github.com/srigi/type-graphql.git
   ```

2. install dependencies

   ```sh
   pnpm install
   ```

3. copy [`.envrc (example)`](.envrc%20%28example%29) into `.envrc`. Feel free to change the values to your needs. Activate the new .envrc file:

   ```sh
   cp .envrc\ \(example\) .envrc \
     && direnv allow
   ```

## api

Server is using Sqlite3 database located at [`api/.data`](./api/.data) in this project.

1. migrate (create) the initial DB schema

   ```sh
   pnpm api prisma migrate dev
   ```

   _please note, this command will also generate [Prisma query engine](https://www.prisma.io/docs/orm/overview/databases/database-drivers) in `api/prisma/client`_

2. seed the database

   ```sh
   pnpm api db:seed
   ```

- (optional) manage your database using [`Prisma Studio`](https://www.prisma.io/docs/orm/tools/prisma-studio)

  ```sh
  pnpm api prisma studio
  ```

  _explore all available prisma commands with `pnpm api prisma`_

3. start [`api`](./api/) in dev mode

   ```sh
   pnpm api dev
   ```

   _Feel free to explore `localhost:3000/graphql` to create/execute GraphQL operations with help of [**Graphiql**](https://github.com/graphql/graphiql/tree/main?tab=readme-ov-file#graphiql). Or open [requests collection](.bruno) with [**Bruno**](https://www.usebruno.com/) <img width="32" src="https://raw.githubusercontent.com/usebruno/bruno/main/assets/images/logo-transparent.png" width="80"/>_

- (optional) manually generate [`schema.graphql`](./api/.out/schema.graphql) file

  ```sh
  pnpm api build:schema
  ```

  _please note, starting the api server, generates `schema.graphql` automatically_

## webapp

1. generate TypeScript types from server schema

   ```sh
   pnpm webapp codegen
   ```

2. run [`webapp`](./webapp) in dev mode

   ```sh
   pnpm webapp dev
   ```

## What about [TypeGraphQL Prisma](https://prisma.typegraphql.com)?

TypeGraphQL&nbsp;Prisma is a Prisma generator that auto-generates models & resolvers from prisma schema. However it is not compatible with latest Prisma&nbsp;v6.x. To stay on the edge of the latest TypeGraphQL&nbsp;&&nbsp;Prisma, this project will not utilize the TypeGraphQL&nbsp;Prisma!

However there are example sources from TypeGraphQL&nbsp;Prisma generator in [**typegraphql-prisma** branch](https://github.com/srigi/type-graphql/tree/typegraphql-prisma). You can refer to these examples as an inspiration to writing your own models & resolvers.
