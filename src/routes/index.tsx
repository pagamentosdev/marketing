import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '@/components/hero'
import { Provedores } from '@/components/provedores'

export const Route = createFileRoute('/')({ component: App })

function App() {
	return (
		<>
			<Hero />
			<Provedores />
		</>
	)
}
