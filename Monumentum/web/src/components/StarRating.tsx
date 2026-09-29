interface StarRatingProps {
  id: string
  value: number | null
  onChange: (value: number) => void
  disabled?: boolean
}

function StarRating({
  id,
  value,
  onChange,
  disabled = false,
}: StarRatingProps) {
  return (
    <fieldset className="star-rating" disabled={disabled}>
      <legend>Ma note</legend>

      <div className="star-rating-options">
        {[1, 2, 3, 4, 5].map((rating) => (
          <div className="star-rating-option" key={rating}>
            <input
              className="star-rating-input"
              type="radio"
              id={`${id}-${rating}`}
              name={id}
              value={rating}
              checked={value === rating}
              onChange={() => onChange(rating)}
            />

            <label
              className="star-rating-label"
              htmlFor={`${id}-${rating}`}
              data-filled={rating <= (value ?? 0)}
              title={`${rating} sur 5`}
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path d="m12 3 2.78 5.63L21 9.54l-4.5 4.39 1.06 6.2L12 17.2l-5.56 2.93 1.06-6.2L3 9.54l6.22-.91L12 3Z" />
              </svg>

              <span className="star-rating-accessible">
                {rating} {rating === 1 ? 'étoile' : 'étoiles'}
              </span>
            </label>
          </div>
        ))}
      </div>

      <p className="star-rating-value">
        {value === null ? 'Pas encore de note' : `${value} / 5`}
      </p>
    </fieldset>
  )
}

export default StarRating