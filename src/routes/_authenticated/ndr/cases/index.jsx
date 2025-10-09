import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/ndr/cases/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/ndr/cases/"!</div>
}
