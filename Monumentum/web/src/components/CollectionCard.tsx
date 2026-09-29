import { useState } from 'react'
import MonumentCard from './MonumentCard'
import CollectionEntryForm from './CollectionEntryForm'
import { useCollection } from '../hooks/useCollection'
import type {
  CollectionEntry,
  CollectionStatut,
} from '../types/api'

interface CollectionCardProps {
  entry: CollectionEntry
}

const statusLabels: Record<CollectionStatut, string> = {
  a_voir: 'À voir',
  en_cours: 'En cours',
  vu: 'Vu',
}

function CollectionCard({ entry }: CollectionCardProps) {
  const { removeEntry } = useCollection()
  const [isEditing, setIsEditing] = useState(false)
  const [isRemoving, setIsRemoving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  function startEditing() {
    setError(null)
    setSuccess(null)
    setIsEditing(true)
  }

  function finishEditing() {
    setIsEditing(false)
    setSuccess('Modifications enregistrées.')
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
      <MonumentCard monument={entry.item} />

      <div className="collection-entry-controls">
        {isEditing ? (
          <CollectionEntryForm
            entry={entry}
            onCancel={() => setIsEditing(false)}
            onSaved={finishEditing}
          />
        ) : (
          <>
            <p>
              Statut : <strong>{statusLabels[entry.statut]}</strong>
            </p>

            <p>
              Ma note :{' '}
              {entry.note === null ? 'Non noté' : `${entry.note} / 5`}
            </p>

            {entry.commentaire && (
              <p className="collection-comment">
                {entry.commentaire}
              </p>
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
                className="collection-secondary-button"
                onClick={startEditing}
                disabled={isRemoving}
                aria-label={`Modifier mon avis sur ${entry.item.titre}`}
              >
                Modifier
              </button>

              <button
                type="button"
                className="collection-remove-button"
                onClick={handleRemove}
                disabled={isRemoving}
                aria-label={`Retirer ${entry.item.titre} de ma collection`}
              >
                {isRemoving ? 'Suppression…' : 'Retirer de ma collection'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CollectionCard