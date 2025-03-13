import dayjs from 'dayjs';
import { useState } from 'preact/hooks';
import { Link } from 'react-router-dom';
import { useQuery } from 'urql';

import { CloudImage } from '~/ui/CloudImage';
import { MultilineText } from '~/ui/MultilineText';
import { graphql } from '~gql';

const moviesQuery = graphql(`
  query Movies($skip: Int!, $take: Int!) {
    movies(skip: $skip, take: $take) {
      publicId
      name
      releasedIn
      avgScore

      images(role: "poster") {
        publicId
        AR
        alt
      }
    }
  }
`);

export function IndexPage() {
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(25);
  const [{ data }] = useQuery({
    query: moviesQuery,
    variables: { skip, take },
  });

  return (
    <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {data != null &&
        data.movies.map((movie) => (
          <div key={movie.publicId} class="h-86 bg-gray-400">
            <Link className="relative flex h-full flex-col justify-between p-4 hover:underline" to={`/movie/${movie.publicId}`}>
              {movie.images.length > 0 && (
                <CloudImage className="absolute inset-0 h-full w-full object-cover" image={movie.images[0]} width={320} />
              )}
              <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-b from-transparent to-black p-4">
                <h3 className="font-[BunkenSansPro] text-2xl font-bold">
                  <MultilineText text={movie.name} />
                </h3>
                <section className="flex justify-between">
                  <strong>{dayjs(movie.releasedIn).format('YYYY')}</strong>
                  <data value={movie.avgScore}>{movie.avgScore}&nbsp;⭐️</data>
                </section>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
}
