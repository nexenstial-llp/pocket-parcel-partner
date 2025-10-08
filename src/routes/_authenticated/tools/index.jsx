import PageLayout from '@/components/layout/PageLayout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/tools/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <PageLayout>Hello "/tools"!</PageLayout>
}
