import { useState } from 'react'
import { NavLink } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import MobileTopbar from './MobileTopbar'

interface SidebarProps {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

function navClass({ isActive }: { isActive: boolean }) {
  return `nav-item${isActive ? ' nav-item-active' : ''}`
}

// La barre rassemble les liens principaux et les infos du compte.
function Sidebar({ theme, onToggleTheme }: SidebarProps) {
  const { user, isLoading, sessionError, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    <aside className="sidebar">
      <MobileTopbar
        user={user}
        isLoading={isLoading}
        isMenuOpen={isMenuOpen}
        theme={theme}
        onToggleMenu={() => setIsMenuOpen((open) => !open)}
        onToggleTheme={onToggleTheme}
        onLogout={logout}
      />

      {/* Logo sur ordinateur */}
      <div className="brand desktop-brand">
        <img
          src="/monumentum_logo.png"
          alt=""
          className="brand-logo"
          width={52}
          height={52}
        />

        <span className="brand-name">
          Monumentum
        </span>
      </div>

      {/* Navigation */}
      <nav
        id="primary-navigation"
        className={`sidebar-nav${isMenuOpen ? ' is-open' : ''}`}
        aria-label="Navigation principale"
      >
        <NavLink
          to="/"
          end
          className={navClass}
          onClick={closeMenu}
        >
          Catalogue
        </NavLink>

        <NavLink
          to="/collection"
          className={navClass}
          onClick={closeMenu}
        >
          Collection
        </NavLink>

        <NavLink
          to="/watchlist"
          className={navClass}
          onClick={closeMenu}
        >
          À voir
        </NavLink>

        {!user && !isLoading && (
          <NavLink
            to="/login"
            className={(props) =>
              `${navClass(props)} auth-nav-link`
            }
            onClick={closeMenu}
          >
            Se connecter
          </NavLink>
        )}

      </nav>

      {/* Profil sur ordinateur uniquement */}
      <div className="sidebar-bottom">
        <span
          className="profile-avatar"
          aria-hidden="true"
        >
          {user
            ? user.email.charAt(0).toUpperCase()
            : 'M'}
        </span>

        <div className="profile-info">
          <p className="profile-name">
            {user ? 'Mon compte' : 'Mon espace'}
          </p>

          <p className="profile-description">
            {isLoading
              ? 'Connexion en cours…'
              : user
                ? user.email
                : 'Mode découverte'}
          </p>

          {sessionError && (
            <p
              className="auth-error"
              role="alert"
            >
              {sessionError}
            </p>
          )}

          {user && (
            <button
              type="button"
              className="logout-button"
              onClick={logout}
            >
              Se déconnecter
            </button>
          )}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar