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

export interface RegisterCredentials extends AuthCredentials {
  nom: string
  prenom: string
  pseudo: string
}

export interface User {
  id: number
  email: string
  nom: string
  prenom: string
  pseudo: string
  photo_url: string | null
}

export interface TokenResponse {
  access_token: string
  token_type: string
}

export type Statut = 'a_decouvrir' | 'en_cours' | 'termine'

export interface CollectionCreate {
  item_id: number
  statut: Statut
  note?: number | null
  commentaire?: string | null
}

export interface CollectionEntry {
  id: number
  statut: Statut
  note: number | null
  commentaire: string | null
  date_ajout: string
  item: Item
}

export interface CollectionUpdate {
  statut?: Statut | null
  note?: number | null
  commentaire?: string | null
}

export interface MonumentReview {
  note: number
  commentaire: string
}