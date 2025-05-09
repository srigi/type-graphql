import { useState } from 'preact/compat';
import { useMutation } from '@urql/preact';

import { AddReviewMutation } from '~gql/graphql';
import { StarRatingItem } from '~/components/StarRatingItem';
import { useTypingNotification } from '~/hooks/useTypingNotification';
import { graphql } from '~gql';

const addReviewMutation = graphql(`
  mutation AddReview($userReview: AddReviewInput!) {
    addReview(userReview: $userReview) {
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
`);

type AddReviewFormProps = {
  moviePublicId: string;
  onSubmitted?: (newReview: AddReviewMutation['addReview']) => void;
};

export function AddReviewForm({ moviePublicId, onSubmitted }: AddReviewFormProps) {
  const [newReview, setNewReview] = useState({ text: '', score: 0 });
  const [error, setError] = useState<string | null>(null);
  const isFormValid = newReview.text.trim() !== '' && newReview.score >= 1;
  const handleTyping = useTypingNotification(moviePublicId);
  const [, addReview] = useMutation(addReviewMutation);

  function handleSubmit(e: Event) {
    e.preventDefault();

    if (isFormValid) {
      setError(null);
      addReview({
        userReview: {
          moviePublicId: moviePublicId,
          text: newReview.text,
          score: `${newReview.score}`,
        },
      })
        .then((res) => {
          if (res.error != null) {
            setError(res.error.message);
            return;
          }
          if (res.data?.addReview != null && onSubmitted != null) {
            onSubmitted(res.data.addReview);
          }
        })
        .catch((error) => {
          setError(error.message || 'An unexpected error occurred');
        });
    }
  }

  return (
    <form className="flex flex-col gap-4 rounded-xl bg-gray-700 p-4" onSubmit={handleSubmit}>
      <div className="flex justify-end gap-2 text-xl">
        {[...Array(10)].map((_, idx) => (
          <StarRatingItem key={idx} val={idx + 1} score={newReview.score} onChange={(score) => setNewReview({ ...newReview, score })} />
        ))}
      </div>

      <textarea
        className="w-full rounded-lg bg-gray-800 p-4"
        rows={4}
        placeholder="Write your review..."
        value={newReview.text}
        onChange={(ev) => setNewReview({ ...newReview, text: ev.currentTarget.value })}
        onKeyDown={handleTyping}
      />

      <section className="flex items-center justify-between pl-4">
        {error && <p className="text-red-500">{error}</p>}
        <button
          className={`rounded-lg px-4 py-2 font-bold disabled:cursor-not-allowed! disabled:opacity-50 ${
            isFormValid ? 'bg-blue-600 hover:bg-blue-700' : 'cursor-not-allowed bg-gray-500'
          }`}
          disabled={!isFormValid}
          type="submit"
        >
          Submit Review
        </button>
      </section>
    </form>
  );
}
