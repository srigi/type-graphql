import { Fragment, useState } from 'preact/compat';

type AddReviewFormProps = {
  onSubmit?: (review: { text: string; score: string }) => void;
};

export function AddReviewForm({ onSubmit }: AddReviewFormProps) {
  const [newReview, setNewReview] = useState({ text: '', score: '0' });

  const isFormValid = newReview.text.trim() !== '' && parseInt(newReview.score) >= 1;

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (onSubmit && isFormValid) {
      onSubmit(newReview);
    }
  };

  return (
    <form className="flex flex-col gap-4 rounded-xl bg-gray-700 p-4" onSubmit={handleSubmit}>
      <div className="star-rating">
        {[...Array(10)].map((_, idx) => {
          const val = `${10 - idx}`;
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
              <label htmlFor={`star${val}`} className="cursor-pointer">
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
      />

      <button
        type="submit"
        className={`self-end rounded-lg px-4 py-2 font-bold disabled:cursor-not-allowed! disabled:opacity-50 ${
          isFormValid ? 'bg-blue-600 hover:bg-blue-700' : 'cursor-not-allowed bg-gray-500'
        }`}
        disabled={!isFormValid}
      >
        Submit Review
      </button>
    </form>
  );
}
