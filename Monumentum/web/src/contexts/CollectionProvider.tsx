import type { ReactNode } from 'react'
import { useAuth } from '../hooks/useAuth'
import CollectionSession from './CollectionSession'

interface CollectionProviderProps {
  children: ReactNode
}

function CollectionProvider({ children }: CollectionProviderProps) {
  const { user, token } = useAuth()
  const sessionToken = user ? token : null

  // La clé recrée la session quand l'utilisateur change, pour ne pas garder ses données.
  return (
    <CollectionSession
      key={sessionToken ?? 'visitor'}
      token={sessionToken}
    >
      {children}
    </CollectionSession>
  )
}

export default CollectionProvider