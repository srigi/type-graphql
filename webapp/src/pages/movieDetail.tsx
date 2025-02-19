import dayjs from 'dayjs';
import { Link, useParams } from 'react-router-dom';
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
      avgScore
      userReviews {
        publicId
        score
        text
        createdAt
        user {
          publicId
          username
        }
      }
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

          <data value={data.movie.avgScore}>{data.movie.avgScore}/10</data>
        </section>
        <aside className="flex-1 text-lg">{data.movie.story}</aside>
      </div>

      <div className="flex gap-4">
        <div className="flex flex-2/3 flex-col gap-4">
          <h2 className="text-3xl font-bold">User reviews</h2>
          <ul className="flex flex-1 flex-col gap-4">
            {data.movie.userReviews.map((r) => (
              <li key={r.publicId} className="-p4 flex flex-col gap-4 bg-gray-400 p-4">
                <header className="flex justify-between gap-4">
                  <Link to={`/user/${r.user.publicId}`}>
                    <strong>{r.user.username}</strong>
                  </Link>
                  <span>{dayjs(r.createdAt).format('DD/MM/YYYY')}</span>
                </header>
                <data value={r.score}>{r.score}/10</data>
                <p>{r.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex h-60 flex-1/3 bg-gray-400 p-4 text-2xl">{data.movie.story}</div>
      </div>
    </>
  );
}
