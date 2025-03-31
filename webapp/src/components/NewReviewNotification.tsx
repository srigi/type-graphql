import { useState, useEffect } from 'preact/hooks';
import dayjs from 'dayjs';

type UserReviewNotification = {
  publishedAt: string;
  userReview: {
    score: string;
    text: string;
    user: {
      username: string;
    };
  };
};

interface NewReviewNotificationProps {
  notification: UserReviewNotification;
}

export function NewReviewNotification({ notification }: NewReviewNotificationProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    setIsExpanded(true);
  };

  return (
    <>
      {!isExpanded ? (
        <div
          className={`cursor-pointer rounded-xl bg-indigo-600 p-4 shadow-lg transition-all duration-300 ${
            isVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-90 opacity-0'
          }`}
          onClick={handleClick}
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">🎬</span>
            <p className="font-bold">A new user-review added</p>
          </div>
        </div>
      ) : (
        <li className="flex flex-col gap-4 rounded-xl bg-gray-700 p-4 opacity-100 transition-opacity duration-300">
          <header className="flex justify-between gap-4">
            <strong>{notification.userReview.user.username}</strong>
            <span>{dayjs(notification.publishedAt).format('D.M.YYYY')}</span>
          </header>
          <data value={notification.userReview.score}>{notification.userReview.score}&nbsp;⭐️</data>
          <p>{notification.userReview.text}</p>
        </li>
      )}
    </>
  );
}
