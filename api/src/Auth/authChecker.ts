import { type AuthChecker } from 'type-graphql';

import { prisma } from '~/lib/db';
import { type Context } from './Context';

export const authChecker: AuthChecker<Context> = async ({ context }) => {
  if (context.jwt == null) {
    return false;
  }

  const user = await prisma.user.findUnique({ where: { publicId: context.jwt.payload.sub } });
  if (user == null) {
    return false;
  }

  context.user = user;

  return true;
};
