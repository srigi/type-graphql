import { useQuery } from '@urql/preact';
import { useRoute } from 'preact-iso';

import { NotFound } from '~/components/NotFound';
import { useDelayedLoader } from '~/hooks/useDelayedLoader';
import { advancedDayjs } from '~/utils/dateUtils';
import { graphql } from '~gql';

const figureQuery = graphql(`
  query Figure($slug: String!) {
    figure(slug: $slug) {
      publicId
      name
      birthday
      country
      movies(orderBy: "releasedIn.desc") {
        name
        role
        releasedIn
        slug
      }
    }
  }
`);

export function FigureDetailPage() {
  const { params } = useRoute();
  const [{ data, fetching }] = useQuery({
    query: figureQuery,
    variables: { slug: params.slug || '' },
    pause: params.slug == null,
  });
  const { renderLoader } = useDelayedLoader(fetching);

  if (params.slug == null) {
    return <NotFound />;
  }

  if (fetching) {
    return renderLoader();
  }

  if (data?.figure == null) {
    return <NotFound />;
  }

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:gap-4">
      <div className="flex-1 p-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">{data.figure.name}</h1>
        </div>
        <div className="mb-8">
          <img src="https://placehold.co/300x400" alt="Placeholder" className="h-64 w-full rounded-lg object-cover" />
        </div>
        <div>
          <h2 className="mb-4 text-2xl font-bold">Biography</h2>
          <p className="text-lg">
            {advancedDayjs(data.figure.birthday).format('MMM Do, YYYY')} - {data.figure.country}
          </p>
          <p className="mt-4 text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod
            malesuada.
          </p>
          <p className="mt-4 text-lg">
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>

      <div className="flex-1 rounded-lg bg-gray-800 p-4">
        <h2 className="mb-4 text-2xl font-bold">Roles</h2>
        <ul>
          {(data.figure.movies || []).map((movie: { slug: string; name: string; role: string; releasedIn: string }) => (
            <li key={movie.slug} className="mb-2">
              <a href={`/movie/${movie.slug}`} className="text-lg font-semibold text-white hover:underline">
                {movie.name} ({new Date(movie.releasedIn).getFullYear()})
              </a>
              <p className="text-gray-400">{movie.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
