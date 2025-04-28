import dayjs from 'dayjs';
import { useEffect, useState } from 'preact/hooks';
import { useSubscription } from '@urql/preact';

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
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [userReviewTypingEvents] = useSubscription(
    {
      query: userReviewTypingSubscription,
      // Ensure moviePublicId and currentUserPublicId are not undefined before passing
      variables: { moviePublicId: moviePublicId ?? '', userPublicId: currentUserPublicId ?? '' },
      pause: !moviePublicId || !currentUserPublicId,
    },
    (prev: UserTypingNotification[] = [], data: { userTypingUpdates: UserTypingNotification }) => [...prev, data.userTypingUpdates],
  );
  const [newUserReviews] = useSubscription(
    {
      query: newUserReviewSubscription,
      variables: { moviePublicId },
      pause: !moviePublicId, // Pause if moviePublicId is missing
    },
    (prev: UserReviewNotification[] = [], data: { userReviewAdded: UserReviewNotification }) => [...prev, data.userReviewAdded],
  );

  useEffect(() => {
    const rawTypingEvents: UserTypingNotification[] = userReviewTypingEvents?.data || [];
    const newTypingUsers: string[] = [];

    for (const event of rawTypingEvents) {
      const { username, event: evtType } = event;

      if (evtType === 'STARTED') {
        if (!newTypingUsers.includes(username)) {
          newTypingUsers.push(username);
        }
      } else if (evtType === 'STOPPED') {
        const idx = newTypingUsers.indexOf(username);
        if (idx !== -1) {
          newTypingUsers.splice(idx, 1);
        }
      }
    }

    setTypingUsers(newTypingUsers);
  }, [userReviewTypingEvents?.data]);

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
                <a href={`/user/${r.user.publicId}`}>
                  <strong>{r.user.username}</strong>
                </a>
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
