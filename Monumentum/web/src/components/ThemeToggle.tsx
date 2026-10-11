interface ThemeToggleProps {
  theme: 'dark' | 'light'
  onToggle: () => void
  className: string
}

// Le parent conserve le thème, ce composant ne fait que demander le changement.
function ThemeToggle({
  theme,
  onToggle,
  className,
}: ThemeToggleProps) {
  return (
    <button
      type="button"
      className={className}
      onClick={onToggle}
      aria-label={
        theme === 'dark'
          ? 'Activer le thème clair'
          : 'Activer le thème sombre'
      }
      aria-pressed={theme === 'light'}
    >
      <span className="theme-toggle-icon" aria-hidden="true">
        {theme === 'dark' ? '☀' : '☾'}
      </span>
      <span className="theme-toggle-label">
        {theme === 'dark' ? 'Clair' : 'Sombre'}
      </span>
    </button>
  )
}

export default ThemeToggle
