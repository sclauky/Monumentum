import { Link } from 'react-router'
import CollectionCard from '../components/CollectionCard'
import { useCollection } from '../hooks/useCollection'

function CollectionPage() {
  const { entries, loading, error, reload } = useCollection()

  return (
    <section aria-labelledby="collection-title">
      <header className="catalogue-header">
        <h1 id="collection-title">Ma collection</h1>
        <p>Les monuments que vous souhaitez découvrir ou avez visités.</p>
      </header>

      {loading ? (
        <p className="catalogue-count" role="status">
          Chargement de votre collection…
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
            {entries.length}{' '}
            {entries.length > 1
              ? 'monuments dans votre collection'
              : 'monument dans votre collection'}
          </p>

          {entries.length === 0 ? (
            <div className="empty-state">
              <h2>Votre collection est vide</h2>
              <p>
                Ouvrez la fiche d’un monument pour l’ajouter.
              </p>
              <Link to="/" className="action-link">
                Explorer le catalogue
              </Link>
            </div>
          ) : (
            <div className="monuments-grid">
              {entries.map((entry) => (
                <CollectionCard key={entry.id} entry={entry} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  )
}

export default CollectionPage