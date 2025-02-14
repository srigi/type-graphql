import type { GraphQLResolveInfo } from 'graphql';
import graphqlFields from 'graphql-fields';

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

export function getPrismaFromContext(context: any) {
  const prismaClient = context['prisma'];
  if (!prismaClient) {
    throw new Error('Unable to find Prisma Client in GraphQL context. Please provide it under the `context["prisma"]` key.');
  }
  return prismaClient;
}

export function transformCountFieldIntoSelectRelationsCount(_count: object) {
  return {
    include: {
      _count: {
        select: {
          ...Object.fromEntries(Object.entries(_count).filter(([_, v]) => v != null)),
        },
      },
    },
  };
}
