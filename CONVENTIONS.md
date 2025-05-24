# type-graphql

This is a monorepo project managed by pnpm

## PNPM

- there are two packages: api, webapp
- always run NPM scripts from the root of the project
- run package's specific NPM script using syntax `pnpm api <script>` or `pnpm webapp <script>`
- both packages supports `tsc` NPM script to do scoped typecheck

## api

- api is using TypeGraphQL 2.0 and GraphQL schema is emitted to api/.out/schema.graphql file
- you can build the GraphQL schema by running `build:schema` NPM script
- api is using Prisma 6.x and schema is defined in api/prisma
- api is using graphql-yoga 5.x and SSE subscriptions
- you can regenerate the Prisma client by running `prisma generate` NPM script
- find/generate any GraphQL resolver in `src/<MODEL>/resolvers`
- if not sure, look at the existing code for the structure of the api code
- try to use aliased imports primarily. The definition of TypeScript import aliases is (note it is relative to `<project_root>/api` folder):
  ```json
  "paths": {
    "~/*": ["./src/*"],
    "~prisma/*": ["./prisma/*"]
  },
  ```
- if using any TypeScript decorators (in resolvers for example), always use long variant that explicitly declares the type:

  - do:

  ```ts
  @Args(() => OrderByArgs) { orderBy }: OrderByArgs = {},
  ```

  - don't:

  ```ts
  @Args() { orderBy }: OrderByArgs = {},
  ```

- when implementing orderBy parameters, validate that the direction is either 'asc' or 'desc' (lowercase):
  ```ts
  if (orderBy) {
    const [field, direction] = orderBy.split('.');
    if (direction !== 'asc' && direction !== 'desc') {
      throw new ArgumentValidationError([
        { property: 'orderBy', constraints: { enum: `Direction must be either asc or desc, but received ${direction}` } },
      ]);
    }
  }
  ```

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
- try to use aliased imports primarily. The definition of TypeScript import aliases is (note it is relative to `<project_root>/webapp` folder):
  ```json
  "paths": {
    "react": ["./node_modules/preact/compat/"],
    "react-dom": ["./node_modules/preact/compat/"],
    "~gql": ["./src/.gql/"],
    "~gql/*": ["./src/.gql/*"],
    "~/*": ["./src/*"]
  },
  ```
