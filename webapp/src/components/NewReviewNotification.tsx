import { useState, useEffect } from 'preact/hooks';
import dayjs from 'dayjs';

type UserReviewNotificationData = {
  publishedAt: string;
  userReview: {
    score: string;
    text: string;
    user: {
      publicId: string; // Added publicId for filtering
      username: string;
    };
  };
};

interface SingleNotificationProps {
  notification: UserReviewNotificationData;
}

// Renamed the original component to handle a single notification item
function SingleNotification({ notification }: SingleNotificationProps) {
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
            <p className="font-bold">A new user-review added by {notification.userReview.user.username}</p>
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

interface NewReviewNotificationProps {
  notifications: UserReviewNotificationData[];
  currentUserPublicId?: string; // Optional publicId of the current user
}

// This is the main exported component that handles the list
export function NewReviewNotification({ notifications, currentUserPublicId }: NewReviewNotificationProps) {
  const filteredNotifications = notifications.filter((notification) => currentUserPublicId !== notification.userReview.user.publicId);

  if (filteredNotifications.length === 0) {
    return null; // Don't render anything if there are no relevant notifications
  }

  return (
    <div className="flex flex-col-reverse gap-4">
      {filteredNotifications.map((notification, index) => (
        // Use publicId or a combination for a more stable key if available, otherwise index is fallback
        <SingleNotification key={`new-review-${notification.userReview.user.publicId}-${index}`} notification={notification} />
      ))}
    </div>
  );
}
