import { Args, Query, Resolver } from 'type-graphql';

import { prisma } from '~/lib/db';
import { RangeArgs } from '~/common/args/Range';
import { User } from '../User';

@Resolver(() => User)
export class UserResolver {
  @Query(() => [User])
  async users(@Args(() => RangeArgs) { skip, take }: RangeArgs): Promise<User[]> {
    return prisma.user.findMany({ skip, take: take || 25, orderBy: { createdAt: 'desc' } });
  }
}
