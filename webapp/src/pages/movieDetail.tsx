import dayjs from 'dayjs';
import { useMediaQuery } from 'react-responsive';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'urql';

import { CloudImage } from '~/components/CloudImage';
import { Nl2br } from '~/components/Nl2br';
import { NotFound } from '~/components/NotFound';
import { useDelayedLoader } from '~/hooks/useDelayedLoader';
import { graphql } from '~gql';

const movieQuery = graphql(`
  query Movie($slug: String!) {
    movie(slug: $slug) {
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
  const { slug } = useParams();
  if (slug == null) {
    return <NotFound />;
  }

  const [{ data, fetching }] = useQuery({ query: movieQuery, variables: { slug } });
  const { renderLoader } = useDelayedLoader(fetching);
  if (fetching) {
    return renderLoader();
  }

  if (data?.movie == null) {
    return <NotFound />;
  }

  const heroWidth = (() => {
    const isSmScreen = useMediaQuery({ query: '(max-width: 767px)' });
    const isLgScreen = useMediaQuery({ query: '(min-width: 1024px)' });
    const isXlScreen = useMediaQuery({ query: '(min-width: 1280px)' });
    const isXxlScreen = useMediaQuery({ query: '(min-width: 1536px)' });

    if (isXxlScreen) return 1504;
    if (isXlScreen) return 1248;
    if (isLgScreen) return 992;
    if (isSmScreen) return 608;

    return 736;
  })();

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
      <div className="relative min-h-120 overflow-hidden rounded-xl">
        {data.movie.images.length > 0 && (
          <CloudImage className="absolute inset-0 h-full w-full object-cover" image={data.movie.images[0]} width={heroWidth} />
        )}

        <div className="absolute inset-0 grid grid-cols-2 grid-rows-[1fr_1fr_auto] gap-8 bg-gradient-to-b from-transparent to-gray-900 p-8 text-lg lg:grid-rows-2">
          <h1 className="col-span-2 text-3xl font-bold [text-shadow:_1px_2px_5px_black] lg:col-span-1 xl:text-5xl">
            <Nl2br text={data.movie.name} />
          </h1>

          <p className="col-span-2 self-end lg:order-4 lg:col-span-1 xl:text-xl">{data.movie.story}</p>

          <strong className="self-end lg:order-3">{dayjs(data.movie.releasedIn).format('YYYY')}</strong>

          <data className="self-end justify-self-end lg:order-2 lg:self-start lg:justify-self-end">{data.movie.avgScore}&nbsp;⭐️</data>
        </div>
      </div>

      <div className="flex flex-col gap-16 pt-8 lg:flex-row lg:gap-4">
        <div className="flex-1/3 px-8 text-xl lg:pr-0">{renderFigures(data.movie.figures)}</div>

        <div className="flex flex-2/3 flex-col gap-4">
          <h2 className="px-2 text-3xl font-bold">User reviews</h2>
          <ul className="flex flex-1 flex-col gap-4">
            {data.movie.userReviews.map((r) => (
              <li key={r.publicId} className="-p4 flex flex-col gap-4 rounded-xl bg-gray-700 p-4">
                <header className="flex justify-between gap-4">
                  <Link to={`/user/${r.user.publicId}`}>
                    <strong>{r.user.username}</strong>
                  </Link>
                  <span>{dayjs(r.createdAt).format('D.M.YYYY')}</span>
                </header>
                <data value={r.score}>{r.score}&nbsp;⭐️</data>
                <p>{r.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
