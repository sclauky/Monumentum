import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router'
import RegisterFields from '../components/RegisterFields'
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
  const [identity, setIdentity] = useState({ nom: '', prenom: '', pseudo: '' })
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const disabled = isSubmitting || isLoading
  const title = isRegister ? 'Créer un compte' : 'Se connecter'

  if (user) return <Navigate to="/" replace />

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (disabled) return
    setError(null)
    setIsSubmitting(true)

    try {
      const credentials = { email: email.trim(), password }

      if (isRegister) {
        const details = {
          nom: identity.nom.trim(),
          prenom: identity.prenom.trim(),
          pseudo: identity.pseudo.trim(),
        }

        if (!details.nom || !details.prenom || !details.pseudo) {
          throw new Error('Renseignez votre nom, votre prénom et votre pseudo.')
        }

        await registerUser({ ...credentials, ...details })
        navigate('/login?inscription=ok', { replace: true })
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
      <h1 id="auth-title">{title}</h1>
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
      {isLoading && <p role="status">Vérification de votre session…</p>}
      {(error || sessionError) && (
        <p className="auth-error" role="alert">{error || sessionError}</p>
      )}

      <form className="auth-form" onSubmit={handleSubmit}>
        {isRegister && (
          <RegisterFields
            value={identity}
            onChange={setIdentity}
            disabled={disabled}
          />
        )}
        <div className="auth-field">
          <label htmlFor="email">Adresse email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={disabled}
            required
          />
        </div>
        <div className="auth-field">
          <label htmlFor="password">Mot de passe</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete={isRegister ? 'new-password' : 'current-password'}
            aria-describedby={isRegister ? 'password-help' : undefined}
            minLength={isRegister ? 8 : undefined}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={disabled}
            required
          />
          {isRegister && (
            <small id="password-help">
              Au moins 8 caractères, une majuscule, une minuscule et un chiffre.
            </small>
          )}
        </div>
        <button
          type="submit"
          className="action-link auth-submit"
          disabled={disabled}
        >
          {isSubmitting ? 'Veuillez patienter…' : title}
        </button>
      </form>

      <p className="auth-switch">
        {isRegister ? 'Déjà un compte ? ' : 'Pas encore de compte ? '}
        <Link to={isRegister ? '/login' : '/inscription'}>
          {isRegister ? 'Se connecter' : 'Créer un compte'}
        </Link>
      </p>
    </section>
  )
}

export default AuthPage