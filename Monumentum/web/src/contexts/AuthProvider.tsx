import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { AuthContext } from './AuthContext'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { getCurrentUser, loginUser } from '../services/authService'
import { ApiError } from '../services/httpClient'
import type { AuthCredentials, User } from '../types/api'

interface AuthProviderProps {
  children: ReactNode
}

function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useLocalStorage<string | null>(
    'monumentum-token',
    null,
  )

  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(Boolean(token))
  const [sessionError, setSessionError] = useState<string | null>(
    null,
  )

  useEffect(() => {
    if (!token) {
      setUser(null)
      setIsLoading(false)
      return
    }

    const controller = new AbortController()

    async function restoreSession() {
      setIsLoading(true)
      setSessionError(null)
      setUser(null)

      try {
        const currentUser = await getCurrentUser(
          token as string,
          controller.signal,
        )

        if (!controller.signal.aborted) {
          setUser(currentUser)
        }
      } catch (error: unknown) {
        if (controller.signal.aborted) return

        if (error instanceof ApiError && error.status === 401) {
          setToken(null)
          setSessionError('Session expirée ou invalide. Reconnectez-vous.')
        } else {
          setSessionError(
            'Impossible de vérifier la session. Vérifiez le backend puis actualisez.',
          )
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void restoreSession()

    return () => controller.abort()
  }, [token, setToken])

  async function login(credentials: AuthCredentials): Promise<void> {
    const response = await loginUser(credentials)

    setSessionError(null)
    setUser(null)
    setIsLoading(true)
    setToken(response.access_token)
  }

  function logout() {
    setToken(null)
    setUser(null)
    setSessionError(null)
    setIsLoading(false)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        sessionError,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider