import { Link } from 'react-router'

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-symbol" aria-hidden="true">
          M
        </span>
        <span className="brand-name">Monumentum</span>
      </div>

      <nav className="sidebar-nav" aria-label="Navigation principale">
        <Link to="/" className="nav-item nav-item-active">
          Catalogue
        </Link>

        <button type="button" className="nav-item" disabled>
          Ma collection
        </button>

        <button type="button" className="nav-item" disabled>
          Statistiques
        </button>
      </nav>

      <div className="sidebar-bottom">
        <span className="profile-avatar" aria-hidden="true">
          M
        </span>

        <div>
          <p className="profile-name">Mon espace</p>
          <p className="profile-description">Mode découverte</p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar