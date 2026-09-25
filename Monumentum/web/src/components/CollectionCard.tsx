import { useState } from 'react'
import MonumentCard from './MonumentCard'
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
  const [isRemoving, setIsRemoving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleRemove() {
    setIsRemoving(true)
    setError(null)

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
        <p>
          Statut : <strong>{statusLabels[entry.statut]}</strong>
        </p>

        {entry.note !== null && (
          <p>Ma note : {entry.note} / 5</p>
        )}

        {error && (
          <p className="auth-error" role="alert">
            {error}
          </p>
        )}

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
    </div>
  )
}

export default CollectionCard