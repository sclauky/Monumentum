interface CategoryFiltersProps {
  selectedCategory: string
  onSelect: (category: string) => void
}

const categories = [
  'Château',
  'Cathédrale',
  'Fortification',
  'Abbaye',
  'Monument',
  'Antiquité',
]

function CategoryFilters({
  selectedCategory,
  onSelect,
}: CategoryFiltersProps) {
  return (
    <div className="category-filters" aria-label="Catégories">
      <button
        type="button"
        className="category-button"
        aria-pressed={selectedCategory === ''}
        onClick={() => onSelect('')}
      >
        Tous
      </button>

      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className="category-button"
          aria-pressed={selectedCategory === category}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilters
