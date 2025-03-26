import { useContext } from 'preact/hooks';
import { useQuery, useMutation } from 'urql';

import { AuthContext } from '~/contexts/AuthContext';
import { graphql } from '~gql';

const allUsersQuery = graphql(`
  query Users($skip: Int!, $take: Int!) {
    users(skip: $skip, take: $take) {
      publicId
      username
    }
  }
`);
const signInMutation = graphql(`
  mutation SignIn($publicId: String!) {
    signIn(publicId: $publicId) {
      authToken
      user {
        publicId
        username
      }
    }
  }
`);

export function Navbar() {
  const [{ data, fetching, error }] = useQuery({ query: allUsersQuery, variables: { skip: 0, take: 25 } });
  const [, signIn] = useMutation(signInMutation);
  const { user, setUser } = useContext(AuthContext);

  return (
    <header className="container flex items-center justify-between">
      <a href="/" className="flex items-center font-[BunkenSansPro] text-6xl">
        <img src="/logo-brand@2.webp" className="h-[122px]" alt="logo" />
        Movies
      </a>

      {fetching != null && data == null && <small>loading...</small>}
      {user ? (
        <div className="px-8 py-2">Signed as {user.username}</div>
      ) : (
        data != null && (
          <details className="relative inline-block rounded-t-2xl bg-black">
            <summary className="px-8 py-2">Sign-in as...</summary>
            <ul className="absolute right-0 z-10 rounded-2xl rounded-tr-none bg-black px-10 py-4">
              {data.users.map((u: { publicId: string; username: string }) => (
                <li key={u.publicId} className="w-full py-2">
                  <button
                    className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    onClick={async () => {
                      const { data } = await signIn({ publicId: u.publicId });
                      if (data?.signIn.user) {
                        setUser({ ...data.signIn.user });
                      }
                    }}
                  >
                    {u.username}
                  </button>
                </li>
              ))}
            </ul>
          </details>
        )
      )}
      {error != null && <small>error!...</small>}
    </header>
  );
}
