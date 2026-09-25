export type Rarete =
  | 'commun'
  | 'rare'
  | 'super rare'
  | 'gatekeeped'

export interface Item {
  id: number
  titre: string
  categorie: string
  description: string
  image_url: string
  annee: number
  ville: string
  architecte: string
  rarete: Rarete
}

export interface ItemListResponse {
  total: number
  page: number
  limit: number
  results: Item[]
}

export interface AuthCredentials {
  email: string
  password: string
}

export interface User {
  id: number
  email: string
}

export interface TokenResponse {
  access_token: string
  token_type: string
}

export type CollectionStatut = 'a_voir' | 'en_cours' | 'vu'

export interface CollectionCreate {
  item_id: number
  statut: CollectionStatut
  note?: number | null
  commentaire?: string | null
}

export interface CollectionEntry {
  id: number
  statut: CollectionStatut
  note: number | null
  commentaire: string | null
  date_ajout: string
  item: Item
}