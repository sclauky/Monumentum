import { httpClient } from './httpClient'
import type {
  AuthCredentials,
  TokenResponse,
  User,
} from '../types/api'

export function registerUser(
  credentials: AuthCredentials,
): Promise<User> {
  return httpClient<User>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })
}

export function loginUser(
  credentials: AuthCredentials,
): Promise<TokenResponse> {
  return httpClient<TokenResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })
}

export function getCurrentUser(
  token: string,
  signal?: AbortSignal,
): Promise<User> {
  return httpClient<User>(
    '/auth/me',
    { signal },
    token,
  )
}