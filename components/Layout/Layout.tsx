import Link from 'next/link'

import styled from 'styled-components'
import { Home, CreditCard, Users, Settings, BookOpen } from 'react-feather'
import { ReactNode } from 'react'

interface IProps {
  children: React.ReactNode
}

type TPageUrl = '' | 'dashboard' | 'settings' | 'invoice' | 'payments' | 'users'

export interface Ipage {
  name: string
  icon: ReactNode
  url: TPageUrl
}

const links: Array<Ipage> = [
  {
    name: 'Home',
    icon: <Home />,
    url: '',
  },
  {
    name: 'Invoice',
    icon: <BookOpen />,
    url: 'invoice',
  },
  {
    name: 'Payments',
    icon: <CreditCard />,
    url: '',
  },
  {
    name: 'Users',
    icon: <Users />,
    url: 'users',
  },
  {
    name: 'Settings',
    icon: <Settings />,
    url: 'settings',
  },
]

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100vh;
`

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100vh;
  background-color: ${({ theme }) => theme.color.primary.default};
  color: ${({ theme }) => theme.color.text.secondary};
  padding: 10px 60px;
  nav {
    width: 100%;
    ul {
      padding: 0;
      margin: 0;

      li {
        list-style: none;
        margin: 20px 0;
        cursor: pointer;
        display: flex;
        align-items: center;
      }
    }
  }
`

const IconContainer = styled.div`
  margin-right: 20px;
`

const Logo = styled.div`
  font-size: 33px;
  font-weight: 400;
  margin-bottom: 100px;
  text-align: center;
`

export const Layout: React.FC<IProps> = ({ children }) => {
  return (
    <Container>
      <NavContainer>
        <Logo>Finex</Logo>
        <nav>
          <ul>
            {links.map((link) => {
              return (
                <Link href={`/${link.url}`} key={link.url}>
                  <a>
                    <li>
                      <IconContainer>{link.icon}</IconContainer>
                    </li>
                  </a>
                </Link>
              )
            })}
          </ul>
        </nav>
      </NavContainer>
      <div>{children}</div>
    </Container>
  )
}
