import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

// Petit raccourci pour accéder au contexte de connexion.
export function useAuth() {
  const context = useContext(AuthContext)

  if (context === null) {
    throw new Error('useAuth doit être utilisé dans AuthProvider.')
  }

  return context
}