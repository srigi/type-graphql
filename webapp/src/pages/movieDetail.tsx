import dayjs from 'dayjs';
import { useContext } from 'preact/hooks';
import { useMediaQuery } from 'react-responsive';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useMutation, useSubscription } from 'urql';

import { AuthContext } from '~/contexts/AuthContext';
import { AddReviewForm } from '~/components/forms/AddReviewForm';
import { CloudImage } from '~/components/CloudImage';
import { Figures } from '~/components/Figures';
import { Nl2br } from '~/components/Nl2br';
import { NotFound } from '~/components/NotFound';
import { NewReviewNotification } from '~/components/NewReviewNotification';
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
const addReviewMutation = graphql(`
  mutation AddReview($userReview: AddReviewInput!) {
    addReview(userReview: $userReview) {
      publicId
      score
      text
      createdAt
    }
  }
`);
const newUserReviewSubscription = graphql(`
  subscription UserReviewsUpdates($moviePublicId: String!) {
    userReviewAdded(moviePublicId: $moviePublicId) {
      publishedAt
      userReview {
        score
        text
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

  const { user } = useContext(AuthContext);
  const [{ data, fetching }] = useQuery({ query: movieQuery, variables: { slug } });
  const [, addReview] = useMutation(addReviewMutation);
  const [newUserReviews] = useSubscription(
    {
      query: newUserReviewSubscription,
      variables: { moviePublicId: data?.movie?.publicId || '' },
      pause: data?.movie?.publicId == null,
    },
    (prev: any[] = [], data: { userReviewAdded: { publishedAt: string; userReview: { score: string; text: string } } }) => [
      ...prev,
      data.userReviewAdded,
    ],
  );

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
        <div className="flex-1/3 px-8 text-xl lg:pr-0">
          <Figures movieFigures={data.movie.figures} />
        </div>

        <div className="flex flex-2/3 flex-col gap-4">
          <h2 className="px-2 text-3xl font-bold">Add your review</h2>

          {user ? (
            data.movie.userReviews.some((review) => review.user?.publicId === user?.publicId) ? (
              <div className="rounded-xl bg-gray-700 p-4 text-center">
                <p className="text-lg">You have already reviewed this movie.</p>
              </div>
            ) : (
              <AddReviewForm
                onSubmit={(review) => {
                  if (data?.movie) {
                    addReview({
                      userReview: {
                        moviePublicId: data.movie.publicId,
                        text: review.text,
                        score: `${review.score}`,
                      },
                    });
                  }
                }}
              />
            )
          ) : (
            <div className="rounded-xl bg-gray-700 p-4 text-center">
              <p className="mb-2 text-lg font-bold">Sign-in to review</p>
              <p>You need to be signed in to leave a review for this movie.</p>
            </div>
          )}

          <h2 className="px-2 text-3xl font-bold">User reviews</h2>

          {newUserReviews?.data && newUserReviews.data.length > 0 && (
            <NewReviewNotification notifications={newUserReviews.data} currentUserPublicId={user?.publicId} />
          )}

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
