import { useCur } from 'context/currencyContext'

export function Currency() {
  const { activeCur } = useCur()

  return <span>{activeCur.currencyCode}</span>
}
