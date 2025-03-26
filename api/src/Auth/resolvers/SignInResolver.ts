import { serialize } from 'cookie';
import { sign } from 'jsonwebtoken';
import { ServerResponse } from 'node:http';
import { ArgumentValidationError, Resolver, Mutation, Arg, Ctx } from 'type-graphql';

import { User } from '~/User/User';
import { prisma } from '~/lib/db';
import { env } from '~/lib/env';

@Resolver(User)
export class SignInResolver {
  @Mutation((returns) => User)
  async signIn(@Arg('publicId', () => String) publicId: string, @Ctx() ctx: any): Promise<User> {
    const user = await prisma.user.findUnique({ where: { publicId } });
    if (user == null) {
      throw new ArgumentValidationError([{ property: 'publicId', constraints: { presence: 'User with provided publicId does not exist' } }]);
    }

    const token = sign({ username: user.username }, env.API_JWT_SECRET, {
      algorithm: 'HS256',
      subject: publicId,
      issuer: env.API_BASE_URL,
      expiresIn: '1h',
    });

    (ctx.res as ServerResponse).setHeader(
      'Set-Cookie',
      serialize('bearer', token, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 3600 }),
    );

    return user;
  }
}
