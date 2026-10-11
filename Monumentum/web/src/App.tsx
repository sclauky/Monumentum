import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import './App.css'
import Sidebar from './components/Sidebar'
import ThemeToggle from './components/ThemeToggle'
import ProtectedRoute from './components/ProtectedRoute'
import AuthProvider from './contexts/AuthProvider'
import CollectionProvider from './contexts/CollectionProvider'
import { useLocalStorage } from './hooks/useLocalStorage'
import AuthPage from './pages/AuthPage'
import CataloguePage from './pages/CataloguePage'
import CollectionPage from './pages/CollectionPage'
import MonumentPage from './pages/MonumentPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  const [savedTheme, setTheme] = useLocalStorage<'dark' | 'light'>(
    'monumentum-theme',
    'dark',
  )
  const theme = savedTheme === 'light' ? 'light' : 'dark'

  function toggleTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <CollectionProvider>
          <div className="app-layout" data-theme={theme}>
            <ThemeToggle
              className="app-theme-toggle desktop-theme-toggle"
              theme={theme}
              onToggle={toggleTheme}
            />

            <Sidebar theme={theme} onToggleTheme={toggleTheme} />

            <main className="main-content">
              <Routes>
                <Route path="/" element={<CataloguePage />} />

                <Route
                  path="/monuments/:id"
                  element={<MonumentPage />}
                />

                <Route
                  path="/login"
                  element={<AuthPage key="login" mode="login" />}
                />

                <Route
                  path="/connexion"
                  element={<Navigate to="/login" replace />}
                />

                <Route
                  path="/inscription"
                  element={<AuthPage key="register" mode="register" />}
                />

                <Route
                  path="/collection"
                  element={
                    <ProtectedRoute>
                      <CollectionPage key="collection" mode="collection" />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/watchlist"
                  element={
                    <ProtectedRoute>
                      <CollectionPage key="watchlist" mode="watchlist" />
                    </ProtectedRoute>
                  }
                />

                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
          </div>
        </CollectionProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App