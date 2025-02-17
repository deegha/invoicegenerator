import { useRouter } from 'next/router'
import { useSearchParams, usePathname } from 'next/navigation'

import { useQueryString } from './useQueryString'

export function usePagination() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const { createQueryString } = useQueryString()
  const activePage = searchParams.get('page') || '1'

  const handlePageClick = (newPage: number) =>
    router.push(pathname + '?' + createQueryString({ page: newPage }))

  return {
    activePage,
    handlePageClick,
  }
}
