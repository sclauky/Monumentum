import { createContext } from 'react'
import type { AuthCredentials, User } from '../types/api'

interface AuthContextValue {
  user: User | null
  token: string | null
  isLoading: boolean
  sessionError: string | null
  login: (credentials: AuthCredentials) => Promise<void>
  logout: () => void
}

// Ce contexte partage l'état de connexion avec le reste de l'interface.
export const AuthContext = createContext<AuthContextValue | null>(
  null,
)