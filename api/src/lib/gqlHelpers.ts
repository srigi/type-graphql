/* eslint-disable @typescript-eslint/no-explicit-any */
import type { GraphQLResolveInfo } from 'graphql';
import graphqlFields from 'graphql-fields';

function transformFields(fields: Record<string, any>): Record<string, any> {
  return Object.fromEntries(
    Object.entries(fields).map<[string, any]>(([key, value]) => {
      if (Object.keys(value).length === 0) {
        return [key, true];
      }
      if ('__arguments' in value) {
        return [
          key,
          Object.fromEntries(
            value.__arguments.map((argument: object) => {
              const [[key, { value }]] = Object.entries(argument);
              return [key, value];
            }),
          ),
        ];
      }
      return [key, transformFields(value)];
    }),
  );
}

export function transformInfoIntoPrismaArgs(info: GraphQLResolveInfo): Record<string, any> {
  const fields: Record<string, any> = graphqlFields(
    // suppress GraphQLResolveInfo types issue
    info as any,
    {},
    {
      excludedFields: ['__typename'],
      processArguments: true,
    },
  );
  return transformFields(fields);
}

export function transformCountFieldIntoSelectRelationsCount(_count: object) {
  return {
    include: {
      _count: {
        select: {
          ...Object.fromEntries(Object.entries(_count).filter(([_k, v]) => v != null)),
        },
      },
    },
  };
}
