import { httpClient } from './httpClient'
import type {
  CollectionCreate,
  CollectionEntry,
  CollectionUpdate,
  MonumentReview,
} from '../types/api'

export function getCollection(
  token: string,
  signal?: AbortSignal,
): Promise<CollectionEntry[]> {
  return httpClient<CollectionEntry[]>(
    '/me/collection',
    { signal },
    token,
  )
}

export function addToCollection(
  itemId: number,
  token: string,
  review?: MonumentReview,
): Promise<CollectionEntry> {
  const body: CollectionCreate = review
    ? {
        item_id: itemId,
        statut: 'vu',
        note: review.note,
        commentaire: review.commentaire,
      }
    : {
        item_id: itemId,
        statut: 'a_voir',
      }

  return httpClient<CollectionEntry>(
    '/me/collection',
    {
      method: 'POST',
      body: JSON.stringify(body),
    },
    token,
  )
}

export function updateCollectionEntry(
  entryId: number,
  changes: CollectionUpdate,
  token: string,
): Promise<CollectionEntry> {
  return httpClient<CollectionEntry>(
    `/me/collection/${entryId}`,
    {
      method: 'PATCH',
      body: JSON.stringify(changes),
    },
    token,
  )
}

export function deleteFromCollection(
  entryId: number,
  token: string,
): Promise<void> {
  return httpClient<void>(
    `/me/collection/${entryId}`,
    { method: 'DELETE' },
    token,
  )
}