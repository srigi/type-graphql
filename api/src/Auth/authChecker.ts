import { type AuthChecker } from 'type-graphql';

import { prisma } from '~/lib/db';
import { type Context } from './Context';

export const authChecker: AuthChecker<Context> = async ({ context }) => {
  if (context.jwt == null) {
    return false;
  }

  // TODO maybe we don't need to check user vs. DB here
  const user = await prisma.user.findUnique({ where: { publicId: context.jwt.payload.sub } });
  if (user == null) {
    return false;
  }

  context.user = user;

  return true;
};
