import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Sidebar from './components/Sidebar'
import ProtectedRoute from './components/ProtectedRoute'
import AuthProvider from './contexts/AuthProvider'
import CollectionProvider from './contexts/CollectionProvider'
import AuthPage from './pages/AuthPage'
import CataloguePage from './pages/CataloguePage'
import CollectionPage from './pages/CollectionPage'
import MonumentPage from './pages/MonumentPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CollectionProvider>
          <div className="app-layout">
            <Sidebar />

            <main className="main-content">
              <Routes>
                <Route path="/" element={<CataloguePage />} />

                <Route
                  path="/monuments/:id"
                  element={<MonumentPage />}
                />

                <Route
                  path="/connexion"
                  element={<AuthPage key="login" mode="login" />}
                />

                <Route
                  path="/inscription"
                  element={<AuthPage key="register" mode="register" />}
                />

                <Route
                  path="/collection"
                  element={
                    <ProtectedRoute>
                      <CollectionPage />
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