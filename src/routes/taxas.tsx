import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/taxas')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/taxas"!</div>
}
