import { Link } from 'react-router'
import AddToCollectionButton from './AddToCollectionButton'
import type { Item } from '../types/api'

interface MonumentCardProps {
  monument: Item
  showActions?: boolean
}

function MonumentCard({
  monument,
  showActions = true,
}: MonumentCardProps) {
  return (
    <article className="monument-card">
      {monument.image_url && (
        <img
          className="monument-image"
          src={monument.image_url}
          alt={monument.titre}
          loading="lazy"
        />
      )}

      <h3>{monument.titre}</h3>
      <p>Catégorie : {monument.categorie}</p>
      <p>{monument.description}</p>

      <Link
        to={`/monuments/${monument.id}`}
        className="action-link"
        aria-label={`Voir la fiche : ${monument.titre}`}
      >
        Voir la fiche
      </Link>

      {showActions && (
        <AddToCollectionButton
          itemId={monument.id}
          itemTitle={monument.titre}
        />
      )}
    </article>
  )
}

export default MonumentCard