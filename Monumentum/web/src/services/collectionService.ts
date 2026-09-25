import { httpClient } from './httpClient'
import type {
  CollectionCreate,
  CollectionEntry,
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
): Promise<CollectionEntry> {
  const body: CollectionCreate = {
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