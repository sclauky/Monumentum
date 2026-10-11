import { useState } from 'react'
import { NavLink } from 'react-router'
import ThemeToggle from './ThemeToggle'
import type { User } from '../types/api'

interface MobileTopbarProps {
  user: User | null
  isLoading: boolean
  isMenuOpen: boolean
  theme: 'dark' | 'light'
  onToggleMenu: () => void
  onToggleTheme: () => void
  onLogout: () => void
}

function MobileTopbar({
  user,
  isLoading,
  isMenuOpen,
  theme,
  onToggleMenu,
  onToggleTheme,
  onLogout,
}: MobileTopbarProps) {
  const [isAccountOpen, setIsAccountOpen] = useState(false)

  // On ferme le petit menu du compte avant de lancer la déconnexion.
  function handleLogout() {
    setIsAccountOpen(false)
    onLogout()
  }

  return (
    <div className="mobile-topbar">
      {user && !isLoading ? (
        <div className="mobile-account">
          <button
            type="button"
            className="mobile-account-button"
            onClick={() => setIsAccountOpen((open) => !open)}
            aria-expanded={isAccountOpen}
            aria-controls="mobile-account-menu"
            aria-haspopup="true"
            aria-label="Options du compte"
          >
            {user.email.charAt(0).toUpperCase()}
          </button>

          {isAccountOpen && (
            <div id="mobile-account-menu" className="mobile-account-menu">
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
        <span className="mobile-topbar-spacer" aria-hidden="true" />
      )}

      <div className="brand mobile-brand">
        <img
          src="/monumentum_logo.png"
          alt=""
          className="brand-logo"
          width={52}
          height={52}
        />
        <span className="brand-name">Monumentum</span>
      </div>

      <div className="mobile-topbar-actions">
        <ThemeToggle
          className="app-theme-toggle mobile-theme-toggle"
          theme={theme}
          onToggle={onToggleTheme}
        />
        <button
          type="button"
          className={`mobile-menu-toggle${isMenuOpen ? ' is-open' : ''}`}
          onClick={onToggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </div>
  )
}

export default MobileTopbar
