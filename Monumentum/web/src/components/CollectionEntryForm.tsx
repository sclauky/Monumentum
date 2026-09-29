import { useState } from 'react'
import type { FormEvent } from 'react'
import StarRating from './StarRating'
import { useCollection } from '../hooks/useCollection'
import type {
  CollectionEntry,
  CollectionStatut,
  CollectionUpdate,
} from '../types/api'

interface CollectionEntryFormProps {
  entry: CollectionEntry
  onCancel: () => void
  onSaved: () => void
}

function CollectionEntryForm({
  entry,
  onCancel,
  onSaved,
}: CollectionEntryFormProps) {
  const { updateEntry } = useCollection()

  const [statut, setStatut] = useState<CollectionStatut>(entry.statut)
  const [note, setNote] = useState<number | null>(entry.note)
  const [commentaire, setCommentaire] = useState(
    entry.commentaire ?? '',
  )
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fieldPrefix = `collection-${entry.id}`

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isSaving) return

    setError(null)

    const changes: CollectionUpdate = {
      statut,
      commentaire: commentaire.trim(),
    }

    if (note !== null) {
      if (!Number.isFinite(note) || note < 1 || note > 5) {
        setError('La note doit être comprise entre 1 et 5.')
        return
      }

      changes.note = note
    }

    setIsSaving(true)

    try {
      await updateEntry(entry.id, changes)
      onSaved()
    } catch (caughtError: unknown) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : 'Impossible d’enregistrer les modifications.',
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form className="collection-edit-form" onSubmit={handleSubmit}>
      <fieldset disabled={isSaving}>
        <legend>Mon avis et ma progression</legend>

        <div className="collection-edit-field">
          <label htmlFor={`${fieldPrefix}-statut`}>Statut</label>
          <select
            id={`${fieldPrefix}-statut`}
            value={statut}
            onChange={(event) =>
              setStatut(event.target.value as CollectionStatut)
            }
          >
            <option value="a_voir">À voir</option>
            <option value="en_cours">En cours</option>
            <option value="vu">Vu</option>
          </select>
        </div>

        <StarRating
          id={`${fieldPrefix}-note`}
          value={note}
          onChange={setNote}
          disabled={isSaving}
        />

        <div className="collection-edit-field">
          <label htmlFor={`${fieldPrefix}-commentaire`}>
            Commentaire personnel
          </label>
          <textarea
            id={`${fieldPrefix}-commentaire`}
            rows={4}
            placeholder="Vos impressions sur ce monument…"
            value={commentaire}
            onChange={(event) => setCommentaire(event.target.value)}
          />
        </div>

        {error && (
          <p className="auth-error" role="alert">
            {error}
          </p>
        )}

        <div className="collection-edit-actions">
          <button
            type="submit"
            className="action-link collection-button"
          >
            {isSaving ? 'Enregistrement…' : 'Enregistrer'}
          </button>

          <button
            type="button"
            className="collection-secondary-button"
            onClick={onCancel}
          >
            Annuler
          </button>
        </div>
      </fieldset>
    </form>
  )
}

export default CollectionEntryForm