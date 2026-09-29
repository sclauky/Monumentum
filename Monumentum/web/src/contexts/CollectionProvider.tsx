import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { CollectionContext } from './CollectionContext'
import { useAuth } from '../hooks/useAuth'
import {
  addToCollection,
  deleteFromCollection,
  getCollection,
  updateCollectionEntry,
} from '../services/collectionService'
import type {
  CollectionEntry,
  CollectionUpdate,
  MonumentReview,
} from '../types/api'

interface CollectionProviderProps {
  children: ReactNode
}

interface CollectionSessionProps {
  children: ReactNode
  token: string | null
}

function CollectionSession({ children, token }: CollectionSessionProps) {
  const [entries, setEntries] = useState<CollectionEntry[]>([])
  const [loading, setLoading] = useState(Boolean(token))
  const [error, setError] = useState<string | null>(null)
  const [refreshCount, setRefreshCount] = useState(0)

  useEffect(() => {
    setEntries([])
    setError(null)

    if (!token) {
      setLoading(false)
      return
    }

    const controller = new AbortController()
    setLoading(true)

    getCollection(token, controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) setEntries(data)
      })
      .catch((caughtError: unknown) => {
        if (!controller.signal.aborted) {
          setError(
            caughtError instanceof Error
              ? caughtError.message
              : 'Impossible de charger vos monuments.',
          )
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [token, refreshCount])

  function reload() {
    setRefreshCount((previous) => previous + 1)
  }

  function storeEntry(updatedEntry: CollectionEntry) {
    setEntries((previous) => [
      ...previous.filter(
        (entry) => entry.item.id !== updatedEntry.item.id,
      ),
      updatedEntry,
    ])
  }

  async function addMonument(itemId: number): Promise<void> {
    if (!token) throw new Error('Connectez-vous pour continuer.')

    const newEntry = await addToCollection(itemId, token)
    storeEntry(newEntry)
  }

  async function updateEntry(
    entryId: number,
    changes: CollectionUpdate,
  ): Promise<void> {
    if (!token) throw new Error('Connectez-vous pour continuer.')

    const updatedEntry = await updateCollectionEntry(
      entryId,
      changes,
      token,
    )
    storeEntry(updatedEntry)
  }

  async function saveReview(
    itemId: number,
    review: MonumentReview,
  ): Promise<void> {
    if (!token) throw new Error('Connectez-vous pour continuer.')

    if (
      !Number.isInteger(review.note) ||
      review.note < 1 ||
      review.note > 5
    ) {
      throw new Error('Choisissez une note entre 1 et 5 étoiles.')
    }

    const existingEntry = entries.find(
      (entry) => entry.item.id === itemId,
    )

    const savedEntry = existingEntry
      ? await updateCollectionEntry(
          existingEntry.id,
          { statut: 'vu', ...review },
          token,
        )
      : await addToCollection(itemId, token, review)

    storeEntry(savedEntry)
  }

  async function removeEntry(entryId: number): Promise<void> {
    if (!token) throw new Error('Connectez-vous pour continuer.')

    await deleteFromCollection(entryId, token)
    setEntries((previous) =>
      previous.filter((entry) => entry.id !== entryId),
    )
  }

  return (
    <CollectionContext.Provider
      value={{
        entries, loading, error, reload,
        addMonument, updateEntry, saveReview, removeEntry,
      }}
    >
      {children}
    </CollectionContext.Provider>
  )
}

function CollectionProvider({ children }: CollectionProviderProps) {
  const { user, token } = useAuth()
  const sessionToken = user ? token : null

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