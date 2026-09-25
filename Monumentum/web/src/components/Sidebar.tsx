import { NavLink } from 'react-router'
import { useAuth } from '../hooks/useAuth'

function Sidebar() {
  const { user, isLoading, sessionError, logout } = useAuth()

  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-symbol" aria-hidden="true">
          M
        </span>
        <span className="brand-name">Monumentum</span>
      </div>

      <nav className="sidebar-nav" aria-label="Navigation principale">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `nav-item${isActive ? ' nav-item-active' : ''}`
          }
        >
          Catalogue
        </NavLink>

        <NavLink
          to="/collection"
          className={({ isActive }) =>
            `nav-item${isActive ? ' nav-item-active' : ''}`
          }
        >
          Ma collection
        </NavLink>

        <button type="button" className="nav-item" disabled>
          Statistiques
        </button>

        {!user && !isLoading && (
          <NavLink
            to="/connexion"
            className={({ isActive }) =>
              `nav-item${isActive ? ' nav-item-active' : ''}`
            }
          >
            Se connecter
          </NavLink>
        )}
      </nav>

      <div className="sidebar-bottom">
        <span className="profile-avatar" aria-hidden="true">
          {user ? user.email.charAt(0).toUpperCase() : 'M'}
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
            <p className="auth-error" role="alert">
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