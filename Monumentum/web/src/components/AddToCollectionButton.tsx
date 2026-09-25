import { useState } from 'react'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useCollection } from '../hooks/useCollection'

interface AddToCollectionButtonProps {
  itemId: number
}

function AddToCollectionButton({
  itemId,
}: AddToCollectionButtonProps) {
  const { user, isLoading } = useAuth()
  const { entries, loading, error, reload, addMonument } =
    useCollection()

  const [isAdding, setIsAdding] = useState(false)
  const [addError, setAddError] = useState<string | null>(null)

  async function handleAdd() {
    setIsAdding(true)
    setAddError(null)

    try {
      await addMonument(itemId)
    } catch (caughtError: unknown) {
      setAddError(
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
        Se connecter pour ajouter ce monument
      </Link>
    )
  }

  if (loading) {
    return <p role="status">Chargement de votre collection…</p>
  }

  if (error) {
    return (
      <div>
        <p className="auth-error" role="alert">{error}</p>
        <button
          type="button"
          className="action-link collection-button"
          onClick={reload}
        >
          Réessayer
        </button>
      </div>
    )
  }

  const alreadyAdded = entries.some(
    (entry) => entry.item.id === itemId,
  )

  if (alreadyAdded) {
    return (
      <div>
        <p role="status">Ce monument est dans votre collection.</p>
        <Link to="/collection" className="action-link">
          Voir ma collection
        </Link>
      </div>
    )
  }

  return (
    <div>
      {addError && (
        <p className="auth-error" role="alert">{addError}</p>
      )}

      <button
        type="button"
        className="action-link collection-button"
        onClick={handleAdd}
        disabled={isAdding}
      >
        {isAdding ? 'Ajout en cours…' : 'Ajouter à ma collection'}
      </button>
    </div>
  )
}

export default AddToCollectionButton