import { useState } from 'react'
import MonumentCard from '../components/MonumentCard'
import SearchBar from '../components/SearchBar'
import { useDebounce } from '../hooks/useDebounce'
import { monuments } from '../mocks/monuments'

const categories = [
  ...new Set(monuments.map((monument) => monument.categorie)),
]

function normaliser(texte: string): string {
  return texte
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

function CataloguePage() {
  const [recherche, setRecherche] = useState('')
  const [categorie, setCategorie] = useState('')

  const rechercheDifferee = useDebounce(recherche, 400)
  const rechercheNormalisee = normaliser(rechercheDifferee)

  const monumentsFiltres = monuments.filter((monument) => {
    const texte = normaliser(
      `${monument.titre} ${monument.description}`,
    )

    const correspondRecherche = texte.includes(rechercheNormalisee)

    const correspondCategorie =
      categorie === '' || monument.categorie === categorie

    return correspondRecherche && correspondCategorie
  })

  return (
    <section aria-labelledby="catalogue-title">
      <header className="catalogue-header catalogue-toolbar">
        <div>
          <h1 id="catalogue-title">Catalogue</h1>
          <p>Votre prochaine découverte commence ici.</p>
        </div>

        <SearchBar
          value={recherche}
          onChange={setRecherche}
        />
      </header>

      <div className="category-filters" aria-label="Catégories">
        <button
          type="button"
          className="category-button"
          aria-pressed={categorie === ''}
          onClick={() => setCategorie('')}
        >
          Tous
        </button>

        {categories.map((nomCategorie) => (
          <button
            key={nomCategorie}
            type="button"
            className="category-button"
            aria-pressed={categorie === nomCategorie}
            onClick={() => setCategorie(nomCategorie)}
          >
            {nomCategorie}
          </button>
        ))}
      </div>

      <p className="catalogue-count" role="status">
        {monumentsFiltres.length}{' '}
        {monumentsFiltres.length > 1
          ? 'monuments trouvés'
          : 'monument trouvé'}
      </p>

      {monumentsFiltres.length === 0 ? (
        <div className="empty-state">
          <h2>Aucun monument trouvé</h2>
          <p>
            Essayez un autre mot-clé ou sélectionnez une autre catégorie.
          </p>
        </div>
      ) : (
        <div className="monuments-grid">
          {monumentsFiltres.map((monument) => (
            <MonumentCard
              key={monument.id}
              monument={monument}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default CataloguePage