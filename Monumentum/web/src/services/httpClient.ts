const API_URL = 'http://localhost:8000'

export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

function lireMessageErreur(data: unknown): string | null {
  if (
    typeof data !== 'object' ||
    data === null ||
    !('erreur' in data)
  ) {
    return null
  }

  const erreur = data.erreur

  if (
    typeof erreur === 'object' &&
    erreur !== null &&
    'message' in erreur &&
    typeof erreur.message === 'string'
  ) {
    return erreur.message
  }

  return null
}

export async function httpClient<T>(
  path: string,
  options: RequestInit = {},
  token: string | null = null,
): Promise<T> {
  const headers = new Headers(options.headers)
  headers.set('Accept', 'application/json')

  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  let response: Response

  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers,
    })
  } catch (error: unknown) {
    if (options.signal?.aborted) {
      throw error
    }

    throw new ApiError(
      0,
      'Impossible de joindre l’API. Vérifiez que le backend est démarré et que CORS est configuré.',
    )
  }

  if (response.status === 204) {
    return undefined as T
  }

  const data: unknown = await response.json().catch(() => null)

  if (!response.ok) {
    const message =
      lireMessageErreur(data) ??
      `La requête a échoué (erreur ${response.status}).`

    throw new ApiError(response.status, message)
  }

  if (data === null) {
    throw new ApiError(
      response.status,
      'L’API a renvoyé une réponse JSON vide ou invalide.',
    )
  }

  return data as T
}