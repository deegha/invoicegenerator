import Link from 'next/link'
import { Home, Settings, BookOpen } from 'react-feather'
import { ReactNode, useEffect } from 'react'
import { useAuth } from 'context/authContext'
import { useRouter } from 'next/router'
import { Loading } from 'components'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { LogOut } from 'react-feather'
interface IProps {
  children: React.ReactNode
}

type TPageUrl =
  | '/'
  | '/settings'
  | '/invoice-history'
  | '/invoice'
  | '/payments'
  | '/users'

export interface Ipage {
  name: string
  icon: ReactNode
  url: TPageUrl
}

const links: Array<Ipage> = [
  {
    name: 'Generate Invoice',
    icon: <Home />,
    url: '/',
  },
  {
    name: 'Invoice History',
    icon: <BookOpen />,
    url: '/invoice-history',
  },
  {
    name: 'Settings',
    icon: <Settings />,
    url: '/settings',
  },
]

export const Layout: React.FC<IProps> = ({ children }) => {
  const { authenticated, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!authenticated) {
      router.push('login')
    }
  }, [authenticated, router])

  if (authenticated === 'loading') return <Loading />

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="fixed top-0 w-full bg-white z-30">
        <div className="max-w-[954px] mx-auto flex justify-between items-center h-16 ">
          <nav className="flex items-center gap-4">
            <Image
              src="/Invoicegen-logo-2.png"
              width={50}
              height={50}
              alt="Invoice Gen Logo"
            />
            <ul className="flex gap-6 text-gray-400">
              {links.map((link) => (
                <li
                  key={link.url}
                  className={`"hover:text-gray-700 ${
                    pathname === link.url && 'text-sky-400'
                  }`}
                >
                  <Link href={`${link.url}`}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <button
            onClick={logout}
            className="text-gray-700 hover:text-gray-200 uppercase"
          >
            <LogOut
              className="text-rose-600 font-bold cursor-pointer"
              size={20}
            />
          </button>
        </div>
      </div>
      <main className="w-full max-w-[954px] pt-24 pb-10 ">{children}</main>
    </div>
  )
}
