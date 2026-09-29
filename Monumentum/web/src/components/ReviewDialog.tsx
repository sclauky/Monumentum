import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import StarRating from './StarRating'
import type { MonumentReview } from '../types/api'

interface ReviewDialogProps {
  itemId: number
  title: string
  initialNote?: number | null
  initialComment?: string | null
  onSave: (review: MonumentReview) => Promise<void>
  onClose: () => void
}

function ReviewDialog({
  itemId,
  title,
  initialNote = null,
  initialComment = '',
  onSave,
  onClose,
}: ReviewDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [note, setNote] = useState<number | null>(initialNote)
  const [commentaire, setCommentaire] = useState(initialComment ?? '')
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fieldPrefix = `review-${itemId}`

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    dialog.showModal()

    return () => dialog.close()
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isSaving) return

    setError(null)

    if (
      note === null ||
      !Number.isInteger(note) ||
      note < 1 ||
      note > 5
    ) {
      setError('Choisissez une note entre 1 et 5 étoiles.')
      return
    }

    setIsSaving(true)

    try {
      await onSave({
        note,
        commentaire: commentaire.trim(),
      })
      onClose()
    } catch (caughtError: unknown) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : 'Impossible d’enregistrer votre avis.',
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="review-dialog"
      aria-labelledby={`${fieldPrefix}-title`}
      onCancel={(event) => {
        event.preventDefault()
        if (!isSaving) onClose()
      }}
    >
      <h2 id={`${fieldPrefix}-title`}>{title}</h2>
      <p>Une note est obligatoire. Le commentaire est optionnel.</p>

      <form className="collection-edit-form" onSubmit={handleSubmit}>
        <fieldset disabled={isSaving}>
          <legend>Mon avis</legend>

          <StarRating
            id={`${fieldPrefix}-note`}
            value={note}
            onChange={setNote}
            disabled={isSaving}
          />

          <div className="collection-edit-field">
            <label htmlFor={`${fieldPrefix}-commentaire`}>
              Commentaire — optionnel
            </label>
            <textarea
              id={`${fieldPrefix}-commentaire`}
              rows={4}
              value={commentaire}
              onChange={(event) => setCommentaire(event.target.value)}
              placeholder="Qu’avez-vous pensé de votre visite ?"
            />
          </div>

          {error && (
            <p className="auth-error" role="alert">{error}</p>
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
              onClick={onClose}
            >
              Annuler
            </button>
          </div>
        </fieldset>
      </form>
    </dialog>
  )
}

export default ReviewDialog