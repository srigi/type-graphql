import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import { useQuery } from 'urql';

import { MultilineText } from '~/ui/MultilineText';
import { NotFound } from '~/ui/NotFound';
import { useDelayedLoader } from '~/hooks/useDelayedLoader';
import { graphql } from '~gql';

const movieQuery = graphql(`
  query Movie($publicId: String!) {
    movie(publicId: $publicId) {
      publicId
      name
      releasedIn
      story
      avgRating
    }
  }
`);

export function MovieDetailPage() {
  const { publicId } = useParams();
  if (publicId == null) {
    return <NotFound />;
  }

  const [{ data, fetching }] = useQuery({
    query: movieQuery,
    variables: { publicId },
  });
  const { renderLoader } = useDelayedLoader(fetching);
  if (fetching) {
    return renderLoader();
  }

  if (data?.movie == null) {
    return <NotFound />;
  }

  return (
    <>
      <div className="flex min-h-80 gap-8 bg-gray-500 p-8">
        <section className="flex flex-1 flex-col justify-between">
          <div>
            <h1 className="text-5xl font-bold">
              <MultilineText text={data.movie.name} />
            </h1>
            {dayjs(data.movie.releasedIn).format('YYYY')}
          </div>

          <data value={data.movie.avgRating}>{data.movie.avgRating}/10</data>
        </section>
        <aside className="flex-1 text-lg">{data.movie.story}</aside>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="flex h-60 items-center justify-center bg-gray-400 text-6xl">Movie {publicId} thumbnail</div>
        <div className="flex h-60 items-center justify-center bg-gray-400 text-6xl">Movie {publicId} thumbnail</div>
      </div>
    </>
  );
}
