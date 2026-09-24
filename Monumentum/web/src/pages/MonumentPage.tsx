import { Link, useParams } from 'react-router'
import { monuments } from '../mocks/monuments'

function MonumentPage() {
  const { id } = useParams()

  const monument = monuments.find(
    (item) => String(item.id) === id,
  )

  if (!monument) {
    return (
      <section className="empty-state">
        <h1>Monument introuvable</h1>
        <p>Ce monument n’existe pas dans notre catalogue de test.</p>

        <Link to="/" className="action-link">
          Retour au catalogue
        </Link>
      </section>
    )
  }

  const anneeAffichee =
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
          <img
            className="detail-image"
            src={monument.image_url}
            alt={monument.titre}
          />
        )}

        <div className="detail-content">
          <span className="category-badge">
            {monument.categorie}
          </span>

          <h1>{monument.titre}</h1>

          <dl className="detail-facts">
            <div>
              <dt>Année</dt>
              <dd>{anneeAffichee}</dd>
            </div>
          </dl>

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