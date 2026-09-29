import { useState } from 'react'
import { Link } from 'react-router'
import CollectionCard from '../components/CollectionCard'
import { useCollection } from '../hooks/useCollection'
import type { CollectionStatut } from '../types/api'

type CollectionSort = 'recent' | 'oldest' | 'rating'

const statusFilters: {
  value: CollectionStatut | ''
  label: string
}[] = [
  { value: '', label: 'Tous' },
  { value: 'a_voir', label: 'À voir' },
  { value: 'en_cours', label: 'En cours' },
  { value: 'vu', label: 'Vus' },
]

function CollectionPage() {
  const { entries, loading, error, reload } = useCollection()

  const [statut, setStatut] = useState<CollectionStatut | ''>('')
  const [tri, setTri] = useState<CollectionSort>('recent')

  const visibleEntries = entries
    .filter((entry) => statut === '' || entry.statut === statut)
    .sort((a, b) => {
      const dateDifference =
        new Date(b.date_ajout).getTime() -
        new Date(a.date_ajout).getTime()

      if (tri === 'rating') {
        const noteDifference = (b.note ?? -1) - (a.note ?? -1)
        return noteDifference || dateDifference || b.id - a.id
      }

      if (tri === 'oldest') {
        return -dateDifference || a.id - b.id
      }

      return dateDifference || b.id - a.id
    })

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
      ) : entries.length === 0 ? (
        <div className="empty-state">
          <h2>Votre collection est vide</h2>
          <p>Ouvrez la fiche d’un monument pour l’ajouter.</p>
          <Link to="/" className="action-link">
            Explorer le catalogue
          </Link>
        </div>
      ) : (
        <>
          <div className="collection-toolbar">
            <div
              className="category-filters"
              role="group"
              aria-label="Filtrer par statut"
            >
              {statusFilters.map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  className="category-button"
                  aria-pressed={statut === filter.value}
                  onClick={() => setStatut(filter.value)}
                >
                  {filter.label}
                </button>
              ))}
            </div>

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
                <option value="rating">Meilleures notes</option>
              </select>
            </div>
          </div>

          <p className="catalogue-count" role="status">
            {visibleEntries.length}{' '}
            {visibleEntries.length > 1
              ? 'monuments affichés'
              : 'monument affiché'}
            {' sur '}{entries.length}
          </p>

          {visibleEntries.length === 0 ? (
            <div className="empty-state">
              <h2>Aucun monument avec ce statut</h2>
              <p>Sélectionnez un autre filtre pour voir vos monuments.</p>
              <button
                type="button"
                className="action-link collection-button"
                onClick={() => setStatut('')}
              >
                Afficher tous mes monuments
              </button>
            </div>
          ) : (
            <div className="monuments-grid">
              {visibleEntries.map((entry) => (
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