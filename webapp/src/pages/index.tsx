import dayjs from 'dayjs';
import { useState } from 'preact/hooks';
import { Link } from 'react-router-dom';
import { useQuery } from 'urql';

import { graphql } from '~gql';

const moviesQuery = graphql(/* GraphQL */ `
  query Movies($skip: Int!, $take: Int!) {
    movies(skip: $skip, take: $take) {
      publicId
      name
      releasedIn
      avgRating
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
      <div class="bg-gray-500 h-80 flex items-end justify-start p-4 md:w-152">hero</div>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {data != null &&
          data.movies.map((movie) => (
            <div class="bg-gray-400 h-86">
              <Link className="flex flex-col justify-between h-full p-4 hover:underline" to={`movie/${movie.publicId}`}>
                <h3 className="text-2xl font-[BunkenSansPro] font-bold">{movie.name}</h3>
                <section className="flex justify-between">
                  {dayjs(movie.releasedIn).format('YYYY')}
                  <data value={movie.avgRating}>{movie.avgRating}/10</data>
                </section>
              </Link>
            </div>
          ))}
      </div>
    </>
  );
}
