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