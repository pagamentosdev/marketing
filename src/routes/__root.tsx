import { createRootRoute, HeadContent, Scripts } from '@tanstack/react-router'
import { Header } from '@/components/app-header'
import appCss from '../styles.css?url'

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: 'utf-8'
			},
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1'
			},
			{
				title: 'pagamentos.dev'
			}
		],
		links: [
			{
				rel: 'preconnect',
				href: 'https://fonts.googleapis.com'
			},
			{
				rel: 'preconnect',
				href: 'https://fonts.gstatic.com',
				crossOrigin: 'anonymous'
			},
			{
				rel: 'stylesheet',
				href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Red+Hat+Display:ital,wght@0,600;1,600&display=swap'
			},
			{
				rel: 'stylesheet',
				href: appCss
			}
		]
	}),

	shellComponent: RootDocument
})

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="pt-BR">
			<head>
				<HeadContent />
			</head>
			<body>
				<Header />
				{children}
				<Scripts />
			</body>
		</html>
	)
}
