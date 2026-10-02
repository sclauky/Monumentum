import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useCollection } from '../hooks/useCollection'

interface WatchlistButtonProps {
  itemId: number
  itemTitle?: string
  variant?: 'poster' | 'inline'
  onPendingChange?: (pending: boolean) => void
}

function WatchlistButton({
  itemId,
  itemTitle = 'ce monument',
  variant = 'inline',
  onPendingChange,
}: WatchlistButtonProps) {
  const { user, isLoading } = useAuth()
  const {
    entries,
    loading,
    error: collectionError,
    addMonument,
    removeEntry,
  } = useCollection()

  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [confirmation, setConfirmation] = useState<string | null>(null)

  useEffect(() => {
    if (!confirmation) return
    const timeout = window.setTimeout(() => {
      setConfirmation(null)
    }, 3000)
    return () => window.clearTimeout(timeout)
  }, [confirmation])

  const entry = entries.find((item) => item.item.id === itemId)
  const isVisited = entry?.statut === 'vu'
  const isSaved = Boolean(entry) && !isVisited
  const isDisabled =
    pending || isLoading || loading || isVisited || Boolean(collectionError)

  const label = isVisited
    ? 'Déjà visité : présent dans ma collection'
    : isSaved
      ? `Retirer ${itemTitle} de mes lieux à visiter`
      : `Ajouter ${itemTitle} à mes lieux à visiter`

  const icon = (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M6 3h12v18l-6-4-6 4V3Z" />
    </svg>
  )

  async function handleClick() {
    if (pending || isVisited) return
    setPending(true)
    setError(null)
    setConfirmation(null)
    onPendingChange?.(true)

    try {
      if (entry) {
        await removeEntry(entry.id)
        setConfirmation('Retiré des lieux à visiter')
      } else {
        await addMonument(itemId)
        setConfirmation('✓ Ajouté aux lieux à visiter')
      }
    } catch (caughtError: unknown) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : 'Impossible de modifier vos lieux à visiter.',
      )
    } finally {
      setPending(false)
      onPendingChange?.(false)
    }
  }

  return (
    <div className={`watchlist-control watchlist-control--${variant}`}>
      {!user && !isLoading ? (
        <Link
          to="/login"
          className={`watchlist-toggle watchlist-toggle--${variant}`}
          aria-label={`Se connecter pour enregistrer ${itemTitle}`}
          title="Se connecter pour ajouter aux lieux à visiter"
        >
          {icon}
          {variant === 'inline' && <span>À visiter</span>}
        </Link>
      ) : (
        <button
          type="button"
          className={`watchlist-toggle watchlist-toggle--${variant}`}
          data-saved={isSaved}
          aria-pressed={isVisited ? undefined : isSaved}
          aria-label={pending ? 'Mise à jour des lieux à visiter…' : label}
          aria-busy={pending}
          title={label}
          disabled={isDisabled}
          onClick={handleClick}
        >
          {pending ? <span aria-hidden="true">…</span> : icon}
          {variant === 'inline' && (
            <span>
              {isVisited
                ? 'Déjà visité'
                : isSaved
                  ? 'Dans mes lieux à visiter'
                  : 'À visiter'}
            </span>
          )}
        </button>
      )}

      <span
        className="watchlist-announcement"
        role="status"
        aria-atomic="true"
      >
        {confirmation}
      </span>

      {confirmation && (
        <p className="watchlist-confirmation" aria-hidden="true">
          {confirmation}
        </p>
      )}

      {error && (
        <p className="watchlist-feedback" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export default WatchlistButton