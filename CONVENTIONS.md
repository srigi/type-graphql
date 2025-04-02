# type-graphql

- this is a monorepo project managed by pnpm
- there are two packages: api, webapp
- to run NPM script of the package from the root of the project use syntax `pnpm api <script>` or `pnpm webapp <script>`
- don't attempt to start services of api or webapp!
- you can check if TypeScript sources compiles by running `tsc` NPM script in the package(s)

## api

- api is using TypeGraphQL 2.0 and GraphQL schema is emitted to api/.out/schema.graphql file
- you can build the GraphQL schema by running `build:schema` NPM script
- api is using Prisma 6.x and schema is defined in api/prisma
- api is using graphql-yoga 5.x and SSE subscriptions
- you can regenerate the Prisma client by running `prisma generate` NPM script
- find/generate any GraphQL resolver in `src/<MODEL>/resolvers`
- if not sure, look at the existing code for the structure of the api code

## webapp

- this project is using Preact instead of React!
- for GraphQL it is using URQL client (initialized in `src/index.tsx`)
- you can regenerate TypeScript types from GraphQL schema using codegen by running `codegen` NPM script
- any GraphQL query must be written with the help of `graphql` and have a name, otherwise the codegen will not pick it!

  - do:

    ```ts
    const moviesQuery = graphql(`
      query Users {
        users {
          publicId
          username
        }
      }
    `);
    ```

  - don't:
    ```ts
    const moviesQuery = gql`
      query {
        users {
          publicId
          username
        }
      }
    `;
    ```

- find/generate any Preact component in `src/components`
- find/generate React-router page in `src/pages`
- if not sure, look at the existing code for the structure of the webapp code
