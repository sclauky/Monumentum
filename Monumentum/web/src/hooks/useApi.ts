import { useEffect, useState } from 'react'
import { httpClient } from '../services/httpClient'

export function useApi<T>(path: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function charger() {
      setLoading(true)
      setError(null)
      setData(null)

      try {
        const result = await httpClient<T>(path, {
          signal: controller.signal,
        })

        if (!controller.signal.aborted) {
          setData(result)
        }
      } catch (err: unknown) {
        if (!controller.signal.aborted) {
          setError(
            err instanceof Error
              ? err.message
              : 'Une erreur inattendue est survenue.',
          )
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    void charger()

    return () => {
      controller.abort()
    }
  }, [path])

  return { data, loading, error }
}