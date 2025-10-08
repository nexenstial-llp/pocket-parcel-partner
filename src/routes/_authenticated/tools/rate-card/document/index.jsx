import RateCardTable from '@/components/pages/tools/rateCard/RateCardTable'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/tools/rate-card/document/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="my-5">
      <RateCardTable name={'document_new'} />
    </div>
  )
}
