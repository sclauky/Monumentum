import { useState } from 'react'

import { NavLink } from 'react-router'

import { useAuth } from '../hooks/useAuth'

function navClass({ isActive }: { isActive: boolean }) {
  return `nav-item${isActive ? ' nav-item-active' : ''}`
}

function Sidebar() {
  const { user, isLoading, sessionError, logout } = useAuth()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAccountOpen, setIsAccountOpen] = useState(false)

  function closeMenu() {
    setIsMenuOpen(false)
  }

  function toggleAccount() {
    setIsAccountOpen((open) => !open)
  }

  function handleLogout() {
    setIsAccountOpen(false)
    logout()
  }

  return (
    <aside className="sidebar">
      {/* Barre du haut sur mobile */}
      <div className="mobile-topbar">
        {user && !isLoading ? (
          <div className="mobile-account">
            <button
              type="button"
              className="mobile-account-button"
              onClick={toggleAccount}
              aria-expanded={isAccountOpen}
              aria-controls="mobile-account-menu"
              aria-haspopup="true"
              aria-label="Options du compte"
            >
              {user.email.charAt(0).toUpperCase()}
            </button>

            {isAccountOpen && (
              <div
                id="mobile-account-menu"
                className="mobile-account-menu"
              >
                <button
                  type="button"
                  className="mobile-logout-button"
                  onClick={handleLogout}
                >
                  Se déconnecter
                </button>
              </div>
            )}
          </div>
        ) : !isLoading ? (
          <NavLink to="/login" className="mobile-login">
            Se connecter
          </NavLink>
        ) : (
          <span
            className="mobile-topbar-spacer"
            aria-hidden="true"
          />
        )}

        <div className="brand mobile-brand">
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

        <button
          type="button"
          className={`mobile-menu-toggle${isMenuOpen ? ' is-open' : ''}`}
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          aria-label={
            isMenuOpen
              ? 'Fermer le menu'
              : 'Ouvrir le menu'
          }
        >
          <span />
          <span />
          <span />
        </button>
      </div>

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

        <button
          type="button"
          className="nav-item"
          disabled
        >
          Statistiques
        </button>

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