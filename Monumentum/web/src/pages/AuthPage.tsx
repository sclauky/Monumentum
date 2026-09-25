import { useState } from 'react'
import type { FormEvent } from 'react'
import {
  Link,
  Navigate,
  useNavigate,
  useSearchParams,
} from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { registerUser } from '../services/authService'

interface AuthPageProps {
  mode: 'login' | 'register'
}

function AuthPage({ mode }: AuthPageProps) {
  const isRegister = mode === 'register'
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { user, login, isLoading, sessionError } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (user) {
    return <Navigate to="/" replace />
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    const credentials = {
      email: email.trim(),
      password,
    }

    try {
      if (isRegister) {
        await registerUser(credentials)
        navigate('/connexion?inscription=ok', { replace: true })
      } else {
        await login(credentials)
        navigate('/', { replace: true })
      }
    } catch (caughtError: unknown) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : 'Une erreur est survenue. Réessayez.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="auth-panel" aria-labelledby="auth-title">
      <h1 id="auth-title">
        {isRegister ? 'Créer un compte' : 'Se connecter'}
      </h1>

      <p>
        {isRegister
          ? 'Créez votre espace Monumentum.'
          : 'Retrouvez votre espace Monumentum.'}
      </p>

      {!isRegister && searchParams.get('inscription') === 'ok' && (
        <p className="auth-success" role="status">
          Votre compte est créé. Vous pouvez vous connecter.
        </p>
      )}

      {isLoading && (
        <p role="status">Vérification de votre session…</p>
      )}

      {(error || sessionError) && (
        <p className="auth-error" role="alert">
          {error || sessionError}
        </p>
      )}

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-field">
          <label htmlFor="email">Adresse email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={isSubmitting || isLoading}
            required
          />
        </div>

        <div className="auth-field">
          <label htmlFor="password">Mot de passe</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete={
              isRegister ? 'new-password' : 'current-password'
            }
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={isSubmitting || isLoading}
            required
          />
        </div>

        <button
          type="submit"
          className="action-link auth-submit"
          disabled={isSubmitting || isLoading}
        >
          {isSubmitting
            ? 'Veuillez patienter…'
            : isRegister
              ? 'Créer mon compte'
              : 'Se connecter'}
        </button>
      </form>

      <p className="auth-switch">
        {isRegister ? 'Déjà un compte ? ' : 'Pas encore de compte ? '}
        <Link to={isRegister ? '/connexion' : '/inscription'}>
          {isRegister ? 'Se connecter' : 'Créer un compte'}
        </Link>
      </p>
    </section>
  )
}

export default AuthPage