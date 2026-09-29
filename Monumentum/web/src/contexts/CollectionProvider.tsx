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
} from '../types/api'

interface CollectionProviderProps {
  children: ReactNode
}

interface CollectionSessionProps {
  children: ReactNode
  token: string | null
}

function CollectionSession({
  children,
  token,
}: CollectionSessionProps) {
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
        if (!controller.signal.aborted) {
          setEntries(data)
        }
      })
      .catch((caughtError: unknown) => {
        if (!controller.signal.aborted) {
          setError(
            caughtError instanceof Error
              ? caughtError.message
              : 'Impossible de charger votre collection.',
          )
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      })

    return () => controller.abort()
  }, [token, refreshCount])

  function reload() {
    setRefreshCount((previous) => previous + 1)
  }

  async function addMonument(itemId: number): Promise<void> {
    if (!token) {
      throw new Error('Connectez-vous pour ajouter un monument.')
    }

    const newEntry = await addToCollection(itemId, token)

    setEntries((previous) => {
      const alreadyExists = previous.some(
        (entry) => entry.item.id === newEntry.item.id,
      )

      return alreadyExists ? previous : [...previous, newEntry]
    })
  }

  async function updateEntry(
    entryId: number,
    changes: CollectionUpdate,
  ): Promise<void> {
    if (!token) {
      throw new Error('Connectez-vous pour modifier votre collection.')
    }

    const updatedEntry = await updateCollectionEntry(
      entryId,
      changes,
      token,
    )

    setEntries((previous) =>
      previous.map((entry) =>
        entry.id === entryId ? updatedEntry : entry,
      ),
    )
  }

  async function removeEntry(entryId: number): Promise<void> {
    if (!token) {
      throw new Error('Connectez-vous pour modifier votre collection.')
    }

    await deleteFromCollection(entryId, token)

    setEntries((previous) =>
      previous.filter((entry) => entry.id !== entryId),
    )
  }

  return (
    <CollectionContext.Provider
      value={{
        entries,
        loading,
        error,
        reload,
        addMonument,
        updateEntry,
        removeEntry,
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