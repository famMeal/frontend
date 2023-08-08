import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: '../backend/graphql/schema/schema.graphql',
  generates: {
    './src/graphql/types/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;
