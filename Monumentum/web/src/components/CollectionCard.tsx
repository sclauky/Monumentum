import { useState } from 'react'
import MonumentCard from './MonumentCard'
import ReviewDialog from './ReviewDialog'
import { useCollection } from '../hooks/useCollection'
import type { CollectionEntry, MonumentReview } from '../types/api'

interface CollectionCardProps {
  entry: CollectionEntry
}

function CollectionCard({ entry }: CollectionCardProps) {
  const { removeEntry, saveReview } = useCollection()
  const [isReviewOpen, setIsReviewOpen] = useState(false)
  const [isRemoving, setIsRemoving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const isVisited = entry.statut === 'vu'

  async function handleSave(review: MonumentReview) {
    await saveReview(entry.item.id, review)
    setSuccess('Votre avis a été enregistré.')
  }

  async function handleRemove() {
    if (isRemoving) return
    setIsRemoving(true)
    setError(null)
    setSuccess(null)

    try {
      await removeEntry(entry.id)
    } catch (caughtError: unknown) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : 'Impossible de retirer ce monument.',
      )
    } finally {
      setIsRemoving(false)
    }
  }

  return (
    <div className="collection-entry">
      <MonumentCard monument={entry.item} showActions={false} />

      <div className="collection-entry-controls">
        {isVisited && (
          <>
            <p>
              Ma note :{' '}
              {entry.note === null ? 'À compléter' : `${entry.note} / 5`}
            </p>

            {entry.commentaire && (
              <p className="collection-comment">{entry.commentaire}</p>
            )}
          </>
        )}

        {success && (
          <p className="auth-success" role="status">{success}</p>
        )}

        {error && (
          <p className="auth-error" role="alert">{error}</p>
        )}

        <div className="collection-edit-actions">
          <button
            type="button"
            className="action-link collection-button"
            disabled={isRemoving}
            onClick={() => {
              setSuccess(null)
              setError(null)
              setIsReviewOpen(true)
            }}
          >
            {isVisited
              ? entry.note === null ? 'Ajouter ma note' : 'Modifier mon avis'
              : 'Je l’ai visité'}
          </button>

          <button
            type="button"
            className="collection-remove-button"
            onClick={handleRemove}
            disabled={isRemoving}
            aria-label={`Retirer ${entry.item.titre}`}
          >
            {isRemoving ? 'Suppression…' : 'Retirer'}
          </button>
        </div>
      </div>

      {isReviewOpen && (
        <ReviewDialog
          itemId={entry.item.id}
          title={`Mon avis : ${entry.item.titre}`}
          initialNote={entry.note}
          initialComment={entry.commentaire}
          onSave={handleSave}
          onClose={() => setIsReviewOpen(false)}
        />
      )}
    </div>
  )
}

export default CollectionCard