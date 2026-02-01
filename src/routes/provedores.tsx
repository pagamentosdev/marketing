import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/provedores')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/provedores"!</div>
}
