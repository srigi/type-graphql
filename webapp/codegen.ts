import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: '../api/.out/schema.graphql',
  documents: ['src/**/*.tsx', '!src/.gql/**/*'],
  hooks: { afterAllFileWrite: ['prettier --write'] },
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './src/.gql/': { preset: 'client' },
  },
};

export default config;
