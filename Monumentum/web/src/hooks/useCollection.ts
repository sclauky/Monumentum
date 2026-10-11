import { useContext } from 'react'
import { CollectionContext } from '../contexts/CollectionContext'

// Ce hook évite de répéter la vérification du contexte dans les composants.
export function useCollection() {
  const context = useContext(CollectionContext)

  if (context === null) {
    throw new Error(
      'useCollection doit être utilisé dans CollectionProvider.',
    )
  }

  return context
}