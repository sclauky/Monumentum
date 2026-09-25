import { useState } from 'react'
import MonumentCard from '../components/MonumentCard'
import SearchBar from '../components/SearchBar'
import { useApi } from '../hooks/useApi'
import { useDebounce } from '../hooks/useDebounce'
import type { ItemListResponse } from '../types/api'

const categories = [
  'Château',
  'Cathédrale',
  'Fortification',
  'Abbaye',
  'Monument',
  'Antiquité',
]

const LIMIT = 12

function CataloguePage() {
  const [recherche, setRecherche] = useState('')
  const [categorie, setCategorie] = useState('')
  const [page, setPage] = useState(1)

  const rechercheDifferee = useDebounce(recherche, 400)

  const params = new URLSearchParams({
    page: String(page),
    limit: String(LIMIT),
  })

  if (rechercheDifferee.trim()) {
    params.set('q', rechercheDifferee.trim())
  }

  if (categorie) {
    params.set('categorie', categorie)
  }

  const { data, loading, error } = useApi<ItemListResponse>(
    `/items?${params.toString()}`,
  )

  const totalPages = data
    ? Math.max(1, Math.ceil(data.total / data.limit))
    : 1

  function changerRecherche(value: string) {
    setRecherche(value)
    setPage(1)
  }

  function changerCategorie(value: string) {
    setCategorie(value)
    setPage(1)
  }

  return (
    <section aria-labelledby="catalogue-title">
      <header className="catalogue-header catalogue-toolbar">
        <div>
          <h1 id="catalogue-title">Catalogue</h1>
          <p>Votre prochaine découverte commence ici.</p>
        </div>

        <SearchBar
          value={recherche}
          onChange={changerRecherche}
        />
      </header>

      <div className="category-filters" aria-label="Catégories">
        <button
          type="button"
          className="category-button"
          aria-pressed={categorie === ''}
          onClick={() => changerCategorie('')}
        >
          Tous
        </button>

        {categories.map((nomCategorie) => (
          <button
            key={nomCategorie}
            type="button"
            className="category-button"
            aria-pressed={categorie === nomCategorie}
            onClick={() => changerCategorie(nomCategorie)}
          >
            {nomCategorie}
          </button>
        ))}
      </div>

      {loading && (
        <p className="catalogue-count" role="status">
          Chargement des monuments…
        </p>
      )}

      {!loading && error && (
        <div className="empty-state" role="alert">
          <h2>Impossible de charger le catalogue</h2>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && data && (
        <>
          <p className="catalogue-count" role="status">
            {data.total}{' '}
            {data.total > 1 ? 'monuments trouvés' : 'monument trouvé'}
          </p>

          {data.results.length === 0 ? (
            <div className="empty-state">
              <h2>Aucun monument trouvé</h2>
              <p>Essayez une autre recherche ou une autre catégorie.</p>
            </div>
          ) : (
            <div className="monuments-grid">
              {data.results.map((monument) => (
                <MonumentCard key={monument.id} monument={monument} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <nav className="pagination" aria-label="Pages du catalogue">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((value) => value - 1)}
              >
                Précédent
              </button>

              <span>Page {data.page} sur {totalPages}</span>

              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => setPage((value) => value + 1)}
              >
                Suivant
              </button>
            </nav>
          )}
        </>
      )}
    </section>
  )
}

export default CataloguePage