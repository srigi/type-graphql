import { serialize } from 'cookie';
import { sign } from 'jsonwebtoken';
import { ServerResponse } from 'node:http';
import { ArgumentValidationError, Resolver, Mutation, Arg, Ctx } from 'type-graphql';

import { prisma } from '~/lib/db';
import { env } from '~/lib/env';
import { SignInResponse } from '../SignInResponse';

const JWT_VALIDITY = 60 * 60 * 12;

@Resolver(SignInResponse)
export class SignInResolver {
  @Mutation(() => SignInResponse)
  async signIn(@Arg('publicId', () => String) publicId: string, @Ctx() ctx: { res: ServerResponse }): Promise<SignInResponse> {
    const user = await prisma.user.findUnique({ where: { publicId } });
    if (user == null) {
      throw new ArgumentValidationError([{ property: 'publicId', constraints: { presence: 'User with provided publicId does not exist' } }]);
    }

    const authToken = sign({ username: user.username }, env.API_JWT_SECRET, {
      algorithm: 'HS256',
      expiresIn: JWT_VALIDITY,
      issuer: env.API_BASE_URL,
      subject: publicId,
    });

    ctx.res.setHeader(
      'Set-Cookie',
      serialize('bearer', authToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: JWT_VALIDITY,
        partitioned: true,
      }),
    );

    return { user, authToken };
  }
}
