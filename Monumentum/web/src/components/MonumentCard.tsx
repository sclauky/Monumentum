import { useState } from 'react'
import { Link } from 'react-router'
import AddToCollectionButton from './AddToCollectionButton'
import WatchlistButton from './WatchlistButton'
import type { Item } from '../types/api'

interface MonumentCardProps {
  monument: Item
  showActions?: boolean
}

function MonumentCard({
  monument,
  showActions = true,
}: MonumentCardProps) {
  const [watchlistPending, setWatchlistPending] = useState(false)

  return (
    <article className="monument-card">
      <div className="monument-poster">
        {monument.image_url ? (
          <img
            className="monument-image"
            src={monument.image_url}
            alt={monument.titre}
            loading="lazy"
          />
        ) : (
          <div className="monument-poster-empty">
            Photo indisponible
          </div>
        )}

        {showActions && (
          <WatchlistButton
            itemId={monument.id}
            itemTitle={monument.titre}
            variant="poster"
            onPendingChange={setWatchlistPending}
          />
        )}
      </div>

      <h3>{monument.titre}</h3>

      {showActions && (
        <AddToCollectionButton
          itemId={monument.id}
          itemTitle={monument.titre}
          showWatchlist={false}
          disabled={watchlistPending}
        />
      )}

      <p>Catégorie : {monument.categorie}</p>
      <p>{monument.description}</p>

      <Link
        to={`/monuments/${monument.id}`}
        className="monument-detail-link"
        aria-label={`Voir la fiche : ${monument.titre}`}
      >
        Voir la fiche <span aria-hidden="true">→</span>
      </Link>
    </article>
  )
}

export default MonumentCard