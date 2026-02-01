import { Link } from '@tanstack/react-router'
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
	external
}: {
	to: string
	label: string
	external?: boolean
}) {
	if (external) {
		return (
			<a
				href={to}
				className="h-full relative flex items-center justify-center text-sm font-medium"
				target="_blank"
				rel="noopener noreferrer"
			>
				{label}
			</a>
		)
	}

	return (
		<Link
			to={to}
			className="h-full relative flex items-center justify-center text-sm font-medium"
			activeProps={{
				className:
					'after:block after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-[1px] after:bg-text'
			}}
		>
			{label}
		</Link>
	)
}

export function Header() {
	return (
		<div className="container mx-auto border border-t-0 border-border h-16">
			<div className="w-full h-full flex px-8 items-center">
				<Link to="/">
					<Logo />
				</Link>

				<nav className="h-full ml-15 flex gap-8">
					{navItems.map((item) => (
						<NavItem
							key={item.label}
							to={item.to}
							label={item.label}
							external={item.external}
						/>
					))}
				</nav>

				<div className="ml-auto flex items-center gap-4">
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
					>
						<GitHub />
					</a>
				</div>
			</div>
		</div>
	)
}
