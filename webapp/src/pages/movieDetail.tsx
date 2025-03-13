import dayjs from 'dayjs';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'urql';

import { CloudImage } from '~/ui/CloudImage';
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
      images(role: "hero") {
        publicId
        alt
        AR
      }
      figures {
        name
        slug
        role
      }
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

  function renderFigures(movieFigures: Array<{ name: string; role: string; slug: string }>) {
    const assignments = movieFigures.reduce<{
      director: Array<{ name: string; slug: string }>;
      camera: Array<{ name: string; slug: string }>;
      actors: Array<{ name: string; slug: string }>;
    }>(
      (acc, figure) => {
        if (figure.role === 'director') acc.director.push({ name: figure.name, slug: figure.slug });
        if (figure.role === 'director of photography') acc.camera.push({ name: figure.name, slug: figure.slug });
        if (figure.role === 'main character') acc.actors.push({ name: figure.name, slug: figure.slug });
        if (figure.role === 'supporting character') acc.actors.push({ name: figure.name, slug: figure.slug });

        return acc;
      },
      { director: [], camera: [], actors: [] },
    );

    return (
      <dl className="grid grid-cols-[8rem_1fr] items-start justify-start gap-4">
        {assignments.director.length > 0 && (
          <>
            <dt>Director:</dt>
            <dd>
              {assignments.director.map((d, idx) => (
                <span key={idx}>
                  <strong>{d.name}</strong>
                  {idx !== assignments.director.length - 1 && ', '}
                </span>
              ))}
            </dd>
          </>
        )}

        {assignments.camera.length > 0 && (
          <>
            <dt>Camera:</dt>
            <dd>
              {assignments.camera.map((c, idx) => (
                <span key={idx}>
                  <strong>{c.name}</strong>
                  {idx !== assignments.camera.length - 1 && ', '}
                </span>
              ))}
            </dd>
          </>
        )}

        {assignments.actors.length > 0 && (
          <>
            <dt>Cast:</dt>
            <dd>
              {assignments.actors.map((a, idx) => (
                <span key={idx}>
                  <strong>
                    <Link to={`/figure/${a.slug}`}>{a.name}</Link>
                  </strong>
                  {idx !== assignments.actors.length - 1 && ', '}
                </span>
              ))}
            </dd>
          </>
        )}
      </dl>
    );
  }

  return (
    <>
      <div className="relative min-h-120">
        <CloudImage className="absolute inset-0 h-full w-full object-cover" image={data.movie.images[0]} width={1280} />

        <div className="absolute inset-0 flex gap-8 bg-gradient-to-b from-transparent to-black p-8">
          <section className="flex flex-1 flex-col justify-between">
            <div>
              <h1 className="text-5xl font-bold">
                <MultilineText text={data.movie.name} />
              </h1>
              {dayjs(data.movie.releasedIn).format('YYYY')}
            </div>

            <data value={data.movie.avgScore}>{data.movie.avgScore}/10</data>
          </section>
          <aside className="flex flex-1 flex-col justify-end text-lg">{data.movie.story}</aside>
        </div>
      </div>

      <div className="flex gap-4 pt-8">
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
        <div className="flex-1/3 p-4 pt-16 text-xl">{renderFigures(data.movie.figures)}</div>
      </div>
    </>
  );
}
