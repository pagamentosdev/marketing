import { Link } from '@tanstack/react-router'
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

export function NavItem({
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
				href={to}
				className={`h-full relative flex items-center justify-center text-sm font-medium ${className ?? ''}`}
				target="_blank"
				rel="noopener noreferrer"
				onClick={onClick}
			>
				{label}
			</a>
		)
	}

	return (
		<Link
			to={to}
			className={`h-full relative flex items-center justify-center text-sm font-medium ${className ?? ''}`}
			activeProps={{
				className:
					'after:block after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-[1px] after:bg-text'
			}}
			onClick={onClick}
		>
			{label}
		</Link>
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
		<div className="container mx-auto border border-t-0 border-border">
			<div className="w-full h-16 flex px-4 md:px-8 items-center">
				<Link to="/" className="flex items-center gap-3">
					<Logo />
					<span className="md:hidden font-display text-2xl font-semibold tracking-tight">
						pagamentos.dev
					</span>
				</Link>

				<nav className="h-full ml-15 hidden md:flex gap-8">
					{navItems.map((item) => (
						<NavItem
							key={item.label}
							to={item.to}
							label={item.label}
							external={item.external}
						/>
					))}
				</nav>

				<div className="ml-auto hidden md:flex items-center gap-4">
					<a
						href="https://x.com/pagamentosdev"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Twitter />
					</a>
					<a
						href="https://discord.gg/pagamentosdev"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Discord />
					</a>
					<a
						href="https://github.com/pagamentosdev/pagamentos"
						target="_blank"
						rel="noopener noreferrer"
						className="text-[#525252]"
					>
						<GitHub />
					</a>
				</div>

				<button
					type="button"
					className="ml-auto flex md:hidden items-center justify-center h-9 w-9 rounded-md"
					onClick={toggleMenu}
					aria-expanded={isMenuOpen}
					aria-controls="mobile-navigation"
					aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
				>
					{isMenuOpen ? (
						<X className="h-5 w-5" aria-hidden="true" />
					) : (
						<Menu className="h-5 w-5" aria-hidden="true" />
					)}
				</button>
			</div>

			{isMenuOpen && (
				<div className="container mx-auto border border-b-0 md:hidden z-50 fixed inset-x-0 top-16 bottom-0 border-border bg-background">
					<div className="flex h-full flex-col px-6 py-6">
						<nav className="flex flex-col gap-4">
							{navItems.map((item) => (
								<NavItem
									key={item.label}
									to={item.to}
									label={item.label}
									external={item.external}
									onClick={closeMenu}
									className="w-full justify-start text-base"
								/>
							))}
						</nav>

						<div className="mt-auto flex items-center justify-center gap-6">
							<a
								href="https://x.com/pagamentosdev"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Twitter />
							</a>
							<a
								href="https://discord.gg/pagamentosdev"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Discord />
							</a>
							<a
								href="https://github.com/pagamentosdev/pagamentos"
								target="_blank"
								rel="noopener noreferrer"
								className="text-[#525252]"
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
