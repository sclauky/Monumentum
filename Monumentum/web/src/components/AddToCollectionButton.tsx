import { useState } from 'react'
import { Link } from 'react-router'
import ReviewDialog from './ReviewDialog'
import WatchlistButton from './WatchlistButton'
import { useAuth } from '../hooks/useAuth'
import { useCollection } from '../hooks/useCollection'

interface AddToCollectionButtonProps {
  itemId: number
  itemTitle?: string
  showWatchlist?: boolean
  disabled?: boolean
}

function AddToCollectionButton({
  itemId,
  itemTitle = 'ce monument',
  showWatchlist = true,
  disabled = false,
}: AddToCollectionButtonProps) {
  const { user, isLoading } = useAuth()
  const { entries, loading, error, reload, saveReview } =
    useCollection()

  const [isReviewOpen, setIsReviewOpen] = useState(false)
  const [watchlistPending, setWatchlistPending] = useState(false)

  if (isLoading) {
    return <p role="status">Vérification de votre session…</p>
  }

  if (!user) {
    return (
      <Link to="/login" className="monument-signin-link">
        Se connecter pour noter
      </Link>
    )
  }

  if (loading) {
    return <p role="status">Chargement de vos monuments…</p>
  }

  if (error) {
    return (
      <div>
        <p className="auth-error" role="alert">{error}</p>
        <button
          type="button"
          className="collection-secondary-button"
          onClick={reload}
        >
          Réessayer
        </button>
      </div>
    )
  }

  const entry = entries.find((item) => item.item.id === itemId)
  const isVisited = entry?.statut === 'vu'
  const hasRating = isVisited && entry.note !== null

  return (
    <div className="monument-review-actions">
      <button
        type="button"
        className="review-trigger"
        data-rated={hasRating}
        disabled={disabled || watchlistPending}
        onClick={() => setIsReviewOpen(true)}
        aria-label={
          hasRating
            ? `Modifier ma note de ${entry.note} sur 5 pour ${itemTitle}`
            : `Noter ma visite de ${itemTitle}`
        }
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="m12 3 2.78 5.63L21 9.54l-4.5 4.39 1.06 6.2L12 17.2l-5.56 2.93 1.06-6.2L3 9.54l6.22-.91L12 3Z" />
        </svg>

        {hasRating ? (
          <>
            <span>{entry.note} / 5</span>
            <span className="review-trigger-hint">Modifier</span>
          </>
        ) : (
          <span>{isVisited ? 'Ajouter ma note' : 'Noter ma visite'}</span>
        )}
      </button>

      {showWatchlist && (
        <WatchlistButton
          itemId={itemId}
          itemTitle={itemTitle}
          onPendingChange={setWatchlistPending}
        />
      )}

      {isReviewOpen && (
        <ReviewDialog
          itemId={itemId}
          title={`Mon avis : ${itemTitle}`}
          initialNote={entry?.note}
          initialComment={entry?.commentaire}
          onSave={(review) => saveReview(itemId, review)}
          onClose={() => setIsReviewOpen(false)}
        />
      )}
    </div>
  )
}

export default AddToCollectionButton