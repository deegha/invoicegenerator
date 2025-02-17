import { useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export function useQueryString() {
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (newParams: Record<string, string | number>) => {
      const params = new URLSearchParams(searchParams.toString())

      Object.entries(newParams).forEach(([key, value]) => {
        params.set(key, String(value))
      })

      return params.toString()
    },
    [searchParams]
  )

  return {
    createQueryString,
  }
}
