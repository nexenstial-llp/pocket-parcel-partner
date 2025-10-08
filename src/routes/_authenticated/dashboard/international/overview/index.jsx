import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/dashboard/international/overview/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/international/overview/"!</div>
}
