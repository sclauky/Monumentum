import { useState } from 'react'
import { Link } from 'react-router'
import CollectionCard from '../components/CollectionCard'
import { useCollection } from '../hooks/useCollection'

interface CollectionPageProps {
  mode?: 'collection' | 'watchlist'
}

type CollectionSort = 'recent' | 'oldest' | 'rating'

function CollectionPage({
  mode = 'collection',
}: CollectionPageProps) {
  const { entries, loading, error, reload } = useCollection()
  const [tri, setTri] = useState<CollectionSort>('recent')

  const isWatchlist = mode === 'watchlist'
  const title = isWatchlist ? 'Ma watchlist' : 'Ma collection'

  const visibleEntries = entries
    .filter((entry) =>
      isWatchlist ? entry.statut !== 'vu' : entry.statut === 'vu',
    )
    .sort((a, b) => {
      const dateDifference =
        new Date(b.date_ajout).getTime() -
        new Date(a.date_ajout).getTime()

      if (tri === 'rating' && !isWatchlist) {
        return (
          (b.note ?? -1) - (a.note ?? -1) ||
          dateDifference ||
          b.id - a.id
        )
      }

      return tri === 'oldest'
        ? -dateDifference || a.id - b.id
        : dateDifference || b.id - a.id
    })

  return (
    <section aria-labelledby="collection-title">
      <header className="catalogue-header">
        <h1 id="collection-title">{title}</h1>
        <p>
          {isWatchlist
            ? 'Les monuments que vous souhaitez visiter.'
            : 'Vos monuments visités, vos notes et vos souvenirs.'}
        </p>
      </header>

      {loading ? (
        <p className="catalogue-count" role="status">
          Chargement de vos monuments…
        </p>
      ) : error ? (
        <div className="empty-state">
          <p className="auth-error" role="alert">{error}</p>
          <button
            type="button"
            className="action-link collection-button"
            onClick={reload}
          >
            Réessayer
          </button>
        </div>
      ) : (
        <>
          <p className="catalogue-count" role="status">
            {visibleEntries.length}{' '}
            {visibleEntries.length > 1 ? 'monuments' : 'monument'}
          </p>

          {visibleEntries.length === 0 ? (
            <div className="empty-state">
              <h2>
                {isWatchlist
                  ? 'Votre watchlist est vide'
                  : 'Votre collection est vide'}
              </h2>
              <p>
                {isWatchlist
                  ? 'Ajoutez des monuments pour préparer vos prochaines visites.'
                  : 'Ajoutez un monument visité et donnez-lui une note.'}
              </p>
              <Link to="/" className="action-link">
                Explorer le catalogue
              </Link>
            </div>
          ) : (
            <>
              <div className="collection-toolbar">
                <div className="collection-sort">
                  <label htmlFor="collection-sort">Trier par</label>
                  <select
                    id="collection-sort"
                    value={tri}
                    onChange={(event) =>
                      setTri(event.target.value as CollectionSort)
                    }
                  >
                    <option value="recent">Ajouts les plus récents</option>
                    <option value="oldest">Ajouts les plus anciens</option>
                    {!isWatchlist && (
                      <option value="rating">Meilleures notes</option>
                    )}
                  </select>
                </div>
              </div>

              <div className="monuments-grid">
                {visibleEntries.map((entry) => (
                  <CollectionCard key={entry.id} entry={entry} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </section>
  )
}

export default CollectionPage