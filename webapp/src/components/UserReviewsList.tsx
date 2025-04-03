import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { useSubscription } from 'urql';

import { NewReviewNotification } from '~/components/NewReviewNotification';
import { MovieQuery, UserReviewNotification, UserTypingNotification } from '~gql/graphql';
import { graphql } from '~gql';

const userReviewTypingSubscription = graphql(`
  subscription UserReviewsTyping($moviePublicId: String!, $userPublicId: String!) {
    userTypingUpdates(moviePublicId: $moviePublicId, userPublicId: $userPublicId) {
      username
      event
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

type Props = {
  movie: Pick<NonNullable<MovieQuery['movie']>, 'publicId' | 'userReviews'>;
  currentUserPublicId?: string;
};

export function UserReviewsList({ movie: { publicId: moviePublicId, userReviews }, currentUserPublicId }: Props) {
  const [userReviewTypingEvents] = useSubscription(
    {
      query: userReviewTypingSubscription,
      // Ensure moviePublicId and currentUserPublicId are not undefined before passing
      variables: { moviePublicId: moviePublicId ?? '', userPublicId: currentUserPublicId ?? '' },
      pause: !moviePublicId || !currentUserPublicId,
    },
    (prev: any[] = [], data: { userTypingUpdates: UserTypingNotification }) => [...prev, data.userTypingUpdates],
  );
  const [newUserReviews] = useSubscription(
    {
      query: newUserReviewSubscription,
      variables: { moviePublicId },
      pause: !moviePublicId, // Pause if moviePublicId is missing
    },
    (prev: any[] = [], data: { userReviewAdded: UserReviewNotification }) => [...prev, data.userReviewAdded],
  );

  // Determine which users are currently typing
  const rawTypingEvents: UserTypingNotification[] = userReviewTypingEvents?.data || [];
  const latestEventsByUser: Record<string, UserTypingNotification> = {};
  for (const event of rawTypingEvents) {
    latestEventsByUser[event.username] = event; // keep overwriting with newer events for the same user
  }
  const typingUsers = Object.values(latestEventsByUser)
    .filter((event) => event.event === 'STARTED')
    .map((event) => event.username); // get just the usernames

  return (
    <>
      <h2 className="px-2 text-3xl font-bold">User reviews</h2>

      {/* Display users who are currently typing */}
      <div className="min-h-[1.5em] px-2 text-sm text-gray-400">
        {typingUsers.length > 0 && (
          <>
            {typingUsers.map((username) => (
              <p key={username}>{username} is typing...</p>
            ))}
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4">
        {newUserReviews?.data && newUserReviews.data.length > 0 && (
          <NewReviewNotification notifications={newUserReviews.data} currentUserPublicId={currentUserPublicId} />
        )}

        <ul className="flex flex-1 flex-col gap-4">
          {userReviews.map((r) => (
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
    </>
  );
}
