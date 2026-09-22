import type { Item } from '../types/api'

interface MonumentCardProps {
  monument: Item
}

function MonumentCard({ monument }: MonumentCardProps) {
  return (
    <article className="monument-card">
      {monument.image_url && (
        <img
          className="monument-image"
          src={monument.image_url}
          alt={monument.titre}
        />
      )}

      <h3>{monument.titre}</h3>
      <p>Catégorie : {monument.categorie}</p>
      <p>Année : {monument.annee}</p>
      <p>{monument.description}</p>
    </article>
  )
}

export default MonumentCard