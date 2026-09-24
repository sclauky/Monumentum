import { Link } from 'react-router'

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