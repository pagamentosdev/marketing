import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Discord, GitHub, Logo, Twitter } from './icons'

const navItems = [
  {
    to: '/',
    label: 'Início'
  },
  {
    to: '/provedores',
    label: 'Provedores'
  },
  {
    to: '/taxas',
    label: 'Taxas'
  },
  {
    to: '/blog',
    label: 'Blog'
  },
  {
    external: true,
    to: 'https://docs.pagamentos.dev',
    label: 'Documentação'
  }
]

function NavItem({
  to,
  label,
  external,
  onClick,
  className
}: {
  to: string
  label: string
  external?: boolean
  onClick?: () => void
  className?: string
}) {
  if (external) {
    return (
      <a
        className={`relative flex h-full items-center justify-center font-medium text-sm ${className ?? ''}`}
        href={to}
        onClick={onClick}
        rel="noopener noreferrer"
        target="_blank"
      >
        {label}
      </a>
    )
  }

  return (
    <a
      className={`relative flex h-full items-center justify-center font-medium text-sm ${className ?? ''}`}
      href={to}
      onClick={onClick}
    >
      {label}
    </a>
  )
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function toggleMenu() {
    setIsMenuOpen((open) => {
      const newState = !open

      if (newState) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }

      return newState
    })
  }

  function closeMenu() {
    setIsMenuOpen(false)
    document.body.style.overflow = ''
  }

  return (
    <div className="container mx-auto border border-border border-t-0">
      <div className="flex h-16 w-full items-center px-4 md:px-8">
        <a className="flex items-center gap-3" href="/">
          <Logo />
          <span className="font-display font-semibold text-2xl tracking-tight md:hidden">
            pagamentos.dev
          </span>
        </a>

        <nav className="ml-15 hidden h-full gap-8 md:flex">
          {navItems.map((item) => (
            <NavItem
              external={item.external}
              key={item.label}
              label={item.label}
              to={item.to}
            />
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-4 md:flex">
          <a
            href="https://x.com/pagamentosdev"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Twitter />
          </a>
          <a
            href="https://discord.gg/pagamentosdev"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Discord />
          </a>
          <a
            className="text-[#525252]"
            href="https://github.com/pagamentosdev/pagamentos"
            rel="noopener noreferrer"
            target="_blank"
          >
            <GitHub />
          </a>
        </div>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          className="ml-auto flex h-9 w-9 items-center justify-center rounded-md md:hidden"
          onClick={toggleMenu}
          type="button"
        >
          {isMenuOpen ? (
            <X aria-hidden="true" className="h-5 w-5" />
          ) : (
            <Menu aria-hidden="true" className="h-5 w-5" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className="container fixed inset-x-0 top-16 bottom-0 z-50 mx-auto border border-border border-b-0 bg-background md:hidden">
          <div className="flex h-full flex-col px-6 py-6">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <NavItem
                  className="w-full justify-start text-base"
                  external={item.external}
                  key={item.label}
                  label={item.label}
                  onClick={closeMenu}
                  to={item.to}
                />
              ))}
            </nav>

            <div className="mt-auto flex items-center justify-center gap-6">
              <a
                href="https://x.com/pagamentosdev"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Twitter />
              </a>
              <a
                href="https://discord.gg/pagamentosdev"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Discord />
              </a>
              <a
                className="text-[#525252]"
                href="https://github.com/pagamentosdev/pagamentos"
                rel="noopener noreferrer"
                target="_blank"
              >
                <GitHub />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
