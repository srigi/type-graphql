import { Ctx, Query, Resolver } from 'type-graphql';

import { Context } from '~/Auth/Context';
import { User } from '~/User/User';
import { prisma } from '~/lib/db';

@Resolver()
export class WhoamiResolver {
  @Query(() => User, { nullable: true })
  async whoami(@Ctx() ctx: Context): Promise<User | null> {
    // Since this resolver doesn't have @Authorized(), ctx.user won't be populated by authChecker
    if (ctx.jwt != null) {
      return await prisma.user.findUnique({ where: { publicId: ctx.jwt.payload.sub } });
    }

    return null;
  }
}
