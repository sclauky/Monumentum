import { Link, useParams } from 'react-router'
import AddToCollectionButton from '../components/AddToCollectionButton'
import { useApi } from '../hooks/useApi'
import type { Item } from '../types/api'

function MonumentPage() {
  const { id } = useParams()

  // L'identifiant de l'adresse sert à demander la fiche du monument.
  const {
    data: monument,
    loading,
    error,
  } = useApi<Item>(`/items/${encodeURIComponent(id ?? '')}`)

  if (loading) {
    return (
      <p className="catalogue-count" role="status">
        Chargement du monument…
      </p>
    )
  }

  if (error || !monument) {
    return (
      <section className="empty-state" role="alert">
        <h1>Impossible d’afficher ce monument</h1>
        <p>{error ?? 'Aucun monument reçu.'}</p>

        <Link to="/" className="action-link">
          Retour au catalogue
        </Link>
      </section>
    )
  }

  const anneeAffichee =
    // Les années négatives sont affichées avec la mention avant J.-C.
    monument.annee < 0
      ? `${Math.abs(monument.annee)} av. J.-C.`
      : monument.annee

  return (
    <section>
      <Link to="/" className="back-link">
        ← Retour au catalogue
      </Link>

      <article className="monument-detail">
        {monument.image_url && (
          <div className="detail-image-frame">
            <img
              className="detail-image"
              src={monument.image_url}
              alt={monument.titre}
            />
          </div>
        )}

        <div className="detail-content">
          <span className="category-badge">
            {monument.categorie}
          </span>

          <h1>{monument.titre}</h1>

          <dl className="detail-facts">
            <div>
              <dt>Ville</dt>
              <dd>{monument.ville}</dd>
            </div>

            <div>
              <dt>Année</dt>
              <dd>{anneeAffichee}</dd>
            </div>

            <div>
              <dt>Architecte</dt>
              <dd>{monument.architecte}</dd>
            </div>

            <div>
              <dt>Rareté</dt>
              <dd>{monument.rarete}</dd>
            </div>
          </dl>

          <div className="collection-action">
            <AddToCollectionButton
              key={monument.id}
              itemId={monument.id}
            />
          </div>

          <h2>À propos de ce monument</h2>
          <p className="detail-description">
            {monument.description}
          </p>
        </div>
      </article>
    </section>
  )
}

export default MonumentPage