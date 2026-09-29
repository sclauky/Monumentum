import { useState } from 'react'
import { Link } from 'react-router'
import ReviewDialog from './ReviewDialog'
import { useAuth } from '../hooks/useAuth'
import { useCollection } from '../hooks/useCollection'

interface AddToCollectionButtonProps {
  itemId: number
  itemTitle?: string
}

function AddToCollectionButton({
  itemId,
  itemTitle = 'Ce monument',
}: AddToCollectionButtonProps) {
  const { user, isLoading } = useAuth()
  const {
    entries, loading, error, reload, addMonument, saveReview,
  } = useCollection()

  const [isReviewOpen, setIsReviewOpen] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [actionError, setActionError] = useState<string | null>(null)

  async function handleWatchlist() {
    if (isAdding) return
    setIsAdding(true)
    setActionError(null)

    try {
      await addMonument(itemId)
    } catch (caughtError: unknown) {
      setActionError(
        caughtError instanceof Error
          ? caughtError.message
          : 'Impossible d’ajouter ce monument.',
      )
    } finally {
      setIsAdding(false)
    }
  }

  if (isLoading) {
    return <p role="status">Vérification de votre session…</p>
  }

  if (!user) {
    return (
      <Link to="/connexion" className="action-link">
        Se connecter pour enregistrer ce monument
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
        <button type="button" onClick={reload}>Réessayer</button>
      </div>
    )
  }

  const entry = entries.find((item) => item.item.id === itemId)

  return (
    <div className="monument-actions">
      {actionError && (
        <p className="auth-error" role="alert">{actionError}</p>
      )}

      {entry?.statut === 'vu' ? (
        <Link to="/collection" className="action-link">
          Dans ma collection
        </Link>
      ) : (
        <div className="collection-edit-actions">
          <button
            type="button"
            className="action-link collection-button"
            onClick={() => setIsReviewOpen(true)}
            disabled={isAdding}
          >
            Ajouter à ma collection
          </button>

          {entry ? (
            <Link to="/watchlist" className="collection-secondary-button">
              Dans ma watchlist
            </Link>
          ) : (
            <button
              type="button"
              className="collection-secondary-button"
              onClick={handleWatchlist}
              disabled={isAdding}
            >
              {isAdding ? 'Ajout…' : 'Ajouter à ma watchlist'}
            </button>
          )}
        </div>
      )}

      {isReviewOpen && (
        <ReviewDialog
          itemId={itemId}
          title={`Noter : ${itemTitle}`}
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