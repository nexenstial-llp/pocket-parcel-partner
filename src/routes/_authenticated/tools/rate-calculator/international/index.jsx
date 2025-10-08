import PickupDetails from '@/components/pages/tools/rateCalculator/international/PickupDetails'
import ShipmentDetails from '@/components/pages/tools/rateCalculator/international/ShipmentDetails'
import TermsAndConditions from '@/components/pages/tools/rateCalculator/TermsAndConditions'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/tools/rate-calculator/international/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <div className="flex gap-4 my-4">
        <ShipmentDetails />
        <PickupDetails />
      </div>
      <TermsAndConditions />
    </div>
  )
}
