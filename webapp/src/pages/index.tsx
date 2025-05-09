import dayjs from 'dayjs';
import { useState } from 'preact/hooks';
import { useMediaQuery } from 'react-responsive';
import { useQuery } from '@urql/preact';

import { CloudImage } from '~/components/CloudImage';
import { Nl2br } from '~/components/Nl2br';
import { graphql } from '~gql';

const moviesQuery = graphql(`
  query Movies($skip: Int!, $take: Int!) {
    movies(skip: $skip, take: $take) {
      publicId
      slug
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
  const [{ skip, take }] = useState({ skip: 0, take: 25 });
  const [{ data }] = useQuery({ query: moviesQuery, variables: { skip, take } });

  const isSmScreen = useMediaQuery({ query: '(max-width: 767px)' });
  const thumbnailWidth = isSmScreen ? 296 : 238;

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {data != null &&
        data.movies.map((movie) => (
          <div key={movie.publicId} className="h-86 overflow-hidden rounded-xl bg-gray-700">
            <a className="relative flex h-full flex-col justify-between p-4 hover:underline" href={`/movie/${movie.slug}`}>
              {movie.images.length > 0 && (
                <CloudImage className="absolute inset-0 h-full w-full object-cover" image={movie.images[0]} width={thumbnailWidth} />
              )}
              <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-b from-transparent to-gray-900 p-4">
                <h3 className="font-[BunkenSansPro] text-2xl font-bold [text-shadow:_1px_2px_5px_black]">
                  <Nl2br text={movie.name} />
                </h3>
                <section className="flex justify-between">
                  <strong>{dayjs(movie.releasedIn).format('YYYY')}</strong>
                  <data value={movie.avgScore}>{movie.avgScore}&nbsp;⭐️</data>
                </section>
              </div>
            </a>
          </div>
        ))}
    </div>
  );
}
