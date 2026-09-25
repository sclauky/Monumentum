import { useContext } from 'react'
import { CollectionContext } from '../contexts/CollectionContext'

export function useCollection() {
  const context = useContext(CollectionContext)

  if (context === null) {
    throw new Error(
      'useCollection doit être utilisé dans CollectionProvider.',
    )
  }

  return context
}