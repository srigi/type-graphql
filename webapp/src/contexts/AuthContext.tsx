import { createContext } from 'preact';
import type { JSX } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { useQuery } from '@urql/preact';

import { graphql } from '~gql';

export type AuthUser = {
  publicId: string;
  username: string;
};

type AuthContextType = {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

const whoamiQuery = graphql(`
  query Whoami {
    whoami {
      publicId
      username
    }
  }
`);

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [{ data, fetching }] = useQuery({ query: whoamiQuery, variables: {} });

  useEffect(() => {
    if (!fetching && data?.whoami) {
      setUser(data.whoami);
    }
  }, [data, fetching]);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};
