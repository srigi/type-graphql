import { User } from '~prisma/client';

export type Context = {
  jwt?: {
    payload: {
      iss: string;
      iat: number;
      exp: number;
      aud: string;
      sub: string;
      username: string;
    };
    token: {
      prefix: 'Bearer';
      value: string;
    };
  };
  user?: User;
};
