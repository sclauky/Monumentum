import { useEffect, useState } from 'react'

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (v: T) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key)

      return storedValue === null
        ? initialValue
        : (JSON.parse(storedValue) as T)
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      if (value === null) {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, JSON.stringify(value))
      }
    } catch {
      console.warn(
        'La session ne peut pas être conservée dans ce navigateur.',
      )
    }
  }, [key, value])

  return [value, setValue]
}