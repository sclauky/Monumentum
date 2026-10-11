import { Link } from 'react-router'

// Cette page s'affiche quand l'adresse ne correspond à aucune route.
function NotFoundPage() {
  return (
    <section className="empty-state">
      <h1>Page introuvable</h1>
      <p>L’adresse demandée ne correspond à aucune page.</p>

      <Link to="/" className="action-link">
        Retour au catalogue
      </Link>
    </section>
  )
}

export default NotFoundPage