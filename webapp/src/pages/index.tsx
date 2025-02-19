import dayjs from 'dayjs';
import { useState } from 'preact/hooks';
import { Link } from 'react-router-dom';
import { useQuery } from 'urql';

import { MultilineText } from '~/ui/MultilineText';
import { graphql } from '~gql';

const moviesQuery = graphql(`
  query Movies($skip: Int!, $take: Int!) {
    movies(skip: $skip, take: $take) {
      publicId
      name
      releasedIn
      avgScore
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
    <>
      <div class="flex h-80 items-end justify-start bg-gray-500 p-4 md:w-152">hero</div>

      <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {data != null &&
          data.movies.map((movie) => (
            <div class="h-86 bg-gray-400">
              <Link className="flex h-full flex-col justify-between p-4 hover:underline" to={`/movie/${movie.publicId}`}>
                <h3 className="font-[BunkenSansPro] text-2xl font-bold">
                  <MultilineText text={movie.name} />
                </h3>
                <section className="flex justify-between">
                  {dayjs(movie.releasedIn).format('YYYY')}
                  <data value={movie.avgScore}>{movie.avgScore}/10</data>
                </section>
              </Link>
            </div>
          ))}
      </div>
    </>
  );
}
