import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/provedores/$provedor')({
	component: RouteComponent
})

function RouteComponent() {
	return <div>Hello "/provedores/$provedor"!</div>
}
