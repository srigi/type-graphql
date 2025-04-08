import { useContext } from 'preact/hooks';
import { useParams } from 'react-router-dom';
import { useQuery } from 'urql';

import { AuthContext } from '~/contexts/AuthContext';
import { AddReviewForm } from '~/components/forms/AddReviewForm';
import { Figures } from '~/components/Figures';
import { NotFound } from '~/components/NotFound';
import { MovieHero } from '~/components/MovieHero';
import { UserReviewsList } from '~/components/UserReviewsList';
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
  const { user } = useContext(AuthContext);
  const { slug } = useParams();
  const [{ data, fetching }, refetch] = useQuery({ query: movieQuery, variables: { slug: slug || '' }, pause: slug == null });
  const { renderLoader } = useDelayedLoader(fetching);

  if (slug == null) {
    return <NotFound />;
  }

  if (fetching) {
    return renderLoader();
  }

  if (data?.movie == null) {
    return <NotFound />;
  }

  return (
    <>
      <MovieHero movie={data.movie} />

      <div className="flex flex-col gap-16 pt-8 lg:flex-row lg:gap-4">
        <div className="flex-1/3 px-8 text-xl lg:pr-0">
          <Figures movieFigures={data.movie.figures} />
        </div>

        <div className="flex flex-2/3 flex-col gap-4">
          {user ? (
            data.movie.userReviews.some((review) => review.user?.publicId === user?.publicId) ? (
              <div className="rounded-xl bg-gray-700 p-4 text-center">
                <p className="text-lg">You have already reviewed this movie.</p>
              </div>
            ) : (
              <>
                <h2 className="px-2 text-3xl font-bold">Add your review</h2>
                <AddReviewForm moviePublicId={data.movie.publicId} onSubmitted={() => refetch({ requestPolicy: 'cache-and-network' })} />
              </>
            )
          ) : (
            <div className="rounded-xl bg-gray-700 p-4 text-center">
              <p className="mb-2 text-lg font-bold">Sign-in to review</p>
              <p>You need to be signed in to leave a review for this movie.</p>
            </div>
          )}

          <UserReviewsList movie={data.movie} currentUserPublicId={user?.publicId} />
        </div>
      </div>
    </>
  );
}
