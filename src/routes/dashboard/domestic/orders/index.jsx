import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/domestic/orders/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/domestic/orders/"!</div>
}
