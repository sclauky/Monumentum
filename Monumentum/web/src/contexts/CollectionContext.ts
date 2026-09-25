import { createContext } from 'react'
import type { CollectionEntry } from '../types/api'

interface CollectionContextValue {
  entries: CollectionEntry[]
  loading: boolean
  error: string | null
  reload: () => void
  addMonument: (itemId: number) => Promise<void>
  removeEntry: (entryId: number) => Promise<void>
}

export const CollectionContext =
  createContext<CollectionContextValue | null>(null)