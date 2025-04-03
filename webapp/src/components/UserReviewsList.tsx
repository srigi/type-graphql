import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

type Props = {
  userReviews: Array<{
    publicId: string;
    createdAt: string;
    score: string;
    text: string;
    user: {
      publicId: string;
      username: string;
    };
  }>;
};

export function UserReviewsList({ userReviews }: Props) {
  return (
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
  );
}
