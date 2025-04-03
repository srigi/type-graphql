import { Fragment, useState } from 'preact/compat';
import { useMutation } from 'urql';

import { AddReviewMutation } from '~gql/graphql';
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
  const isFormValid = newReview.text.trim() !== '' && newReview.score >= 1;

  const [, addReview] = useMutation(addReviewMutation);
  const [, userTyping] = useMutation(userTypingMutation);

  function handleSubmit(e: Event) {
    e.preventDefault();

    if (isFormValid) {
      addReview({
        userReview: {
          moviePublicId: moviePublicId,
          text: newReview.text,
          score: `${newReview.score}`,
        },
      }).then((res) => {
        setNewReview({ text: '', score: 0 }); // clear the form after submission
        if (res.data?.addReview != null && onSubmitted != null) onSubmitted(res.data.addReview);
      });
    }
  }

  return (
    <form className="flex flex-col gap-4 rounded-xl bg-gray-700 p-4" onSubmit={handleSubmit}>
      <div className="flex justify-end gap-2 text-xl">
        {[...Array(10)].map((_, idx) => {
          const val = idx + 1;
          return (
            <Fragment key={idx}>
              <input
                type="checkbox"
                id={`star${val}`}
                name="rating"
                value={val}
                className="hidden"
                checked={newReview.score === val}
                onChange={() => setNewReview({ ...newReview, score: val })}
              />
              <label htmlFor={`star${val}`} className="cursor-pointer text-[#ffd700]">
                {newReview.score >= val ? '★' : '☆'}
              </label>
            </Fragment>
          );
        })}
      </div>

      <textarea
        className="w-full rounded-lg bg-gray-800 p-4"
        rows={4}
        placeholder="Write your review..."
        value={newReview.text}
        onChange={(ev) => setNewReview({ ...newReview, text: ev.currentTarget.value })}
        onKeyDown={handleTyping}
      />

      <button
        className={`self-end rounded-lg px-4 py-2 font-bold disabled:cursor-not-allowed! disabled:opacity-50 ${
          isFormValid ? 'bg-blue-600 hover:bg-blue-700' : 'cursor-not-allowed bg-gray-500'
        }`}
        disabled={!isFormValid}
        type="submit"
      >
        Submit Review
      </button>
    </form>
  );
}
