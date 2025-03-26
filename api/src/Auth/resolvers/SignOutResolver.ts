import { Ctx, Mutation, Int, Resolver } from 'type-graphql';
import { ServerResponse } from 'node:http';
import { serialize } from 'cookie';

@Resolver()
export class SignOutResolver {
  @Mutation(() => Int)
  async signOut(@Ctx() ctx: { res: ServerResponse }): Promise<number> {
    ctx.res.setHeader(
      'Set-Cookie',
      serialize('bearer', '', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 0,
      }),
    );

    return 0;
  }
}
