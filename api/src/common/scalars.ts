import { GraphQLScalarType } from 'graphql';

import { Prisma } from '~prisma/client';

export const Decimal = new GraphQLScalarType({
  name: 'Decimal',
  description: 'GraphQL Scalar representing the Prisma.Decimal type',

  serialize: (value: unknown) => {
    if (!Prisma.Decimal.isDecimal(value)) {
      throw new Error(`[DecimalError] Invalid argument: ${Object.prototype.toString.call(value)}. Expected Prisma.Decimal.`);
    }

    return (value as Prisma.Decimal).toString();
  },

  parseValue: (value: unknown) => {
    if (!(typeof value === 'string')) {
      throw new Error(`[DecimalError] Invalid argument: ${typeof value}. Expected string.`);
    }

    return new Prisma.Decimal(value);
  },
});
