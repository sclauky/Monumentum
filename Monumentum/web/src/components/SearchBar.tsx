interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="search-field">
      <label htmlFor="monument-search">
        Rechercher un monument
      </label>

      <input
        id="monument-search"
        type="search"
        placeholder="Nom ou mot-clé…"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}

export default SearchBar