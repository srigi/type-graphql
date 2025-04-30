interface Props {
  val: number;
  score: number;
  onChange: (score: number) => void;
}

export function StarRatingItem({ val, score, onChange }: Props) {
  return (
    <>
      <input
        type="checkbox"
        id={`star${val}`}
        name="rating"
        value={val}
        className="hidden"
        checked={score === val}
        onChange={() => onChange(val)}
      />
      <label htmlFor={`star${val}`} className="cursor-pointer text-[#ffd700]">
        {score >= val ? '★' : '☆'}
      </label>
    </>
  );
}
